const { Configuration, OpenAIApi } = require("openai");

let prompt = process.argv[2];
console.log(prompt);

const configuration = new Configuration({
  apiKey: shared.getApiKey(),
});
const openai = new OpenAIApi(configuration);
(async() => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log(response.data);
})()