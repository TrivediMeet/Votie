import express from "express";
import "dotenv/config";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import { sendMail } from "./config/mail.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set view
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, { name: "John Doe" });
    await sendMail("fayece4297@owube.com", "Testing SMTP", html);
    return res.json({ msg: 'Email Success' });
});
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
