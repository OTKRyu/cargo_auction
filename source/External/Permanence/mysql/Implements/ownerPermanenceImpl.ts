import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Owner from "../../../../Entity/owner";
import OwnerImpl from "../../../../Usecase/ownerImpl";

import OwnerPermanence from "../../../../Controller/ownerPermanence";

import AccountPermanence from "./accountPermanence";
import DBconfig from "./DBConfig";

interface OwnerPacket extends RowDataPacket {
  OWNER_ID: number;
  USER_NAME: string;
  ACCOUNT_ID: number;
}

class OwnerPermanenceImpl implements OwnerPermanence {
  changeOwnerPacketToOwner(ownerPacket: OwnerPacket) {
    const owner = new OwnerImpl(ownerPacket.OWNER_ID, ownerPacket.USER_NAME);
    return owner;
  }
  async getOwner(ownerId: number) {
    const query = `SELECT * FROM OWNER WHERE OWNER_ID = ${ownerId}`;
    const conn = await createConnection(DBconfig);
    try {
      let owner;
      const [rows, fields]: [OwnerPacket[], FieldPacket[]] = await conn.query(
        query
      );
      rows.forEach((row: OwnerPacket) => {
        owner = this.changeOwnerPacketToOwner(row);
      });
      return owner;
    } catch (err) {
      throw err;
    }
  }
  getOwners() {
    return;
  }
  getNewOwnerId() {
    return;
  }
  saveOwner(owner: Owner) {}
  fetchOwner(owner: Owner) {}
}

export default OwnerPermanenceImpl;
