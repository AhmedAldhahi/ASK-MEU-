async function askAI() {
    let question = document.getElementById("userQuestion").value.trim();
    let responseDiv = document.getElementById("response");
    let errorDiv = document.getElementById("errorMessage");

    // Simulating AI response failure
    if (!question) {
        errorDiv.innerHTML = "⚠️ Please enter a question before submitting.";
        responseDiv.innerHTML = "";
        return;
    }

    try {
        // Simulated AI call (replace with actual AI API request)
        let aiResponse = await fakeAIRequest(question);

        if (aiResponse.error) {
            throw new Error(aiResponse.error);
        }

        responseDiv.innerHTML = `<strong>AI Response:</strong> ${aiResponse.answer}`;
        errorDiv.innerHTML = "";
    } catch (error) {
        errorDiv.innerHTML = `❌ Error: ${error.message}`;
        responseDiv.innerHTML = "";
    }
}

// Simulated AI request function
function fakeAIRequest(question) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (question.toLowerCase().includes("blocked")) {
                resolve({ error: "⚠️ This question is restricted and cannot be answered." });
            } else if (Math.random() < 0.3) {
                resolve({ error: "❌ AI failed to retrieve an answer. Please try again later." });
            } else {
                resolve({ answer: "This is a sample AI-generated response." });
            }
        }, 1000);
    });
}
