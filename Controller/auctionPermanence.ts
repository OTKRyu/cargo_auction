import Auction from "../Entity/auction";

interface AuctionPermanence {
  getAuction(auctionId: number): Auction;
  getAuctions(auctionId: number): Array<Auction>;
  getNewAuctionId(): number;
  saveAuction(auction: Auction): boolean;
  fetchAuction(auction: Auction): boolean;
}

export default AuctionPermanence;
