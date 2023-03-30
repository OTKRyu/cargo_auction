import Auction from "../Entity/auction";

interface TemporalAuctionPermanence {
  getActiveAuctions(): Array<Auction>;
  getActiveAuction(auctionId: number): Auction;
  getCloseSoonAuctions(): Array<Auction>;
  fetchAuction(auction: Auction): void;
  registerAuction(auction: Auction): void;
  removeAuction(auction: Auction): void;
}

export default TemporalAuctionPermanence;
