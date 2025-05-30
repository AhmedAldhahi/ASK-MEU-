async function loadLayout() {
  const response = await fetch("layout.html");
  const layoutHTML = await response.text();

  const template = document.createElement("div");
  template.innerHTML = layoutHTML;

  const header = template.querySelector("header");
  const footer = template.querySelector("footer");

  document.body.prepend(header);
  document.body.appendChild(footer);
}

// Optional logout stub
function logout() {
  alert("Logging out... (implement Supabase signOut here)");
}

loadLayout();
