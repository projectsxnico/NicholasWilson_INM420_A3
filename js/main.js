// I need to access the form and word input, 
let form = document.getElementById("wordSearch");
let wordInput = document.getElementById("wordInput");

// I need to access the <p>'s that will display the result
let dictionaryResult = document.getElementById("dictionary_result");
let thesaurusResult = document.getElementById("thesaurus_result");

/* The form will need an event listener so that it can detect the user's
submission. It will then assign the user's input to "word"  */
form.addEventListener("submit", async function(event) {
    
    // used to prevent the page refresh after submission
    event.preventDefault();

    let word = wordInput.value;

/* Since I want the dictionary and thesaurus to retrieve results based
on the user's input, I will use the placeholder ${word} for the query, this
will allow the input that was assigned to "word" to be provided as the query
in the API */

let dictionaryUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=06ca81f3-f556-4197-a68d-c3b7c62f7f9e`;
let thesaurusUrl = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=7cef0586-e7e0-4628-afc6-076b0814a9e1`;


/* using an aysnc function with await to retrieve data from the API before
moving onto the next line */
async function getData() {

    try {
    // DICTIONARY ===========================================================

    /* await is used to allow the API to fetch the dictionary API before
    moving on to the next line of code*/
    let dictionaryResult = await fetch(dictionaryUrl);

    //after fetching the data it needs to be converted to json
    let jsonDictionary = await dictionaryResult.json();

    /* using the "shortdef" object will access the definition, I assigned
    "definition" to jsonResult[0].shortfef to log it */
    let definition = jsonDictionary[0].shortdef; 
    
    console.log(definition); 

    /* "defContent" is assigned to retrieve the <p> for #dictionary_result
    so the result can be displayed there*/
    let defContent = document.querySelector("#dictionary_result")
    defContent.innerHTML = `
        <p>Definitions: ${definition}</p>
    `


    // THESAURUS ===========================================================
    let thesaurusResult = await fetch(thesaurusUrl);

    //after fetching the data it needs to be converted to json
    let jsonThesaurus = await thesaurusResult.json();

    /* for the thesaurus API, I had to access "syns" by targeting the respective
    element in the array */
    let synonyms = jsonThesaurus[0].meta.syns[0];

    console.log(synonyms); 

    /* "thesContent" is assigned to retrieve the <p> for #thesaurus_result
    so the result can be displayed there*/
    let thesContent = document.querySelector("#thesaurus_result")
    thesContent.innerHTML = `
        <p>Synonyms: ${synonyms}</p>
    `

    } catch (error) {
        console.log("error: ", error);
    }
}

getData();

})









// console.log("hello main.js")

/* */



// NOTES

/* 
URL's consist of these section: the base URL, the end point, the query parameter, and the API key

URL: https://
        baseURL/
        endpoint/
        ?q
        &key
*/

/* When using template literals you must use backticks [`] */