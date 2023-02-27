import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  const compsedPrompt = `Write a witty yet professional job description for the position of ${req.body.title} at a fast-growing startup based in ${req.body.location}. The job description should have clear "About the Team", "About the Role", "Expectations", "Good to have", "Benefits", "Salary Ranges", and "EOO" sections. The following are the set of skills we are looking for:\n${req.body.responsibilities}\n Job Description:\n`
  console.log(`API: ${compsedPrompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${compsedPrompt}`,
    temperature: 0.7,
    max_tokens: 2500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
