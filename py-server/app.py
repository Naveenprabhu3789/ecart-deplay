from flask import Flask, request, jsonify
from audioRecorder import AudioRecorder
from speechTranslator import translate_audio
import google.generativeai as genai
from google.generativeai import GenerativeModel
from PIL import Image
import os
import logging
import socket
from collections import Counter
import re

app = Flask(__name__)

from flask_cors import CORS
CORS(app)

recorder = AudioRecorder()

# Configure Gemini AI once for the entire application
genai.configure(api_key="AIzaSyBxqos-ABArpNayKu-h5r06BqZdDwUR0F4")  # Replace with your actual API key

logging.basicConfig(level=logging.DEBUG)

@app.route('/start_recording', methods=['GET'])
def start_recording():
    recorder.start_recording()
    return "Recording started."

@app.route('/stop_recording', methods=['GET'])
def stop_recording():
    recorder.stop_recording()
    translated_text = translate_audio('record.wav')
    return translated_text

@app.route('/process_image', methods=['POST'])
def process_image():
    logging.debug("Received request to /process_image")

    # Ensure a file is sent with the request
    if 'image' not in request.files:
        logging.error("No file part in the request")
        return "No file part", 400

    file = request.files['image']

    if file.filename == '':
        logging.error("No selected file")
        return "No selected file", 400

    # Save the uploaded image temporarily
    temp_image_path = 'temp_uploaded_image.jpeg'
    file.save(temp_image_path)
    logging.debug("File saved successfully")

    # Open and process the image
    try:
        img = Image.open(temp_image_path)
        logging.debug("Successfully opened image")
    except Exception as e:
        logging.error(f"Error opening image: {str(e)}")
        return f"Error opening image: {str(e)}", 400

    # Initialize the generative model
    model = GenerativeModel(model_name="gemini-1.5-flash")
    try:
        response = model.generate_content(["What is in this image?", img])
        logging.debug("Successfully generated content from image")
    except Exception as e:
        logging.error(f"Error generating content: {str(e)}")
        return f"Error generating content: {str(e)}", 500

    # Extract description and primary keyword
    description = response.text
    words = re.findall(r'\b\w+\b', description.lower())
    common_words = Counter(words).most_common()
    keyword = next((word for word, count in common_words if word not in ["the", "a", "on", "with", "is", "some"]), None)
    
    return jsonify({"primary_keyword": keyword or "No primary keyword detected"})

if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"Error starting the Flask app: {e}")
