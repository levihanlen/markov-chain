
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
})

generateBtn.addEventListener("click", () => {
  /*
  textParse();
  generate();
  */
 generateMarkovChain();
})

textTextarea.addEventListener("input", () => {
  removeErrors();
})

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

/*
function generateMarkovChain() {
  const text = textTextarea.value;
  const lines = text.split('\n');

  const contextArr = [];
  for (let i = 0; i < context; i++) {
    contextArr.push('');
  }
  const possibles = {};

  // Iterate through each line
  lines.forEach(line => {
    const words = line.split(/\s+/);
    console.log(contextArr);
    words.forEach(word => {

      let key = ``;
      for (let i = 0; i < context; i++) {
        if (i > 0) {
          key += `,`;
        }
        key += contextArr[i];
      }
      if (!possibles[key]) {
        possibles[key] = [];
      }
      possibles[key].push(word);
      for (let i = 0; i < context; i++) {
        if (i === context - 1) {
          // last item in context
          contextArr[i] = word;
        } else {
          contextArr[i] = contextArr[i + 1];
        }
      }
    });
  });

  const endKeys = [];
  for (let i = 0; i < context; i++) {
    
  }
  const endKey1 = `${w1},${w2}`;
  const endKey2 = `${w2},`;
  if (!possibles[endKey1]) {
    possibles[endKey1] = [];
  }
  possibles[endKey1].push('');
  if (!possibles[endKey2]) {
    possibles[endKey2] = [];
  }
  possibles[endKey2].push('');

  // Filter for capitalized keys, ensuring that the first part of the key exists and is not empty
  const capitalizedKeys = Object.keys(possibles).filter(key => {
    const parts = key.split(',');
    return parts[0] && parts[0][0] === parts[0][0].toUpperCase();
  });

  if (capitalizedKeys.length === 0) {
    wordOutput.innerText = "No capitalized starting words found.";
    return;
  }

  const randomKey = capitalizedKeys[Math.floor(Math.random() * capitalizedKeys.length)];
  [w1, w2] = randomKey.split(',');

  const output = [w1, w2];
  const outputSize = 100; // Set a fixed output size or modify to be a user input

  for (let i = 0; i < outputSize && possibles[`${w1},${w2}`].length; i++) {
    const key = `${w1},${w2}`;
    const word = possibles[key][Math.floor(Math.random() * possibles[key].length)];
    output.push(word);
    w1 = w2;
    w2 = word;
  }

  wordOutput.innerText = output.join(' ');
}

*/


function generateMarkovChain() {
  textParse();
  generate();
}

function textParse() {
  data = {};
  let text = textTextarea.value;
  if (text.length === 0) {
    showError("Add text for processing to work.")
    return;
  }
  text = text
    .replace(/\s+/g, ' ')
    .trim();
  const arr = text.split(' ');
  for (let i = 0; i < arr.length; i++) {
    // filling the data object.
    if (!arr[i] || !arr[i - context]) {
      continue;
    }
    const word = arr.slice(i - context, i).join(" ");
    //console.log(word);
    
    if (data[word]) {
      data[word].push(arr[i]);
    } else {
      data[word] = [arr[i]];
    }
    
  }
  console.log(data);
}

function generate() {
  words = [];
  let wordCount = 100;
  wordOutput.innerHTML = "";
  const wordGroups = Object.keys(data);
  
  output = wordGroups[Math.floor(Math.random() * wordGroups.length)];
  for (let j = 0; j < wordCount; j++) {
    const split = output.split(' ');
    const word = split.slice(split.length - context, split.length).join(' ');
    // console.log(word, output, wordGroups);
    console.log(data[word]);
    if (wordGroups.includes(word)) {
      console.log("intere");
      const newWords = data[word];
      console.log(newWords);
      output = output + " " + newWords[Math.floor(Math.random() * newWords.length)];
    } else {

      output = output + " was";
    }
  }
  console.log(output);
  wordOutput.innerHTML += `${output}`;

}

/*
function textParse() {
  data = {};
  let text = textTextarea.value;
  if (text.length === 0) {
    showError("Add text for processing to work.")
    return;
  }
  text = text
    .replace(/\s+/g, ' ')
    .trim();
  // console.log(text);
  const arr = text.split(' ');
  for (let i = 0; i < arr.length; i++) {
    // filling the data object.
    if (!arr[i + 1]) {
      continue;
    }
    const word = arr[i];
    
    if (data[word]) {
      data[word].push(arr[i + 1]);
    } else {
      data[word] = [arr[i + 1]];
    }
    
  }
  console.log(data);
}

function generate() {
  words = [];
  wordOutput.innerHTML = "";
  const wordGroups = Object.keys(data);
  
  output = wordGroups[Math.floor(Math.random() * wordGroups.length)];
  for (let j = 0; j < 100; j++) {
    const word = output.split(' ')[output.split(' ').length - 1];
    if (wordGroups.includes(word)) {
      const word = data[output.split(' ')[output.split(' ').length - 1]];
      output = output + " " + word[Math.floor(Math.random() * word.length)];
    } else {
      output = output + " was"; // make it random based on whether the last was a vowel or not.
    }
  }
  console.log(output);
  wordOutput.innerHTML += `${output}`;
  
}
*/



/*
What if we were to use a Markov chain for generating sentences 
for the GS1 or GS2 systems to be in my game and the reason this 
could work is basically we define a whole bunch of sentences we 
just put them in A you know a massive paragraph and these are 
basically different sentence structures and then what we do is
we run a Markov chain for one sentence or maybe we run it for
an entire paragraph and then use that paragraph as just a 
paragraph or we chain multiple Markov chain sentences 
together and get a paragraph and basically that's your
first pass then what you do is you would take the sentence
generated by the Markov chain and you would substitute it 
with more specific things to that environment so say you
have a Markov chain paragraph input of just describing 
the surroundings and then your second pass would be making it specific
to the surroundings you're in so if you're in a force it would change
it to be describing a forest it would still use the initial Markov 
chain generation to do so and then your 3rd pass would basically be the
synonym system so it would substitute words for their synonyms

*/