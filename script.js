function askQuestion() {
  const question = document.getElementById("questionInput").value;
  const response = document.getElementById("response");

  if (!question.trim()) {
    response.textContent = "Please enter a question.";
    return;
  }

 
  response.textContent = `You asked: "${question}". We'll get back to you soon!`;
}
document.getElementById('downloadBtn').addEventListener('click', () => {
  const answerText = document.getElementById('answer').innerText;
  const format = document.getElementById('exportFormat').value;

  if (!answerText.trim()) {
    alert('No answer to download.');
    return;
  }

  if (format === 'txt') {
    const blob = new Blob([answerText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'AI_Answer.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

 
});
