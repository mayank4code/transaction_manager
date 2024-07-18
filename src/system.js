import readline from 'readline';
import Transaction from './MongoDB/Models/Transaction.js';
import Person from './MongoDB/Models/Person.js';
import csvToArray from './csvToArray.js';


// Helper function to process a single transaction
async function processTransaction(A, B, X) {
  X = parseInt(X);

  let personA = await Person.findOne({ personName: A });
  let personB = await Person.findOne({ personName: B });

  if (!personA) {
    personA = new Person({ personName: A });
  }
  if (!personB) {
    personB = new Person({ personName: B });
  }

  personA.owes_amount += X;
  personA.owes_trans.push({ to_person: B, amount: X });

  personB.debt_amount += X;
  personB.debt_trans.push({ to_person: A, amount: X });

  await personA.save();
  await personB.save();

  const transaction = new Transaction({ A, B, Amount: X });
  await transaction.save();
}

// Function to query total debt owed by a person
async function queryDebt(person) {
  const personData = await Person.findOne({ personName: person });

  if (personData) {
    console.log(`Total debt owed by ${person}: ${personData.owes_amount}`);
    console.log(`Debt transactions: ${JSON.stringify(personData.owes_trans)}`);
  } else {
    console.log(`${person} has no debt.`);
  }
}

// Function to query total money owed to a person
async function queryMoneyOwed(person) {
  const personData = await Person.findOne({ personName: person });

  if (personData) {
    console.log(`Total money owed to ${person}: ${personData.debt_amount}`);
    console.log(`Owed transactions: ${JSON.stringify(personData.debt_trans)}`);
  } else {
    console.log(`${person} is not owed any money.`);
  }
}

// Function to find the person with the most money owed
async function queryMostMoneyOwed() {
  const persons = await Person.find().sort({ debt_amount: -1 }).limit(1);

  if (persons.length > 0) {
    const maxOwed = persons[0];
    console.log(`Person with most money owed: ${maxOwed.personName} (${maxOwed.debt_amount})`);
  } else {
    console.log(`No data available.`);
  }
}

// Function to find the person with the most debt
async function queryMostDebt() {
  const persons = await Person.find().sort({ owes_amount: -1 }).limit(1);

  if (persons.length > 0) {
    const maxDebt = persons[0];
    console.log(`Person with most debt: ${maxDebt.personName} (${maxDebt.owes_amount})`);
  } else {
    console.log(`No data available.`);
  }
}

// Function to process multiple transactions from a CSV file
async function processMultipleTransaction(filePath, mainMenu) {
  try {
    const array = await csvToArray(`./../assets/${filePath}`);
    // const array = await csvToArray(`./../assets/transacions.csv`);
    let count = 0;
    
    for (const transaction of array) {
      const [A, B, X] = transaction.split(',');
      await processTransaction(A, B, X);
      count++;
    }

    console.log(`Total ${count} transactions are added`);
    mainMenu();
  } catch (error) {
    console.error('Error processing the CSV file:', error);
    promptCSVFile();
  }

  function promptCSVFile() {
    rl.question('Enter the name of the CSV file again (make sure the file is in the transcationFiles folder with a .csv extension): ', (filePath) => {
      processMultipleTransaction(filePath, mainMenu);
    });
  }
}

// Function to handle user input from the command line
function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function mainMenu() {
    rl.question('Enter command: ', async (command) => {
      const [cmd, ...args] = command.split(' ') ;

      switch (cmd) {
        case 'add_transaction':
            console.log(args[0] ,"owes" , args[1] ,args[2] , "amount" );

          if (args.length === 3) {
            const [A, B, X] = args;
            await processTransaction(A, B, X);
          } else {
            console.log('Invalid number of arguments for add_transaction.');
          }
          break;
        case 'query_debt':
          if (args.length === 1) {
            const [person] = args;
            await queryDebt(person);
          } else {
            console.log('Invalid number of arguments for query_debt.');
          }
          break;
        case 'query_money_owed':
          if (args.length === 1) {
            const [person] = args;
            await queryMoneyOwed(person);
          } else {
            console.log('Invalid number of arguments for query_money_owed.');
          }
          break;
        case 'query_most_money_owed':
          await queryMostMoneyOwed();
          break;
        case 'query_most_debt':
          await queryMostDebt();
          break;
        case 'add_transactions_from_csv':
          if (args.length === 1) {
            const [filePath] = args;
            await processMultipleTransaction(filePath, mainMenu);
          } else {
            console.log('Invalid number of arguments for add_transactions_from_csv.');
          }
          break;
        case 'exit':
          rl.close();
          return;
        default:
          console.log('Invalid command, please try again.');
          break;
      }
      mainMenu();
    });
  }

  mainMenu();
}

export default startCLI;
