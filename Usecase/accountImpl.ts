import Account from "../Entity/account";

class AccountImpl implements Account {
  balance: number;
  accountId: string;
  constructor(balance: number, accountId: string) {
    this.balance = 0;
    this.accountId = accountId;
  }
  deposit(amount: number) {
    this.balance -= amount;
  }
  withdraw(amount: number) {
    this.balance -= amount;
  }
}

export default AccountImpl;
