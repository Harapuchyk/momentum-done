const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const nameInInput = document.querySelector('.name'); 
const cityInInput = document.querySelector('.city'); 
const body = document.body;
cityInInput.value = 'Minsk';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
let elements = document.querySelectorAll('ul > li');

function addZeroFotTime (d) {
    return ((d<10) ? '0' + d : d);
};    
 
function showTime () {
   
    let dateTime = new Date();
    let h = addZeroFotTime(dateTime.getHours());
    let minutes = addZeroFotTime(dateTime.getMinutes());
    let seconds = addZeroFotTime(dateTime.getSeconds());
    let month = dateTime.getMonth();
    let dayWeek = dateTime.getDay();
    let dayInMonth = dateTime.getDate();
    let arrMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let arrDayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];       
    let clock = h + ':' + minutes + ':' + seconds;
    time.textContent = clock;
    date.textContent = arrDayWeek[dayWeek] + ', ' + arrMonth[month] + ' ' + dayInMonth;
};

setInterval(showTime, 1000);

nameInInput.addEventListener('change', () => {
    const userName = nameInInput.value;
    localStorage.setItem('name', userName.toString());
    
});

nameInInput.value = localStorage.getItem('name');

function setGreeting() {    
    getHour ();    
    greeting.innerHTML = `Good ${getHour()}`;
};

function getHour () {
    let dateTime = new Date();
    let hours = dateTime.getHours();
    if (Number(hours) >= 6 && Number(hours) < 12) {
        return  'morning';
    };
    if (Number(hours) >= 12 && Number(hours) < 18) {
        return  'afternoon';
    };
    if (Number(hours) >= 18 && Number(hours) < 24) {
        return  'evening' 
    };
    if (Number(hours) >= 00 && Number(hours) < 6 ) {
        return  'night';
    };
};

setInterval(setGreeting, 1000);
setInterval(getHour, 1000);

function getRandomNum() {
    return Math.floor(Math.random() * 20) + 1;
};

let randomNum;

function addZeroForImg(num) {
    return (String(num).length === 1) ? ('0' + String(num)) : (String(num));
};

randomNum = String(addZeroForImg(getRandomNum()));

function setBg() {
const img = new Image();
img.src = `https://raw.githubusercontent.com/Harapuchyk/img-momentum/assets/images/${getHour()}/${addZeroForImg(randomNum)}.jpg`;
img.addEventListener('load', () => {
    body.style.backgroundImage =  `url(${img.src})`;
  });
};

setBg ();
const getSlideNext = () => {
    randomNum = Number(randomNum) !== 20 ? Number(randomNum) + 1 : '01';
    setBg();
};

const getSlidePrev = () => {
    randomNum = Number(randomNum) !== 1 ? Number(randomNum) - 1 : '20';
    setBg();
};

slideNext.addEventListener('click', () => {  
    getSlideNext();    
});

slidePrev.addEventListener('click', () => {
    getSlidePrev();
});

async function getWeather() {
    try {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInInput.value}&lang=en&appid=ea5a9806909389534d591dce2b95e7e8&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(Number(data.main.temp))}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(Number(data.wind.speed))} m/s`;
        humidity.textContent = `Humidity: ${Math.round(Number(data.main.humidity))} %`;
    } catch {  
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = `Error! city '${cityInInput.value}' not found!`;
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
};

cityInInput.value = 'Minsk'

getWeather();

cityInInput.addEventListener('change', () => {
    const city = cityInInput.value;
    localStorage.setItem('city', city.toString());
    getWeather()
});

cityInInput.value = localStorage.getItem('city');

async function getQuotes() {  
    try {
    const quotes = `https://www.breakingbadapi.com/api/quotes`;
    const resQuotes = await fetch(quotes);
    const dataQuotes = await resQuotes.json();       
    quote.textContent = `"${dataQuotes[Math.floor(Math.random() * (dataQuotes.length-1)) + 1].quote}"`;
    author.textContent = dataQuotes[Math.floor(Math.random() * (dataQuotes.length-1)) + 1].author;   
    } catch { 
        quote.textContent = 'If there are problems with the API-quotes, you need to output something anyway';
        author.textContent = 'I';
    }
};

getQuotes();
changeQuote.addEventListener('click', () => {
    getQuotes();
});

const playList = [
    {      
        title: 'Running Up That Hill',
        src:'./assets/sounds/0.mp3',    
    },  
    {      
        title: 'After Dark',
        src: './assets/sounds/1.mp3',
    },
    {      
        title: 'Revolution',
        src: './assets/sounds/2.mp3',
    },
    {      
        title: 'Ghetto In The Lake',
        src: './assets/sounds/3.mp3',
    },
];

let isPlay = false;
const audio = new Audio();
let soundsNum = 0;
const song = [];

function playAudio() {
    if (isPlay === false) {
    audio.src = playList[soundsNum].src;
    audio.currentTime = 0;
    audio.play();
    song[soundsNum].classList.add('item-active');
    play.classList.add('pause');
    isPlay = true;
    
}else {
    audio.pause();    
    play.classList.remove('pause');
    isPlay = false;
}
};

play.addEventListener('click', playAudio);

playNext.addEventListener('click', () => {
    soundsNum = (soundsNum != 3) ? soundsNum + 1 : 0;
    for (i=0; i < song.length; i ++) {
        song[i].classList.remove('item-active'); 
    };
    audio.src = playList[soundsNum].src;
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');   
    isPlay = true;
    song[soundsNum].classList.add('item-active');      
});

playPrev.addEventListener('click', () => {
    soundsNum = (soundsNum != 0) ? soundsNum - 1 : 3;
    for (i=0; i < song.length; i ++) {
        song[i].classList.remove('item-active'); 
    };
    audio.src = playList[soundsNum].src;
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');   
    isPlay = true;
    song[soundsNum].classList.add('item-active');     
});

for (i=0; i< playList.length; i ++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i].title;
    playListContainer.append(li);
    li.classList.add(`play-item${i}`);
    song[i] = document.querySelector(`.play-item${i}`);
};

audio.addEventListener('ended', () => {
    soundsNum = (soundsNum != 3) ? soundsNum + 1 : 0;
    for (i=0; i < song.length; i ++) {
        song[i].classList.remove('item-active'); 
    };
    audio.src = playList[soundsNum].src;
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');   
    isPlay = true;
    song[soundsNum].classList.add('item-active'); 
});

