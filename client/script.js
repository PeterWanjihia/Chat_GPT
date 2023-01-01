import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.getElementById("chat_container");

let loadInterval;

//  This function makes the ... appear in sequence before the texts in the answer appear/ as the answer loads
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === ".....") {
      element.textContent = "";
    }
  }, 300);
}


// Simulating the process of typing
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}


function generateUniqueID() {
  const timestamp = Date.now();
  const randomNum = Math.random();
  const hexadecimalString = randomNum.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// Implementing the chat stripe
function chatStripe(isAI, value, uniqueId) {
  return `
      <div class="wrapper ${isAI && "ai"}">
        <div class="chat">
          <div className="Profile">
            <img
              src="${isAI ? bot : user}"
              alt="${isAI ? "bot" : "user"}"
            />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    `
}

// Implementing the submit button
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  // user's Chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // bot's Chatstripe
  const uniqueId = generateUniqueID();
  chatContainer.innerHTML += chatStripe(true," ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);  
};
  
// calling the handleSubmit() and defining the enter event
form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup',(e)=>{
  if(e.keyCode === 13){
    handleSubmit(e);
  }
})
