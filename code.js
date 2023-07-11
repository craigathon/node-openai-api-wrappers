const { Configuration, OpenAIApi } = require("openai");

let prompt = process.argv[2];
console.log(prompt);

const configuration = new Configuration({
  apiKey: shared.getApiKey(),
});
/*
const openai = new OpenAIApi(configuration);
(async() => {
    const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: prompt,
    temperature: 0,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["#", "\"\"\""],
    });
    console.log(response.data)
})()
*/
const openai = new OpenAIApi(configuration);
(async() => {
    const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
    });
    console.log(response.data);
    console.log(response.data.choices[0].text);
})()