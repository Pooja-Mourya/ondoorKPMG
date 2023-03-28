// this type of function is constructor function
// function studentAccount(bankName, accountHolder, balance = 0) {
//   (this.accountHolder = accountHolder),
//     (this.bankName = bankName),
//     (this.accountNumber = Date.now()),
//     (this.balance = balance);
//   this.deposit = function myFunction() {
//     this.balance += balance;
//   };
//   this.withdraw = function myFunction() {
//     this.balance -= balance;
//   };
// }

// const myAccount = new studentAccount('pooja', 'pnb', 1000);
// const newAccount = new studentAccount('Arch', 'sbi', 5000);
// console.log(myAccount);
// console.log(newAccount);

// class constructor

// const bankAccount = class {
//   //   holderName;
//   //   bankName;
//   //   balance = 0;
//   //   accountNumber = Date.now();

//   constructor(holderName, bankName, balance = 0) {
//     (this.holderName = holderName),
//       (this.bankName = bankName),
//       (this.accountNumber = Date.now()),
//       (this.balance = balance);
//   }

//   deposit(amount) {
//     this.balance += amount;
//   }

//   withdraw(amount) {
//     this.balance -= amount;
//   }
// };

// const myBankAccount = new bankAccount('Namita', 'boi', 1000);
// myBankAccount.deposit(500);
// myBankAccount.withdraw(1000);
// console.log(myBankAccount);
