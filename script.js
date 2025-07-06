// Modul Switching
function openModule(name) {
  closeAllModules();
  const moduleId = `${name}-module`;
  document.getElementById(moduleId).classList.remove('hidden');

  if (name === 'matematika') {
    soalBaru();
  } else if (name === 'menulis') {
    soalTulisanBaru();
  }
}

function closeModule() {
  closeAllModules();
}

function closeAllModules() {
  document.querySelectorAll('.module').forEach(m => m.classList.add('hidden'));
}

// ALFABET
function playSound(letter) {
  const msg = new SpeechSynthesisUtterance(letter);
  msg.lang = 'id-ID';
  msg.rate = 0.8;
  window.speechSynthesis.speak(msg);
}

// MATEMATIKA
let angka1, angka2, jawabanBenar;

function soalBaru() {
  angka1 = Math.floor(Math.random() * 10);
  angka2 = Math.floor(Math.random() * 10);
  jawabanBenar = angka1 + angka2;

  document.getElementById('soal').innerText = `Berapakah ${angka1} + ${angka2} ?`;
  document.getElementById('jawaban').value = '';
  document.getElementById('feedback').innerText = '';
}

function cekJawaban() {
  const input = parseInt(document.getElementById('jawaban').value);
  const feedback = document.getElementById('feedback');
  if (input === jawabanBenar) {
    feedback.innerText = 'Benar! 🎉';
    feedback.style.color = 'green';
  } else {
    feedback.innerText = `Salah, coba lagi! Jawaban benar: ${jawabanBenar}`;
    feedback.style.color = 'red';
  }
}

// MENULIS
let hurufAngkaTarget = '';

function soalTulisanBaru() {
  const hurufAngka = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  hurufAngkaTarget = hurufAngka[Math.floor(Math.random() * hurufAngka.length)];
  document.getElementById('target-menulis').innerText = hurufAngkaTarget;
  document.getElementById('feedback-tulisan').innerText = '';
  hapusKanvas();

  // 🔊 Tambahan: ucapkan huruf/angka
  const msg = new SpeechSynthesisUtterance(hurufAngkaTarget);
  msg.lang = 'id-ID';
  msg.rate = 0.8; // Lebih pelan untuk anak-anak
  window.speechSynthesis.speak(msg);
}


function cekTulisan() {
  const pesan = [
    "Bagus! Sudah mirip! 🎉",
    "Wah keren, kamu hebat!",
    "Coba sedikit lebih rapi ya 😊",
    "Ayo dicoba lagi, pasti bisa!",
  ];
  const acak = Math.floor(Math.random() * pesan.length);
  document.getElementById('feedback-tulisan').innerText = pesan[acak];
}

// Menulis di Kanvas
const canvas = document.getElementById('kanvas');
const ctx = canvas.getContext ? canvas.getContext('2d') : null;

let menggambar = false;

if (ctx && canvas) {
  // Mouse Events
  canvas.addEventListener('mousedown', () => menggambar = true);
  canvas.addEventListener('mouseup', () => menggambar = false);
  canvas.addEventListener('mouseleave', () => menggambar = false);
  canvas.addEventListener('mousemove', (e) => {
    if (!menggambar) return;
    gambarTitik(e.clientX, e.clientY);
  });

  // Touch Events
  canvas.addEventListener('touchstart', (e) => {
    menggambar = true;
    const touch = e.touches[0];
    gambarTitik(touch.clientX, touch.clientY);
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!menggambar) return;
    const touch = e.touches[0];
    gambarTitik(touch.clientX, touch.clientY);
    e.preventDefault(); // agar layar tidak geser
  });

  canvas.addEventListener('touchend', () => menggambar = false);
}

function gambarTitik(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
}


function hapusKanvas() {
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}
