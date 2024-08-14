const phoneBook = {
  'alex': 89944244242,
  'artem': 89991234242,
  'andrey': 89410029424,
}

console.log('Выводы данных из ТК:');
console.log(phoneBook.alex);
console.log(phoneBook['andrey']);
console.log('_______________');
console.log('Операции с ТК');
phoneBook['popov'] = 89421231231;
phoneBook.pepel = 81239422332;
console.log(phoneBook);
phoneBook.alex = 89999991234;
delete phoneBook.artem;
console.log(phoneBook);
