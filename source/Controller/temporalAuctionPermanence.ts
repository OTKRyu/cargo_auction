import Auction from "../entity/auction";

interface TemporalAuctionPermanence {
  getActiveAuctions(): Promise<Array<Auction>>;
  getActiveAuction(auctionId: number): Promise<Auction>;
  getCloseSoonAuctions(): Promise<Array<Auction>>;
  fetchAuction(auction: Auction): Promise<void>;
  registerAuction(auction: Auction): Promise<void>;
  removeAuction(auction: Auction): Promise<void>;
}

export default TemporalAuctionPermanence;
