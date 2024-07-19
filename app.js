const card = document.querySelector('.card'); 
const search = document.querySelector('.search button'); 
const weatherBox = document.querySelector('.weather-box'); 
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '73e52df2b0f1eb4c20e9756a11bc393b';
  const city = document.querySelector('.search input').value;

  
  if (city == '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

    if(json.cod == '404'){
      card.style.height = '400px';
      weatherBox.classList.remove('active')
      weatherDetails.classList.remove('active')
      error404.classList.add('active')
      return;
    }

      card.style.height = '555px';
      weatherBox.classList.add('active')
      weatherDetails.classList.add('active')
      error404.classList.remove('active')

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const name = document.querySelector('.weather-box .name');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
      case 'Clear':
        image.src= 'Images/clear.png'
        break;
      case 'Rain':
        image.src= 'Images/rain.png'
        break;
      case 'Scattered Clouds':
        image.src= 'Images/clouds.png'
        break;
      case 'Haze':
        image.src= 'Images/mist.png'
        break;
      case 'Snow':
        image.src= 'Images/snow.png'
        break;
      case 'Drizzle':
        image.src= 'Images/drizzle.png'
        break;
    
      default:
        image.src = 'Images/mist.png'
        
    }
    name.innerHTML = `${(json.name)}`;
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${(json.weather[0].description)}`;
    humidity.innerHTML = `${(json.main.humidity)}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


  });
});