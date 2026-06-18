export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!sheetUrl) {
        return res.status(500).json({ error: 'GOOGLE_SHEET_WEBHOOK_URL is not configured' });
    }

    try {
        const response = await fetch(sheetUrl + '?action=read_sessions');
        const text = await response.text();
        const data = JSON.parse(text);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
