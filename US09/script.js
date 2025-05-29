async function getAIResponse() {
    const question = document.getElementById("questionInput").value;
    const answerElement = document.getElementById("answer");

    if (!question) {
        answerElement.textContent = "Please enter a question.";
        return;
    }

    // Replace with your API endpoint (e.g., OpenAI API)
    const apiKey = "your_api_key"; // Replace with actual key
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003", // Choose AI model
            prompt: question,
            max_tokens: 150
        })
    });

    const data = await response.json();
    answerElement.textContent = data.choices[0].text.trim();
}
