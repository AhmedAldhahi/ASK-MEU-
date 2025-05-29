// Function to switch dashboard sections
function showSection(section) {
    document.getElementById("questions").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById(section).style.display = "block";
}

// Simulate flagged questions
const flaggedQuestions = [
    "What is the meaning of life?",
    "Why is the sky blue?",
    "How do you fix a broken HTML structure?"
];

const questionsList = document.getElementById("questionsList");
flaggedQuestions.forEach(question => {
    const li = document.createElement("li");
    li.textContent = question;
    questionsList.appendChild(li);
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
