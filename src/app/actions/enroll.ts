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
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY;

    if (!email || !key) {
      console.error('CRITICAL: Google credentials missing from environment');
      return { success: false, error: 'Server configuration error.' };
    }

    const serviceAccountAuth = new JWT({
      email: email,
      key: key.replace(/^"|"$/g, '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheetIdRaw = process.env.GOOGLE_SHEET_ID;
    if (!sheetIdRaw) {
      throw new Error('GOOGLE_SHEET_ID is not defined');
    }

    // Handle full URL or just the ID
    const sheetId = sheetIdRaw.includes('/d/') 
      ? sheetIdRaw.split('/d/')[1].split('/')[0] 
      : sheetIdRaw;

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    
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
    // TEMPORARY DEBUG LOG - Check your terminal/Vercel logs for this!
    console.error('DETAILED ENROLLMENT ERROR:', error);
    
    return { success: false, error: 'Failed to reserve seat. Please try again later.' };
  }
}
