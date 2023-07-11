const { Configuration, OpenAIApi } = require("openai");

let input = process.argv[2];
console.log(input);

const configuration = new Configuration({
  apiKey: shared.getApiKey(),
});
const openai = new OpenAIApi(configuration);
(async() => {
  const response = await openai.createModeration({
    input: input,
  });
  console.log(response.data);
})()