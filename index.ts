import app from './src/server';
import * as dotenv from 'dotenv';
import config from './src/config';

dotenv.config();

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});