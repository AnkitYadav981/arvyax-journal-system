import axios from "axios";
import journalModel from "../models/journal.model.js";
import { getFromCache, saveToCache } from "../utils/analysisCache.js";


export const createJournal = async(req,res)=>{
    try {
        const {userId, ambience, text} = req.body;
        if (!userId || !text || !ambience) {
            return res.status(400).json({ message: "userId, text, and ambience are required" });
        }
        const newJournal = new journalModel({
            userId,
            ambience, 
            text,
        })
        await newJournal.save();
        res.status(201).json(newJournal);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    
    }

}

export const getUserJournals = async (req,res) => {
    const {userId} = req.params;
    try {
        const journals = await journalModel.find({userId});
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const analyzeJournal = async (req, res) => {
    const { journalId } = req.params;
    try {
        const journal = await journalModel.findById(journalId);
        if (!journal) {
            return res.status(404).json({ message: "Journal not found" });
        }
        const cachedResult = getFromCache(journal.text);

        if (cachedResult) {
            journal.emotion = cachedResult.emotion;
            journal.keywords = cachedResult.keywords;
            journal.summary = cachedResult.summary;

            await journal.save();

            return res.status(200).json({
                source: "cache",
                journal
            });
        }
        const response = await axios.post(process.env.AI_SERVICE_URL, {
            text: journal.text
        });
        const { emotion, keywords, summary } = response.data;

        const result = { emotion, keywords, summary };
        saveToCache(journal.text, result);

        journal.emotion = emotion;
        journal.keywords = keywords;
        journal.summary = summary;
        await journal.save();
        res.status(200).json({
                source: "ai",
                journal
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getInsights = async (req, res) => {
    try {
        const { userId } = req.params;
        const journals = await journalModel.find({ userId });
        if (!journals.length) {
            return res.status(404).json({ message: "No journals found" });
        }
        const totalEntries = journals.length;
        const emotionCount = {};
        const ambienceCount = {};
        let keywordList = [];

        journals.forEach((journal) => {

            if (journal.emotion) {
                emotionCount[journal.emotion] =
                (emotionCount[journal.emotion] || 0) + 1;
            }

            if (journal.ambience) {
                ambienceCount[journal.ambience] =
                (ambienceCount[journal.ambience] || 0) + 1;
            }

            if (journal.keywords) {
                keywordList = keywordList.concat(journal.keywords);
            }

        });
        const topEmotion = Object.keys(emotionCount).reduce((a, b) =>
            emotionCount[a] > emotionCount[b] ? a : b
        );

        const mostUsedAmbience = Object.keys(ambienceCount).reduce((a, b) =>
            ambienceCount[a] > ambienceCount[b] ? a : b
        );

        const recentKeywords = [...new Set(keywordList)].slice(-5);

        res.status(200).json({
            totalEntries,
            topEmotion,
            mostUsedAmbience,
            recentKeywords
        });


        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}