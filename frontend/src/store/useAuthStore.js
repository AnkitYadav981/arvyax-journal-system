import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({

  isSubmittingJournal: false,
  isGettingInsight: false,
  isGettingJournals: false,
  isAnalyzingJournal: false,
  analysisResult: null,

  journals: [],
  insights: null,

  createJournal: async (journal) => {
    try {
      set({
        isSubmittingJournal: true
      });

      const res = await axiosInstance.post("/", journal);
      console.log("createJournal");
      console.log(res);

      set({
        journals: [res.data],
        isSubmittingJournal: false
      });

    } catch (error) {
      console.error(error);
    }
  },

  fetchJournals: async () => {
    try {
      set({
        isGettingJournals: true
      });

      console.log("fetchJournals");
      const res = await axiosInstance.get("/123");

      set({
        journals: res.data.journals || res.data,
        isGettingJournals: false
      });

    } catch (error) {
      console.error(error);
    }
  },

  analyzeJournal: async (id) => {
    try {
      set({
        isAnalyzingJournal: true
      });

      const res = await axiosInstance.post(
        `/analyze/${id}`
      );
      console.log("analyzeJournal");
      console.log(res);
      set({
        isAnalyzingJournal: false,
        analysisResult: res.data.journal,
        journals:[]
      });

    } catch (error) {
      console.error(error);
    }
  },

  fetchInsights: async () => {
    try {
      set({
        isGettingInsight: true
      });

      const res = await axiosInstance.get(
        "/insights/123"
      );
      console.log("fetchInsights");
      console.log(res);

      set({
        insights: res.data,
        isGettingInsight: false,
      });

    } catch (error) {
      console.error(error);
    }
  },
  clearEverything: () => {
    set({
      analysisResult: null,
      journals: [],
      insights: null
    });
  }

}));

