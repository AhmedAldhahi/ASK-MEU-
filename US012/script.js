async function getAIResponse() {
    const question = document.getElementById("questionInput").value;
    const answerElement = document.getElementById("answer");

    if (!question) {
        showToast("Please enter a question.");
        return;
    }

    // Simulated AI response (Replace with actual API request)
    setTimeout(() => {
        const response = "AI Answer: " + question.split("").reverse().join(""); // Mock response
        answerElement.textContent = response;
        showToast("Question submitted successfully!");
    }, 1000);
}

// Toast Notification Function
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
