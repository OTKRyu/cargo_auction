import Auction from "../../Entity/auction";

import AccountImpl from "../../Usecase/accountImpl";
import OwnerImpl from "../../Usecase/ownerImpl";
import AuctionImpl from "../../Usecase/auctionImpl";

import TemporalPermanence from "../../Controller/temporalPermanence";

class TemporalPermanenceMock implements TemporalPermanence {
  createAuction(auctionId: number) {
    const account = new AccountImpl("abc", 0);
    const owner = new OwnerImpl(0, "name", account);
    const cargo = owner.createCargo(
      0,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );
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

  getActiveAuction(auctionId: number) {
    const auction = this.createAuction(auctionId);
    return auction;
  }
  getActiveAuctions() {
    const auction = this.createAuction(0);
    return [auction];
  }
  fetchAuction(auction: Auction) {
    return;
  }
}

export default TemporalPermanenceMock;
