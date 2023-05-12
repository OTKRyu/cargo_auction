import mysql2 from "mysql2";

import Auction from "../../../../Entity/auction";
import AuctionImpl from "../../../../Usecase/auctionImpl";

import AuctionPermanence from "../../../../Controller/auctionPermanence";

import DBconfig from "./DBConfig";

class AuctionPermanenceImpl implements AuctionPermanence {
  getAuction(auctionId: number) {
    const conn = mysql2.createConnection(DBconfig);
    const query = `SELECT * FROM AUCTION WHERE AUCTION_ID = ${auctionId}`;

    let result;
    conn.connect();

    conn.query(query, (error, rows, fields) => {
      if (error) {
        throw error;
      }
    });

    return;
  }
  getAuctions() {
    return;
  }
  getStartSoonAuctions() {
    return;
  }
  getNewAuctionId() {
    return;
  }
  saveAuction(auction: Auction) {}
  fetchAuction(auction: Auction) {}
}
