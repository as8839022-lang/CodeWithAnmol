/* =========================================================
   CODE WITH ANMOL
   Browser Arduino connection using Web Serial API
   ========================================================= */

const ACCESS_PHRASE = "CODE WITH ANMOL";

const projects = [
  {
    title: "Servo Gate + 1 Ultrasonic",
    category: "Gate",
    parts: "Arduino Uno, Servo SG90, HC-SR04",
    description: "Open a small gate when a person or vehicle comes close.",
    code: `#include <Servo.h>

Servo gate;
const int trigPin = 10;
const int echoPin = 11;

long getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long t = pulseIn(echoPin, HIGH, 30000);
  if (t == 0) return -1;
  return t * 0.0343 / 2;
}

void setup() {
  gate.attach(9);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  gate.write(0);
  Serial.begin(9600);
}

void loop() {
  long d = getDistance();
  Serial.println(d);

  if (d > 0 && d < 20) {
    gate.write(90);
    delay(3000);
    gate.write(0);
  }

  delay(100);
}`
  },
  {
    title: "Servo Gate + 2 Ultrasonic",
    category: "Gate",
    parts: "Arduino Uno, Servo, 2× HC-SR04",
    description: "Detect a vehicle from either side and open the gate.",
    code: `#include <Servo.h>

Servo gate;

const int trig1 = 10;
const int echo1 = 11;
const int trig2 = 8;
const int echo2 = 12;

long distanceCM(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long t = pulseIn(echoPin, HIGH, 30000);
  if (t == 0) return -1;
  return t * 0.0343 / 2;
}

void setup() {
  gate.attach(9);

  pinMode(trig1, OUTPUT);
  pinMode(echo1, INPUT);
  pinMode(trig2, OUTPUT);
  pinMode(echo2, INPUT);

  gate.write(0);
  Serial.begin(9600);
}

void loop() {
  long left = distanceCM(trig1, echo1);
  long right = distanceCM(trig2, echo2);

  if ((left > 0 && left < 20) || (right > 0 && right < 20)) {
    gate.write(90);
    Serial.println("GATE OPEN");
    delay(3000);
    gate.write(0);
    Serial.println("GATE CLOSED");
  }

  delay(100);
}`
  },
  {
    title: "Ultrasonic Distance Meter",
    category: "Sensor",
    parts: "Arduino Uno, HC-SR04",
    description: "Show live distance values in the browser serial monitor.",
    code: `const int trigPin = 10;
const int echoPin = 11;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long t = pulseIn(echoPin, HIGH, 30000);
  long d = (t == 0) ? -1 : t * 0.0343 / 2;

  Serial.print("Distance: ");
  Serial.print(d);
  Serial.println(" cm");

  delay(300);
}`
  },
  {
    title: "Automatic Street Light",
    category: "LED",
    parts: "Arduino Uno, LDR, LED, 220Ω resistor",
    description: "Switch an LED on when the environment becomes dark.",
    code: `const int ldrPin = A0;
const int ledPin = 8;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(ldrPin);
  Serial.println(value);

  if (value < 500) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }

  delay(150);
}`
  },
  {
    title: "Rain Detector",
    category: "Sensor",
    parts: "Arduino Uno, raindrop sensor, buzzer",
    description: "Detect rain and send a message through Serial.",
    code: `const int rainPin = A0;
const int buzzerPin = 8;

void setup() {
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(rainPin);

  if (value < 500) {
    digitalWrite(buzzerPin, HIGH);
    Serial.println("RAIN DETECTED");
  } else {
    digitalWrite(buzzerPin, LOW);
    Serial.println("NO RAIN");
  }

  delay(500);
}`
  },
  {
    title: "Touch Sensor LED",
    category: "Sensor",
    parts: "Arduino Uno, TTP223 touch sensor, LED",
    description: "Turn an LED on when the touch sensor is pressed.",
    code: `const int touchPin = 2;
const int ledPin = 8;

void setup() {
  pinMode(touchPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int touched = digitalRead(touchPin);

  digitalWrite(ledPin, touched);

  Serial.println(touched ? "TOUCHED" : "NOT TOUCHED");
  delay(80);
}`
  },
  {
    title: "Traffic Light",
    category: "LED",
    parts: "Arduino Uno, red/yellow/green LEDs",
    description: "A beginner traffic light sequence.",
    code: `const int redPin = 8;
const int yellowPin = 9;
const int greenPin = 10;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  digitalWrite(redPin, HIGH);
  delay(3000);
  digitalWrite(redPin, LOW);

  digitalWrite(yellowPin, HIGH);
  delay(1000);
  digitalWrite(yellowPin, LOW);

  digitalWrite(greenPin, HIGH);
  delay(3000);
  digitalWrite(greenPin, LOW);
}`
  },
  {
    title: "PIR Motion Alarm",
    category: "Security",
    parts: "Arduino Uno, PIR sensor, buzzer",
    description: "Detect motion and sound a simple alarm.",
    code: `const int pirPin = 2;
const int buzzerPin = 8;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(pirPin)) {
    digitalWrite(buzzerPin, HIGH);
    Serial.println("MOTION DETECTED");
  } else {
    digitalWrite(buzzerPin, LOW);
    Serial.println("SAFE");
  }

  delay(150);
}`
  },
  {
    title: "Servo Sweep",
    category: "Motor",
    parts: "Arduino Uno, SG90 servo",
    description: "Move a servo smoothly from 0 to 180 degrees and back.",
    code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  for (int angle = 0; angle <= 180; angle++) {
    myServo.write(angle);
    delay(10);
  }

  for (int angle = 180; angle >= 0; angle--) {
    myServo.write(angle);
    delay(10);
  }
}`
  },
  {
    title: "LED Chaser",
    category: "LED",
    parts: "Arduino Uno, 6 LEDs, 220Ω resistors",
    description: "Create a running LED light effect.",
    code: `const int leds[] = {3, 4, 5, 6, 7, 8};
const int count = 6;

void setup() {
  for (int i = 0; i < count; i++) {
    pinMode(leds[i], OUTPUT);
  }
}

void loop() {
  for (int i = 0; i < count; i++) {
    digitalWrite(leds[i], HIGH);
    delay(120);
    digitalWrite(leds[i], LOW);
  }
}`
  }
];

const extraProjectNames = [
  "Automatic Door","Smart Parking Gate","Servo Barrier","Parking Sensor",
  "Ultrasonic Alarm","Obstacle Detector","Mini Radar","Distance Warning",
  "Water Level Alarm","Gas Sensor Alarm","Smoke Detector","Temperature Monitor",
  "Temperature Fan Control","Light Sensor","Darkness Detector","Touch Doorbell",
  "Rain LED Indicator","Fire Alarm","Flame Detector","IR Object Detector",
  "IR Counter","IR Remote LED","IR Security Alarm","PIR Security Alarm",
  "Automatic Room Light","Automatic Fan","Smart Home Light","Smart Home Fan",
  "LED Dimmer","LED Blinking","Running LEDs","Knight Rider LEDs","14 LED Chaser",
  "15 LED Chaser","RGB LED","RGB Mood Light","RGB Color Mixer",
  "Traffic Light 4 Way","Railway Crossing","Railway Signal","Police Light",
  "Emergency Flasher","Buzzer Alarm","Digital Doorbell","Music Buzzer",
  "Melody Generator","Ultrasonic Buzzer","Servo + Button","Servo + Potentiometer",
  "Servo + Joystick","Servo + Touch Sensor","Servo + IR Sensor","DC Motor Control",
  "DC Motor Speed Control","L298N Motor Control","L298N Robot","2 Motor Robot",
  "4 Motor Robot","Bluetooth Robot","Obstacle Avoiding Robot","Line Following Robot",
  "Mini Car","Smart Car","Remote Car","Robot Arm","Servo Robot Arm",
  "LCD 16x2 Display","LCD Sensor Display","LCD Distance Meter","LCD Temperature Meter",
  "LCD Rain Display","LCD Password Lock","OLED Display","OLED Sensor Monitor",
  "7 Segment Display","Digital Counter","Up Counter","Down Counter","Reaction Timer",
  "Stopwatch","Digital Dice","Electronic Dice","Password Door Lock","Keypad Lock",
  "Keypad Safe","RFID Door Lock","RFID Attendance","RFID Security","Bluetooth Lock",
  "Bluetooth LED Control","Bluetooth Home Automation","Mini Weather Station",
  "Temperature Humidity Monitor","Automatic Plant Watering","Soil Moisture Detector",
  "Plant Watering Alarm","Water Pump Controller","Water Tank Controller",
  "Gas Leakage Alarm","Fire Fighting Robot","Mini Fan Controller","Smart Dustbin",
  "Automatic Dustbin","Touchless Dustbin","Smart Parking System","Parking Slot Counter",
  "People Counter","Visitor Counter","Object Counter","Digital Thermometer",
  "Battery Voltage Monitor","Battery Low Alarm","Voltage Indicator",
  "Potentiometer LED","Joystick Servo","Joystick Robot","Joystick Motor Control",
  "Bluetooth Servo","Bluetooth Car","RF Remote Control","RF LED Control",
  "Laser Security Alarm","Door Open Alarm","Window Security Alarm","Vibration Alarm",
  "Earthquake Detector","Sound Sensor LED","Clap Switch","Clap Light",
  "Microphone LED","Mini Piano","Arduino Piano","Simon Says Game","Memory Game",
  "Reaction Game","LED Game","Random LED","Random Number Generator","Digital Clock",
  "Alarm Clock","Mini Timer","Countdown Timer","Pomodoro Timer","Automatic Curtain",
  "Automatic Fan Regulator","Smart Room","Home Security System","Multi Sensor Alarm",
  "Arduino Dashboard","Servo Lock","Mini Conveyor","IR Line Counter","Parking Barrier",
  "Temperature Warning","Humidity Warning","Water Pump Auto Switch","Smart Locker",
  "Door Bell with LED","Night Lamp","Dual LED Flasher","Triple LED Flasher"
];

const extraProjects = extraProjectNames.map((name, i) => ({
  title: name,
  category: classify(name),
  parts: "Arduino Uno + suitable sensor/module/actuator for this project",
  description: "Beginner project idea. Open this card to see the starter sketch and project category.",
  code:
`// ${name}
// Starter template for CODE WITH ANMOL

void setup() {
  Serial.begin(9600);
  Serial.println("${name}");
}

void loop() {
  // Add your project logic here.
  delay(1000);
}`
}));

const allProjects = [...projects, ...extraProjects];

/* ---------- DOM ---------- */

const introScreen = document.getElementById("introScreen");
const app = document.getElementById("app");
const accessCode = document.getElementById("accessCode");
const accessMessage = document.getElementById("accessMessage");
const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");

const projectModal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

const topStatus = document.getElementById("topStatus");
const connectionState = document.getElementById("connectionState");
const deviceCount = document.getElementById("deviceCount");
const deviceName = document.getElementById("deviceName");
const deviceDetails = document.getElementById("deviceDetails");
const deviceBadge = document.getElementById("deviceBadge");
const serialOutput = document.getElementById("serialOutput");
const baudRate = document.getElementById("baudRate");
const friendlyName = document.getElementById("friendlyName");
const serialInput = document.getElementById("serialInput");
const sendSerialBtn = document.getElementById("sendSerialBtn");
const disconnectBtn = document.getElementById("disconnectBtn");

let port = null;
let reader = null;
let writer = null;
let keepReading = false;

/* ---------- Startup ---------- */

document.getElementById("projectCount").textContent = allProjects.length;

if (!("serial" in navigator)) {
  document.getElementById("dashboardConnectBtn").disabled = true;
  document.getElementById("connectBtn").disabled = true;
  showToast("Web Serial is not supported in this browser. Try Chrome or Edge on desktop.");
}

renderProjects(allProjects);

/* ---------- Intro ---------- */

document.getElementById("enterSiteBtn").addEventListener("click", enterWithCode);

accessCode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") enterWithCode();
});

function enterWithCode() {
  const value = accessCode.value.trim().toUpperCase();

  if (value === ACCESS_PHRASE) {
    introScreen.classList.add("hidden");
    app.classList.remove("hidden");
    accessMessage.textContent = "";
    showToast("Welcome to CODE WITH ANMOL ⚡");
  } else {
    accessMessage.textContent = "Wrong code. Enter CODE WITH ANMOL.";
  }
}

/* ---------- Navigation ---------- */

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    activateSection(button.dataset.section);
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll("[data-go='projects']").forEach(button => {
  button.addEventListener("click", () => activateSection("projects"));
});

function activateSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active-section");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active-section");

  if (id === "projects") {
    renderProjects(allProjects);
  }
}

/* ---------- Projects ---------- */

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();

  const filtered = allProjects.filter(project =>
    project.title.toLowerCase().includes(q) ||
    project.category.toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q)
  );

  renderProjects(filtered);
});

function renderProjects(list) {
  projectGrid.innerHTML = "";

  if (!list.length) {
    projectGrid.innerHTML = `
      <div class="info-card">
        <h3>No project found</h3>
        <p>Try another search word.</p>
      </div>
    `;
    return;
  }

  list.forEach((project, index) => {
    const originalIndex = allProjects.indexOf(project) + 1;

    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-number">PROJECT ${String(originalIndex).padStart(3, "0")}</div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>

      <div class="project-meta">
        <span>${escapeHtml(project.category)}</span>
        <span>Arduino Uno</span>
      </div>

      <button class="primary-btn project-open">Open Code</button>
    `;

    card.querySelector(".project-open").addEventListener("click", () => {
      openProject(project);
    });

    projectGrid.appendChild(card);
  });
}

