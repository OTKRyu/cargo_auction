class Bid extends Object {
  id: number;
  auctionId: number;
  truckerId: number;
  transportFee: number;

  constructor(
    id: number,
    auctionId: number,
    truckerId: number,
    transportFee: number
  ) {
    super();
    this.id = id;
    this.auctionId = auctionId;
    this.truckerId = truckerId;
    this.transportFee = transportFee;
  }
}

class Auction extends Object {
  id: number;
  cargoId: number;
  ownerId: number;
  auctionExpireDate: string;
  auctionStartDate: string;
  transportFeeUpperLimit: number;
  auctionHistory: Array<Bid>;
  finalTruckerId: number | undefined;
  status: "todo" | "progress" | "done";

  constructor(
    id: number,
    cargoId: number,
    ownerId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    super();
    this.id = id;
    this.cargoId = cargoId;
    this.ownerId = ownerId;
    this.auctionExpireDate = auctionExpireDate;
    this.auctionStartDate = auctionStartDate;
    this.transportFeeUpperLimit = transportFeeUpperLimit;
    this.status = "todo";
    this.auctionHistory = [];
  }

  addBid(bid: Bid) {
    const minimumBid = this.findMinimumBid();

    if (minimumBid === undefined) {
      this.auctionHistory.push(bid);
      return true;
    }

    if (bid.transportFee > minimumBid.transportFee) {
      return false;
    }

    this.auctionHistory.push(bid);
    return true;
  }

  findMinimumBid(): Bid | undefined {
    if (this.auctionHistory.length === 0) {
      return undefined;
    }

    let minimumBid: Bid = this.auctionHistory[0];

    let i: number;
    for (i = 0; i < this.auctionHistory.length; i++) {
      if (minimumBid.transportFee > this.auctionHistory[i].transportFee) {
        minimumBid = this.auctionHistory[i];
      }
    }

    return minimumBid;
  }
}

export { Auction, Bid };
