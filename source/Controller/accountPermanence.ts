import Account from "../Entity/account";

interface AccountPermanence {
  getAccount(accountId: number): Promise<Account> | Promise<undefined>;
  getNewAccountId(): Promise<number> | Promise<undefined>;
  saveAccount(account: Account): Promise<void>;
  fetchAccount(auction: Account): Promise<void>;
}

export default AccountPermanence;
