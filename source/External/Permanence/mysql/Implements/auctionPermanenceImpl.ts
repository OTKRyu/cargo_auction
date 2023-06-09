import { createConnection, FieldPacket, RowDataPacket } from "mysql2/promise";

import Auction from "../../../../entity/auction";

import AuctionImpl from "../../../../usecase/auctionImpl";

import OwnerPermanence from "../../../../controller/ownerPermanence";
import TruckerPermanence from "../../../../controller/truckerPermanence";
import AuctionPermanence from "../../../../controller/auctionPermanence";

import DB_CONFIG from "./DB_CONFIG";
import CargoPermanence from "source/controller/cargoPermanence";

interface AuctionPacket extends RowDataPacket {
  AUCTION_ID: number;
  CARGO_ID: number;
  OWNER_ID: number;
  AUCTION_EXPIRE_DATE: string;
  AUCTION_START_DATE: string;
  TRANSPORT_FEE_UPPER_LIMIT: number;
  DETERMINED_TRUCKER_ID: number | undefined;
  STATUS: "todo" | "progress" | "arrived";
}

interface MaxAuctionIdPacket extends RowDataPacket {
  MAX_AUCTION_ID: number;
}

class AuctionPermanenceImpl implements AuctionPermanence {
  ownerPermanence: OwnerPermanence;
  truckerPermanence: TruckerPermanence;
  cargoPermanence: CargoPermanence;

  constructor(
    ownerPermanence: OwnerPermanence,
    truckerPermanence: TruckerPermanence,
    cargoPermanence: CargoPermanence
  ) {
    this.ownerPermanence = ownerPermanence;
    this.truckerPermanence = truckerPermanence;
    this.cargoPermanence = cargoPermanence;
  }

  async changeAuctionPacketToAuction(auctionPacket: AuctionPacket) {
    const cargo = await this.cargoPermanence.getCargo(auctionPacket.CARGO_ID);
    const auction = new AuctionImpl(
      auctionPacket.AUCTION_ID,
      cargo,
      auctionPacket.OWNER_ID,
      auctionPacket.AUCTION_EXPIRE_DATE,
      auctionPacket.AUCTION_START_DATE,
      auctionPacket.TRANSPORT_FEE_UPPER_LIMIT,
      []
    );
    return auction;
  }

  async getAuction(auctionId: number) {
    const query = `SELECT * FROM AUCTION WHERE AUCTION_ID = ${auctionId}`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [AuctionPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
    const result = this.changeAuctionPacketToAuction(rows[0]);
    return result;
  }

  async getNewAuctionId() {
    const query = `SELECT MAX(AUCTION_ID) AS MAX_AUCTION_ID FROM AUCTION`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [MaxAuctionIdPacket[], FieldPacket[]] =
      await conn.query(query);
    await conn.end();

    if (
      rows[0].MAX_AUCTION_ID === undefined ||
      rows[0].MAX_AUCTION_ID === null
    ) {
      return 0;
    }

    return rows[0].MAX_AUCTION_ID + 1;
  }

  async saveAuction(auction: Auction) {
    const query = `INSERT INTO AUCTION (AUCTION_ID, CARGO_ID, OWNER_ID, AUCTION_EXPIRE_DATE, AUCTION_START_DATE, TRANSPORT_FEE_UPPER_LIMIT, STATUS) VALUES(${auction.auctionId},${auction.cargo.cargoId},${auction.ownerId},${auction.auctionExpireDate},${auction.auctionStartDate},${auction.transportFeeUpperLimit},${auction.status})`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [AuctionPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
  }

  async fetchAuction(auction: Auction) {
    await this.cargoPermanence.fetchCargo(auction.cargo);
    const query = `UPDATE AUCTION DETERMINED_TRUCKER_ID=${auction.determinedTruckerId}, STATUS=${auction.status} WHERE AUCTION_ID=${auction.auctionId}`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [AuctionPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
  }

  async getStartSoonAuctions() {
    const query = `SELECT * FROM AUCTION WHERE DATE(AUCTION_START_DATE) = DATE(NOW())`;
    const conn = await createConnection(DB_CONFIG);
    const [rows, fields]: [AuctionPacket[], FieldPacket[]] = await conn.query(
      query
    );
    await conn.end();
    const result: Array<Auction> = [];
    for (let i = 0; i < rows.length; i++) {
      const auction = await this.changeAuctionPacketToAuction(rows[i]);
      result.push(auction);
    }
    return result;
  }
}

export default AuctionPermanenceImpl;
