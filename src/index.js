
var EmojiConvertor = require('emoji-js');
var emoji = new EmojiConvertor();

const sad = [":cry:", ":pouting_cat:", ":poop:"]
const happy = [":smile:", ":raised_hands", ":joy:", ":laughing:", ":bow:"]

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition()
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.prepend(p);

let span = document.createElement("span");
span.classList.add('emoji-sizing')
const emojis = document.querySelector('.emojis');
emojis.prepend(span);

recognition.addEventListener('result', e => {


  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.textContent = transcript;

  if (!e.results[0].isFinal) {
    let sad_emoji = sad[Math.floor(Math.random() * sad.length)]
    span.textContent = emoji.replace_colons(`${sad_emoji}`);
  }
  
  if (e.results[0].isFinal) {
    let happy_emoji = happy[Math.floor(Math.random() * happy.length)]
    span.textContent = emoji.replace_colons(`${happy_emoji}`);

    p = document.createElement('p');
    words.prepend(p)
  };

});

recognition.addEventListener('end', recognition.start)
recognition.start()

