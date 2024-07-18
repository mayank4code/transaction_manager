import readline from 'readline';
import csvToArray from './csvToArray.js';

//Models
import Transaction from './src/Models/Transaction.js';
import Person from './src/Models/Person.js';



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
  personA.owes_trans.push({ owes_to: B, amount: X });

  personB.debt_amount += X;
  personB.debt_trans.push({ debt_to: A, amount: X });

  await personA.save();
  await personB.save();

  const transaction = new Transaction({ A, B, Amount: X });
  await transaction.save();
}

// Function to query total debt owed by a person
async function queryDebt(person) {
  const personData = await Person.findOne({ personName: person });

  if (personData) {
    console.log(`Total Total debt of ${person}: ${personData.debt_amount}`);
    console.log(`Debt transactions:` );
    for ( const trans of personData.owes_trans){
        // console.log(trans);
        console.log(`${person} -> ${trans.owes_to}  -- amount ${trans.amount} \\-`)
    }
    // console.log(`Debt transactions: ${JSON.stringify(personData.owes_trans)}`);
  } else {
    console.log(`${person} has no debt.`);
  }
}

// Function to query total money owed to a person
async function queryMoneyOwed(person) {
  const personData = await Person.findOne({ personName: person });

  if (personData) {
    console.log(`Total money owed to ${person}: ${personData.debt_amount}`);
    console.log(`Owed transactions:` );
    for ( const trans of personData.debt_trans){
        // console.log(trans);
        console.log(`${person} <- ${trans.debt_to}  -- amount ${trans.amount} \\-`)
    }
    // console.log(`Owed transactions: ${JSON.stringify(personData.debt_trans)}`);
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

//* Function to process multiple transactions from a CSV file
async function processMultipleTransaction(filePath) {
  try {
    const array = await csvToArray(`./assets/${filePath}`);
    // const array = await csvToArray(`task3\assets`);
    let count = 0;
    
    for (const transaction of array) {
      const [A, B, X] = transaction.split(' ');
      await processTransaction(A, B, X);
      count++;
    }
    console.log(array);
    console.log(`Total ${count} transactions are added`);
  } catch (error) {
    console.error('Error processing the CSV file:', error);
    promptCSVFile();
  }
  function promptCSVFile() {
    console.log('wrong file path : ');
  }
}

// Function to handle user input from the command line
function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function mainMenu() {
    console.log('\n\n-------------------Valid Commands-------------------');
    console.log('>>  add_transaction A B X');
    console.log('>>  query_debt A');
    console.log('>>  query_owed A');
    console.log('>>  query_most_owed');
    console.log('>>  query_most_debt');
    console.log('>>  add_transactions_from_csv test1.csv');
    console.log('>>  exit || 0');
    rl.question('\nEnter command:...... ', async (command) => {



      
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
        case 'query_owed':
          if (args.length === 1) {
            const [person] = args;
            await queryMoneyOwed(person);
          } else {
            console.log('Invalid number of arguments for query_money_owed.');
          }
          break;
        case 'query_most_owed':
          await queryMostMoneyOwed();
          break;
        case 'query_most_debt':
          await queryMostDebt();
          break;
        case 'add_transactions_from_csv':
          if (args.length === 1) {
            const [filePath] = args;
            await processMultipleTransaction(filePath);
          } else {
            console.log('Invalid number of arguments for add_transactions_from_csv.');
          }
          break;
        case 'exit':
          rl.close();
          return;
        case '0':
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
