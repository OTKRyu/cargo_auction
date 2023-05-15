import Account from "../Entity/account";

interface AccountPermanence {
  getAccount(accountId: number): Promise<Account>;
  getNewAccountId(): Promise<number>;
  saveAccount(account: Account): Promise<void>;
  fetchAccount(auction: Account): Promise<void>;
}

export default AccountPermanence;
