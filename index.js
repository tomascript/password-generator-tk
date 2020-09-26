const $numberField = document.querySelector('#pass-length');
const $toolTip = document.querySelector('#tooltip');
const $form = document.querySelector('.form');
const $checkOptions = document.querySelectorAll('input[type="checkbox"]');
const $resultField = document.querySelector('textarea');
const defaultMessage = 'Enter length between 5 - 30';

// 97-122 lowercase letters
// 65-90 uppercase letters
// 48-57 numbers
// 33-47 special chars
// 58-64 special chars2
// 91-96 special chars3
// 123-126 special chars4
const asciiRanges = {
  lowerCase: {
    ranges: [{ startsAt: 97, count: 26 }]
  },
  upperCase: {
    ranges: [{ startsAt: 65, count: 26 }]
  },
  numbers: {
    ranges: [{ startsAt: 48, count: 10 }]
  },
  special: {
    ranges: [
      { startsAt: 33, count: 15 },
      { startsAt: 58, count: 7 },
      { startsAt: 91, count: 6 }
    ]
  }
};

$numberField.addEventListener('input', e => {
  const val = e.target.value;
  if (val < 5 || val > 30 || isNaN(val)) {
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
  generatePassword();
});

function generatePassword() {
  let text = '';
  let charCount = $numberField.value;
  if (isNaN(charCount)) return;
  let isNumber = document.querySelector('#is-number').checked;
  let isUpper = document.querySelector('#upper-case').checked;
  let isSpecial = document.querySelector('#is-special').checked;
  for (let i = 0; i < charCount; i++) {
    let generatedChar = generateCharacter(isNumber, isUpper, isSpecial);
    while (generatedChar === text.slice(-1)) {
      generatedChar = generateCharacter(isNumber, isUpper, isSpecial);
    }
    text += generatedChar;
  }
  $resultField.textContent = text;
  $resultField.select();
  document.execCommand('copy');
  $toolTip.textContent = 'Copied to Clipboard!';
  $toolTip.classList.add('open');
}

function generateCharacter(isNumber, isUpper, isSpecial) {
  let temp, idx;
  if (isUpper && isNumber && isSpecial) {
    temp = String.fromCharCode(Math.round(Math.random() * 93) + 33);
  } else if (isUpper && isNumber) {
    idx = Math.floor(Math.random() * 3);
    switch (idx) {
      case 0:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.numbers.ranges[0].count) +
            asciiRanges.numbers.ranges[0].startsAt
        );
        break;
      case 1:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.upperCase.ranges[0].count) +
            asciiRanges.upperCase.ranges[0].startsAt
        );
        break;
      case 2:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
            asciiRanges.lowerCase.ranges[0].startsAt
        );
        break;
      default:
        temp = null;
    }
  } else if (isNumber && isSpecial) {
    idx = Math.floor(Math.random() * 3);
    switch (idx) {
      case 0:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.numbers.ranges[0].count) +
            asciiRanges.numbers.ranges[0].startsAt
        );
        break;
      case 1:
        idx = Math.floor(Math.random() * 3);
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.special.ranges[idx].count) +
            asciiRanges.special.ranges[idx].startsAt
        );
        break;
      case 2:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
            asciiRanges.lowerCase.ranges[0].startsAt
        );
        break;
      default:
        temp = null;
    }
  } else if (isUpper && isSpecial) {
    idx = Math.floor(Math.random() * 3);
    switch (idx) {
      case 0:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.upperCase.ranges[0].count) +
            asciiRanges.upperCase.ranges[0].startsAt
        );
        break;
      case 1:
        idx = Math.floor(Math.random() * 3);
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.special.ranges[idx].count) +
            asciiRanges.special.ranges[idx].startsAt
        );
        break;
      case 2:
        temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
            asciiRanges.lowerCase.ranges[0].startsAt
        );
        break;
      default:
        temp = null;
    }
  } else if (isNumber) {
    Math.round(Math.random())
      ? (temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.numbers.ranges[0].count) +
            asciiRanges.numbers.ranges[0].startsAt
        ))
      : (temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
            asciiRanges.lowerCase.ranges[0].startsAt
        ));
  } else if (isUpper) {
    Math.round(Math.random())
      ? (temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.upperCase.ranges[0].count) +
            asciiRanges.upperCase.ranges[0].startsAt
        ))
      : (temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
            asciiRanges.lowerCase.ranges[0].startsAt
        ));
  } else if (isSpecial) {
    idx = Math.floor(Math.random() * 3);
    Math.round(Math.random())
      ? (temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.special.ranges[idx].count) +
            asciiRanges.special.ranges[idx].startsAt
        ))
      : (temp = String.fromCharCode(
          Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
            asciiRanges.lowerCase.ranges[0].startsAt
        ));
  } else {
    temp = String.fromCharCode(
      Math.floor(Math.random() * asciiRanges.lowerCase.ranges[0].count) +
        asciiRanges.lowerCase.ranges[0].startsAt
    );
  }
  return temp;
}

// console.log(text);
