/**
 * @jest-environment node
 */

import { POST } from '@/app/api/locations/route';
import { OpenAIApi } from 'openai-edge';

jest.mock('openai-edge', () => {
    const originalModule = jest.requireActual('openai-edge');
    return {
        ...originalModule,
        OpenAIApi: jest.fn().mockImplementation(() => ({
            createChatCompletion: jest.fn().mockResolvedValue({
                json: async () => ({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    locations: [
                                        {
                                            title: "Test Location",
                                            coordinates: { lat: 34.05, lng: -118.24 },
                                            type: "Landmark",
                                            description: "A test landmark"
                                        }
                                    ],
                                    query_type: "test-query",
                                    region: "test-region"
                                })
                            }
                        }
                    ]
                })
            })
        })),
    };
});

describe('POST /api/locations (minimal test)', () => {
    beforeAll(() => {
        process.env.OPENAI_API_KEY = 'test-api-key';
    });

    it('should receive a request and return a response', async () => {
        const query = 'Sample query';
        const req = new Request('http://localhost/api/locations', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Call the POST function
        const response = await POST(req);

        // Check that a response is returned
        expect(response).toBeDefined();
        // You can check the status code to ensure success or failure.
        expect(response.status).toBe(200);

        // Optionally check if some response data can be parsed
        const data = await response.json();
        expect(data).toHaveProperty('locations');
    });
});