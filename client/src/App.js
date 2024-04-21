import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4001/api/v1/dalle', {
      
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setAnswer(data.text.trim());
      setError(null); // Clear previous errors
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <div className="container">
        <h1>Give Any Instruction</h1>
        <form className="our-form" onSubmit={handleSubmit}>
          <input
            className="prompt-field"
            type="text"
            onChange={handleChange}
            placeholder="Enter your prompt"
          />
          <button
            className="prompt-button"
            type="submit"
            disabled={isLoading}
          >
            Go!
          </button>
        </form>

        {isLoading && <div className="loading-spinner">Loading...</div>}

        {error && <div className="error-message">{error}</div>}

        <div className="answer-area">{answer}</div>
      </div>
    </>
  );
}

export default App;
