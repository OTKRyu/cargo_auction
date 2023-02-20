import Account from "../Entity/account";

class AccountImpl implements Account {
  balance: number;
  id: string;
  constructor(balance: number, id: string) {
    this.balance = balance;
    this.id = id;
  }
  deposit(amount: number) {
    this.balance += amount;
  }
  withdraw(amount: number) {
    this.balance -= amount;
  }
}

export default AccountImpl;
