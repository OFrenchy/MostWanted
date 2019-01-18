/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// - As a developer, I want to run validation on any user input, ensuring that a user 
//      is re-prompted when they provide invalid input.
// - As a user, I want to be able to search for someone based on a single criterion.
// - As a user, I want to be able to search for someone based on 2-5 criteria.
// -X As a user, I want to be able to look up someone’s information after I find them 
//      with the program (display values for the various traits of the found person).
// - As a user, I want to be able look up someone’s descendants after I find them with 
//      the program (display the names of the descendants), using recursion.
// -X As a user, I want to be able look up someone’s immediate family members after I 
//      find them with the program (display the names of the family members and their 
//      relation to the found person).
// - As a developer, I want to use the array.map() advanced array method within my project.
// - As a developer, I want to make consistent commits with good, descriptive messages.

// The following are not in the scope of the project:
// - As a developer, FOR FUTURE IMPROVEMENTS, I want to verify that only one person is 
//      found when doing a name search
// - As a developer, I want to display the spouse's and parents names instead of their 
//      id numbers.
// - As a developer, I want to exit the function gracefully any time the user hits
//      escape instead of entering yes or no or whatever it's expecting


// function promptForInput(promptForInput, dataType) {   
//     let userInput = prompt(promptForInput)
//     alert(typeof userInput == dataType);
//     if (typeof userInput == dataType ){
//         console.log(true)
//         return userInput;
//     }
// }

// var person = {
//   firstName: "John",
//   lastName : "Doe",
//   id       : 5566,
//   fullName : function() {
//     return this.firstName + " " + this.lastName;
//   }
// };        

// app is the function called to start the entire application
function app(people){
    

    // Add these fields to all people at the start
    people = people.map(function (el) {
        el.fullName = el.firstName + " " + el.lastName;
        el.age = calculate_age(el.dob);
        el.relationship = "";
        return el;
    });
    // console.log(people);

    //alert("first one is: " + (!isNaN("111") && "111" != "" && ("111").indexOf(" ") == -1));
    
    // test for numeric inputs
    alert("test first one is: " + ((!isNaN("111"))  &&  ("111" != "") && ("111").indexOf(" ") == -1));
    alert("test  2nd  one is: " + ((!isNaN("1 11"))  &&  ("11 1" != "") && ("1 11").indexOf(" ") == -1));

    // test for alphabetic characters
    alert("testing isAlphabetic function: " + isAlphabetic("abc") );
    alert("testing isAlphabetic function: " + isAlphabetic("ab12cd"));


    
    var searchResults;
    var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'y' for yes or 'n' for no", yesNo).toLowerCase();
    switch(searchType){
        case 'y':
            // this next line works
            // let thisPerson = searchByName(people);
            let searchResults = searchForPeople("name", people) ;
            mainMenu(searchResults[0], people);
            break;
        case 'n':
            // TODO: search by traits
            searchResults = searchForPeople("traits", people);

            break;
        default:
            alert("Invalid input. Please try again!");
            app(people); // restart app
        break;
    }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

    /* Here we pass in the entire person object that we found in our search, 
        as well as the entire original dataset of people. We need people in 
        order to find descendants and other information that the user may want. */

    if(!person){
        alert("Could not find that individual.");
        return app(people); // restart
    }

    var displayOption = prompt("Found " + person.firstName + " " + person.lastName + 
        " . Do you want to know their 'info', 'family', or 'descendants'? " + 
        "Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
        // DONE!  TODO: get person's info
        displayPerson(person);
        break;
    case "family":
        // TODO: get person's family
        let searchResults = searchForPeople("family", people, person.id);

        //displayPeople
        if (searchResults.length >= 1 ){
            displayPeople(searchResults);
        }
        else {
          // TODO NEED TO TEST THIS
          alert("No family found for " + person.fullName);
        }
        break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
    var firstName = properCase(promptFor("What is the person's first name?", chars));
    var lastName = properCase(promptFor("What is the person's last name?", chars));

    let filteredPeople = people.filter(function(el) {
        if(el.firstName === firstName && el.lastName === lastName) {
        //     el.fullName = el.firstName + " " + el.lastName;
        //     el.age = calculate_age(el.dob);
         return el;
        }
    });
    return filteredPeople;
}

function searchForPeople(searchType = "", people, idToSearch = -1){
    let filteredPeople;
    if (searchType === "name") {
        var firstName = properCase(promptFor("What is the person's first name?", chars));
        var lastName = properCase(promptFor("What is the person's last name?", chars));

        filteredPeople = people.filter(function(el) {
            if(el.firstName === firstName && el.lastName === lastName) {
                // el.fullName = el.firstName + " " + el.lastName;
                // el.age = calculate_age(el.dob);
                return el;
            }
        });
        //return filteredPeople;

    }
    else if (searchType === "family") {
        //var searchCriteria = "fill this in";
        // idToSearch
        filteredPeople = people.filter(function(el) {
            //if(el.currentSpouse === idToSearch || el.parents === idToSearch) {
            if(el.currentSpouse === idToSearch || el.parents.indexOf (idToSearch) >= 0) {
                if(el.currentSpouse === idToSearch) {
                  el.relationship = "Spouse";
                }
                else{
                  el.relationship = "Child";
                }
                return el;
            }
        });
        //return filteredPeople;
    }
    else if (searchType === "descendants") {
        var searchCriteria = "fill this in";

    }
    else if (searchType === "traits") {
        var searchCriteria = "fill this in";

    }


    return filteredPeople;
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    //return if(person.relationship != ""){return person.relationship + ": ";} + person.fullName;
    let returnString = "";
    if (person.relationship != "") {
      returnString = person.relationship + ": ";
    }
    return returnString + person.fullName;
  }).join("\n"));
}
// function displayPeople(people){
//   alert(people.map(function(person){
//     return person.firstName + " " + person.lastName;
//   }).join("\n"));
//}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = ""; //"First Name: " + person.firstName + "\n";
  
    for (let key in person) {
      let value = person[key];
      //console.log(key + ": " + value);
      personInfo += key + ": " + value + "\n";
    }
    // DONE! TODO: finish getting the rest of the information to display
    alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input[0].toLowerCase() == "y" || input[0].toLowerCase() == "n";
}

