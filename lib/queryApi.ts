import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {

    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          { role: "user", content: prompt },
        ],
        model: model,
      });

    return completion.choices[0].message.content;
}

export default query;
