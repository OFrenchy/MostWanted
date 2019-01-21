
// TODO : only add relationship if needed - may not want to add to master at launch

/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// - As a developer, I want to run validation on any user input, ensuring that a user 
//      is re-prompted when they provide invalid input.
// -X As a user, I want to be able to search for someone based on a single criterion.
// -X As a user, I want to be able to search for someone based on 2-5 criteria.
// -X As a user, I want to be able to look up someone’s information after I find them 
//      with the program (display values for the various traits of the found person).
// -X As a user, I want to be able look up someone’s descendants after I find them with 
//      the program (display the names of the descendants), using recursion.
// -X As a user, I want to be able look up someone’s immediate family members after I 
//      find them with the program (display the names of the family members and their 
//      relation to the found person).
// -X As a developer, I want to use the array.map() advanced array method within my project.
// -X As a developer, I want to make consistent commits with good, descriptive messages.
// - As a developer, I choose to define "immediate family" as spouse and children. 

// The following are not in the scope of the project:
// -----  FOR FUTURE IMPROVEMENTS  -------------------
// - As a developer, FOR FUTURE IMPROVEMENTS, I want to verify that only one person is 
//      found when doing a name search
// - As a developer, I want to display the spouse's and parents names instead of their 
//      id numbers.
// - As a developer, I want to exit the function gracefully any time the user hits
//      escape instead of entering yes or no or whatever it's expecting
// - As a user, I want to see a list of valid values for the various traits, 
//      e.g. eyeColor: green, blue, hazel, etc., which would be culled from the 
//      people's eyeColor field


