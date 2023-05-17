import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Owner from "../../../../entity/owner";
import OwnerImpl from "../../../../usecase/ownerImpl";

import AccountPermanence from "../../../../controller/accountPermanence";
import OwnerPermanence from "../../../../controller/ownerPermanence";

import DBConfig from "./DBConfig";

interface OwnerPacket extends RowDataPacket {
  OWNER_ID: number;
  USER_NAME: string;
  ACCOUNT_ID: number;
}

interface MaxOwnerIdPacket extends RowDataPacket {
  MAX_OWNER_ID: number;
}

class OwnerPermanenceImpl implements OwnerPermanence {
  accountPermanence: AccountPermanence;

  constructor(accountPermanence: AccountPermanence) {
    this.accountPermanence = accountPermanence;
  }

  async changeOwnerPacketToOwner(ownerPacket: OwnerPacket) {
    const account = await this.accountPermanence.getAccount(
      ownerPacket.ACCOUNT_ID
    );

    const owner = new OwnerImpl(
      ownerPacket.OWNER_ID,
      ownerPacket.USER_NAME,
      account
    );

    return owner;
  }

  async getOwner(ownerId: number) {
    const query = `SELECT * FROM OWNER WHERE OWNER_ID = ${ownerId}`;
    const conn = await createConnection(DBConfig);
    const [rows, fields]: [OwnerPacket[], FieldPacket[]] = await conn.query(
      query
    );
    conn.end();
    const result = await this.changeOwnerPacketToOwner(rows[0]);
    return result;
  }
  async getNewOwnerId() {
    const query = `SELECT MAX(OWNER_ID) AS MAX_ACCOUNT_ID FROM OWNER`;
    const conn = await createConnection(DBConfig);
    const [rows, fields]: [MaxOwnerIdPacket[], FieldPacket[]] =
      await conn.query(query);
    await conn.end();
    return rows[0].MAX_OWNER_ID + 1;
  }
  async saveOwner(owner: Owner) {
    const query = `INSERT INTO OWNER (OWNER_ID, USER_NAME, ACCOUNT_ID) VALUES(${owner.ownerId}, ${owner.userName}, ${owner.account.accountId})`;
    const conn = await createConnection(DBConfig);
    await conn.query(query);
    await conn.end();
  }
  async fetchOwner(owner: Owner) {
    await this.accountPermanence.fetchAccount(owner.account);
  }
}

export default OwnerPermanenceImpl;
