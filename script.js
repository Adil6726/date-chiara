let currentStep = 1;
let selectedFood = "";
let noMoveCount = 0; 

const fixedPositions = [
    { left: '-80px', top: '-40px' },
    { left: '80px', top: '40px' },
    { left: '-90px', top: '30px' },
    { left: '90px', top: '-40px' },
    { left: '0px', top: '-60px' },
    { left: '-40px', top: '50px' }
];

function createBackgroundHearts() {
    const bg = document.getElementById('hearts-bg');
    if (!bg) return; 
    for (let i = 0; i < 20; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart-drop');
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = Math.random() * 10 + 15 + 'px';
        bg.appendChild(heart);
    }
}
window.onload = createBackgroundHearts;

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
}

function moveNoButton() {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    
    if (noMoveCount < 6) {
        btnNo.style.position = 'absolute';
        btnNo.style.left = fixedPositions[noMoveCount].left;
        btnNo.style.top = fixedPositions[noMoveCount].top;
        
        let yesSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
        btnYes.style.fontSize = (yesSize + 4) + 'px';
        btnYes.style.padding = (parseFloat(window.getComputedStyle(btnYes).paddingTop) + 2) + 'px ' + (parseFloat(window.getComputedStyle(btnYes).paddingLeft) + 4) + 'px';
        
        let noSize = parseFloat(window.getComputedStyle(btnNo).fontSize);
        if (noSize > 6) { 
            btnNo.style.fontSize = (noSize - 2) + 'px'; 
        }
        noMoveCount++; 
    } else {
        btnNo.style.display = 'none';
    }
}

function checkTimeSelection() {
    const val = document.getElementById('time-picker').value;
    const msg = document.getElementById('special-msg');
    if (!msg) return;
    msg.innerHTML = "";
    
    if (val.startsWith("18h00")) {
        alert("J'ai dit : là tu te fous de ma gueule ! 😡 Choisis une vraie heure !");
        document.getElementById('time-picker').value = "";
    } else if (val.startsWith("12h00")) {
        msg.innerHTML = "C'est pour ça qu'on est ensemble ❤️ et qu'on va fêter nos 1 ans ! ✨";
    }
}

function saveDateTime() {
    if (!document.getElementById('date-picker').value || !document.getElementById('time-picker').value) {
        alert("Sélectionne une date et une heure s'il te plaît ! 🌹");
        return;
    }
    nextStep(4);
}

function selectFood(el, val) {
    document.querySelectorAll('.food-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('custom-text').innerText = "Tu choisis ✨";
    selectedFood = val;
    
    document.getElementById('compliment-msg').innerText = "T'as de bons goûts bb... ❤️";
}

function askCustomFood(el) {
    document.querySelectorAll('.food-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    let userChoice = prompt("Qu'est-ce qui te ferait plaisir de manger pour nos 1 ans ? ✨");
    if (userChoice && userChoice.trim() !== "") {
        document.getElementById('custom-text').innerText = userChoice;
        selectedFood = userChoice; 
        document.getElementById('compliment-msg').innerText = "T'as de bons goûts bb... ❤️";
    } else {
        document.getElementById('custom-text').innerText = "Tu choisis";
        selectedFood = "ce que tu auras choisi";
        document.getElementById('compliment-msg').innerText = ""; 
    }
}

function finalStep() {
    if (!selectedFood) { alert("Dis-moi ce qu'on mange ! 🍛"); return; }
    
    const dateInput = document.getElementById('date-picker').value;
    const time = document.getElementById('time-picker').value;
    const dateObj = new Date(dateInput);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    const cleanTime = time.split(' ')[0]; 
    
    let conjunction = "autour d'";
    if (selectedFood === "des Sushis") {
        conjunction = "autour de ";
    }
    
    document.getElementById('summary-text').innerHTML = `On se capte le <strong>${formattedDate} à ${cleanTime}</strong> pour fêter ça ${conjunction}<strong>${selectedFood}</strong> ! ✨`;
    nextStep(5);
}