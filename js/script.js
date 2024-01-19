const searchInput = document.querySelector('.search-bar');
const sectionPage = document.querySelector('section');

const cityElement = document.querySelector('.city')
const iconElement = document.querySelector('.icona')
const descElement = document.querySelector('.description')
const tempElement = document.querySelector('.temp')
const humidityElement = document.querySelector('.humidity')
const windElement = document.querySelector('.wind')
const weatherElement = document.querySelector('.weather')

let weather = {
  apiKey:"63dd098495096cb42cd0ea5745c70d17",
  //*===================================================================
  fetchWeather: function(city){   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
    .then((response) => response.json())
    .then((data) => this.displayWeather(data ));
  },
  //*===================================================================
  displayWeather: function(data){ 
    const {name} = data;
    const {icon , description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    
    console.log(name,icon,description,temp,humidity,speed);
    
    cityElement.innerHTML= `Weather in ${name}`;
    iconElement.src= `https://openweathermap.org/img/wn/${icon}.png`;
    descElement.innerHTML = description;
    tempElement.innerHTML= `${temp}&deg;C`;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `Wind Speed: ${speed} km/h`; 
    weatherElement.classList.remove("loading");
    //&==================================================
    
    const imageUrl = `https://source.unsplash.com/1600x900/?${name}`;
    const backgroundImage = new Image();
    backgroundImage.src = imageUrl;   

    backgroundImage.onload = function() {
      sectionPage.style.backgroundImage = `url("${imageUrl}")`;
    };

    backgroundImage.onerror = function() {
      console.error('Error loading background image.');
    };
    //&==================================================
    //!==================================================
    sectionPage.classList.add('fade-out');
    setTimeout(function() {     
      sectionPage.classList.remove('fade-out');
    }, 300); 
    //!==================================================
    },
    search: function(){  
      if(validName()){
        const cityName = searchInput.value;
        this.fetchWeather(cityName);
        searchInput.classList.remove("is-invalid");
      }
    },
};

document.querySelector('button').addEventListener("click",function(){
  weather.search();
  document.querySelector('.search-bar').value="";
});

document.querySelector('.search-bar').addEventListener("keyup",function(event){
  if(event.key == "Enter"){
    weather.search();
    document.querySelector('.search-bar').value="";
  }
});

// document.querySelector('.search-bar').addEventListener("keyup",function(event){
//     weather.search();
// });


weather.fetchWeather("Palestine");



function validName(){
  let term = searchInput.value;
  const cityRegex = /^[a-zA-Z]{2,}$/;

  if(cityRegex.test(term)){
    return true;
   
  }else{
    searchInput.classList.add("is-invalid");
    searchInput.classList.remove("is-valid");
    return false;
  }
  
}
