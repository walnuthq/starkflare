// Import NextRequest from 'next/server'
import type { NextRequest } from 'next/server';

// Define your edge function
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Attempt to fetch data from an external API
    const response = await fetch('http://127.0.0.1:3000/rpc/get_top_contracts_by_steps');
    if (!response.ok) {
      // If the response is not ok, throw an error
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();

    // Construct and return the response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Catch any errors during the fetch operation or processing
    console.error('Error fetching data:', error);

    // Determine the appropriate response based on the error
    let statusCode = 500; // Default to Internal Server Error
    let responseBody;

    if (error instanceof Error && error.message.includes('HTTP')) {
      // If the error is due to an HTTP issue, extract the status code
      statusCode = parseInt(error.message.split(': ')[1], 10);
      responseBody = { message: 'An error occurred while fetching data.' };
    } else {
      // For other errors, provide a generic message
      responseBody = { message: 'An unexpected error occurred.' };
    }

    // Return an error response
    return new Response(JSON.stringify(responseBody), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
