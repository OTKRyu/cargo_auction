type Bid = {
  id: number;
  auctionId: number;
  truckerId: number;
  transferFee: number;
};

class Auction extends Object {
  id: number;
  cargoId: number;
  ownerId: number;
  auctionExpireDate: string;
  auctionStartDate: string;
  transferFeeUpperLimit: number;
  auctionHistory: Array<Bid>;
  finalTruckerId: number | undefined;
  status: "todo" | "progress" | "done";

  constructor(
    id: number,
    cargoId: number,
    ownerId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transferFeeUpperLimit: number
  ) {
    super();
    this.id = id;
    this.cargoId = cargoId;
    this.ownerId = ownerId;
    this.auctionExpireDate = auctionExpireDate;
    this.auctionStartDate = auctionStartDate;
    this.transferFeeUpperLimit = transferFeeUpperLimit;
    this.status = "todo";
    this.auctionHistory = [];
  }
}

export { Auction, Bid };
