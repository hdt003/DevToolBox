import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("devtoolbox-backend")

app = FastAPI(
    title="DevToolBox API",
    description="Lightweight FastAPI backend service for DevToolBox.",
    version="1.0.0",
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/api/health", status_code=200)
def health_check():
    return {"status": "ok", "service": "DevToolBox API", "version": "1.0.0"}

@app.post("/api/contact", status_code=200)
def handle_contact(payload: ContactRequest):
    logger.info(f"Received contact submission from {payload.name} ({payload.email})")
    # Clean placeholder endpoint for contact handling without storing secrets
    return {"status": "success", "message": "Thank you for your feedback!"}
