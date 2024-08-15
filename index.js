const phoneBook = {
  'list': {
    'alex': 89944244242,
    'artem': 89991234242,
    'andrey': 89410029424,
  },
  add(name, number) {
    this.list[name] = number;
  },
  del(name) {
    delete this.list[name];
  }
}


phoneBook.add('New user', 1231323212);
phoneBook.add('second user', 1332141);
console.log(phoneBook.list);
console.log('_______________');
phoneBook.del('artem');
console.log(phoneBook.list);
console.log('alex' in phoneBook.list);

for (const name in phoneBook.list) {
  console.log(name + ' - ' + phoneBook.list[name]);
}



