import express from "express";
import morgan from "morgan";

import ownerRouter from "./source/external/web/express/ownerRouter";
import truckerRouter from "./source/external/web/express/truckerRouter";

const PORT = 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use("/owner", ownerRouter);
app.use("/trucker", truckerRouter);

app.listen(PORT, () => {
  console.log("server on");
});
