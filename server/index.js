import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 5001;
import { connectToMongoDB } from './utils/dbconfig.js';

await connectToMongoDB();

import authRoutes from './routes/auth.js';
import placeRoutes from './routes/places.js';

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/places', placeRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
