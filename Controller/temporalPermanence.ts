import Auction from "../Entity/auction";

interface TemporalPermanence {
  getActiveAuctions(): Array<Auction>;
  getActiveAuction(auctionId: number): Auction;
  getCloseSoonAuctions(): Array<Auction>;
  fetchAuction(auction: Auction): void;
  registerAuction(auction: Auction): void;
}

export default TemporalPermanence;
