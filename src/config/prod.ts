export default {
    port: 3001,
    dbUrl: process.env.PG_DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.LISTS_CLIENT,
    mailerKey: process.env.SENDGRID_KEY,
    sender: process.env.SENDGRID_SENDER
}