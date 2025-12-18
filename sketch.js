let menuWidth = 80;
let menuTargetWidth;

let opening = false;
let animProgress = 0;

let currentSection = null;

// Tener que hacr doble click
let clickCount = 0;
let lastClickTime = 0;
let selectedOption = null;

// Menu
let buttons = [
  { label: "Galería", y: 90 },
  { label: "Información", y: 130 },
  { label: "Otro", y: 170 }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  menuTargetWidth = width;
  textFont('Arial');
}

function draw() {
  background(235);

  // El menu crece al pasar el tiempo
  menuWidth += frameCount * 0.00001;
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

  // animación excesiva
  if (opening) {
    animProgress += 4;

    fill(60, 60, 100);
    rect(0, 0, animProgress, height);

    if (animProgress >= width) {
      opening = false;
      currentSection = selectedOption;
    }
  }

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
    text("GALERÍA", width / 2, height / 2);
  } else if (seccion === "Información") {
    text("INFORMACIÓN", width / 2, height / 2);
  } else if (seccion === "Otro") {
    text("OTRA SECCIÓN", width / 2, height / 2);
  }

  textAlign(LEFT);
}
