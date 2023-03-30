import Account from "../Entity/account";

class AccountImpl implements Account {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
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
