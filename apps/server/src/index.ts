import express, { Express } from 'express';
import dotenv from 'dotenv';
import { PORT } from './lib/constants';
import cors from 'cors';
import router from './router';


dotenv.config();

const app: Express = express();
const port = PORT ?? 8080;

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
