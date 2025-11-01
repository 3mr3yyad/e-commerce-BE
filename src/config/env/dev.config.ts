export default () => ({
    PORT: process.env.PORT,

    db:{
        URL: process.env.DB_URL,
    },
    jwt:{
        SECRET_KEY: process.env.JWT_SECRET,
    },
    email:{
        ADDRESS: process.env.EMAIL,
        PASSWORD: process.env.EMAIL_PASSWORD,
    }
})
