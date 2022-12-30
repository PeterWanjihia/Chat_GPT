import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form =document.querySelector('form');
const chatContainer = document.getElementById('chat_container');

let loadInterval;


//  This function makes the ... appear in sequence before the texts in the answer appear/ as the answer loads
function loader(element){
  element.textContent='';

  loadInterval = setInterval(() => {
    element.textContent='.';

    if (element.textContent ==='....'){
      element.textContent ='';
    }    
  }, 300);
}

// This function makes the characters in the answer to appear one by one
function typeText(element,text){
  let index =0;

  let interval = setInterval(()=>{
    if (index<text.length){
      element.innerHTML += text.charAt(index);
      index++;      
    }else{
      clearInterval(interval);
    }
  },20)
  
}

function generateUniqueID(){
  const timestamp=Date.now();
  const randomNum = Math.random();
  const hexadecimalString = randomNum.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}


