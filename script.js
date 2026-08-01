const emailForm = document.getElementById('emailForm');
const clockContainer = document.getElementById('clockContainer');
const analogContainer = document.getElementById('analogContainer');
const clockEl = document.getElementById('clock');
const analogCanvas = document.getElementById('analogClock');
const ctx = analogCanvas.getContext('2d');

emailForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (emailForm.checkValidity()) {
        clockContainer.style.display = 'block';
        analogContainer.style.display = 'block';
        updateClocks();
    }
});

function updateClocks() {
    updateDigitalClock();
    drawAnalogClock();
}

function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = hours + ':' + minutes + ':' + seconds;
}

function drawAnalogClock() {
    const now = new Date();
    const radius = analogCanvas.width / 2;
    ctx.clearRect(0, 0, analogCanvas.width, analogCanvas.height);

    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.arc(0, 0, radius - 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    for (let num = 1; num <= 12; num++) {
        const angle = (num * Math.PI) / 6;
        ctx.rotate(angle);
        ctx.translate(0, -radius + 25);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(num.toString(), 0, 0);
        ctx.translate(0, radius - 25);
        ctx.rotate(-angle);
    }

    drawHand((now.getHours() % 12) * Math.PI / 6 + now.getMinutes() * Math.PI / 360, radius * 0.5, 6);
    drawHand(now.getMinutes() * Math.PI / 30 + now.getSeconds() * Math.PI / 1800, radius * 0.75, 4);
    drawHand(now.getSeconds() * Math.PI / 30, radius * 0.9, 2, '#d00');

    ctx.restore();
}

function drawHand(angle, length, width, color = '#000') {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}

setInterval(function () {
    if (clockContainer.style.display === 'block') {
        updateClocks();
    }
}, 1000);