function openProject(project) {
  modalBody.innerHTML = `
    <div class="tiny-label">${escapeHtml(project.category)}</div>
    <h2>${escapeHtml(project.title)}</h2>
    <p>${escapeHtml(project.description)}</p>

    <div class="info-card" style="margin-top:14px; box-shadow:none;">
      <strong>🧩 Components</strong>
      <p style="margin-top:7px;">${escapeHtml(project.parts)}</p>
    </div>

    <div class="code-block">
      <pre>${escapeHtml(project.code)}</pre>
    </div>

    <div class="modal-actions">
      <button id="copyCodeBtn" class="primary-btn">📋 Copy Code</button>
      <button id="closeModalBtn2" class="secondary-btn">Close</button>
    </div>
  `;

  projectModal.classList.remove("hidden");

  document.getElementById("copyCodeBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(project.code);
      showToast("Arduino code copied.");
    } catch {
      showToast("Copy failed. Select the code manually.");
    }
  });

  document.getElementById("closeModalBtn2").addEventListener("click", closeModal);
}

document.getElementById("closeModalBtn").addEventListener("click", closeModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closeModal();
});

function closeModal() {
  projectModal.classList.add("hidden");
}

/* ---------- Device connection ---------- */

document.getElementById("dashboardConnectBtn").addEventListener("click", () => {
  activateSection("device");
  connectArduino();
});

