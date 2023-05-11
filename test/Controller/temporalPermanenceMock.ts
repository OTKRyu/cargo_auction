import Auction from "../../Entity/auction";

import AccountImpl from "../../Usecase/accountImpl";
import OwnerImpl from "../../Usecase/ownerImpl";
import AuctionImpl from "../../Usecase/auctionImpl";

import TmporalAuctionPermanence from "../../Controller/temporalAuctionPermanence";

class TmporalAuctionPermanenceMock implements TmporalAuctionPermanence {
  createAuction(auctionId: number) {
    const account = new AccountImpl(0, 0);
    const owner = new OwnerImpl(0, "name", account);
    const cargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);
    const auction = new AuctionImpl(
      auctionId,
      cargo,
      owner.ownerId,
      "2023-02-28",
      "2023-02-20",
      500
    );

    return auction;
  }

  getActiveAuction(auctionId: number) {
    const auction = this.createAuction(auctionId);
    return auction;
  }
  getActiveAuctions() {
    const auction = this.createAuction(0);
    return [auction];
  }
  getCloseSoonAuctions() {
    const auction = this.createAuction(0);
    return [auction];
  }
  fetchAuction(auction: Auction) {
    return;
  }
  removeAuction(auction: Auction) {
    return;
  }
  registerAuction(auction: Auction): void {
    return;
  }
}

export default TmporalAuctionPermanenceMock;
