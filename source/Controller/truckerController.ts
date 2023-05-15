import Trucker from "../Entity/trucker";

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

  participateAuction(auctionId: number, transportFee: number) {
    const auction = this.tmporalAuctionPermanence.getActiveAuction(auctionId);
    this.trucker.participateAuction(auction, transportFee);
    this.tmporalAuctionPermanence.fetchAuction(auction);
    return auction;
  }

  changeCargoStatus(cargoId: number) {
    const cargo = this.cargoPermanence.getCargo(cargoId);
    this.trucker.changeCargoStatus(cargo);
    this.cargoPermanence.fetchCargo(cargo);
    return cargo;
  }
}

export default TruckerController;
