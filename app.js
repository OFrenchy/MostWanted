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
// -X As a developer, I want to use the array.map() advanced array method within my project.
// - As a developer, I want to make consistent commits with good, descriptive messages.

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
    // alert("test first one is: " + ((!isNaN("111"))  &&  ("111" != "") && ("111").indexOf(" ") == -1));
    // alert("test  2nd  one is: " + ((!isNaN("1 11"))  &&  ("11 1" != "") && ("1 11").indexOf(" ") == -1));

    // // test for alphabetic characters
    // alert("testing isAlphabetic function: " + isAlphabetic("abc") );
    // alert("testing isAlphabetic function: " + isAlphabetic("ab12cd"));


    
    let searchResults;
    var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'y' for yes or 'n' for no", yesNo).toLowerCase();
    switch(searchType){
        case 'y':
            // this next line works
            // let thisPerson = searchByName(people);
            searchResults = searchForPeople("name", people) ;
            mainMenu(searchResults[0], people);
            break;
        case 'n':
            // TODO: search by traits
            searchResults = searchForPeople("traits", people);
            // if (searchResults === -1) {
            //     // we have already prompted invalid input, so just restart app - or break?
            //     break;
            //     //app(people);
            // }
            // Display the list of names, then restart
            if (searchResults.length >= 1 ){
                displayPeople(searchResults);
            }
            break;  // or app(people); ???

            //mainMenu(searchResults[0], searchResults);

            break;
        default:
            alert("Invalid input. Please try again!");
            app(people); // restart app
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
        // DONE!  TODO: get person's info
        displayPerson(person);
        break;
    case "family":
        // DONE!  TODO: get person's family
         searchResults = searchForPeople("family", people, person.id);

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
        //searchResults = searchForPeople("descendants", people, person.id);
        
        alert("test");
        searchForPeople("descendants", people, person.id);
        // if (searchResults.length >= 1 ){
        //     displayPeople(searchResults);
        // }
        // else {
        //   // TODO NEED TO TEST THIS
        //   alert("No descendants found for " + person.fullName);
        // }
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
        //return filteredPeople;

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
        //return filteredPeople;
    }
    else if (searchType === "descendants") {
        // TODO
      //   filteredPeople = people.filter(function(el){
        
      //     if(el.parents.indexOf (idToSearch) >= 0){
      //        el.relationship  = "descendants";
          
      //     return el;
      //   }
      // });
     // searchResults = searchForPeople("descendants", people, person.id);
        // TODO

        let thisPersonArray = people.filter(function(el){
            if(el.id == idToSearch){
             return el;
            }
        });

        let descendantsString = "";  //findDescendants(thisPersonArray, people, 0);
        
        descendantsString = findDescendants(thisPersonArray, people, 0);
        alert(descendantsString);
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
        //searchCriteria = searchCriteria.toLowerCase();
        if (searchCriteria == -1 ){
            // TODO - replace with start over?
            alert("handle this cancel")
        }
        //console.log(searchCriteria);
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
            // check for a number for 


            // loop through all the keys, looking for the key whose first letter
            // matches the input initial;  when it finds the full key, apply 
            // the key & search value to filter the list of people      
            for (let key in people[0]) {
                // if the first letter of the key matches the first letter of the search field, 
                // this is the correct key, so 
                // apply the filter with the key & searchValue
                if (key[0] === searchLetter) {
                    // we found the right key, apply the filter

                    // PROBLEM HERE WITH el.key, which comes up undefined - 
                    // key = "eyeColor", for example, searchValue = "brown"
                    // How do I pass this key to this filter 
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
        console.log(searchArray);

        // people = people.map(function (el) //
        //     el.fullName = el.firstName + " " + el.lastName;
        //     el.age = calculate_age(el.dob);
        //     el.relationship = "";
        //     return el;
        // //);

        // filteredPeople = people.filter(function(el) //
        //     if(el.firstName === firstName && el.lastName === lastName) {
        //         // el.fullName = el.firstName + " " + el.lastName;
        //         // el.age = calculate_age(el.dob);
        //         return el;
        //     }
        // //);

    }
    return filteredPeople;
}

function findDescendants(filteredPeople, people, descendantLevel){
    let descendantsString = "";
    let childrenFound;
    let indentString = multiplyChars("   ", descendantLevel);

    for(let i = 0; i < filteredPeople.length; i++){
        descendantsString = descendantsString + indentString + filteredPeople[i].fullName + "\n";
        childrenFound = people.filter(function(el){
            if(el.parents.indexOf (filteredPeople[i].id) >= 0){
                return el;
            }
        });
        if(childrenFound.length > 0){
            descendantLevel++;
            // let tempString = findDescendants(childrenFound, people, descendantLevel);
            // descendantsString = descendantsString + tempString;
            descendantsString = descendantsString + findDescendants(childrenFound, people, descendantLevel);
        }
    }
    return descendantsString;
}

function multiplyChars(charsToRepeat, multiplier) {
    let thisString = "";
    for (let i = 0; i < multiplier; i++) {
        thisString = thisString + charsToRepeat.toString();
    }
    return thisString;
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

// temp function to build the prompt & search by traits
function searchTypeTraits() {
    

}   