// helper function to pass in as default promptFor validation
function chars(input){
  
  return isAlphabetic(input);

  //return true; // default validation only
}
function validNumber(input) {
    // taken from getPrimeNumbers
    // if(isNaN(input) || input == "") {
    //     return "Please enter a valid number.";
    // }

    // return true if it is NOT a non-number AND it's not an empty string 
    //    AND there is no space in the string 
    //this one is for yesNo. return (!isNaN(input) && input != "" and input.indexOf(" ") == -1);
    return( ((!isNaN(input))  &&  (input != "") && (input).indexOf(" ") == -1));

    //alert("first one is: " + ((!isNaN("111"))  &&  ("111" != "") && ("111").indexOf(" ") == -1));
    //alert("first one is: " + ((!isNaN(input))  &&  (input != "") && (input).indexOf(" ") == -1));

}
// Function to uppercase the first letter
function upperCaseFirstLetter(thisString = ""){
  if (thisString !== ""){
    return (thisString.charAt(0)).toUpperCase() + thisString.substr(1);
  }
}

function properCase(stringToProperCase) {
    stringToProperCase = stringToProperCase.toLowerCase();
    stringToProperCase = stringToProperCase.split(' ');
  for (let i = 0; i < stringToProperCase.length; i++) {
      stringToProperCase[i] = stringToProperCase[i].charAt(0).toUpperCase() + stringToProperCase[i].slice(1); 
}
  return stringToProperCase.join(' ');
 }

function calculate_age(dobString) { 
    let dob = new Date(dobString);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// This function was borrowed from our Problem Solving Problems code - for palindromes
// function to strip non-alhpabetical characters
function stripNonAlphabeticChars(stringToStrip = "") {
  // loop through string and strip non-alhpabetical characters
  let i = 0;
  let stringStripped = "";
  while(i < stringToStrip.length) {
    if ((stringToStrip.charAt(i) >= "a" && stringToStrip.charAt(i) <= "z") 
      || (stringToStrip.charAt(i) >= "A" && stringToStrip.charAt(i) <= "Z")) {
      stringStripped = stringStripped + stringToStrip.charAt(i); 
    }
    i++;
  }
  return stringStripped;
}

// function to determine if string is strictly alhpabetical characters
function isAlphabetic(inputString = "") {
  // loop through string and strip non-alhpabetical characters
  let i = 0;
  let charIsAlpha = true;
  
  for (i=0; i < inputString.length; i++) {
    if ( !(inputString.charAt(i) >= "a" && inputString.charAt(i) <= "z") 
      &&  !(inputString.charAt(i) >= "A" && inputString.charAt(i) <= "Z")) {
      return false; 
    }
  }
  return true;
}


