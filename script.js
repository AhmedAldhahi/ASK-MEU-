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

checkSession();