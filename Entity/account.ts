interface Account {
  balance: number;
  id: string;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

export default Account;
