import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Account from "../../../../entity/account";

import AccountImpl from "../../../../usecase/accountImpl";

import AccountPermanence from "../../../../controller/accountPermanence";

import DB_CONFIG from "./DB_CONFIG";

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
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [AccountPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
    const result = this.changeAccountPacketToAccount(rows[0]);
    return result;
  }

  async getNewAccountId() {
    const query = `SELECT MAX(ACCOUNT_ID) AS MAX_ACCOUNT_ID FROM ACCOUNT`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [MaxAccountIdPacket[], FieldPacket[]] =
      await conn.query(query);
    await conn.end();

    if (
      rows[0].MAX_ACCOUNT_ID === undefined ||
      rows[0].MAX_ACCOUNT_ID === null
    ) {
      return 0;
    }

    return rows[0].MAX_ACCOUNT_ID + 1;
  }

  async saveAccount(account: Account) {
    const query = `INSERT INTO ACCOUNT (ACCOUNT_ID, BALANCE) VALUES(${account.accountId}, ${account.balance})`;
    const conn = await createConnection(DB_CONFIG);
    await conn.query(query);
    await conn.end();
  }

  async fetchAccount(account: Account) {
    const query = `UPDATE ACCOUNT SET BALACNE=${account.balance} WHERE ACCOUNT_ID = ${account.accountId}`;
    const conn = await createConnection(DB_CONFIG);
    await conn.query(query);
    await conn.end();
  }
}

export default AccountPermanenceImpl;
