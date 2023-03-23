import Owner from "../Entity/owner";

import TemporalPermanence from "./temporalPermanence";
import OwnerPermanence from "./ownerPermanence";
import AuctionPermanence from "./auctionPermanence";
import CargoPermanence from "./cargoPermanence";
import TruckerPermanence from "./truckerPermanence";

class OwnerController {
  temporalPermanence: TemporalPermanence;
  ownerPermanence: OwnerPermanence;
  auctionPermanence: AuctionPermanence;
  cargoPermanence: CargoPermanence;
  truckerPermanence: TruckerPermanence;
  owner: Owner;

  constructor(
    temporalPermanence: TemporalPermanence,
    ownerPermanence: OwnerPermanence,
    auctionPermanence: AuctionPermanence,
    cargoPermanence: CargoPermanence,
    truckerPermanence: TruckerPermanence,
    ownerId: number
  ) {
    this.temporalPermanence = temporalPermanence;
    this.ownerPermanence = ownerPermanence;
    this.auctionPermanence = auctionPermanence;
    this.cargoPermanence = cargoPermanence;
    this.truckerPermanence = truckerPermanence;
    this.owner = this.ownerPermanence.getOwner(ownerId);
  }

  registerNewCargo(
    name: string,
    category: string,
    transportDueDate: string,
    description: string | undefined
  ) {
    const cargoId = this.cargoPermanence.getNewCargoId();
    const cargo = this.owner.registerCargo(
      cargoId,
      name,
      category,
      transportDueDate,
      description
    );
    this.cargoPermanence.saveCargo(cargo);
  }
  createNewAuction(
    cargoId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    const auctionId = this.auctionPermanence.getNewAuctionId();
    const cargo = this.cargoPermanence.getCargo(cargoId);

    const auction = this.owner.createAuction(
      auctionId,
      cargo,
      auctionExpireDate,
      auctionStartDate,
      transportFeeUpperLimit
    );

    this.auctionPermanence.saveAuction(auction);
  }

  payTransportFee(auctionId: number, truckerId: number) {
    const auction = this.auctionPermanence.getAuction(auctionId);
    const trucker = this.truckerPermanence.getTrucker(truckerId);

    this.owner.payTransportFee(auction, trucker);

    this.ownerPermanence.saveOwner(this.owner);
    this.truckerPermanence.saveTrucker(trucker);
  }

  changeCargoStatus(cargoId: number) {
    const cargo = this.cargoPermanence.getCargo(cargoId);

    this.owner.changeCargoStatus(cargo);

    this.cargoPermanence.saveCargo(cargo);
  }
}

export default OwnerController;
