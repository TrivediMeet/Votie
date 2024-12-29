import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import { sendEMail } from "./config/mail.js";
import Routes from "./routes/index.js";
import fileUpload from "express-fileupload";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Application = express();
const PORT = process.env.PORT || 7000;



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(express.static("public"));



// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


// Routes

app.use(Routes);
// Define route
app.get(
  "/",
  async (req: Request, res: Response) => {
    try {
      const html = await ejs.renderFile(path.join(__dirname, "views", "emails", "welcome.ejs"), { name: "Root" });
      // await sendEMail(" fayece4297@owube.com","Testing",html);
     await emailQueue.add(emailQueueName,{to:"fayece4297@owube.com",subject:"Testinggg",body:html});
     res.json({ msg: "Email Sent" });
      return 
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Email Failed", error });
    }
  }
);

//Queues

import "./jobs/EmailJobs.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJobs.js";
import { appLimiter } from "./config/rate_limit.js";


// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
