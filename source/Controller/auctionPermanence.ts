import Auction from "../entity/auction";

interface AuctionPermanence {
  getAuction(auctionId: number): Promise<Auction>;
  getOwnerAuctions(ownerId: number): Promise<Array<Auction>>;
  getTruckerAuctions(truckerId: number): Promise<Array<Auction>>;
  getStartSoonAuctions(): Promise<Array<Auction>>;
  getNewAuctionId(): Promise<number>;
  saveAuction(auction: Auction): Promise<void>;
  fetchAuction(auction: Auction): Promise<void>;
}

export default AuctionPermanence;
