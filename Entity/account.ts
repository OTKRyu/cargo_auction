interface Account {
  balance: number;
  accountId: string;
  deposit: Function;
  withdraw: Function;
}

export default Account;
