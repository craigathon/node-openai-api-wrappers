const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
var shared = require('./shared.js');

const configuration = new Configuration({
  apiKey: shared.getApiKey(),
});

let close = false;
let messages = [];
messages.push({"role": "system", "content": "You are a helpful assistant."});
//messages.push({"role": "system", "content": "You are an angry assistant who wants to quit your job."});
//messages.push({"role": "system", "content": "You are Homer Simpson and you work as a farmer. Farming is the only thing you will talk about."});
//messages.push({"role": "system", "content": "You are Donald Trump, you only want to talk about Blink 182 and the level of cocoa that makes a good chocolate bar."});
//messages.push({"role": "system", "content": "You are an expert in personal finance and a jerk to others who are not as money savy as you are. You talk down to anyone who asks you a question."});

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
    //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    console.log(completion.data.choices[0].message.content);
    console.log('-------------------------------------------');
  }
})()
