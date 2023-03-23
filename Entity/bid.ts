class Bid {
  auctionId: number;
  truckerId: number;
  transportFee: number;

  constructor(auctionId: number, truckerId: number, transportFee: number) {
    this.auctionId = auctionId;
    this.truckerId = truckerId;
    this.transportFee = transportFee;
  }
}

export default Bid;
