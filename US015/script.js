function rephraseAnswer() {
    let message = " Answer Tabel";
    let inputText = document.getElementById("inputText").value;

    if (!inputText.trim()) {
        document.getElementById("output").innerHTML = "Please enter text to rephrase.";
        return;
    }

    // Simulated AI rephrasing logic (Replace with an actual AI API call)
    let rephrasedText = inputText
        .replace(/\bimportant\b/g, "crucial")
        .replace(/\bhelpful\b/g, "beneficial")
        .replace(/\bgood\b/g, "excellent")
        .replace(/\bclear\b/g, "concise")
        .replace(/\bsmart\b/g, "intelligent");

    document.getElementById("output").innerHTML = `Rephrased Answer: <br> ${rephrasedText}`;
}
