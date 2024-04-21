const express = require("express");
const OpenAI = require('openai');
const router = express.Router();

// Create an instance of the OpenAI client with the API key from the environment variables
const openai = new OpenAI({
  apiKey:'',
 
});

// Define the API route
router.post("/", async (req, res) => {
    try {
      const { prompt } = req.body;
  
      // Call OpenAI's completion endpoint to get the response
      const response = await openai.chat.completions.create({
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
        messages: [
          { role: 'system', content: 'You are a friendly AI assistant.' },
          { role: 'user', content: prompt }
        ]
      });
  
      // Extract the response text
      const output = response.data.choices[0].message.content;
  
      // Send the response back to the client
      res.status(200).json({ text: output });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

module.exports = router;

