/**
 * @jest-environment jsdom
 */

import { generateSatelliteImage } from '@/app/map/coordinates';

describe('generateSatelliteImage', () => {
    const originalEnv = { ...process.env };

    beforeAll(() => {
        process.env.GOOGLE_MAPS_API_KEY = 'fake-api-key';

        // Mock URL.createObjectURL and URL.revokeObjectURL
        URL.createObjectURL = jest.fn().mockReturnValue('blob:http://example.com/blobid');
        URL.revokeObjectURL = jest.fn();

        // Mock <a>.click globally
        jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
            console.log('Mocked link click');
        });
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    beforeEach(() => {
        // Clear the document body before each test
        document.body.innerHTML = '';

        // Mock fetch for the download case
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            blob: jest.fn().mockResolvedValue(new Blob(['fake image data'], { type: 'image/png' })),
        } as unknown as Response);
    });

    it('creates a modal with an image and buttons', () => {
        generateSatelliteImage(37.7749, -122.4194);

        const modalContainer = document.getElementById('satellite-image-modal');
        expect(modalContainer).toBeInTheDocument();

        const image = modalContainer?.querySelector('img');
        expect(image).toBeInTheDocument();
        expect(image?.src).toContain('https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194');

        const backButton = Array.from(modalContainer?.querySelectorAll('button') || []).find(btn => btn.textContent === 'Back to Map');
        const downloadButton = Array.from(modalContainer?.querySelectorAll('button') || []).find(btn => btn.textContent === 'Download Image');

        expect(backButton).toBeInTheDocument();
        expect(downloadButton).toBeInTheDocument();
    });

    it('closes the modal when clicking "Back to Map"', () => {
        generateSatelliteImage(37.7749, -122.4194);

        const modalContainer = document.getElementById('satellite-image-modal');
        expect(modalContainer).toBeInTheDocument();

        const backButton = Array.from(modalContainer?.querySelectorAll('button') || []).find(btn => btn.textContent === 'Back to Map');
        expect(backButton).toBeInTheDocument();

        // Click the back button
        backButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(document.getElementById('satellite-image-modal')).not.toBeInTheDocument();
    });

    it('closes the modal when clicking outside the modal content', () => {
        generateSatelliteImage(37.7749, -122.4194);

        const modalContainer = document.getElementById('satellite-image-modal');
        expect(modalContainer).toBeInTheDocument();

        // Click on the modal container itself
        modalContainer?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

        expect(document.getElementById('satellite-image-modal')).not.toBeInTheDocument();
    });
});