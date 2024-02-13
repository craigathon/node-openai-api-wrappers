const { OpenAI } = require("openai");
const readline = require('readline');
var shared = require('./shared.js');
var model = 'dall-e-3';

process.env.OPENAI_API_KEY = shared.getApiKey();
const openai = new OpenAI();
console.log(model);

let prompt = process.argv[2];
console.log(prompt);

(async() => {
  const response = await openai.images.generate({
    model: model,
    prompt: prompt,
    size: "1024x1024",
  });
  console.log(response.data);
})()