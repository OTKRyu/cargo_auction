import Auction from "../Entity/auction";
import Bid from "../Entity/bid";
import Cargo from "../Entity/cargo";

class AuctionImpl implements Auction {
  id: number;
  cargo: Cargo;
  ownerId: number;
  auctionExpireDate: string;
  auctionStartDate: string;
  transportFeeUpperLimit: number;
  auctionHistory: Array<Bid>;
  determinedTruckerId: number | undefined;
  status: "todo" | "progress" | "done";

  constructor(
    id: number,
    cargo: Cargo,
    ownerId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    this.id = id;
    if (cargo.ownerId !== ownerId) {
      throw new Error("Only cargo owner can create auction about the cargo");
    }
    this.cargo = cargo;
    this.ownerId = ownerId;
    this.auctionExpireDate = auctionExpireDate;
    this.auctionStartDate = auctionStartDate;
    this.transportFeeUpperLimit = transportFeeUpperLimit;
    this.status = "todo";
    this.auctionHistory = [];
  }

  findMinimumTransportFee(): number {
    if (this.auctionHistory.length === 0) {
      return this.transportFeeUpperLimit;
    }

    let minimumBid: Bid = this.auctionHistory[this.auctionHistory.length - 1];
    return minimumBid.transportFee;
  }

  addBid(bid: Bid): boolean {
    if (bid.auctionId !== this.id) {
      throw new Error("Your bid doesn't belong this auction");
    }

    const minimumTransportFee = this.findMinimumTransportFee();

    if (minimumTransportFee === this.transportFeeUpperLimit) {
      this.auctionHistory.push(bid);
      return true;
    }

    if (bid.transportFee > minimumTransportFee) {
      throw new Error("Your transportFee is higher than other");
    }

    this.auctionHistory.push(bid);
    return true;
  }

  determineTrucker(): void {
    if (this.status !== "done") {
      throw new Error("Auction didn't end yet");
    }

    if (this.auctionHistory.length === 0) {
      throw new Error("Nobody participate this auction");
    }

    this.determinedTruckerId =
      this.auctionHistory[this.auctionHistory.length - 1].truckerId;
  }
}

export default AuctionImpl;
