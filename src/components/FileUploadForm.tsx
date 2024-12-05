import React, { useRef, useState } from 'react';

const FileUploadForm: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [detector, setDetector] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        console.log('Form submitted')
        event.preventDefault();

        const fileInput = fileInputRef.current;
        const file = fileInput?.files ? fileInput.files[0] : null;

        if (!file || !detector) {
            alert('Missing fields: please input both an image and a detector name');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async function () {
            const base64File = reader.result?.toString().split(',')[1]; // Extract Base64 part
            if (!base64File) {
                alert('Failed to read the file.');
                return;
            }

            const formData = new URLSearchParams();
            formData.append('file', base64File);
            formData.append('detector', detector);

            try {
                console.log('Sending POST request to API...');
                const response = await fetch('https://14bf-138-202-169-253.ngrok-free.app/process-base64/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });

                console.log('Response received:', response.status);
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'result.tif';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                } else {
                    const errorResponse = await response.json();
                    console.error('Error response:', errorResponse);
                    alert('Failed to process the file: ' + (errorResponse.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('An error occurred while processing the file.');
            }
        };

        reader.readAsDataURL(file); // Convert file to Base64
    };

    return (
        <div>
            <h1 className = "text-center logo-text">Upload Image and Enter Detector Name</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file">Insert image:</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".tif"
                    ref={fileInputRef}
                    required
                />
                <br />
                <br />
                <label htmlFor="detector">Detector name:</label>
                <input
                    type="text"
                    id="detector"
                    name="detector"
                    value={detector}
                    onChange={(e) => setDetector(e.target.value)}
                    required
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FileUploadForm;

