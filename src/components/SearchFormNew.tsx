import React, { useState } from 'react';

const FileUploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [detector, setDetector] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleDetectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetector(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file || !detector) {
            alert('Please provide both a file and a detector name.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
                const base64File = reader.result.split(',')[1]; // Extract Base64 part
                const formData = new URLSearchParams();
                formData.append('file', base64File);
                formData.append('detector', detector);

                try {
                    const response = await fetch('https://14bf-138-202-169-253.ngrok-free.app/process-base64/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData,
                    });

                    if (response.ok) {
                        const jsonResponse = await response.json();
                        alert('Success! Response: ' + JSON.stringify(jsonResponse, null, 2));
                    } else {
                        const errorResponse = await response.json();
                        console.error(errorResponse);
                        alert(
                            'Failed to process the file: ' + (errorResponse.error || 'Unknown error')
                        );
                    }
                } catch (error) {
                    console.error(error);
                    alert('An error occurred while processing the file.');
                }
            }
        };

        reader.readAsDataURL(file); // Convert file to Base64
    };

    return (
        <div>
            <h1>Upload File and Enter Detector Name</h1>
            <form id="uploadForm" onSubmit={handleSubmit}>
                <label htmlFor="file">Choose file:</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".tif"
                    required
                    onChange={handleFileChange}
                />
                <br />
                <br />
                <label htmlFor="detector">Detector name:</label>
                <input
                    type="text"
                    id="detector"
                    name="detector"
                    required
                    value={detector}
                    onChange={handleDetectorChange}
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FileUploadForm;
