export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://<your-frontend-domain>'); // e.g., Vercel or GitHub Pages URL
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        try {
            const { trackingNumber, name, email } = req.body;

            // Validate input
            if (!trackingNumber  !name  !email) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Format message for Telegram
            const telegramMessage = New Tracking Request:\nTracking Number: ${trackingNumber}\nName: ${name}\nEmail: ${email};
            const botToken = process.env.BOT_TOKEN;
            const chatId = process.env.CHAT_ID;
            const telegramApi = https://api.telegram.org/bot${botToken}/sendMessage;

            // Send to Telegram
            const telegramResponse = await fetch(telegramApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage
                })
            });

            if (telegramResponse.ok) {
                return res.status(200).json({ message: 'Tracking request submitted' });
            } else {
                throw new Error('Failed to send to Telegram');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}