// app is the function called to start the entire application
function app(people){
    
    // Add these fields to all people at the start
    people = people.map(function (el) {
        el.fullName = el.firstName + " " + el.lastName;
        el.age = calculate_age(el.dob);
        //el.relationship = "";
        return el;
    });
    
    let searchResults;
    var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'y' for yes or 'n' for no", yesNo).toLowerCase();
    switch(searchType){
        case "y":
            // Search by name
            searchResults = searchForPeople("name", people) ;
            mainMenu(searchResults[0], people);
            break;
        case "n":
            // Search by traits
            searchResults = searchForPeople("traits", people);
            // Display the list of names, then restart
            if (searchResults.length >= 1 ){
                displayPeople(searchResults);
            }
            else {
                alert("No person found based on those traits.");
            }
            break;  // or app(people); ???
        default:
            alert("Invalid input or user cancelled.  Please try again!");
            // removed - if user hits escape or clicks cancel, 
            // he ends up in an infinite loop with no way to cancel
            //app(people); // restart app
        break;
    }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
      let searchResults;
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
        // Get person's info
        displayPerson(person);
        break;
    case "family":
        // Get person's family
        searchResults = searchForPeople("family", people, person.id);
        if (searchResults.length >= 1 ){
            displayPeople(searchResults);
        }
        else {
            alert("No family found for " + person.fullName);
        }
        break;
    case "descendants":
        // Get person's descendants
        let descendantsString = searchForPeople("descendants", people, person.id);
        if (descendantsString.length >= 1 ){
            alert(descendantsString);
        }
        else {
          alert("No descendants found for " + person.fullName);
        }
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

// obsolete - incorporated in searchForPeople
// function searchByName(people){
//     var firstName = properCase(promptFor("What is the person's first name?", chars));
//     var lastName = properCase(promptFor("What is the person's last name?", chars));
//     let filteredPeople = people.filter(function(el) {
//         if(el.firstName === firstName && el.lastName === lastName) {
//         //     el.fullName = el.firstName + " " + el.lastName;
//         //     el.age = calculate_age(el.dob);
//          return el;
//         }
//     });
//     return filteredPeople;
// }

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
        return filteredPeople;

    }
    else if (searchType === "family") {
        //var searchCriteria = "fill this in";
        // idToSearch
        filteredPeople = people.filter(function(el) {
            
            // TODO - test to see if the idToSearch is the 1st or 2nd in the list of parents
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
        return filteredPeople;
    }
    else if (searchType === "descendants") {
        // Search for descendants
        let thisPersonArray = people.filter(function(el){
            if(el.id == idToSearch){
             return el;
            }
        });
        let descendantsString = "";  //findDescendants(thisPersonArray, people, 0);
        descendantsString = findDescendants(thisPersonArray, people, 0);
        // alert(descendantsString);
        //    For future development:  should not return a string, 
        //    but should return an array of people, like the other options
        return descendantsString;
    }
    
    else if (searchType === "traits") {
        
        // TODO:  do we want to get a list of valid values for the various traits?

        // build the instructions for searching by traits:  
        // the first letter of the trait followed by the value to search for, 
        // followed by comma, e.g "e green, g female" ; e for eyeColor g for gender
        let stringForPrompt = "";
        stringForPrompt = "Enter your search criteria using the first letter of the trait " +
            ", based on the list of traits below.  " + 
            "For example, to search for a green eyed female, enter \n'e green, g female' :\n" +
            "gender (male or female)\nage\nheight\nweight\neye color\noccupation";

        searchCriteria = prompt(stringForPrompt).toLowerCase();
        if (searchCriteria == -1 ){
            // TODO - test - replace with start over?
            //alert("handle this cancel")
            return -1; 
        }
        // split the criteria by commas
        let searchArray = searchCriteria.split(",");
        
        // set up filtered people object which will get further & further filtered
        filteredPeople = people;
        // loop through the criteria, finding the key value and
        // filter the people based on this trait

        for (i = 0; i < searchArray.length; i++ ) {
            // if the letter matches the first letter of the key, 
            // use this key to further filter the filteredPeople
            let searchPair = (searchArray[i].trim()).split(" ");
            // verify two items in this array
            if (searchPair.length != 2) {
                // TODO - handle this invalid user input
                alert("Invalid input, please try again.");
                return -1; 
            }
            let searchLetter = (searchPair[0]).trim();
            let searchValue = (searchPair[1]).trim();
            
            // loop through all the keys, looking for the key whose first letter
            // matches the input initial;  when it finds the full key, apply 
            // the key & search value to filter the list of people      
            for (let key in people[0]) {
                // if the first letter of the key matches the first letter of the search field, 
                // this is the correct key, so 
                // apply the filter with the key & searchValue
                if (key[0] === searchLetter) {
                    // we found the right key, apply the filter
                    // key = "eyeColor", for example, searchValue = "brown"
                    filteredPeople = filteredPeople.filter(function(el) {
                        if((el[key]).toString() == searchValue ) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    // found the right key; results have been filtered, 
                    // we can exit the for loop for this trait
                    console.log(filteredPeople.length + " found")
                    break;
                }
            }
        }   
        return filteredPeople;

    }
    //return filteredPeople;
}

function findDescendants(filteredPeople, people, descendantLevel){
    let descendantsString = "";
    let childrenFound;
    let indentString = multiplyChars("   ", descendantLevel);
    descendantLevel++;

    for(let i = 0; i < filteredPeople.length; i++){
        descendantsString = descendantsString + indentString + filteredPeople[i].fullName + "\n";
        childrenFound = people.filter(function(el){
            if(el.parents.indexOf (filteredPeople[i].id) >= 0){
                return el;
            }
        });
        if(childrenFound.length > 0){
            descendantsString = descendantsString + findDescendants(childrenFound, people, descendantLevel);
        }
    }
    return descendantsString;
}

// used by findDescendants to offset children from their parents 
function multiplyChars(charsToRepeat, multiplier) {
    let thisString = "";
    for (let i = 0; i < multiplier; i++) {
        thisString = thisString + charsToRepeat.toString();
    }
    return thisString;
}

// alerts a list of people
function displayPeople(people){
    // Build a list of people, and if there is a relationship string, include it.  
    alert(people.map(function(person){
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
    alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
    do{
        // var response = prompt(question).trim();
        var response = prompt(question);
        if (response == null){
            // user clicked cancel or hit escape
            return "";
        }
        else {
          response = response.trim();
        }
    } while(!response || !callback(response));
    return response;
}

// helper function to pass into promptFor to validate yes/no answers
// CHANGED to allow user to hit escape or click cancel, which results in a null
function yesNo(input){
    return input[0].toLowerCase() == "y" || input[0].toLowerCase() == "n" || input == null;
}

// helper function to pass in as default promptFor validation
// verifies a alphabetic input
function chars(input){
    return isAlphabetic(input);
}

// validates a number - for use in promptFor validation
function isValidNumber(input) {
    // return true if it is NOT a non-number AND it's not an empty string 
    //    AND there is no space in the string 
    //this one is for yesNo. return (!isNaN(input) && input != "" and input.indexOf(" ") == -1);
    return( ((!isNaN(input))  &&  (input != "") && (input).indexOf(" ") == -1));
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

// function to determine if string is all alhpabetical characters for promptFor validation
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



  // For future reference:
  // from https://www.w3schools.com/js/js_string_methods.asp
  // if (!String.prototype.trim) {
  //   String.prototype.trim = function () {
  //     return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  // };
