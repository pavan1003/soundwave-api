import express, { json } from "express";
import cors from "cors";
import contactRouter from "./routes/contactRoutes.js";
const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Soundwave API!");
});

app.use("/api/contact", contactRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
