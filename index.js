const { format } = require('date-fns')
const http = require('http');
const server = http.createServer().listen(8000);


server.on('request', (req, res) => {
  const now = Date.now();
  const formatterDate = format(now, 'EEEE: HH:mm')
  const cityName = req.url.substring(1);
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
  if (req.url === '/') {
    console.log('server is running');
  } else if (cityName) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`conditions for ${data.name} is ${data.weather[0].main}. ${formatterDate}`))
  }
})
