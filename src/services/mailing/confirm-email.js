const Url = require('../../constants/Url')
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
const secretEmailToken = process.env.SECRET_MAIL_TOKEN;

const sendEmail = async (recipient, token) => {

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

const sendConfirmationEmail = async (recipient, userId) => {
    const data = {
        from: 'Garage Team Mean Stack Joharisoa Rotsy <garageMean@mean.io>',
        to: recipient,
        subject: 'Account Activation Email',
        template: 'emai-validation',
        'h:X-Mailgun-Variables': JSON.stringify({
            recipient: recipient,
            userId: userId,
            secretToken: secretEmailToken
          })
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}

module.exports = {
    sendEmail,
    sendConfirmationEmail
};