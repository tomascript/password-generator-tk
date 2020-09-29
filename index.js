const $numberField = document.querySelector('#pass-length');
const $toolTip = document.querySelector('#tooltip');
const $form = document.querySelector('.form');
const $checkOptions = document.querySelectorAll('input[type="checkbox"]');
const $resultField = document.querySelector('#result');
const defaultMessage = `Enter length between ${$numberField.min} - ${$numberField.max}`;

// 97-122 lowercase letters
// 65-90 uppercase letters
// 48-57 numbers
// 33-47 special chars
// 58-64 special chars2
// 91-96 special chars3
// 123-126 special chars4

const LOWER_CASE_ARRAY = populateArray(97, 122);
const UPPER_CASE_ARRAY = populateArray(65, 90);
const NUMBERS_ARRAY = populateArray(48, 57);
const SYMBOLS_ARRAY = populateArray(33, 47)
  .concat(populateArray(58, 64))
  .concat(populateArray(91, 96))
  .concat(populateArray(123, 126));

$numberField.addEventListener('input', e => {
  const val = e.target.value;
  if (val < +$numberField.min || val > +$numberField.max || isNaN(val)) {
    $toolTip.textContent = defaultMessage;
    $toolTip.classList.add('open');
  } else {
    $toolTip.classList.remove('open');
  }
});

$checkOptions.forEach(opt =>
  opt.addEventListener('change', e => {
    $toolTip.textContent = defaultMessage;
    $toolTip.classList.remove('open');
  })
);

$form.addEventListener('submit', e => {
  e.preventDefault();
  let asciiCodeArray = [...LOWER_CASE_ARRAY];
  if ($checkOptions[0].checked) {
    asciiCodeArray = [...asciiCodeArray, ...UPPER_CASE_ARRAY];
  }
  if ($checkOptions[1].checked) {
    asciiCodeArray = [...asciiCodeArray, ...NUMBERS_ARRAY];
  }
  if ($checkOptions[2].checked) {
    asciiCodeArray = [...asciiCodeArray, ...SYMBOLS_ARRAY];
  }
  let password = generatePassword(asciiCodeArray, $numberField.value);
  while (!checkPassword(password)) {
    password = generatePassword(asciiCodeArray, $numberField.value);
  }
  $resultField.textContent = password;
  $resultField.select();
  document.execCommand('copy');
  $toolTip.textContent = 'Copied to Clipboard';
  $toolTip.classList.add('open');
});

function populateArray(startIndex, endIndex) {
  const arr = [];
  for (let i = startIndex; i <= endIndex; i++) {
    arr.push(i);
  }
  return arr;
}

function generatePassword(arr, charCount) {
  let nbr;
  let passwordCodes = [];
  for (let i = 0; i < charCount; i++) {
    nbr = arr[Math.floor(Math.random() * arr.length)];
    while (nbr == passwordCodes[passwordCodes.length - 1]) {
      nbr = arr[Math.floor(Math.random() * arr.length)];
    }
    passwordCodes.push(nbr);
  }
  return String.fromCharCode(...passwordCodes);
}

function checkPassword(pass) {
  let valid = true;
  if ($checkOptions[0].checked) {
    valid = valid && /[A-Z]/.test(pass);
    if (!valid) return valid;
  }
  if ($checkOptions[1].checked) {
    valid = valid && /\d/.test(pass);
    if (!valid) return valid;
  }
  if ($checkOptions[2].checked) {
    valid = valid && !/^[a-zA-Z0-9- ]*$/.test(pass);
    if (!valid) return valid;
  }
  valid = valid && /[a-z]/.test(pass);
  return valid;
}
