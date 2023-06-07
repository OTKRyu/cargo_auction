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

  async activateAuctions() {
    const auctions = await this.auctionPermanence.getStartSoonAuctions();
    auctions.forEach(async (auction) => {
      auction.startAuction();
      this.tmporalAuctionPermanence.registerAuction(auction);
      await this.auctionPermanence.fetchAuction(auction);
    });
    return auctions;
  }

  async closeAuctions() {
    const auctions = await this.tmporalAuctionPermanence.getCloseSoonAuctions();
    auctions.forEach(async (auction) => {
      auction.endAuction();
      await this.auctionPermanence.fetchAuction(auction);
      await this.tmporalAuctionPermanence.removeAuction(auction);
    });
  }
}

export default BatchController;
