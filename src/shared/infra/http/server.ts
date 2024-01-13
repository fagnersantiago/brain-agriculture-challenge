import 'reflect-metadata';
import '../../container';
import { app } from './app';

const Port = 3333;

app.listen(`${Port}`, () => {
  return console.log(`Server started on port ${Port}! 🏆`);
});

export default app;
