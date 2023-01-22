module.exports = () => {
    const emailConfig = {
        apiKey:  'key-' + process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN_NAME
    };
    return emailConfig;
};