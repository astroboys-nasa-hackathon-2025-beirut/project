import uvicorn
from fastapi import FastAPI
from routers import metrics, plots, predictions
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(metrics.router)
app.include_router(plots.router)
app.include_router(predictions.router)

# --- CORS Configuration ---
# Allow all origins for development (VULNERABLE in production!)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)
# --- END CORS Configuration ---

@app.get("/")
def read_root():
    return "Root Endpoint"

if __name__ == '__main__':
    uvicorn.run("main:app")