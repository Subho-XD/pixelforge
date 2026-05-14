import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';
import path from 'path';

async function testConnection() {
  console.log('--- DIAGNOSTIC START ---');
  
  const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
  const env: Record<string, string> = {};
  envContent.split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val) env[key.trim()] = val.join('=').trim().replace(/^"|"$/g, '');
  });

  const email = env['GOOGLE_SERVICE_ACCOUNT_EMAIL'];
  const key = env['GOOGLE_PRIVATE_KEY'];
  const sheetIdRaw = env['GOOGLE_SHEET_ID'];

  console.log('Email:', email);
  console.log('Sheet ID Raw:', sheetIdRaw);
  console.log('Key length:', key?.length || 0);

  if (!email || !key || !sheetIdRaw) {
    console.error('ERROR: Missing environment variables in .env.local');
    return;
  }

  const sheetId = sheetIdRaw.includes('/d/') 
    ? sheetIdRaw.split('/d/')[1].split('/')[0] 
    : sheetIdRaw;

  console.log('Extracted Sheet ID:', sheetId);

  try {
    const serviceAccountAuth = new JWT({
      email: email,
      key: key.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log('SUCCESS: Connected to Sheet:', doc.title);
    
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();
    console.log('Detected Columns:', sheet.headerValues);

    const requiredColumns = ['Name', 'Phone', 'Email', 'Experience Level', 'Motivation', 'Timestamp'];
    const missing = requiredColumns.filter(c => !sheet.headerValues.includes(c));

    if (missing.length > 0) {
      console.error('ERROR: Missing columns in Sheet:', missing);
      console.log('TIP: Ensure your first row has these EXACT column names (Case Sensitive!).');
    } else {
      console.log('SUCCESS: All columns match.');
    }

  } catch (err: any) {
    console.error('DIAGNOSTIC FAILED:');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    if (err.message.includes('invalid_grant')) {
      console.log('TIP: Key format error. Ensure the key in .env.local is exactly as it appears in the JSON (surrounded by quotes).');
    }
    if (err.message.includes('403') || err.message.includes('404')) {
      console.log('TIP: Permission or ID error. Check if the Service Account Email is an Editor on the sheet.');
    }
  }
}

testConnection();
