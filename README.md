# README

## Transaction Manager CLI

### Installation and Setup

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/mayank4code/transaction_manager
   ```

   **Or**

   **Download Zip File:**
   - Download the zip file .
   - Extract the contents of the zip file to your desired location.

2. **Navigate to the Project Directory:**
   Ensure your command prompt or terminal is opened in the project's root directory.

3. **Install NPM Packages:**
   ```sh
   npm install
   ```
   **Or**
   ```sh
   npm i
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory of the project and add your MongoDB URI in it:
   ```env
   MONGO_URI = "Replace_your_mongDB_URI"
   ```

5. **Start the Application:**
   ```sh
   npm start
   ```
   **Or**
   ```sh
   node index.js
   ```

### Usage

The following are valid commands you can use in the CLI:

- **Add Transaction:**
  ```sh
  add_transaction A B X
  ```
  Example: `John owes Mary 50 amount` (where `A` is `John`, `B` is `Mary`, and `X` is `50`)

- **Query Total Debt of a Person:**
  ```sh
  query_debt A
  ```
  Example: `query_debt John`

- **Query Total Money Owed to a Person:**
  ```sh
  query_owed A
  ```
  Example: `query_owed Mary`

- **Find the Person with the Most Money Owed:**
  ```sh
  query_most_owed
  ```

- **Find the Person with the Most Debt:**
  ```sh
  query_most_debt
  ```

- **Add Multiple Transactions from a CSV File:**
  ```sh
  add_transactions_from_csv test1.csv
  ```
  (Replace `test1.csv` with the path to your CSV file)
  _by default it is set to utilities folder._

- **Exit the CLI:**
  ```sh
  exit
  ```
  **Or**
  ```sh
  0
  ```


  **Note** - _ Majorly used single character names , if there is any error or bug suggest me _



### Example Commands

```
add_transaction John Mary 50
query_debt John
query_owed Mary
query_most_owed
query_most_debt
add_transactions_from_csv transactions.csv
exit
```

Make sure to follow these instructions carefully for successful setup and operation.
