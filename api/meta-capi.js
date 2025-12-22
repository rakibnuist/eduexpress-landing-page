// Meta Conversions API (CAPI) Endpoint
// This serverless function sends conversion events to Meta's server-side API

const crypto = require('crypto');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            eventName,
            eventData,
            userData,
            customData
        } = req.body;

        // Meta Pixel Configuration
        const PIXEL_ID = process.env.META_PIXEL_ID || 'YOUR_PIXEL_ID';
        const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN';
        
        if (PIXEL_ID === 'YOUR_PIXEL_ID' || ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN') {
            console.warn('Meta Pixel ID or Access Token not configured');
            return res.status(200).json({ 
                success: false, 
                message: 'Meta CAPI not configured. Please set environment variables.' 
            });
        }

        // Hash user data for privacy (required by Meta)
        const hashData = (data) => {
            if (!data) return null;
            return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
        };

        // Prepare the event payload
        const eventPayload = {
            data: [{
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_source_url: eventData?.sourceUrl || req.headers.referer,
                action_source: 'website',
                user_data: {
                    // Hash sensitive user data
                    em: userData?.email ? hashData(userData.email) : null,
                    ph: userData?.phone ? hashData(userData.phone) : null,
                    fn: userData?.firstName ? hashData(userData.firstName) : null,
                    ln: userData?.lastName ? hashData(userData.lastName) : null,
                    ct: userData?.city ? hashData(userData.city) : null,
                    st: userData?.state ? hashData(userData.state) : null,
                    zp: userData?.zip ? hashData(userData.zip) : null,
                    country: userData?.country ? hashData(userData.country) : null,
                    // Client data
                    client_ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    client_user_agent: req.headers['user-agent'],
                    fbc: userData?.fbc || null, // Facebook click ID
                    fbp: userData?.fbp || null  // Facebook browser ID
                },
                custom_data: customData || {}
            }]
        };

        // Remove null values
        const cleanPayload = JSON.parse(JSON.stringify(eventPayload, (key, value) => {
            return value === null ? undefined : value;
        }));

        // Send to Meta Conversions API
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanPayload)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error('Meta CAPI Error:', result);
            return res.status(response.status).json({ 
                success: false, 
                error: result 
            });
        }

        console.log('Meta CAPI Success:', result);
        return res.status(200).json({ 
            success: true, 
            result: result 
        });

    } catch (error) {
        console.error('CAPI Handler Error:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}
