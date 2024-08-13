const temp = -10;
const cold = temp < 0;
const heat = temp > 0 && temp <= 5;
const cool = temp > 5 && temp <= 20;

if (cold) {
  console.log('Опасно холодно!');
} else if (heat) {
  console.log('Очень холодно');
} else if (cool) {
  console.log('Прохладно');
} else {
  console.log('Тепло');
}


const sum = 10000;
const promotion_5 = sum > 1000 && sum <= 5000;
const promotion_10 = sum > 5000;

if (promotion_5) {
  console.log(sum - (sum * 0.05));
} else if (promotion_10) {
  console.log(sum - (sum * 0.10));
} else {
  console.log(sum);
}


function checkAge(age) {
  if (age < 18) {
    console.log('you are not allowed');
  } else if (age >= 18) {
    console.log('you are welcome!');
  }
}

checkAge(15);
checkAge(22);
checkAge(28);
checkAge(35);

function calc(a,b, operation) {
  if (operation == 'add') {
    console.log(a + b);
  } else if (operation == 'multi') {
    console.log(a * b);
  } else if (operation == 'subtract') {
    console.log(b - a);
  }
}

function calcSwitch(a, b, operation) {
  switch(operation) {
    case 'add':
      console.log(a+b);
      break;
    case 'multi':
      console.log(a*b);
      break;
    case 'subtract':
      console.log(b-a);
      break;
    default:
      console.log('Ты что то сделал не так!');
  }
}

calc(2, 3, 'add');
calc(2, 3, 'multi');
calc(2, 3, 'subtract');

console.log('-----------------');

calcSwitch(3, 4, 'add');
calcSwitch(3, 4, 'multi');
calcSwitch(3, 4, 'subtract');