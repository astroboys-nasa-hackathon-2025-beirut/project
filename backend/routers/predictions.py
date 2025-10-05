from models.exoplanet_or_not import predict_exoplanet_or_not
from models.exoplanet_features import ExoplanetFeatures
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from typing import Dict, Any

import os, shutil, random, pickle
import pandas as pd


UPLOAD_DIR = 'uploaded_files'
OUTPUTS_DIR = 'outputs'
MODEL_FILENAME = 'model_files/ExoplanetOrNot.pkl'
SIMPLIFIED_MODEL_FILENAME = 'model_files/SimplifiedExoplanetOrNot.pkl'

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
    responses={404: {"description": "Not found"}},
)

try:
    with open(SIMPLIFIED_MODEL_FILENAME, 'rb') as file:
        simplified_model_artifacts = pickle.load(file)
    print(f"✅ ML Pipeline '{SIMPLIFIED_MODEL_FILENAME}' loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model/pipeline: {e}")

try:
    with open(MODEL_FILENAME, 'rb') as file:
        model_artifacts = pickle.load(file)
    print(f"✅ ML Pipeline '{MODEL_FILENAME}' loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model/pipeline: {e}")


@router.post("/exoplanet_or_not")
def predict(file: UploadFile = File(...)):
    # 1. Define the full path where the file will be saved
    file_id = str(random.randint(0, 1_000_000_000)) + '.csv'
    file_location = UPLOAD_DIR + '/' + file_id

    # 2. Save the file content
    try:
        # Use shutil.copyfileobj to efficiently stream the file content
        with open(file_location, "wb") as buffer:
            # Note: file.file is the underlying SpooledTemporaryFile
            shutil.copyfileobj(file.file, buffer)

        prediction_result = predict_exoplanet_or_not(file_id, file_location, False, model_artifacts)
        results = []
        toReturn = {
            'id': file_id
        }
        for index, label in prediction_result['predicted'].items():
            results.append({
                index: {
                    'label': label,
                    'confidence': prediction_result['confidence'].iloc[index]
                }
            })
        toReturn['results'] = results
        # 3. Return a confirmation message
        return toReturn
    except Exception as e:
        print(e)

@router.post("/simplified_exoplanet_or_not")
def predict_with_input_features(features: ExoplanetFeatures):
    df = pydantic_instance_to_dataframe_row(features)
    file_id = str(random.randint(0, 1_000_000_000)) + '.csv'
    file_location = UPLOAD_DIR + '/' + file_id
    df.to_csv(file_location, index=False)
    prediction_result = predict_exoplanet_or_not(file_id, file_location, True, simplified_model_artifacts)
    results = []
    toReturn = {
        'id': file_id
    }
    for index, label in prediction_result['predicted'].items():
        results.append({
            index: {
                'label': label,
                'confidence': prediction_result['confidence'].iloc[index]
            }
        })
    toReturn['results'] = results
    return toReturn

@router.get("/download")
def download_result(id: str):
    file_to_serve = OUTPUTS_DIR + '/' + id
    if not os.path.exists(file_to_serve):
        raise HTTPException(status_code=404, detail="File not found on server.")

    return FileResponse(
        path=file_to_serve,
        media_type='text/csv',
        filename="predictions"
    )


def pydantic_instance_to_dataframe_row(pydantic_instance: ExoplanetFeatures) -> pd.DataFrame:
    # 1. Convert the Pydantic instance to a dictionary
    # .model_dump() is the modern Pydantic v2 method for getting raw data.
    data_dict: Dict[str, Any] = pydantic_instance.model_dump()

    # 2. Convert the dictionary to a single-row DataFrame
    # pd.DataFrame() expects a dictionary where keys are columns and values are lists.
    # To create a single row, we wrap each value in a list.
    data_for_df = {key: [value] for key, value in data_dict.items()}

    df_row = pd.DataFrame(data_for_df)

    return df_row