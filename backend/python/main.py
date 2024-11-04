# Create main.py with the following content
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FrequencyRequest(BaseModel):
    frequency: float

class FrequencyResponse(BaseModel):
    aa: float
    aq: float
    qq: float

def calculate_hw(p: float):
    if not 0 <= p <= 1:
        raise HTTPException(status_code=400, detail="Frequency must be between 0 and 1")
    
    q = 1 - p
    return FrequencyResponse(
        aa=p * p,
        aq=2 * p * q,
        qq=q * q
    )

@app.post("/calculate")
async def calculate(request: FrequencyRequest):
    return calculate_hw(request.frequency)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)