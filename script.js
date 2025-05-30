
document.getElementById('checkStatus').addEventListener('click', () => {
  const statusMsg = document.getElementById('statusMsg');
  statusMsg.textContent = '✅ ASK-MEU is initialized and ready for development!';
});
const DAILY_LIMIT = 4; // Optional fallback

async function fetchRemainingLimit() {
  const user = await getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("question_limits")
    .select("used_today, limit")
    .eq("user_id", user.id)
    .eq("date", today)
    .single();

  const used = data?.used_today ?? 0;
  const limit = data?.limit ?? DAILY_LIMIT;
  const remaining = Math.max(0, limit - used);

  document.getElementById("limitNotice").textContent =
    `You have ${remaining} question${remaining !== 1 ? "s" : ""} left today.`;
}

async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
}

// Call on page load
fetchRemainingLimit();


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
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authForm = document.getElementById('authForm');
const welcome = document.getElementById('welcome');
const userEmail = document.getElementById('userEmail');
const authMsg = document.getElementById('authMsg');

// 🟢 Sign in user
async function signIn() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    authMsg.textContent = error.message;
  } else {
    authMsg.textContent = '';
    showWelcome(data.user);
  }
}

// 🔴 Sign out user
async function signOut() {
  await supabase.auth.signOut();
  showLogin();
}

// 🔁 Check if user is already signed in
async function checkSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.user) {
    showWelcome(session.user);
  } else {
    showLogin();
  }
}

function showWelcome(user) {
  authForm.classList.add('hidden');
  welcome.classList.remove('hidden');
  userEmail.textContent = user.email;
}

function showLogin() {
  authForm.classList.remove('hidden');
  welcome.classList.add('hidden');
}
// Simulated data — replace with real API response or Supabase fetch
const userQuestion = "How can I improve my time management skills?";
const followUpAnswers = [
  "Start by breaking large tasks into smaller steps using the Pomodoro technique.",
  "Use a planner app to organize tasks by priority and deadlines.",
  "Review your progress weekly and adjust your schedule to avoid burnout.",
];

// Display question
document.getElementById("userQuestion").textContent = userQuestion;

// Display all follow-up answers
const answersList = document.getElementById("answersList");
followUpAnswers.forEach((answer, index) => {
  const div = document.createElement("div");
  div.className = "answer-item";
  div.innerHTML = `<strong>Answer ${index + 1}:</strong><p>${answer}</p>`;
  answersList.appendChild(div);
});

function goBack() {
  // Simulate going back to the Ask screen
  window.location.href = "ask.html";
}
const promptBox = document.getElementById("customPrompt");
const saveMsg = document.getElementById("saveMsg");

async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

async function loadPromptSetting() {
  const user = await getCurrentUser();
  if (!user) return;

  const { data, error } = await supabase
    .from("prompt_settings")
    .select("custom_prompt")
    .eq("user_id", user.id)
    .single();

  if (data) {
    promptBox.value = data.custom_prompt;
  }
}

async function savePrompt() {
  const user = await getCurrentUser();
  if (!user) return;

  const prompt = promptBox.value.trim();

  const { error } = await supabase
    .from("prompt_settings")
    .upsert({
      user_id: user.id,
      custom_prompt: prompt,
    });

  if (!error) {
    saveMsg.textContent = "✅ Saved successfully!";
  } else {
    saveMsg.textContent = "❌ Failed to save prompt.";
    console.error(error);
  }
}

loadPromptSetting();

checkSession();

