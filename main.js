// fetch(`https://jsonplaceholder.typicode.com/todos/4`)
//   .then((response) => {
//     if (response.status === 404) {
//       throw new Error('Запись не найдена!')
//     }
//     return response.json()
//   })
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error))

  const firstName = 'pavel';
  const serverUrl = 'https://api.genderize.io'
  const url = `${serverUrl}?name=${firstName}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`${data.name} is ${data.gender}`))
    .catch(error => console.error(error))

