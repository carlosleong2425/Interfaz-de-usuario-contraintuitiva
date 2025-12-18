let menuWidth = 80;
let menuTargetWidth;

let opening = false;
let animProgress = 0;

let currentSection = null;

// --- Girar la manija ---
let ultimoMovimiento = 0;
let anguloAnterior = 0;
let toleranciaTiempo = 1500; // ms sin girar → error
let mostrarError = false;

// --- Doble click ---
let clickCount = 0;
let lastClickTime = 0;
let selectedOption = null;

// --- Menú ---
let buttons = [
  { label: "Galería", y: 90 },
  { label: "Información", y: 130 },
  { label: "Otro", y: 170 }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  menuTargetWidth = width;
  textFont('Arial');
  ultimoMovimiento = millis();
}

function draw() {

  // ---------- ERROR ----------
  if (mostrarError) {
    background(180, 0, 0);
    fill(255);
    textAlign(CENTER);
    textSize(28);
    text("ERROR\nDebe girar para permanecer", width / 2, height / 2);
    textAlign(LEFT);
    return;
  }

  background(235);

  // ---------- MENÚ CRECE ----------
  menuWidth += frameCount * 0.008;
  menuWidth = constrain(menuWidth, 80, menuTargetWidth);

  fill(20);
  rect(0, 0, menuWidth, height);

  fill(255);
  textSize(18);
  text("MENÚ", 20, 40);

  textSize(14);
  buttons.forEach(b => {
    text(b.label, 20, b.y);
  });

  // ---------- ANIMACIÓN EXCESIVA ----------
  if (opening) {
    animProgress += 4;

    fill(60, 60, 100);
    rect(0, 0, animProgress, height);

    if (animProgress >= width) {
      opening = false;
      currentSection = selectedOption;
    }
  }

  // ---------- CONTENIDO ----------
  if (currentSection) {
    mostrarContenido(currentSection);
  }
}

// --------------------
function mousePressed() {
  if (mouseX < menuWidth && !opening) {
    buttons.forEach(b => {
      if (mouseY > b.y - 15 && mouseY < b.y + 5) {
        manejarDobleClick(b.label);
      }
    });
  }
}

// --------------------
function manejarDobleClick(option) {
  let ahora = millis();

  if (ahora - lastClickTime < 400) {
    clickCount++;
  } else {
    clickCount = 1;
  }

  lastClickTime = ahora;

  if (clickCount === 2) {
    selectedOption = option;
    iniciarAnimacion();
    clickCount = 0;
  }
}

// --------------------
function iniciarAnimacion() {
  opening = true;
  animProgress = 0;
}

// --------------------
function mostrarContenido(seccion) {
  fill(0);
  textSize(32);
  textAlign(CENTER);

  if (seccion === "Galería") {

    text("GALERÍA", width / 2, height / 2 - 120);

    // MANIJA
    noFill();
    stroke(0);
    strokeWeight(4);
    ellipse(width / 2, height / 2, 120);

    fill(0);
    noStroke();
    textSize(14);
    text("GIRE PARA PERMANECER", width / 2, height / 2 + 90);

    // Detectar giro
    detectarGiro();

    // Si deja de girar → error
    if (millis() - ultimoMovimiento > toleranciaTiempo) {
      activarError();
    }

  } else if (seccion === "Información") {
    text("INFORMACIÓN", width / 2, height / 2);
  } else if (seccion === "Otro") {
    text("OTRA SECCIÓN", width / 2, height / 2);
  }

  textAlign(LEFT);
}

// --------------------
function detectarGiro() {
  let cx = width / 2;
  let cy = height / 2;

  let angulo = atan2(mouseY - cy, mouseX - cx);
  let diferencia = abs(angulo - anguloAnterior);

  if (diferencia > 0.1) {
    ultimoMovimiento = millis();
  }

  anguloAnterior = angulo;
}

// --------------------
function activarError() {
  mostrarError = true;
  setTimeout(reiniciarSistema, 2000);
}

// --------------------
function reiniciarSistema() {
  mostrarError = false;
  menuWidth = 80;
  opening = false;
  animProgress = 0;
  currentSection = null;
  ultimoMovimiento = millis();
}
