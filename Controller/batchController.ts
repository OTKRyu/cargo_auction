import TemporalPermanence from "./temporalPermanence";
import AuctionPermanence from "./auctionPermanence";

class BatchController {
  temporalPermanence: TemporalPermanence;
  auctionPermanence: AuctionPermanence;

  constructor(
    temporalPermanence: TemporalPermanence,
    auctionPermanence: AuctionPermanence
  ) {
    this.temporalPermanence = temporalPermanence;
    this.auctionPermanence = auctionPermanence;
  }

  activateAuctions() {
    const auctions = this.auctionPermanence.getStartSoonAuctions();
    auctions.forEach((auction) => {
      auction.startAuction();
      this.temporalPermanence.registerAuction(auction);
      this.auctionPermanence.fetchAuction(auction);
    });
    return auctions;
  }

  closeAuctions() {
    const auctions = this.temporalPermanence.getCloseSoonAuctions();
    auctions.forEach((auction) => {
      auction.endAuction();
      this.auctionPermanence.fetchAuction(auction);
      this.temporalPermanence.removeAuction(auction);
    });
  }
}

export default BatchController;
