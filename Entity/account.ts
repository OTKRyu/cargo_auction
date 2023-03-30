interface Account {
  balance: number;
  id: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

export default Account;
