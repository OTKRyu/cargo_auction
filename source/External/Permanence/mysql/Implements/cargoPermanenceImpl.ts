import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Cargo from "../../../../entity/cargo";

import OwnerPermanence from "../../../../controller/ownerPermanence";
import TruckerPermanence from "../../../../controller/truckerPermanence";
import CargoPermanence from "../../../../controller/cargoPermanence";

import DB_CONFIG from "./DB_CONFIG";

interface CargoPacket extends RowDataPacket {
  CARGO_ID: number;
  NAME: string;
  TRANSPORT_DUE_DATE: string;
  DESCRIPTION: string;
  OWNER_ID: number;
  DETERMINED_TRUCKER_ID: number | undefined;
  STATUS: "todo" | "progress" | "arrived";
}

interface MaxCargoIdPacket extends RowDataPacket {
  MAX_CARGO_ID: number;
}

class CargoPermanenceImpl implements CargoPermanence {
  ownerPermanence: OwnerPermanence;
  truckerPermanence: TruckerPermanence;

  constructor(
    ownerPermanence: OwnerPermanence,
    truckerPermanence: TruckerPermanence
  ) {
    this.ownerPermanence = ownerPermanence;
    this.truckerPermanence = truckerPermanence;
  }

  changeCargoPacketToCargo(cargoPacket: CargoPacket) {
    const cargo = new Cargo(
      cargoPacket.CARGO_ID,
      cargoPacket.NAME,
      cargoPacket.TRANSPORT_DUE_DATE,
      cargoPacket.DESCRIPTION,
      cargoPacket.OWNER_ID,
      cargoPacket.DETERMINED_TRUCKER_ID,
      cargoPacket.STATUS
    );
    return cargo;
  }

  async getCargo(cargoId: number) {
    const query = `SELECT * FROM CARGO WHERE CARGO_ID = ${cargoId}`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [CargoPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
    const result = this.changeCargoPacketToCargo(rows[0]);
    return result;
  }

  async getNewCargoId() {
    const query = `SELECT MAX(CARGO_ID) AS MAX_CARGO_ID FROM CARGO`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [MaxCargoIdPacket[], FieldPacket[]] =
      await conn.query(query);
    await conn.end();

    if (rows[0].MAX_CARGO_ID === undefined || rows[0].MAX_CARGO_ID === null) {
      return 0;
    }

    return rows[0].MAX_CARGO_ID + 1;
  }

  async saveCargo(cargo: Cargo) {
    const query = `INSERT INTO CARGO (CARGO_ID, NAME, TRASPORT_DUE_DATE, DESCRIPTION, OWNER_ID, STATUS) VALUES(${cargo.cargoId}, "${cargo.name}", ${cargo.transportDueDate}, "${cargo.description}", ${cargo.ownerId},${cargo.status})`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [CargoPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
  }

  async fetchCargo(cargo: Cargo) {
    const query = `UPDATE CARGO SET NAME="${cargo.name}", TRASPORT_DUE_DATE=${cargo.transportDueDate}, DESCRIPTION=${cargo.description}, DETERMINED_TRUCKER_ID=${cargo.determinedTruckerId}, STATUS="${cargo.status}" WHERE CARGO_ID=${cargo.cargoId}`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [CargoPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
  }
}

export default CargoPermanenceImpl;
