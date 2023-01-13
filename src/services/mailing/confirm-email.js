const Url = require('../../constants/Url')

exports.sendEmail = (recipient, token) => {
    const mailgun = require("mailgun-js");
    const DOMAIN = 'sandbox40d3c571f9fa4677b620acd6a1cc168d.mailgun.org';
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
    const data = {
        from: 'Garage Team <garage@mean.io>',
        to: recipient,
        subject: 'Confirmation Email',
        html: `
            <p> Bonjour ${recipient} ! </p>
            </br>
            Garage Team vous souhaite la bienvenue
            </br>
            <p>Cordialement,</p>
            <p>L'équipe</p>
        `
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}