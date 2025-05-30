document.getElementById('checkStatus').addEventListener('click', () => {
  const statusMsg = document.getElementById('statusMsg');
  statusMsg.textContent = '✅ ASK-MEU is initialized and ready for development!';
});


const form = document.getElementById("questionForm");
const followUpSection = document.getElementById("followUpSection");
const userQuestionDisplay = document.getElementById("userQuestion");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();

  if (questionText !== "") {
    userQuestionDisplay.textContent = questionText;
    followUpSection.classList.remove("hidden");
    form.classList.add("hidden");
  }
});

function askAnother() {
  document.getElementById("question").value = "";
  followUpSection.classList.add("hidden");
  form.classList.remove("hidden");
}
