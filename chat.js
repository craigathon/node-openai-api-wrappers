const { OpenAI } = require("openai");
const readline = require('readline');
var shared = require('./shared.js');
var model = 'gpt-4-0125-preview';

process.env.OPENAI_API_KEY = shared.getApiKey();
const openai = new OpenAI();

let close = false;
let messages = [];
console.log(model);

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
    if (prompt == 'clear') {
      messages = [];
      console.log(messages);
    } else if (prompt == 'apex') {
      messages.push({"role": "system", "content": "You are a helpful Salesforce Expert."});
      messages.push({"role": "system", "content": "You write Salesforce Apex code following best practices."});
      console.log(messages);
    } else {
      messages.push({"role": "user", "content": prompt});
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
      });
      messages.push(completion.choices[0].message);
      console.log(completion);
      console.log(completion.choices);
      console.log(completion.choices[0].message.content);
      console.log('+++++++++++++++++++++++++++++++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++');
      console.log(messages);
      console.log('-------------------------------------------');
      console.log('-------------------------------------------');
      console.log(completion.choices[0].message.content);
      console.log('+++++++++++++++++++++++++++++++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++');
    }
  }
})()
