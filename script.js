// Constants
const FEET_TO_METERS = 0.3048;
const METERS_PER_KM = 1000;
const FEET_PER_MILE = 5280;

// Elements
const feetInput = document.getElementById('feetInput');
const kmValue = document.getElementById('kmValue');
const mValue = document.getElementById('mValue');
const miValue = document.getElementById('miValue');
const feetError = document.getElementById('feetError');
const clearBtn = document.getElementById('clearBtn');
const calcBtn = document.getElementById('calcBtn');

function formatNumber(n) {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  const decimals =
    abs === 0 ? 0 :
    abs < 0.001 ? 6 :
    abs < 0.01 ? 5 :
    abs < 0.1 ? 4 :
    abs < 1 ? 3 :
    abs < 10 ? 3 :
    abs < 100 ? 2 :
    abs < 1000 ? 2 : 2;
  return n.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function convertFeetToKm(feet) {
  const meters = feet * FEET_TO_METERS;
  const kilometers = meters / METERS_PER_KM;
  const miles = feet / FEET_PER_MILE;
  return { meters, kilometers, miles };
}

function update() {
  const raw = feetInput.value.trim();

  if (raw === '') {
    feetError.style.display = 'none';
    kmValue.textContent = '0';
    mValue.textContent = '0';
    miValue.textContent = '0';
    return;
  }

  const feet = Number(raw);

  if (!isFinite(feet) || feet < 0) {
    feetError.style.display = 'block';
    kmValue.textContent = '—';
    mValue.textContent = '—';
    miValue.textContent = '—';
    return;
  } else {
    feetError.style.display = 'none';
  }

  const { meters, kilometers, miles } = convertFeetToKm(feet);

  kmValue.textContent = formatNumber(kilometers);
  mValue.textContent = formatNumber(meters);
  miValue.textContent = formatNumber(miles);
}

// Events
calcBtn.addEventListener('click', update);
clearBtn.addEventListener('click', () => {
  feetInput.value = '';
  kmValue.textContent = '0';
  mValue.textContent = '0';
  miValue.textContent = '0';
  feetError.style.display = 'none';
  feetInput.focus();
});
