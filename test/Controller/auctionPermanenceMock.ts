import Auction from "../../Entity/auction";

import AccountImpl from "../../Usecase/accountImpl";
import OwnerImpl from "../../Usecase/ownerImpl";
import AuctionImpl from "../../Usecase/auctionImpl";

import AuctionPermanence from "../../Controller/auctionPermanence";

class AuctionPermanenceMock implements AuctionPermanence {
  createAuction(auctionId: number) {
    const account = new AccountImpl("abc", 0);
    const owner = new OwnerImpl(0, "name", account);
    const cargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);
    const auction = new AuctionImpl(
      auctionId,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    return auction;
  }

  getAuction(auctionId: number): Auction {
    const auction = this.createAuction(auctionId);
    return auction;
  }
  getAuctions() {
    const auction = this.createAuction(0);
    return [auction];
  }
  getStartSoonAuctions() {
    const auction = this.createAuction(0);
    return [auction];
  }
  getNewAuctionId() {
    return 0;
  }
  saveAuction(auction: Auction) {
    return;
  }
  fetchAuction(auction: Auction) {
    return;
  }
}

export default AuctionPermanenceMock;
