import express from 'express';
import cors from 'cors';
import ConnectToDB from './db.js';

//Routes
import userSignupRoute from './routes/usersignup.route.js'
import verifyOtpRoute from './routes/verifyotp.route.js';
import resendOtpRoute from './routes/resendotp.route.js';
import userLoginRoute from './routes/userlogin.route.js';

import dotenv from 'dotenv';
dotenv.config();

await ConnectToDB();


const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [process.env.VITE_PORT || "http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))


app.use('/api/user', userSignupRoute);
app.use('/api/user', verifyOtpRoute);
app.use('/api/user', resendOtpRoute);
app.use('/api/user', userLoginRoute);



app.get('/', (req, res) => {
    res.send(`${PORT} is Live`)
})

app.listen(PORT, () => {
    console.log(`🚀 App listening on port ${PORT}`)
})