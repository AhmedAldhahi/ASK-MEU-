// Save a favorite Q&A
function saveFavorite(question, answer) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push({ question, answer });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

// Display saved favorites
function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let container = document.getElementById("favorites-container");
    container.innerHTML = "";

    favorites.forEach((item, index) => {
        container.innerHTML += `
            <div class="fav-item">
                <p><strong>Q:</strong> ${item.question}</p>
                <p><strong>A:</strong> ${item.answer}</p>
                <button onclick="removeFavorite(${index})">Remove</button>
            </div>
        `;
    });
}

// Remove a favorite Q&A
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

// Load favorites when page opens
window.onload = displayFavorites;
