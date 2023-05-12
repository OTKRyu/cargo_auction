import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Account from "../../../../Entity/account";

import AccountImpl from "../../../../Usecase/accountImpl";

import AccountPermanence from "../../../../Controller/accountPermanence";

import DBConfig from "./DBConfig";

interface AccountPacket extends RowDataPacket {
  ACCOUNT_ID: number;
  BALANCE: number;
}

interface MaxAccountIdPacket extends RowDataPacket {
  MAX_ACCOUNT_ID: number;
}

class AccountPermaneneceImpl implements AccountPermanence {
  changeAccountPacketToAccount(accountPacket: AccountPacket) {
    return new AccountImpl(accountPacket.ACCOUNT_ID, accountPacket.BALANCE);
  }
  async getAccount(accountId: number) {
    const query = `SELECT * FROM ACCOUNT WHERE ACCOUNT_ID = ${accountId}`;
    const conn = await createConnection(DBConfig);
    try {
      let account;
      const [rows, fields]: [AccountPacket[], FieldPacket[]] = await conn.query(
        query
      );
      rows.forEach((row: AccountPacket) => {
        account = this.changeAccountPacketToAccount(row);
      });
      return account;
    } catch (err) {
      throw err;
    }
  }
  async getNewAccountId() {
    const query = `SELECT MAX(ACCOUNT_ID) AS MAX_ACCOUNT_ID FROM ACCOUNT WHERE`;
    const conn = await createConnection(DBConfig);
    try {
      let account;
      const [rows, fields]: [MaxAccountIdPacket[], FieldPacket[]] =
        await conn.query(query);
      return rows[0].MAX_ACCOUNT_ID + 1;
    } catch (err) {
      throw err;
    }
  }
  saveAccount(account: Account) {}
  fetchAccount(account: Account) {}
}

export default AccountPermanenceImpl;
