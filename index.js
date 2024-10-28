import dokterRoute from "./routes/dokterRoute";
import pasienRoute from "./routes/pasienRoute";
import merawatRoute from "./routes/merawatRoute";
import tagihanRoute from "./routes/tagihanRoute";

const express = require("express");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use("/dokter", dokterRoute);
app.use("/pasien", pasienRoute);
app.use("/merawat", merawatRoute);
app.use("/tagihan", tagihanRoute);

app.listen(3000, () => {
  console.log("opening on http://localhost:3000");
});

export default app;
