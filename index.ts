import app from './src/server';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});