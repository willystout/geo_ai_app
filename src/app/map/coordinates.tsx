'use client'

export const generateSatelliteImage = (lat: number, lng: number) => {
    // Use environment variable for API key
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=512x512&maptype=satellite&key=${process.env.GOOGLE_MAPS_API_KEY}`
    
    // Create a modal container
    const modalContainer = document.createElement('div')
    modalContainer.id = 'satellite-image-modal'
    modalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `

    // Create image element
    const image = document.createElement('img')
    image.src = imageUrl
    image.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        object-fit: contain;
        margin-bottom: 20px;
    `

    // Create button container
    const buttonContainer = document.createElement('div')
    buttonContainer.style.cssText = `
        display: flex;
        gap: 20px;
    `

    // Create back to map button
    const backButton = document.createElement('button')
    backButton.textContent = 'Back to Map'
    backButton.style.cssText = `
        padding: 10px 20px;
        background-color: #3B82F6;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `
    backButton.addEventListener('click', () => {
        document.body.removeChild(modalContainer)
    })

    // Create download button
    const downloadButton = document.createElement('button')
    downloadButton.textContent = 'Download Image'
    downloadButton.style.cssText = `
        padding: 10px 20px;
        background-color: #10B981;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `
    downloadButton.addEventListener('click', () => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a link element
                const link = document.createElement('a')
                
                // Create a blob URL
                const blobUrl = URL.createObjectURL(blob)
                
                // Set link attributes
                link.href = blobUrl
                link.download = `satellite_image_${lat}_${lng}.png`
                
                // Append to body, click, and remove
                document.body.appendChild(link)
                link.click()
                
                // Clean up
                document.body.removeChild(link)
                URL.revokeObjectURL(blobUrl)
            })
            .catch(error => {
                console.error('Download failed:', error)
                alert('Failed to download image')
            })
    })

    // Append elements
    buttonContainer.appendChild(backButton)
    buttonContainer.appendChild(downloadButton)
    modalContainer.appendChild(image)
    modalContainer.appendChild(buttonContainer)
    document.body.appendChild(modalContainer)

    // Add click outside to close
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            document.body.removeChild(modalContainer)
        }
    })
}