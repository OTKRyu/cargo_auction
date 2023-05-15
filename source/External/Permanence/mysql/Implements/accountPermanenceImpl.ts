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

class AccountPermanenceImpl implements AccountPermanence {
  changeAccountPacketToAccount(accountPacket: AccountPacket) {
    return new AccountImpl(accountPacket.ACCOUNT_ID, accountPacket.BALANCE);
  }

  async getAccount(accountId: number) {
    const query = `SELECT * FROM ACCOUNT WHERE ACCOUNT_ID = ${accountId}`;
    const conn = await createConnection(DBConfig);
    const [rows, fields]: [AccountPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
    const result = this.changeAccountPacketToAccount(rows[0]);
    return result;
  }

  async getNewAccountId() {
    const query = `SELECT MAX(ACCOUNT_ID) AS MAX_ACCOUNT_ID FROM ACCOUNT`;
    const conn = await createConnection(DBConfig);
    const [rows, fields]: [MaxAccountIdPacket[], FieldPacket[]] =
      await conn.query(query);
    await conn.end();
    return rows[0].MAX_ACCOUNT_ID + 1;
  }

  async saveAccount(account: Account) {
    const query = `INSERT INTO ACCOUNT (ACCOUNT_ID, BALANCE) VALUES(${account.accountId}, ${account.balance})`;
    const conn = await createConnection(DBConfig);
    await conn.query(query);
    await conn.end();
  }

  async fetchAccount(account: Account) {
    const query = `UPDATE ACCOUNT SET BALACNE=${account.balance} WHERE ACCOUNT_ID = ${account.accountId}`;
    const conn = await createConnection(DBConfig);
    await conn.query(query);
    await conn.end();
  }
}

export default AccountPermanenceImpl;
