const list = [1, 2, 3, 4, 5, 6];

list.forEach(number => {
  console.log(`Number is ${number}`);
})

const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];
const findAnimals = animals.find(animal => animal.length >= 7);
console.log(findAnimals);

const numbers = [1, 11, -2, 3, -10, 4];

const minusNumbers = numbers.filter(num => num < 0);
console.log(minusNumbers);


const numbersNew = [1, 11, -2, 3, -10, 4];

const newNumberList = numbersNew.map(num => Math.abs(num));
console.log(newNumberList);


const sortNumbers = [1, 11, -2, 3, -10, 4];

const sortedNumbers = sortNumbers.sort((a, b) => b - a);
console.log(sortedNumbers);
