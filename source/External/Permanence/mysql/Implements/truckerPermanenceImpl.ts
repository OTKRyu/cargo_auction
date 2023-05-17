import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Trucker from "../../../../entity/trucker";
import TruckerImpl from "../../../../usecase/truckerImpl";

import AccountPermanence from "../../../../controller/accountPermanence";
import TruckerPermanence from "../../../../controller/truckerPermanence";

import DBConfig from "./DBConfig";

interface TruckerPacket extends RowDataPacket {
  TRUCKER_ID: number;
  USER_NAME: string;
  ACCOUNT_ID: number;
}

interface MaxTruckerIdPacket extends RowDataPacket {
  MAX_TRUCKER_ID: number;
}

class TruckerPermanenceImpl implements TruckerPermanence {
  accountPermanence: AccountPermanence;

  constructor(accountPermanence: AccountPermanence) {
    this.accountPermanence = accountPermanence;
  }

  async changeTruckerPacketToTrucker(truckerPacket: TruckerPacket) {
    const account = await this.accountPermanence.getAccount(
      truckerPacket.ACCOUNT_ID
    );

    const trucker = new TruckerImpl(
      truckerPacket.TRUCKER_ID,
      truckerPacket.USER_NAME,
      account
    );

    return trucker;
  }

  async getTrucker(truckerId: number) {
    const query = `SELECT * FROM TRUCKER WHERE TRUCKER_ID = ${truckerId}`;
    const conn = await createConnection(DBConfig);
    const [rows, fields]: [TruckerPacket[], FieldPacket[]] = await conn.query(
      query
    );
    conn.end();
    const result = await this.changeTruckerPacketToTrucker(rows[0]);
    return result;
  }
  async getNewTruckerId() {
    const query = `SELECT MAX(TRUCKER_ID) AS MAX_TRUCKER_ID FROM TRUCKER`;
    const conn = await createConnection(DBConfig);
    const [rows, fields]: [MaxTruckerIdPacket[], FieldPacket[]] =
      await conn.query(query);
    await conn.end();
    return rows[0].MAX_TRUCKER_ID + 1;
  }
  async saveTrucker(trucker: Trucker) {
    const query = `INSERT INTO TRUCKER (TRUCKER_ID, USER_NAME, ACCOUNT_ID) VALUES(${trucker.truckerId}, ${trucker.userName}, ${trucker.account.accountId})`;
    const conn = await createConnection(DBConfig);
    await conn.query(query);
    await conn.end();
  }
  async fetchTrucker(trucker: Trucker) {
    await this.accountPermanence.fetchAccount(trucker.account);
  }
}

export default TruckerPermanenceImpl;
