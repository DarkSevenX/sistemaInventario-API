import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';
import { auth } from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/auth', auth.routes());
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/provider', providerRoutes);
app.use('/venta', ventaRoutes)

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}/`);
});
