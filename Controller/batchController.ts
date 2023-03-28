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
      this.temporalPermanence.registerAuction(auction);
    });
    return auctions;
  }

  closeAuctions() {
    const auctions = this.temporalPermanence.getCloseSoonAuctions();
    auctions.forEach((auction) => {
      this.auctionPermanence.fetchAuction(auction);
    });
  }
}

export default BatchController;
