const Url = require('../../constants/Url')

exports.sendEmail = (recipient, token) => {
    const mailgun = require("mailgun-js");
    const DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
    const data = {
        from: 'Garage Team <garage@mean.io>',
        to: recipient,
        subject: 'Confirmation Email',
        html: `
            <p> Hello ${recipient} ! </p>
            </br>
            La Team Garage MEAN vous souhaite la bienvenue
            </br>
            <p>Cordialement,</p>
            <p>L'équipe</p>
        `
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}