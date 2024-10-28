import dokterRoute from "./routes/dokterRoute";
import pasienRoute from "./routes/pasienRoute";
import merawatRoute from "./routes/merawatRoute";
import tagihanRoute from "./routes/tagihanRoute";

const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dokter", dokterRoute);
app.use("/pasien", pasienRoute);
app.use("/merawat", merawatRoute);
app.use("/tagihan", tagihanRoute);


app.listen(PORT, () => {
  console.log(`opening on http://localhost:${PORT}`);
});

export default app;
