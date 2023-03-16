const initialReviews = [
  {
    id: 1,
    text: "START UP MARKET | SM CDO Downtown Premier through the support of City of Cagayan de Oro and Department of Trade and Industry Misamis Oriental launches its Start-Up Market as support to homegrown products.",
    source:
      "https://www.facebook.com/tacosdeamigos/posts/pfbid0Ta3vPWcHNFQhRvJYuWgmbe8fsgbAWyyzqd6LeZuhrNpEKKtk7RB68wTkK5KBLheil",
    rating: "admin",
    thumbs_up: 24,
    heart: 9,
    thumbs_down: 4,
    createdIn: 2023,
  },
  {
    id: 2,
    text: "The Vice Mayor of our city Ma'am Bebot, purchased and sampled the finest taco in CDO.",
    source:
      "https://www.facebook.com/tacosdeamigos/posts/pfbid02f5756BdYQyGvD9RiLqHU7324rLrzPVTbWdkkB2CnFzcAGSQVnow71AEXPPJDhTv3l",
    rating: "admin",
    thumbs_up: 24,
    heart: 9,
    thumbs_down: 4,
    createdIn: 2023,
  },
  {
    text: "Flowers die. Chocolates get eaten. And don't get us started on what happens to those greeting cards you go But TACOS  have no such faults. Whether you're single, dating, or your significant other makes you question your commitment to this whole relationship thing, Tacos de Amigos is here for you. Send a box of tacos to the one you love (and if it works out, maybe another box or two) and watch their heart grow ever-full with warmth, fuzziness and spice.",
    rating: "admin",
    thumbs_up: 24,
    heart: 9,
    thumbs_down: 4,
    createdIn: 2023,
  },
];

const RATING = [
  { name: "very satisfied", color: "#16a34a" },
  { name: "satisfied", color: "#fb923c" },
  { name: "neutral", color: "#93A689" },
  { name: "unsatisfied", color: "#dc2626" },
  { name: "admin", color: "#64748b" },
];

// Selecting DOM elements

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const reviewlist = document.querySelector(".review-list");

// console.dir(btn); - show DOM content

// reviewlist.remove(); // this works also

// CREATE DOM Elements: Render reviews in list
reviewlist.innerHTML = ""; // clear ul list

// Load data from SUPABASE
//res = response

loadReviews();

async function loadReviews() {
  const res = await fetch(
    "https://aehsfsblrgxfbnupzffm.supabase.co/rest/v1/reviews?",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHNmc2Jscmd4ZmJudXB6ZmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NzE1NzAsImV4cCI6MTk5MjA0NzU3MH0.1KoVcQpf3fipT_2ufHegj6Cz6e321z5oPoH-bKsTZwU",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHNmc2Jscmd4ZmJudXB6ZmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NzE1NzAsImV4cCI6MTk5MjA0NzU3MH0.1KoVcQpf3fipT_2ufHegj6Cz6e321z5oPoH-bKsTZwU",
      },
    }
  );
  // create data to json file
  const data = await res.json();

  // const filteringData = data.filter((fact) => fact.rating === "Very satisfied");
  AutoCreateReviewList(data);
}

// AutoCreateReviewList(initialReviews);

function AutoCreateReviewList(dataArray) {
  // method to auto create list items
  const html_Arr = dataArray.map(
    (review) => `<li class="fact">
  <p>${review.text}
    
  </p>
  <span class="tag" style="background-color: ${
    RATING.find((rate) => rate.name === review.rating).color
  }
    ">${review.rating}</span>
  </li>`
  );

  const html = html_Arr.join(" ");
  reviewlist.insertAdjacentHTML("afterbegin", html);
}

// Toggle form Visibility | show and hide

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a review";
  }
});

// FILTER METHOD - loops over array | check condition if condition is true it will include to final array

// console.log([10, -6, 15, 90, 54, 28, 13].filter((el) => el < 10));

// FIND METHOD -

// console.log([10, -6, 15, 90, 54, 28, 13].find((el) => el < 10));

