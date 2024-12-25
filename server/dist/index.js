import express from "express";
import "dotenv/config";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import Routes from "./routes/index.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
// Routes
app.use(Routes);
// Define route
app.get("/", async (req, res) => {
    try {
        const html = await ejs.renderFile(path.join(__dirname, "views", "emails", "welcome.ejs"), { name: "Root" });
        // await sendEMail(" fayece4297@owube.com","Testing",html);
        await emailQueue.add(emailQueueName, { to: "fayece4297@owube.com", subject: "Testinggg", body: html });
        return res.json({ msg: "Email Sent" });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Email Failed", error });
    }
});
//Queues
import "./jobs/EmailJobs.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJobs.js";
// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));