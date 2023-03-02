import Trucker from "../Entity/trucker";
import Account from "../Entity/account";
import Bid from "../Entity/bid";
import Auction from "../Entity/auction";
import Cargo from "../Entity/cargo";

class TruckerImpl implements Trucker {
  id: number;
  userName: string;
  account: Account;

  constructor(id: number, userName: string, account: Account) {
    this.id = id;
    this.userName = userName;
    this.account = account;
  }
  createBid(auction: Auction, bidId: number, transportFee: number) {
    return new Bid(bidId, auction.id, this.id, transportFee);
  }
  participateAuction(
    auction: Auction,
    bidId: number,
    transportFee: number
  ): boolean {
    const bid = this.createBid(auction, bidId, transportFee);
    auction.addBid(bid);
    return true;
  }
  changeCargoStatus(cargo: Cargo): boolean {
    if (cargo.truckerId === this.id && cargo.status === "todo") {
      cargo.status = "progress";
      return true;
    }

    if (cargo.truckerId === undefined) {
      throw new Error("This cargo didn't get trucker yet");
    }

    if (cargo.truckerId !== this.id) {
      throw new Error("This cargo isn't yours");
    }

    if (cargo.status !== "todo") {
      throw new Error("Your cargo was already departed");
    }

    throw new Error("Bad access to cargo");
  }
}

export default TruckerImpl;
