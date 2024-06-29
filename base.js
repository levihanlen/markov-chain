const generateBtn = document.querySelector("#generateBtn");
const textTextarea = document.querySelector("#textTextarea");
const errorDiv = document.querySelector("#errorDiv");
const wordOutput = document.querySelector("#wordOutput");
const contextInput = document.querySelector("#contextInput");

let errors = [];

let data = {};

let words = [];

let output = "";

let context = 2;

contextInput.value = context;
contextInput.addEventListener("change", () => {
  if (!contextInput.value) {
    contextInput.value = 1;
  }
  context = Math.min(Math.max(parseInt(contextInput.value), 1), 10);
  contextInput.value = context;
});

generateBtn.addEventListener("click", () => {
  generateMarkovChain();
});

textTextarea.addEventListener("input", () => {
  removeErrors();
});

function showError(a) {
  errors.push(a);
  errorDiv.innerHTML = "";
  for (let i = 0; i < errors.length; i++) {
    errorDiv.innerHTML += `<span class="errorSpan" style="color: var(--colorDarkest);"><span style="color: var(--colorErrorPrimary);" class="material-icons">error</span> ${errors[i]}</span>`;
  }
}

function removeErrors() {
  errors = [];
  errorDiv.innerHTML = "";
}

function generateMarkovChain() {
  textParse();
  generate();
}

function textParse() {
  data = {};
  let text = textTextarea.value;
  if (text.length === 0) {
    showError("Add text for processing to work.");
    return;
  }
  text = text.replace(/\s+/g, " ").trim();
  const arr = text.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i] || !arr[i - context]) {
      continue;
    }
    const word = arr.slice(i - context, i).join(" ");

    if (data[word]) {
      data[word].push(arr[i]);
    } else {
      data[word] = [arr[i]];
    }
  }
}

function generate() {
  words = [];
  let wordCount = 100;
  wordOutput.innerHTML = "";
  const wordGroups = Object.keys(data);
  output = wordGroups[Math.floor(Math.random() * wordGroups.length)];
  for (let j = 0; j < wordCount; j++) {
    const split = output.split(" ");
    const word = split.slice(split.length - context, split.length).join(" ");
    if (wordGroups.includes(word)) {
      const newWords = data[word];
      console.log(newWords);
      output =
        output + " " + newWords[Math.floor(Math.random() * newWords.length)];
    } else {
      output = output + " was";
    }
  }
  wordOutput.innerHTML += `${output}`;
}
