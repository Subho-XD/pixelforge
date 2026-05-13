'use server'

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function enrollStudent(data: {
  name: string;
  phone: string;
  email: string;
  experienceLevel: string;
  motivation: string;
  timestamp: string;
}) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    if (!process.env.GOOGLE_SHEET_ID) {
      throw new Error('GOOGLE_SHEET_ID is not defined');
    }

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Load document properties and worksheets
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0]; // Uses the first sheet
    
    // Append the row
    await sheet.addRow({
      Name: data.name,
      Phone: data.phone,
      Email: data.email,
      'Experience Level': data.experienceLevel,
      Motivation: data.motivation,
      Timestamp: data.timestamp,
    });

    return { success: true };
  } catch (error) {
    console.error('Spreadsheet Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
