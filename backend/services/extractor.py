import os
import json
from google import genai
from models.schemas import ExtractedReport
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "dummy"))

def extract_incident_data(text: str) -> ExtractedReport:
    """Extracts structured data from a raw text report using Gemini."""
    prompt = f"""
    Extract disaster incident information from the following text. 
    The text might be in English, Hindi, Kannada, or a mix.
    Respond with a JSON object containing the following keys:
    - location_text (string): The description of the location.
    - victim_count (integer): Number of victims mentioned, 0 if none.
    - water_level (string): e.g., 'low', 'medium', 'high', 'waist-deep', 'unknown'.
    - medical_emergency (boolean): true if medical help is needed.
    - severity (integer): 1 (lowest) to 5 (highest) based on the description.
    - confidence (float): 0.0 to 1.0 based on how clear the text is.
    
    Text: "{text}"
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={
                'response_mime_type': 'application/json'
            }
        )
        data = json.loads(response.text)
        return ExtractedReport(
            location_text=data.get("location_text", "unknown"),
            victim_count=data.get("victim_count", 0),
            water_level=data.get("water_level", "unknown"),
            medical_emergency=data.get("medical_emergency", False),
            severity=data.get("severity", 1),
            confidence=data.get("confidence", 0.5)
        )
    except Exception as e:
        print(f"Error during extraction: {e}")
        return ExtractedReport(location_text="unknown")
