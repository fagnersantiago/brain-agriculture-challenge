import 'reflect-metadata';
import express from 'express';
import "../../container"
import { router } from '../routes';

const app = express();
app.use(express.json());

app.use(router);

export { app };
