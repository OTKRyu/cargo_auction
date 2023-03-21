import Auction from "../Entity/auction";

interface AuctionPermanence {
  getAuction(auctionId: number): Auction;
  getAuctions(auctionId: number): Array<Auction>;
  getNewAuctionId(): number;
  saveAuction(auction: Auction): void;
  fetchAuction(auction: Auction): void;
}

export default AuctionPermanence;
