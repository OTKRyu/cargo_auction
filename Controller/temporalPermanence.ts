import Auction from "../Entity/auction";

interface TemporalPermanence {
  getActiveAuctions(): Array<Auction>;
  getActiveAuction(auctionId: number): Auction;
  fetchAuction(auction: Auction): undefined;
}

export default TemporalPermanence;
