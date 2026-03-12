let myChart = null;

function append(char) {
    const display = document.getElementById('display');
    if (display.value === "0") display.value = char;
    else display.value += char;
}

function clearScreen() {
    document.getElementById('display').value = '';
    document.getElementById('steps-area').innerHTML = 'Prêt à t\'aider...';
    if (myChart) { myChart.destroy(); myChart = null; }
}

function solve() {
    const input = document.getElementById('display').value;
    const stepsArea = document.getElementById('steps-area');

    try {
        // Nettoyage de l'input pour Math.js
        let expression = input.replace(/=/g, '-(') + ')'; 
        // Si l'utilisateur tape x^2-4=0, on cherche les racines de x^2-4
        
        const node = math.parse(input.split('=')[0]);
        const simplified = math.simplify(node).toString();

        stepsArea.innerHTML = `
            <strong>Analyse :</strong> Expression détectée : ${simplified}<br>
            <strong>Type :</strong> ${detectType(simplified)}<br>
            <strong>Conseil :</strong> Clique sur "Afficher Graphique" pour visualiser les variations et trouver les solutions.
        `;
    } catch (e) {
        stepsArea.innerHTML = "Erreur de syntaxe. Ex: x^2 - 4";
    }
}

function detectType(expr) {
    if (expr.includes('^2')) return "Fonction du second degré (Parabole)";
    if (expr.includes('sin') || expr.includes('cos')) return "Fonction Trigonométrique";
    if (expr.includes('^')) return "Fonction Puissance";
    return "Fonction Linéaire ou autre";
}

function showGraph() {
    const input = document.getElementById('display').value.split('=')[0];
    const ctx = document.getElementById('myChart').getContext('2d');

    try {
        const expr = math.compile(input);
        
        // Génération des points
        const xValues = math.range(-10, 10, 0.2).toArray();
        const yValues = xValues.map(x => {
            try { return expr.evaluate({x: x}); } 
            catch { return null; }
        });

        if (myChart) myChart.destroy();

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: `f(x) = ${input}`,
                    data: yValues,
                    borderColor: '#9b59b6',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { type: 'linear', position: 'center' },
                    y: { position: 'center' }
                }
            }
        });
        document.getElementById('graph-caption').textContent = "Visualisation réussie de la fonction.";
    } catch (e) {
        alert("Impossible de tracer cette fonction. Vérifiez la syntaxe (ex: x^2 + 2*x + 1)");
    }
}