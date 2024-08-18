const trunscat = (word, maxlength = 7) => {
  return (word.length > maxlength) ? word.slice(0, maxlength) : word;
}

const showVerticalMessage = (word) => {
  let trunscateWord = trunscat(word);
  let newWord = trunscateWord[0].toUpperCase() + trunscateWord.slice(1);
  for (let char of newWord) {
    console.log(char);
  }
}

showVerticalMessage('strada12345')