const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://localhost:1111',
    'https://haskurit.vercel.app',
    'https://www.haskurit.co.il',
    'https://haskurit.co.il'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log('>> CORS origin received:', origin); // ✅ שורה זו תדפיס בלוגים את ה-origin

            callback(null, true)
        } else {
            console.log('>> Blocked by CORS:', origin); // 🔴 זה יראה מה נחסם

            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 