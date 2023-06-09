import Auction from "../entity/auction";

interface AuctionPermanence {
  getAuction(auctionId: number): Promise<Auction>;
  getNewAuctionId(): Promise<number>;
  saveAuction(auction: Auction): Promise<void>;
  fetchAuction(auction: Auction): Promise<void>;
  getStartSoonAuctions(): Promise<Array<Auction>>;
}

export default AuctionPermanence;
