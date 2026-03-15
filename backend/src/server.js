import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import journalRoutes from "./routes/journal.route.js";
import path from "path";


dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));

app.use("/api/journal",journalRoutes)

if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname , "../frontend/dist")))

  app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}



app.listen(PORT,()=>{
    connectDB();
    console.log(`server is live on port http://localhost:${PORT}`)
});