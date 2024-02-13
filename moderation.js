const { OpenAI } = require("openai");
var shared = require('./shared.js');

let input = process.argv[2];
console.log(input);

process.env.OPENAI_API_KEY = shared.getApiKey();
const openai = new OpenAI();
(async() => {
  const moderation = await openai.moderations.create({ input: input });
  console.log(moderation);
})()