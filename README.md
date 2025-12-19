Document Detection Frontend

    A modern frontend application built with React, Vite, and shadcn/ui for uploading documents (PAN/Aadhaar), previewing them, and displaying OCR-based validation results from a FastAPI backend.


Tech Stack

    React 18

    Vite

    shadcn/ui

    Tailwind CSS

    Fetch API


Project Structure

    document_detection_frontend/

        │

        ├── index.html

        ├── src/

        │   ├── main.jsx

        │   ├── App.jsx

        │   ├── index.css

        │   └── components/ui/ 

        ├── public/

        ├── package.json

        ├── vite.config.js

        └── README.md


How to Run the Frontend

    1. Install Dependencies
        
        npm install


    2. Start Development Server

        npm run dev


    The app will run at:
        http://localhost:5173


Backend Dependency

    This frontend expects a FastAPI backend running at:

    http://localhost:8000/uploadfile/


Backend Responsibilities

    Accept image upload

    Perform OCR

    Validate PAN / Aadhaar

    Return structured JSON response

Application Features

Document Upload

    Accepts image files (PNG, JPG)

    Client-side preview before upload

    Extracted text shown in readable format

    Document type detection (PAN / Aadhaar / Unknown)

    Validation Results

        Document Number

        Name presence

        Date of Birth presence

    Final Status

        PASS → All validations satisfied

        FAIL → One or more validations failed


Sample API Response Expected
    
    {
    
        "document_type": "PAN",
    
        "extracted_text": ["Income Tax 
        
        Department", "ABCDE1234F"],
        
        "validations": {
        
            "doc_num_valid": true,
        
            "name_present": true,
        
            "dob_present": true,
        
            "gender_present": null
        
        },

    "final_status": "PASS"

    }