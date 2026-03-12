const display = document.getElementById('result');

// Ajouter un chiffre ou un opérateur à l'écran
function appendToDisplay(input) {
    display.value += input;
}

// Effacer tout l'écran
function clearDisplay() {
    display.value = "";
}

// Supprimer le dernier caractère tapé
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculer le résultat
function calculate() {
    try {
        // eval() analyse la chaîne de caractères et effectue l'opération mathématique
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Erreur";
        setTimeout(clearDisplay, 1500);
    }
}
async function askAI() {
    const query = document.getElementById('ai-input').value;
    const responseBox = document.getElementById('ai-response');
    
    if (!query) return;

    responseBox.innerHTML = "Analyse en cours...";

    try {
        // Logique simplifiée pour simuler une IA de résolution
        // Ici on traite les équations de type x^2...
        if (query.includes("x^2") || query.includes("x")) {
            // Nettoyage de la chaîne pour math.js
            let equation = query.replace("résoudre", "").replace("=", "==").trim();
            
            // Simulation de résolution (Math.js peut résoudre symboliquement)
            const node = math.parse(query.split('=')[0]);
            const simplified = math.simplify(node).toString();
            
            responseBox.innerHTML = `
                <strong>Analyse :</strong> Équation détectée.<br>
                <strong>Simplification :</strong> ${simplified}<br>
                <strong>Conseil :</strong> Pour une équation du second degré, calculez le discriminant Δ = b² - 4ac.
            `;
        } else {
            // Calcul classique complexe
            const result = math.evaluate(query);
            responseBox.innerHTML = `<strong>Résultat :</strong> ${result}`;
        }
    } catch (error) {
        responseBox.innerHTML = "Désolé, je ne peux résoudre que des expressions mathématiques claires.";
    }
}
let myChart = null; // Stocke le graphique pour pouvoir le mettre à jour

// 1. Remplit l'écran avec la formule choisie
function applyFormula() {
    const menu = document.getElementById('formula-menu');
    const display = document.getElementById('result'); // Vérifie que l'id est bien 'result'
    if(menu.value) display.value = menu.value;
}

// 2. L'IA qui trace le graphique de la fonction affichée
function drawGraph() {
    const display = document.getElementById('result');
    const ctx = document.getElementById('myChart').getContext('2d');
    const xValues = [], yValues = [];

    // Calcule les points de la courbe
    for (let x = -10; x <= 10; x += 0.5) {
        xValues.push(x);
        try {
            yValues.push(math.evaluate(display.value, {x: x}));
        } catch (e) { yValues.push(null); }
    }

    if (myChart) myChart.destroy(); // Efface l'ancien graphique avant d'en créer un nouveau

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'f(x) = ' + display.value,
                data: yValues,
                borderColor: '#007aff',
                tension: 0.3
            }]
        }
    });
}
function askAIWithFormula(formula) {
    if (!formula) return;

    const box = document.getElementById('ai-assistant-box');
    const textZone = document.getElementById('ai-result-text');
    const graphBtn = document.getElementById('btn-graph-ai');
    
    box.style.display = "block"; // Affiche la zone IA
    
    try {
        // L'IA calcule le résultat symbolique
        let result = math.evaluate(formula);
        
        // Formatage pédagogique du résultat
        textZone.innerHTML = `L'expression <strong>${formula}</strong> donne : <br><br> 
                              <span style="color:#d32f2f; font-size:1.2rem;">${result}</span>`;
        
        // Si la formule contient 'x', on propose de tracer le graphique
        if (formula.includes('x')) {
            graphBtn.style.display = "inline-block";
            // On stocke la formule pour le bouton graphique
            graphBtn.onclick = function() {
                document.getElementById('result').value = formula; // Copie vers écran
                drawGraph(); // Appelle ta fonction de traçage existante
            };
        } else {
            graphBtn.style.display = "none";
        }
        
    } catch (error) {
        textZone.innerHTML = "L'IA analyse cette formule... Pour obtenir un résultat précis, assurez-vous de définir les variables (a, b, c).";
    }
}