import Trucker from "../entity/trucker";
import Account from "../entity/account";
import Auction from "../entity/auction";
import Cargo from "../entity/cargo";

class TruckerImpl implements Trucker {
  truckerId: number;
  userName: string;
  account: Account;

  constructor(truckerId: number, userName: string, account: Account) {
    this.truckerId = truckerId;
    this.userName = userName;
    this.account = account;
  }
  participateAuction(auction: Auction, transportFee: number): boolean {
    const bid = {
      auctionId: auction.auctionId,
      truckerId: this.truckerId,
      transportFee: transportFee,
    };
    auction.addBid(bid);
    return true;
  }
  eraseLatestAuctionBid(auction: Auction): boolean {
    if (auction.auctionHistory.length == 0) {
      throw Error("Auction doesn't have bids");
    }

    if (
      auction.auctionHistory[auction.auctionHistory.length - 1].truckerId !==
      this.truckerId
    ) {
      throw Error("You can erase your bid only when your bid is latest one");
    }

    auction.auctionHistory.pop();
    return true;
  }
  changeCargoStatus(cargo: Cargo): boolean {
    if (
      cargo.determinedTruckerId === this.truckerId &&
      cargo.status === "todo"
    ) {
      cargo.status = "progress";
      return true;
    }

    if (cargo.determinedTruckerId === undefined) {
      throw new Error("This cargo didn't get trucker yet");
    }

    if (cargo.determinedTruckerId !== this.truckerId) {
      throw new Error("This cargo isn't yours");
    }

    if (cargo.status !== "todo") {
      throw new Error("Your cargo was already departed");
    }

    throw new Error("Bad access to cargo");
  }
}

export default TruckerImpl;
