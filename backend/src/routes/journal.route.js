import express  from 'express';
import { analyzeJournal, createJournal, getInsights, getUserJournals } from '../controllers/journal.controller.js';
import { apiLimiter } from '../middleware/rateLimit.js';



const routes = express.Router();

routes.post("/",apiLimiter,createJournal);
routes.get("/:userId",getUserJournals);
routes.post("/analyze/:journalId/",analyzeJournal);
routes.get("/insights/:userId",getInsights);




export default routes;