document.getElementById("connectBtn").addEventListener("click", connectArduino);
disconnectBtn.addEventListener("click", disconnectArduino);

document.getElementById("sendSerialBtn").addEventListener("click", sendSerial);

document.getElementById("clearSerialBtn").addEventListener("click", () => {
  serialOutput.textContent = "";
});

document.getElementById("saveNameBtn").addEventListener("click", saveFriendlyName);

async function connectArduino() {
  if (!("serial" in navigator)) {
    showToast("Your browser does not support Web Serial.");
    return;
  }

  try {
    if (port) {
      await disconnectArduino();
    }

    /* The browser opens a permission picker here.
       This is intentionally required by browser security. */
    port = await navigator.serial.requestPort({
      filters: [
        { usbVendorId: 0x2341 }, // Arduino official
        { usbVendorId: 0x2A03 }, // Arduino / Genuino
        { usbVendorId: 0x1A86 }, // common CH340 USB-serial
        { usbVendorId: 0x10C4 }, // common CP210x USB-serial
        { usbVendorId: 0x0403 }  // common FTDI
      ]
    });

    const selectedBaud = Number(baudRate.value);
    await port.open({ baudRate: selectedBaud });

    const info = port.getInfo ? port.getInfo() : {};
    const detectedName = getDeviceName(info);

    const saved = localStorage.getItem("anmolArduinoName");
    const name = saved || detectedName;

    friendlyName.value = name;
    updateConnectedUI(name, info);

    showToast(`${name} connected successfully ✅`);

    keepReading = true;
    readLoop();

  } catch (error) {
    console.error(error);

    if (error.name === "NotFoundError") {
      showToast("No USB serial device was selected.");
    } else {
      showToast("Connection failed: " + error.message);
    }

    resetConnectionUI();
  }
}

