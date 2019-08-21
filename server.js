import express from 'express';
const app = express();
import routes from './src/routes/router';
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(routes);

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));

export default app;