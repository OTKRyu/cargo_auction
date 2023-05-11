interface Account {
  balance: number;
  accountId: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

export default Account;
