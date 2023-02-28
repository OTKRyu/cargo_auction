class Bid {
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
    this.id = id;
    this.auctionId = auctionId;
    this.truckerId = truckerId;
    this.transportFee = transportFee;
  }
}

export default Bid;
