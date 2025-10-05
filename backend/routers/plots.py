from fastapi import APIRouter

router = APIRouter(
    prefix="/plots",
    tags=["Plots"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
def read_root():
    return "Plots Endpoint"