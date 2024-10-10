import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import Seats from './Routers/Router-Seats.js';
dotenv.config();


const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use('/',Seats);





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`השרת פועל על פורט ${port}`);
});

export default app;
