class Url {
    static PAYMENT_URL = process.env.PAYMENT_URL;
    static NEW_PASSWORD_URL = process.env.RESET_PASSWORD_URL;

    static USER_ROUTE = '/users';
    static USER_LOGIN_ROUTE = '/login';
    static USER_SHOP_ROUTE = '/shops';
    static USER_RESET_PASSWORD = '/reset-password';

    static EVENT_DISCOUNT_ROUTE = '/discounts';

    static SHOP_EVENT_ROUTE = '/events';
    static SHOP_CONFIGURATION_ROUTE = '/configurations';

    static ORDER_ROUTE = '/orders';

    static TICKET_ROUTE = '/tickets';
    static TICKET_PDF_ROUTE = '/tickets-pdf';
    static TICKET_EMAIL_ROUTE = '/tickets-mailing';
}

module.exports = Url;