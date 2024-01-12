import { app } from "./app";

// import "../../../shared/container";

const Port = 3333;


  app.listen(`${Port}`, () => {
    return console.log(`Server started on port ${Port}! 🏆`);
  });


export default app;