// DOM MANIPULATION

/** 
let votesInteresting = 23;
let votesMindblowing = 5;
const text = "Lisbon is the capital of Portugal";

votesInteresting = votesInteresting + 1;
votesInteresting++;
console.log(votesInteresting);

let totalUpvotes = votesInteresting + votesMindblowing;
console.log("Upvotes: ", totalUpvotes);

let votesFalse = 4;
const isCorrect = votesFalse < totalUpvotes;

console.log(parseFloat("245.154874512154"));
console.log(parseInt("548number"));

*/

//function called calcFactAge
/**
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  if (age >= 0) return age;
  else return "Impossible year";
  // return 2023 - year;
}
const age1 = calcFactAge(2015);
console.log("created", age1, "years ago");

console.log(calcFactAge(2020));
console.log(calcFactAge(2036));

// ARROW FUNCTION

const calFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;

console.log(calFactAge2(2010));
console.log(calFactAge2(2045));

 */
/** 
let votesInteresting = 20;
let votesMindblowing = 5;

if (votesInteresting === votesMindblowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (votesInteresting > votesMindblowing) {
  console.log("Interesting fact");
} else if (votesInteresting < votesMindblowing) {
  console.log("Mindblowing fact!");
}

// falsy values: 0, '', null, undefined
// truthy values: everything else....

if (votesMindblowing) {
  console.log("Truthy");
} else {
  console.log("Falsy");
}

let votesFalse = 77;
const totalUpvotes = votesInteresting + votesMindblowing;

// TERNARY OPERATOR -> ?
// can be return: int, float, string, boolean
const message = totalUpvotes > votesFalse ? true : false;

// alert(message);

// Template literals - String

const text = "Lisbon is the capital of Portugal";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}". It is ${calcFactAge(
  2009
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "a fact" : "a bluff"
}`;

console.log(str);


*/

/** 

//ARRAY

const fact = ["Lisbon is the capital of Portugal", 2015, true];
console.log(fact);
// getting data from array
console.log(fact[0]); // access first index
console.log(fact.length); // length of array
console.log(fact[fact.length - 1]); // get the last index

const review = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  false,
  "Admin",
  2023,
];

// technique: destructuring
// creating variables from data in array

// const [text, createdIn, isCorrect] = fact;
// console.log(text);

// Spread operator ...
// adding data from previous array to new array
const newFact = [...review, ...fact, "society"];
console.log(newFact);
console.log(newFact.length);

//OBJECTS

const reviewObj = {
  text: "I really love tacos de amigos",
  createdIn: new Date().getFullYear(),
  role: "Admin",
  isCorrect: true,
  createSummary: function () {
    // this keyword points the current object
    return `The fact is " ${
      this.text
    }" - ${this.role.toUpperCase()}, posted on ${this.createdIn}`;
  },
};

//retrieving
console.log(reviewObj.text); // way 1 - most used
console.log(reviewObj["createdIn"]); // way 2

const { text, role, isCorrect } = reviewObj;

console.log(text, "-", role);

console.log(reviewObj.createSummary());

//array methods to loop over arrays.

//Foreach
[2, 4, 6, 8].forEach(function (el) {
  console.log(el);
});

const multiply = [2, 4, 6, 8].map((el) => el * 10);
console.log(multiply);

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const all_categories = CATEGORIES.map((element) => element.name);
console.log(all_categories);

const all_colors = CATEGORIES.map((element) => element.color);
console.log(all_colors);

// ARRAY OF OBJECT or OBJECTS INSIDE ARRAY
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const for_IDs = initialFacts.map((element) => element.id);
console.log(for_IDs);

const fact_ages = initialFacts.map((element) => element.createdIn);
console.log(fact_ages);

// OWNED MADE FUNCTION
const calFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Year needs to be less or equal to ${new Date().getFullYear()}`;

const calculatedFactAge = initialFacts.map((el) => calFactAge2(el.createdIn));
console.log(calculatedFactAge);
console.log(calculatedFactAge.join(" years old ")); // string separator : join

*/
