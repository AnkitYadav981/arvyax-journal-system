
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

function HomePage() {
    const {
        createJournal,
        fetchJournals,
        isAnalyzingJournal,
        analysisResult,
        isSubmittingJournal,
        isGettingInsight,
        isGettingJournals,
        analyzeJournal,
        clearEverything,
        fetchInsights,
        insights,
        journals
      } = useAuthStore();
    const [newJournal, setNewJournal] = useState({
        userId: "123",
        ambience: "forest",
        text: "",
      });
    const handlesubmit = async (e) => {
        await clearEverything();
        e.preventDefault();
        if (!newJournal.text.trim()) {
          return toast.error("Journal text is required");
        }
        console.log(newJournal)
        await createJournal(newJournal);
        setNewJournal({ ...newJournal, text: "" });
        // fetchJournals();

    }
    const seeAllJournals = async () => {
        clearEverything();
        await fetchJournals();
    }
    const handleGetInsights = async () => {
        clearEverything();
        await fetchInsights();
    }
    const handleAnalyzeJournal = async (e) => {
        await analyzeJournal(e);
    }

  return (
    <div>
        <br />
        <form onSubmit={handlesubmit}>
        <div>
        <textarea
            placeholder="Write your journal..."
            value={newJournal.text}
            onChange={(e) =>
              setNewJournal({ ...newJournal, text: e.target.value })
            }
        />
      </div>
      <br />

        <div>

        
      <select
        value={newJournal.ambience}
        onChange={(e) =>
          setNewJournal({ ...newJournal, ambience: e.target.value })
        }
      >
        <option value="forest">Forest</option>
        <option value="ocean">Ocean</option>
        <option value="mountain">Mountain</option>
      </select>
      </div>
      <br />

      <div>
      <button type="submit" disabled={isSubmittingJournal} >{isSubmittingJournal ? "Submitting..." : "Submit Journal"}</button>
      </div>
      </form>
      <br />

        <div>

      <button disabled={isGettingInsight} onClick={handleGetInsights} >{isGettingInsight ? "Getting Insights..." : "Get Insights"}</button>
        </div>
        <br />

        <div>
            <button disabled={isGettingJournals} onClick={seeAllJournals}>See All Journals</button>
        </div>

      {insights && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem", borderRadius: "8px" }}>
          <h3>Insights</h3>
          <p><strong>Total Entries: </strong>{insights.totalEntries}</p>
          <p><strong>Top Emotion:</strong> {insights.topEmotion}</p>
          <p><strong>Most Used Ambience:</strong> {insights.mostUsedAmbience}</p>
          <p><strong>Recent Keywords:</strong> {insights.recentKeywords.join(", ")}</p>
          
        </div>
      )}
      {analysisResult && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem", borderRadius: "8px" }}>
            <h3>Analysis Result</h3>
            <p><strong>Text:</strong> {analysisResult.text}</p>
            <p><strong>Emotion:</strong> {analysisResult.emotion}</p>
            <p><strong>Summary:</strong> {analysisResult.summary}</p>
            <p><strong>Keywords:</strong> {analysisResult.keywords.join(", ")}</p>
            <button onClick={() => useAuthStore.setState({ analysisResult: null })}>Clear Analysis</button>
        </div>
        )}

      {Array.isArray(journals) && journals.map((j) => (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem", borderRadius: "8px" }} key={j._id}>
          <p><strong>Text:</strong>{j.text}</p>
          {j.emotion && <p><strong>Emotion:</strong> {j.emotion}</p>}
          <p><strong>Ambience: </strong> {j.ambience}</p>

          <button disabled={isAnalyzingJournal} onClick={() => handleAnalyzeJournal(j._id)}>
            Analyze
          </button>
        </div>
      ))}
      

    </div>
  );
}

export default HomePage;