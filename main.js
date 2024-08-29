const http = require('http');
const server = http.createServer().listen(3000);

server.on('request', (req, res) => {
  const firstName = req.url.substring(1); 
  const serverUrl = 'https://api.genderize.io'
  const url = `${serverUrl}?name=${firstName}`
  if (req.url === `/${firstName}`) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(`${data.name} is ${data.gender}`))
      .catch(error => console.error(error))
  }
})



