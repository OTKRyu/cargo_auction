import Trucker from "../Entity/trucker";

import TemporalPermanence from "./temporalPermanence";
import CargoPermanence from "./cargoPermanence";
import TruckerPermanence from "./truckerPermanence";

class TruckerController {
  temporalPermanence: TemporalPermanence;
  cargoPermanence: CargoPermanence;
  truckerPermanence: TruckerPermanence;
  trucker: Trucker;

  constructor(
    temporalPermanence: TemporalPermanence,
    cargoPermanence: CargoPermanence,
    truckerPermanence: TruckerPermanence,
    truckerId: number
  ) {
    this.temporalPermanence = temporalPermanence;
    this.cargoPermanence = cargoPermanence;
    this.truckerPermanence = truckerPermanence;
    this.trucker = this.truckerPermanence.getTrucker(truckerId);
  }

  participateAuction(auctionId: number, transportFee: number) {
    const auction = this.temporalPermanence.getActiveAuction(auctionId);
    this.trucker.participateAuction(auction, transportFee);
    this.temporalPermanence.fetchAuction(auction);
  }

  changeCargoStatus(cargoId: number) {
    const cargo = this.cargoPermanence.getCargo(cargoId);
    this.trucker.changeCargoStatus(cargo);
    this.cargoPermanence.fetchCargo(cargo);
  }
}
export default TruckerController;
