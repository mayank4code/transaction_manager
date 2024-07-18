const readline = require('readline');
// const fs = require('fs');

//! if file wrong file name then handle that error 
////// run mainMenu after the completion of added transactions  - trackled

// Data structures to hold transactions and debt/owed information
let transactions = [];
let persons = {};

// Helper function to process a single transaction
function processTransaction(A, B, X) {
  X = parseInt(X);

  if (!persons[A]) {
    persons[A] = { name: A, debt_amount: 0, owes_amount: 0, debt_trans: [], owes_trans: [] };
  }
  if (!persons[B]) {
    persons[B] = { name: B, debt_amount: 0, owes_amount: 0, debt_trans: [], owes_trans: [] };
  }

  persons[A].owes_amount += X;
  persons[A].owes_trans.push({B:X});

  persons[B].debt_amount += X;
  persons[B].debt_trans.push({A:X});

  transactions.push({ A, B, X });
}

// Function to query total debt owed by a person
function queryDebt(person) {
  if (persons[person]) {
    console.log(`Total debt owed by ${person}: ${persons[person].owes_amount}`);
    console.log(`Debt transactions: ${persons[person].owes_trans.join('; ')}`);
  } else {
    console.log(`${person} has no debt.`);
  }
}

// Function to query total money owed to a person
function queryMoneyOwed(person) {
  if (persons[person]) {
    console.log(`Total money owed to ${person}: ${persons[person].debt_amount}`);
    console.log(`Owed transactions: ${persons[person].debt_trans.join('; ')}`);
  } else {
    console.log(`${person} is not owed any money.`);
  }
}

// Function to find the person with the most money owed
function queryMostMoneyOwed() {
  let maxOwed = { name: null, amount: 0 };

  for (const person in persons) {
    if (persons[person].debt_amount > maxOwed.amount) {
      maxOwed = { name: person, amount: persons[person].debt_amount };
    }
  }

  console.log(`Person with most money owed: ${maxOwed.name} (${maxOwed.amount})`);
}

// Function to find the person with the most debt
function queryMostDebt() {
  let maxDebt = { name: null, amount: 0 };

  for (const person in persons) {
    if (persons[person].owes_amount > maxDebt.amount) {
      maxDebt = { name: person, amount: persons[person].owes_amount };
    }
  }

  console.log(`Person with most debt: ${maxDebt.name} (${maxDebt.amount})`);
}



function processMultipleTransaction(filePath , mainMenu ) {
  // # csv conversion
  const csvToArray = require('../../csvToArray.js');
  // const filePath = './transactions.csv'; 
  filePath = './transcationFiles/' + filePath ; 


  csvToArray(filePath)
      .then((array) => {
          processCSVfile(array);
          console.log('Received array from CSV:');
          console.log(array);
          mainMenu();
      })
      .catch((error) => {
          console.error('Error processing the CSV file:', promptCSVFile());
      });
      function promptCSVFile() {
        rl.question('Enter the name of the CSV file again (make sure the file is in the transcationFiles folder with a .csv extension): ', (filePath) => {
            processMultipleTransaction('./transcationFiles/' + filePath);
        });
    }
  // # csv conversion

  function processCSVfile(transactionArray){
    let count = 0 ;
    for (let index = 0; index < transactionArray.length; index++) {
      const transaction = transactionArray[index];
      const [A, B, X] = transaction.split(',');
      processTransaction(A,B,X);
      count++;
    }
    console.log(`total ${count} Transactions are added`);
  }  
}









startCLI();
// Function to handle user input from the command line
function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function mainMenu() {
    console.log('\nPress 1 to Add a Single Transaction');
    console.log('Press 2 to Query Debt Owed by Person');
    console.log('Press 3 to Query Money Owed to Person');
    console.log('Press 4 to Query Person with Most Money Owed');
    console.log('Press 5 to Query Person with Most Debt');
    console.log('Press 6 to Add Transactions from .csv File');
    console.log('Press 0 to exit');

    rl.question('Choose an option: ', (option) => {
      switch (option) {
        case '1':
          rl.question('Enter transaction (A,B,X): ', (input) => {
            const [A, B, X] = input.split(',');
            processTransaction(A, B, X);
            mainMenu();
          });
          break;
        case '2':
          rl.question('Enter the name of the person: ', (person) => {
            queryDebt(person);
            mainMenu();
          });
          break;
        case '3':
          rl.question('Enter the name of the person: ', (person) => {
            queryMoneyOwed(person);
            mainMenu();
          });
          break;
        case '4':
          queryMostMoneyOwed();
          mainMenu();
          break;
        case '5':
          queryMostDebt();
          mainMenu();
          break;
        case '6':
          rl.question(' Make sure the csv file is in transcationFiles folder only\n with .csv extension \n Enter the Name of csv file : ', (filePath) => {
            processMultipleTransaction(filePath , 
              mainMenu );
          });
          break;
        case '9':
          console.log(persons);
          console.log(typeof(persons));
          console.log(transactions);
          
          break;
        case '0':
          rl.close();
          break;
        default:
          console.log('Invalid option, please try again.');
          mainMenu();
          break;
      }
    });
  }
  mainMenu(); 
}


      