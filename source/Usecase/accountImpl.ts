import Account from "../entity/account";

class AccountImpl implements Account {
  accountId: number;
  balance: number;

  constructor(accountId: number, balance: number) {
    this.accountId = accountId;
    this.balance = balance;
  }
  deposit(amount: number) {
    this.balance += amount;
  }
  withdraw(amount: number) {
    if (this.balance < amount) {
      throw Error("Account doesn't have enough money");
    }
    this.balance -= amount;
  }
}

export default AccountImpl;
