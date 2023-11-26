import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {

    const res = await openai.completions.create({
        model,
        prompt,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 100,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
        .then((res) => res.choices[0].text)
        .catch(
            (err) =>
                `ChatGPT was unable to find an answer for that! (Error: ${err.message}`
        )

    return res;
}

export default query;