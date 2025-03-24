const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express')
const app = express()
require('dotenv').config()
const port = 3001

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.disable('x-powered-by');

app.post('/ai', async(req, res) => {

    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let text = null;

    try {
        
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

        const imageParts = [
            {
            inlineData: {
                data: req.body.data,
                mimeType: "image/jpeg",
            },
            },
        ];

        const prompt = `You are an expert in waste management and recycling. Analyze this image and provide:
            1. The type of waste (e.g., plastic, paper, glass, metal, organic)
            2. An estimate of the quantity or amount (in kg or liters)
            3. Your confidence level in this assessment (as a percentage)
            
            Respond in JSON format like this:
            {
            "wasteType": "type of waste",
            "quantity": "estimated quantity with unit",
            "confidence": confidence level as a number between 0 and 1
            }`;

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        text = JSON.parse(response.text().replace("```json", "").replace("```", ""));

        JSON.pre
    }

    catch(error) {
        console.error(error)
        return res.send({status: 500, message: "Error while calling Generative AI..."})
    }

    res.send(text)
})

app.get('/sampler', async(req, res) => {

    res.send({
        "welcome": "I was from jenkins!"
    })
})

app.listen(port, () => {
  console.log(`Generative AI app listening on port ${port}`)
})