export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!sheetUrl) {
        return res.status(500).json({ error: 'GOOGLE_SHEET_WEBHOOK_URL is not configured' });
    }

    try {
        const response = await fetch(sheetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const text = await response.text();
        if (!response.ok) {
            return res.status(response.status).json({ error: text || 'Google Sheet webhook error' });
        }

        return res.status(200).json({ success: true, data: text });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
