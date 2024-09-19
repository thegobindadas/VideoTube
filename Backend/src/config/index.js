

const config = {
    PORT: Number(process.env.PORT) || 8000,
    MONGODB_URI: String(process.env.MONGODB_URI),
    CORS_ORIGIN: String(process.env.CORS_ORIGIN),
}



export default config