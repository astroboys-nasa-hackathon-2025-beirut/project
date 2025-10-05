from fastapi import APIRouter

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
def read_root():
    return "Metrics Endpoint"