async function readLoop() {
  if (!port || !port.readable) return;

  const decoder = new TextDecoderStream();

  try {
    const readableStreamClosed = port.readable.pipeTo(decoder.writable);
    reader = decoder.readable.getReader();

    while (keepReading) {
      const { value, done } = await reader.read();

      if (done) break;

      if (value) {
        serialOutput.textContent += value;
        serialOutput.scrollTop = serialOutput.scrollHeight;
      }
    }

    try {
      reader.releaseLock();
    } catch {}
    reader = null;

    await readableStreamClosed.catch(() => {});
  } catch (error) {
    console.error("Serial read error:", error);
  }
}

async function sendSerial() {
  if (!port || !port.writable) {
    showToast("Connect Arduino first.");
    return;
  }

  const message = serialInput.value;

  if (!message.trim()) {
    showToast("Type something first.");
    return;
  }

  try {
    const encoder = new TextEncoder();
    writer = port.writable.getWriter();

    await writer.write(encoder.encode(message + "\n"));

    writer.releaseLock();
    writer = null;

    serialInput.value = "";
  } catch (error) {
    console.error(error);
    showToast("Could not send to Arduino.");
    try {
      writer?.releaseLock();
    } catch {}
    writer = null;
  }
}

async function disconnectArduino() {
  keepReading = false;

  try {
    if (reader) {
      await reader.cancel();
      reader.releaseLock();
    }
  } catch {}

  reader = null;

  try {
    if (writer) writer.releaseLock();
  } catch {}

  writer = null;

  if (port) {
    try {
      await port.close();
    } catch (error) {
      console.warn("Port close:", error);
    }
  }

  port = null;
  resetConnectionUI();
  showToast("Arduino disconnected.");
}

