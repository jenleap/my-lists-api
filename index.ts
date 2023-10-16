import app from './src/server';

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});