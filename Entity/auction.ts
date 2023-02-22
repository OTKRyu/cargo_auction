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

  findMinimumTransportFee(): number {
    if (this.auctionHistory.length === 0) {
      return this.transportFeeUpperLimit;
    }

    let minimumBid: Bid = this.auctionHistory[this.auctionHistory.length - 1];
    return minimumBid.transportFee;
  }

  addBid(bid: Bid) {
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
}

export { Auction, Bid };
