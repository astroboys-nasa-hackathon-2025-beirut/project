import pandas as pd
import numpy as np
import pickle
import os

# FP = 0
# Confirmed = 1

# --- Configuration ---
MODEL_FILENAME = 'model_files/ExoplanetOrNot.pkl'
SIMPLIFIED_MODEL_FILENAME = 'model_files/SimplifiedExoplanetOrNot.pkl'
CSV_FILENAME = '../datasets/sample_exoplanet_or_not.csv'
OUTPUTS = 'outputs'
PREDICTED_LABEL = 'Predicted_Label'
CONFIDENCE_LEVEl = 'Confidence_Level'

def load_model_and_predict(file_location: str, is_simplified: bool, model_artifacts):
    """
    Loads the pickled ML pipeline, reads the CSV, performs predictions.
    The pipeline automatically applies the necessary scaling before prediction.
    """
    print("\n--- Starting Prediction Process ---")

    # Check if files exist before proceeding
    if not os.path.exists(MODEL_FILENAME) or not os.path.exists(SIMPLIFIED_MODEL_FILENAME):
        print("❌ Error: Model or CSV file is missing. Please run setup_mock_environment() first.")
        return

    # 2. Load the CSV data
    CSV_FILENAME = file_location
    try:
        df_data = pd.read_csv(CSV_FILENAME)
        print(f"✅ Data loaded from '{CSV_FILENAME}'. Shape: {df_data.shape}")
    except Exception as e:
        print(f"❌ Error loading CSV: {e}")
        return

    # 3. Prepare the feature set (X)
    X_features = df_data.copy()

    print(f"Features used for prediction: {list(X_features.columns)}")

    # 4. Perform the prediction
    try:
        scaler = model_artifacts['scaler_top12'] if is_simplified else model_artifacts['scaler']
        X_scaled = scaler.transform(X_features)
        model = model_artifacts['ensemble_model_top12'] if is_simplified else model_artifacts['ensemble_model']
        probabilities = model.predict_proba(X_scaled)
        max_probabilities = []
        for x in probabilities:
            max_probabilities.append(f"{max(x) * 100:.2f}%")
        predictions = model.predict(X_scaled)

        print(f"✅ Prediction successful. Generated {len(predictions)} predictions.")

        # 5. Combine results and display
        df_results = df_data.copy()
        df_results[CONFIDENCE_LEVEl] = np.array(max_probabilities)
        df_results[PREDICTED_LABEL] = predictions

        return df_results

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        print(
            "\nHint: Common errors include mismatching column names/order or expecting a 1D array instead of a 2D array.")

def predict_exoplanet_or_not(file_id: str, file_location: str, is_simplified: bool, model_artifacts):
    results = load_model_and_predict(file_location, is_simplified, model_artifacts)

    label_mapping = {
        0: 'False Positive',
        1: 'Confirmed Planet'
    }

    results[PREDICTED_LABEL] = results[PREDICTED_LABEL].map(label_mapping)
    results.to_csv(OUTPUTS + '/' + file_id)

    return {
        'confidence': results[CONFIDENCE_LEVEl],
        'predicted': results[PREDICTED_LABEL]
    }