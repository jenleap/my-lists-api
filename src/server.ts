import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { authenticateUser } from './utils/auth';
import { createNewUser, signIn } from './controllers/user';

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

export default app;