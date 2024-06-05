const wsUri = "wss://echo-ws-service.herokuapp.com";
const btnChat = document.querySelector('.btn__chat');
const btnGeol = document.querySelector('.btn__geol');
const chatBoard = document.querySelector('.main');

let socket = new WebSocket(wsUri);;

socket.addEventListener("open", (event) => {
    console.log("CONNECTED");
});

function handleButtonClick() {
    chatBoard.scrollIntoView({ block: "end", behavior: "smooth" });
}

function writeToScreen(message) {
        const pre = `<p class='main__messages'>${message}</p>`;
        chatBoard.innerHTML += pre;
        handleButtonClick()
}

btnChat.addEventListener('click', (evt) => {
    const textInput = document.querySelector('.input').value;
    
    if (textInput.trim() === '') {
        return;
    }

    const message = textInput;
    writeToScreen(message);
    socket.send(message);
    socket.onmessage = function(evt) {
        const answer = `<p class="main_answer">Ответ: ${evt.data}</p>`;
        chatBoard.innerHTML += answer;
        handleButtonClick();
    };
    
    document.querySelector('.input').value = '';
    
    socket.onerror = function(evt) {
        writeToScreen('ERROR: ' + evt.data);
    };
});

!function() {
document.querySelector('.input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        btnChat.click();;
    }
});
}();

const error = () => {
    writeToScreen(`Невозможно получить ваше местоположение`);
}

const success = (position) => {
console.log('position', position);
const latitude  = position.coords.latitude;
const longitude = position.coords.longitude;
mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
writeToScreen(`<a class="main_geo" href='${mapLink}' target="_blank">Ваша гео-локация</a>`);
}

btnGeol.addEventListener('click', () => {
mapLink = '';

if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
} else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
}
});