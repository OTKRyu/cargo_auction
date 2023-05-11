import Trucker from "../Entity/trucker";
import Account from "../Entity/account";
import Auction from "../Entity/auction";
import Cargo from "../Entity/cargo";

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
    if (cargo.truckerId === this.truckerId && cargo.status === "todo") {
      cargo.status = "progress";
      return true;
    }

    if (cargo.truckerId === undefined) {
      throw new Error("This cargo didn't get trucker yet");
    }

    if (cargo.truckerId !== this.truckerId) {
      throw new Error("This cargo isn't yours");
    }

    if (cargo.status !== "todo") {
      throw new Error("Your cargo was already departed");
    }

    throw new Error("Bad access to cargo");
  }
}

export default TruckerImpl;
