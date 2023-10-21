import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { authenticateUser } from './utils/auth';
import { createNewUser, requestResetPassword, resetPassword, signIn } from './controllers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200);
    res.json({ message: "Test route works."});
    return res;
});

app.use('/api', authenticateUser, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);
app.post('/request-reset', requestResetPassword);
app.post('/reset', resetPassword);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Oops!", error: err });
});

export default app;