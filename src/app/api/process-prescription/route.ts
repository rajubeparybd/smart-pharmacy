import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

interface ExtractedMedicine {
  name: string;
  dosage?: string;
  quantity?: number;
}

interface GeminiResponse {
  medicines: ExtractedMedicine[];
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // Determine mime type
    const mimeType = file.type;

    // Create the prompt
    const prompt = `You are a medical prescription analyzer. Extract all medicine names, dosages, and quantities from this prescription image or PDF.

Return the data in the following JSON format only (no additional text or explanation):
{
  "medicines": [
    {
      "name": "Medicine Name",
      "dosage": "500mg",
      "quantity": 1
    }
  ]
}

Rules:
- Extract ONLY the medicine names mentioned in the prescription
- Include dosage if clearly mentioned (e.g., 500mg, 10mg)
- Include quantity if mentioned, otherwise set to 1
- Use the exact medicine name as written
- Do not include any additional text, explanations, or markdown formatting
- Return only valid JSON`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      },
      prompt
    ]);

    const response = result.response;
    const text = response.text();

    // Parse the JSON response
    let parsedResponse: GeminiResponse;
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = JSON.parse(text);
      }
    } catch {
      console.error('Failed to parse Gemini response:', text);
      return NextResponse.json(
        { error: 'Failed to parse prescription data', details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      medicines: parsedResponse.medicines
    });

  } catch (error) {
    console.error('Error processing prescription:', error);
    return NextResponse.json(
      { error: 'Failed to process prescription', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

