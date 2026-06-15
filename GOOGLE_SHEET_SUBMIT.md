# Google Sheet Submission Setup

This repository now supports submitting exercise analysis results to Google Sheets via a webhook.

## What was added
- `api/submit.js` — a Vercel serverless endpoint that forwards result payloads to a configured Google webhook.
- `index.html` — adds a `Submit to Google Sheet` button after each analysis result.
- Add these text strings to the existing UI translations for Chinese/English/French.

## How to enable it
1. Create a Google Sheet and open Apps Script:
   - In Google Sheets, select `Extensions > Apps Script`.
2. Add this script:
```javascript
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = [
    new Date().toISOString(),
    body.sport_id || '',
    body.sport_name || '',
    body.overall || '',
    body.rehab_value || '',
    body.symmetry_score || '',
    body.gait_score || '',
    body.gait_angle || '',
    body.right_hand_pct || '',
    body.bimanual_score || '',
    body.balance_score || '',
    body.next_focus || '',
    body.notes || '',
    JSON.stringify(body.raw_result || {})
  ];
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ success: true }));
}
```
3. Deploy as a web app:
   - Click `Deploy > New deployment`.
   - Choose `Web app`.
   - Set `Who has access` to `Anyone` or `Anyone with link`.
   - Deploy and copy the web app URL.
4. Set the webhook URL in Vercel:
   - Add environment variable `GOOGLE_SHEET_WEBHOOK_URL` with the web app URL.
   - Re-deploy the app.

## Result flow
- After analysis finishes, a `Submit to Google Sheet` button appears in the result panel.
- Clicking it sends the score data to `/api/submit`, which forwards it to your Google Sheet webhook.

## Notes
- If you want automatic submission after every analysis, set `AUTO_SUBMIT_TO_SHEET = true` in `index.html`.
- The backend only forwards data; the actual sheet insertion happens in the Apps Script webhook.
