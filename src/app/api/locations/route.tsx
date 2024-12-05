import { OpenAIApi, Configuration } from 'openai-edge';

interface Location {
  title: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: string;
  description: string;
}

interface ApiResponse {
  locations: Location[];
  query_type: string;
  region: string;
}

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    // Use GPT to generate plausible locations based on the query
    const gptResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a location data generator. For any given query, generate at least 5 plausible locations with realistic coordinates. 
          
          For locations in cities/regions, ensure coordinates fall within their actual boundaries.
          
          Return the response as valid JSON with this exact structure:
          {
            "locations": [
              {
                "title": "string",
                "coordinates": {
                  "lat": number (between -90 and 90),
                  "lng": number (between -180 and 180)
                },
                "type": "string",
                "description": "string"
              }
            ],
            "query_type": "string",
            "region": "string"
          }

          Make coordinates realistic and geographically accurate for the region mentioned.
          If no region is specified, choose a logical region and note it in the response.`
        },
        {
          role: 'user',
          content: `Generate at least 5 realistic locations with coordinates for the following query: ${query}`
        }
      ],
      temperature: 0.7,
    });

    const gptData = await gptResponse.json();
    const generatedData = JSON.parse(gptData.choices[0].message.content);

    // Validate and clean the response
    const response: ApiResponse = {
      locations: generatedData.locations.map((loc: Location) => ({
        ...loc,
        coordinates: {
          lat: parseFloat(loc.coordinates.lat.toFixed(4)),
          lng: parseFloat(loc.coordinates.lng.toFixed(4))
        }
      })),
      query_type: generatedData.query_type,
      region: generatedData.region
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate locations',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}