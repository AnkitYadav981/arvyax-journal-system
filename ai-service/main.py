from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

# configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")


class JournalInput(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "AI Service Running"}

@app.post("/analyze")
async def analyze_journal(data: JournalInput):

    prompt = f"""
    Analyze the following journal entry.

    Return ONLY valid JSON with this structure:

    {{
      "emotion": "",
      "keywords": [],
      "summary": ""
    }}

    Journal entry:
    {data.text}
    """

    response = model.generate_content(prompt)

    try:
        result = json.loads(response.text)
        return result
    except:
        return {
            "emotion": "unknown",
            "keywords": [],
            "summary": response.text
        }