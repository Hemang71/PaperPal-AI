from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import fitz
from app.ai_service import (
    generate_summary,
    ask_question,
    generate_quiz,
    generate_notes
)
import uuid
from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str

papers = {}

app = FastAPI(title="PaperPal AI")

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins = [
        "http://localhost:5173",
        "https://paper-pal-ai-psi.vercel.app/",
         ],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def root():
    return {
        "status" : "running",
        "message" : "PaperPal Backend is running!"
    }
    
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = fitz.open(file_path)

    text = ""

    for page in doc:
        text += page.get_text()
        
    paper_id = str(uuid.uuid4())

    papers[paper_id] = {
        "filename": file.filename,
        "text": text
    }

    return {
        "paper_id": paper_id,
        "filename": file.filename,
        "pages": len(doc),
        "message": "Upload Successful"
    }

@app.get("/summary/{paper_id}")
def summary(paper_id: str):

    if paper_id not in papers:
        return {
            "message": "Paper not found."
        }

    summary = generate_summary(
        papers[paper_id]["text"]
    )

    return {
        "summary": summary
    }

@app.post("/chat/{paper_id}")
def chat(paper_id: str, request: ChatRequest):

    if paper_id not in papers:
        return {
            "message": "Paper not found."
        }

    answer = ask_question(
        papers[paper_id]["text"],
        request.question
    )

    return {
        "answer": answer
    }

@app.get("/quiz/{paper_id}")
def quiz(paper_id: str):

    if paper_id not in papers:
        return {
            "message": "Paper not found."
        }

    quiz = generate_quiz(
        papers[paper_id]["text"]
    )

    return {
        "quiz": quiz
    }
    
@app.get("/notes/{paper_id}")
def notes(paper_id: str):

    if paper_id not in papers:
        return {
            "message": "Paper not found."
        }

    notes = generate_notes(
        papers[paper_id]["text"]
    )

    return {
        "notes": notes
    }