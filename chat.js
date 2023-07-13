const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
var shared = require('./shared.js');

const configuration = new Configuration({
  apiKey: shared.getApiKey(),
});

let close = false;
let messages = [];
messages.push({"role": "system", "content": "You are a helpful assistant."});

(async() => {
  function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
  }

  while(!close) {
    const prompt = await askQuestion("Ready for new message: ");
    messages.push({"role": "user", "content": prompt});
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    messages.push(completion.data.choices[0].message);
    console.log(completion.data.choices[0].message.content);
    console.log('-------------------------------------------');
  }
})()
