import TmporalAuctionPermanence from "./temporalAuctionPermanence";
import AuctionPermanence from "./auctionPermanence";

class BatchController {
  tmporalAuctionPermanence: TmporalAuctionPermanence;
  auctionPermanence: AuctionPermanence;

  constructor(
    tmporalAuctionPermanence: TmporalAuctionPermanence,
    auctionPermanence: AuctionPermanence
  ) {
    this.tmporalAuctionPermanence = tmporalAuctionPermanence;
    this.auctionPermanence = auctionPermanence;
  }

  activateAuctions() {
    const auctions = this.auctionPermanence.getStartSoonAuctions();
    auctions.forEach((auction) => {
      auction.startAuction();
      this.tmporalAuctionPermanence.registerAuction(auction);
      this.auctionPermanence.fetchAuction(auction);
    });
    return auctions;
  }

  closeAuctions() {
    const auctions = this.tmporalAuctionPermanence.getCloseSoonAuctions();
    auctions.forEach((auction) => {
      auction.endAuction();
      this.auctionPermanence.fetchAuction(auction);
      this.tmporalAuctionPermanence.removeAuction(auction);
    });
  }
}

export default BatchController;
