export default {
    port: 3001,
    dbUrl: process.env.PG_DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
}