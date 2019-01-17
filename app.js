/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// - As a developer, I want to run validation on any user input, ensuring that a user 
//      is re-prompted when they provide invalid input.
// - As a user, I want to be able to search for someone based on a single criterion.
// - As a user, I want to be able to search for someone based on 2-5 criteria.
// - As a user, I want to be able to look up someone’s information after I find them 
//      with the program (display values for the various traits of the found person).
// - As a user, I want to be able look up someone’s descendants after I find them with 
//      the program (display the names of the descendants), using recursion.
// - As a user, I want to be able look up someone’s immediate family members after I 
//      find them with the program (display the names of the family members and their 
//      relation to the found person).
// - As a developer, I want to use the array.map() advanced array method within my project.
// - As a developer, I want to make consistent commits with good, descriptive messages.




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
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      console.log("inside case yes");
      let thisPersonArray = searchByName(people)
      console.log(thisPersonArray[0].lastName);
      displayPerson(thisPersonArray[0]);
      break;
    case 'no':
      // TODO: search by traits
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
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
      el.fullName = this.firstName + " " + this.lastName;
      console.log(new Date() - new Date(el.dob));
      el.age = new Date(new Date() - new Date(el.dob));
      return el;
    }
  });
 return filteredPeople;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  
  personInfo += "gender: " + person.gender + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye olor: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  

  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  

    //   "gender": "male",
    // "dob": "1/18/1949",
    // "height": 71,
    // "weight": 175,
    // "eyeColor": "brown",
    // "occupation": "programmer",





  // testing
  personInfo += "index 0: " + person.property() .index(0) + "\n";
  //personInfo += "index 1: " + person[1] + "\n";
  
  // TODO: finish getting the rest of the information to display
  for (let i = 0; i < data.length; i++)
       
        return this.firstName + " " + this.lastName;
          
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
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
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
