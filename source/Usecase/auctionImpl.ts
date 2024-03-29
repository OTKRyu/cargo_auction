import Auction from "../entity/auction";
import Bid from "../entity/bid";
import Cargo from "../entity/cargo";

class AuctionImpl implements Auction {
  auctionId: number;
  cargo: Cargo;
  ownerId: number;
  auctionExpireDate: string;
  auctionStartDate: string;
  transportFeeUpperLimit: number;
  auctionHistory: Array<Bid>;
  determinedTruckerId: number | undefined;
  status: "todo" | "progress" | "done";

  constructor(
    auctionId: number,
    cargo: Cargo,
    ownerId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number,
    auctionHistory: Array<Bid>
  ) {
    this.auctionId = auctionId;
    if (cargo.ownerId !== ownerId) {
      throw new Error("Only cargo owner can create auction about the cargo");
    }
    this.cargo = cargo;
    this.ownerId = ownerId;
    this.auctionExpireDate = auctionExpireDate;
    this.auctionStartDate = auctionStartDate;
    this.transportFeeUpperLimit = transportFeeUpperLimit;
    this.status = "todo";
    this.auctionHistory = auctionHistory;
  }

  findMinimumTransportFee(): number {
    if (this.auctionHistory.length === 0) {
      return this.transportFeeUpperLimit;
    }

    const minimumBid: Bid = this.auctionHistory[this.auctionHistory.length - 1];
    return minimumBid.transportFee;
  }

  addBid(bid: Bid): boolean {
    if (bid.auctionId !== this.auctionId) {
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
      return;
    }

    this.determinedTruckerId =
      this.auctionHistory[this.auctionHistory.length - 1].truckerId;

    this.cargo.determinedTruckerId =
      this.auctionHistory[this.auctionHistory.length - 1].truckerId;
  }

  startAuction() {
    if (this.status !== "todo") {
      throw Error("Auction was already started");
    }
    this.status = "progress";
  }

  endAuction() {
    if (this.status !== "progress") {
      throw Error("Auction wasn't started");
    }
    this.status = "done";
    this.determineTrucker();
  }
}

export default AuctionImpl;