function updateConnectedUI(name, info) {
  deviceName.textContent = name || "Arduino connected";

  const vendor = info.usbVendorId ? "0x" + info.usbVendorId.toString(16).toUpperCase() : "Unknown";
  const product = info.usbProductId ? "0x" + info.usbProductId.toString(16).toUpperCase() : "Unknown";

  deviceDetails.textContent =
    `USB serial device • Vendor ${vendor} • Product ${product} • ${baudRate.value} baud`;

  deviceBadge.textContent = "CONNECTED";
  deviceBadge.className = "device-badge connected";

  topStatus.innerHTML = `<span class="status-dot connected"></span> Connected`;

  connectionState.textContent = "ON";
  deviceCount.textContent = "1";

  disconnectBtn.disabled = false;
  sendSerialBtn.disabled = false;
}

function resetConnectionUI() {
  deviceName.textContent = "No Arduino connected";
  deviceDetails.textContent = "Click the button to choose a serial USB device.";

  deviceBadge.textContent = "DISCONNECTED";
  deviceBadge.className = "device-badge disconnected";

  topStatus.innerHTML = `<span class="status-dot"></span> Not connected`;

  connectionState.textContent = "OFF";
  deviceCount.textContent = "0";

  disconnectBtn.disabled = true;
  sendSerialBtn.disabled = true;
}

function saveFriendlyName() {
  const name = friendlyName.value.trim();

  if (!name) {
    showToast("Enter a device name first.");
    return;
  }

  localStorage.setItem("anmolArduinoName", name);

  if (port) {
    deviceName.textContent = name;
  }

  showToast("Device name saved.");
}

function getDeviceName(info) {
  const vid = info.usbVendorId;
  const pid = info.usbProductId;

  if (vid === 0x2341) return "Arduino Uno";
  if (vid === 0x2A03) return "Arduino / Genuino";
  if (vid === 0x1A86) return "CH340 USB Serial";
  if (vid === 0x10C4) return "CP210x USB Serial";
  if (vid === 0x0403) return "FTDI USB Serial";

  if (pid) return `USB Serial Device`;
  return "Serial Device";
}

/* Web Serial events for devices that are physically connected/disconnected.
   Permission is still required before a website can use a port. */

if ("serial" in navigator) {
  navigator.serial.addEventListener("connect", (event) => {
    showToast("A supported serial USB device was plugged in.");
  });

  navigator.serial.addEventListener("disconnect", (event) => {
    if (port === event.target) {
      keepReading = false;
      port = null;
      resetConnectionUI();
      showToast("Arduino USB device disconnected.");
    }
  });
}

/* ---------- Helpers ---------- */

function classify(name) {
  const n = name.toLowerCase();

  if (/(gate|door|window|servo|barrier|lock|curtain)/.test(n)) return "Gate";
  if (/(led|light|traffic|flasher|rgb)/.test(n)) return "LED";
  if (/(robot|motor|car|pump|fan|conveyor)/.test(n)) return "Motor";
  if (/(lcd|oled|display|clock|counter|timer)/.test(n)) return "Display";
  if (/(security|alarm|password|rfid|fire|gas|smoke)/.test(n)) return "Security";
  return "Sensor";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* Save a more useful default device name when none exists. */
if (localStorage.getItem("anmolArduinoName")) {
  friendlyName.value = localStorage.getItem("anmolArduinoName");
}
