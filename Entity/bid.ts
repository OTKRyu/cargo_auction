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

export default Bid;
