function askQuestion() {
  const question = document.getElementById("questionInput").value;
  const response = document.getElementById("response");

  if (!question.trim()) {
    response.textContent = "Please enter a question.";
    return;
  }

  // Simulated AI response (you can connect real AI backend later)
  response.textContent = `You asked: "${question}". We'll get back to you soon!`;
}
