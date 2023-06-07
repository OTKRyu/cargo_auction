import Trucker from "../entity/trucker";

import TmporalAuctionPermanence from "./temporalAuctionPermanence";
import CargoPermanence from "./cargoPermanence";
import TruckerPermanence from "./truckerPermanence";

class TruckerController {
  tmporalAuctionPermanence: TmporalAuctionPermanence;
  cargoPermanence: CargoPermanence;
  truckerPermanence: TruckerPermanence;
  trucker: Trucker;

  constructor(
    tmporalAuctionPermanence: TmporalAuctionPermanence,
    cargoPermanence: CargoPermanence,
    truckerPermanence: TruckerPermanence,
    trucker: Trucker
  ) {
    this.tmporalAuctionPermanence = tmporalAuctionPermanence;
    this.cargoPermanence = cargoPermanence;
    this.truckerPermanence = truckerPermanence;
    this.trucker = trucker;
  }

  async participateAuction(auctionId: number, transportFee: number) {
    const auction = await this.tmporalAuctionPermanence.getActiveAuction(auctionId);
    this.trucker.participateAuction(auction, transportFee);
    await this.tmporalAuctionPermanence.fetchAuction(auction);
    return auction;
  }

  async changeCargoStatus(cargoId: number) {
    const cargo = await this.cargoPermanence.getCargo(cargoId);
    this.trucker.changeCargoStatus(cargo);
    await this.cargoPermanence.fetchCargo(cargo);
    return cargo;
  }
}

export default TruckerController;
