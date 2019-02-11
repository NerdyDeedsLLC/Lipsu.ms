var WordPOS = require('wordpos'),
    wordpos = new WordPOS(); // Declarations


const d = document,
      otp = d.getElementById('output'),
      otpFL = d.getElementById('full-word-list');
let inp = d.getElementById('input-text-to-parse');
let ipv = inp.value; // Extract unique words into a sorted array
// Remove punct. and leading/trailing whitespace

ipv = ipv.replace(/[+,.?!";:/\\()\[\]\{\}]/gim, ' ').trim(); // Break into array on whitespace (1+ length)

ipv = ipv.split(/\s+/gim); // Alphabetize array

ipv = ipv.sort(); // Remove duplicates

ipv = [...new Set(ipv)];
wordpos.getPOS(ipv, console.log); // Break out uppercase and lowercase words (attempting to isolate proper nouns
// Extract uppercase words into their own array

let ipvUpper = ipv.filter(w => /([A-Z]\S?)/.test(w)); // Extract lowercase words into their own array

let ipvLower = ipv.filter(w => !ipvUpper.includes(w)); // Dictionary check (the idea here being that, if a capitalized word appears in the dictionary, it
// can be safely shifted into the lowercase column. This isn't perfect. This will give false
// positives on words like:
// - Possessive pronouns ("I", I've)
// - Divine nouns, like "God" and worse, divine possessive pronouns ("His", "My")
// - Honorifics ("Mister", Mrs., Master)
// - Titles/Ranks ("King", "Commander", "Duke", "President")
// - Dictionary Proper Nouns ("September", "Earth")
// - Names that overlap dictionary words ("Prince", "Titanic", "Madonna")

let ipvDictionary = [];
let ipvProperNouns = [];

for (var i = 0; i < ipvUpper.length; i++) {
  let w = ipvUpper[i];
} // Output results


otpFL.innerHTML = `${ipv.join(', ')}`;
otp.value = `Capitalized Words
${ipvUpper}

Capitalized Words (not in dictionary)
${ipvProperNouns}

Capitalized Words (found in dictionary)
${ipvDictionary}

Lowercase Words
${ipvLower}`;