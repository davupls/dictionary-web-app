const fontBtn = document.getElementById('font-btn');
const fontOptions = document.getElementById('font-options');

fontBtn.addEventListener('click', () => {
  const isExpanded = fontBtn.getAttribute('aria-expanded') === 'true';
  fontBtn.setAttribute('aria-expanded', !isExpanded);
  fontOptions.hidden = isExpanded;
});

fontOptions.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const selectedFont = e.target.dataset.font;
    document.body.style.fontFamily = selectedFont;
    // Optionally update button text to reflect the selected font
    fontBtn.innerHTML = `${e.target.textContent} <img id="icon-arrow-down" src="./assets/images/icon-arrow-down.svg" alt="">`;
    // Close the dropdown
    fontBtn.setAttribute('aria-expanded', 'false');
    fontOptions.hidden = true;
  }
});

const wordInput = document.getElementById('word-input');
const wordTitle = document.getElementById('word-title');
const nounUl = document.getElementById('noun-ul'); 
const verbMeaningUl = document.getElementById('verb-ul');
const synWrap = document.getElementById('syn-wrap');

let results = null;

wordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const word = wordInput.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => {
        results = data;
        console.log(results);
        updatePage(results);
        return data;
      })
      .catch(error => console.error('Error:', error));
  }

});



function updatePage(results) {
  const entry = results[0];

  wordTitle.textContent = entry.word;
  nounUl.innerHTML = ''; // Clear previous list items

  meaningData(entry);
  synonymsData(entry);
  verbData(entry);
  
}

function meaningData(entry) {

  for (let i = 0; i < entry.meanings[0].definitions.length; i++) {
    // console.log(results[0].meanings[0].definitions[i].definition);
    const li = document.createElement('li');
    // li.textContent = entry.meanings[0].definitions[i].definition;
    li.textContent = entry.meanings[0].definitions[i].definition;
    nounUl.appendChild(li);
  }

}

function synonymsData(entry) {
  let firstTwoSynonyms = [];
  for (const meaning of entry.meanings) {
    if (meaning.synonyms && meaning.synonyms.length >= 2) {
      firstTwoSynonyms = meaning.synonyms.slice(0, 2);
      synWrap.innerHTML = ''; // Clear previous list items
      for (let i = 0; i < firstTwoSynonyms.length; i++) {
        const p = document.createElement('p');
        p.textContent = firstTwoSynonyms[i];
        synWrap.appendChild(p);
      }
      console.log(`${firstTwoSynonyms}`)
      break;
    } else {
      console.log('No synonyms found for this meaning.');
    }
  }
}

function verbData(entry) {
  // Search for a meaning with partOfSpeech === "verb"
  const verbMeaningObject = entry.meanings.find(meaning => meaning.partOfSpeech === "verb");
  const verbMeaningDefinition = verbMeaningObject 
    ? verbMeaningObject.definitions[0].definition
    : "No verb meaning available";

  if (verbMeaningObject) {
    verbMeaningUl.innerHTML = ''; // Clear previous list items
    const li = document.createElement('li');
    li.textContent = verbMeaningDefinition;
    verbMeaningUl.appendChild(li);
  }
}