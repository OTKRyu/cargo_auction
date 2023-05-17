import Owner from "../entity/owner";

import TmporalAuctionPermanence from "./temporalAuctionPermanence";
import OwnerPermanence from "./ownerPermanence";
import AuctionPermanence from "./auctionPermanence";
import CargoPermanence from "./cargoPermanence";
import TruckerPermanence from "./truckerPermanence";

class OwnerController {
  tmporalAuctionPermanence: TmporalAuctionPermanence;
  ownerPermanence: OwnerPermanence;
  auctionPermanence: AuctionPermanence;
  cargoPermanence: CargoPermanence;
  truckerPermanence: TruckerPermanence;
  owner: Owner;

  constructor(
    tmporalAuctionPermanence: TmporalAuctionPermanence,
    ownerPermanence: OwnerPermanence,
    auctionPermanence: AuctionPermanence,
    cargoPermanence: CargoPermanence,
    truckerPermanence: TruckerPermanence,
    owner: Owner
  ) {
    this.tmporalAuctionPermanence = tmporalAuctionPermanence;
    this.ownerPermanence = ownerPermanence;
    this.auctionPermanence = auctionPermanence;
    this.cargoPermanence = cargoPermanence;
    this.truckerPermanence = truckerPermanence;
    this.owner = owner;
  }

  registerNewCargo(
    name: string,
    transportDueDate: string,
    description: string | undefined
  ) {
    const cargoId = this.cargoPermanence.getNewCargoId();
    const cargo = this.owner.registerCargo(
      cargoId,
      name,
      transportDueDate,
      description
    );
    this.cargoPermanence.saveCargo(cargo);
    return cargo;
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
    return auction;
  }

  async payTransportFee(auctionId: number, truckerId: number) {
    const auction = this.auctionPermanence.getAuction(auctionId);
    const trucker = await this.truckerPermanence.getTrucker(truckerId);

    this.owner.payTransportFee(auction, trucker);

    this.ownerPermanence.saveOwner(this.owner);
    this.truckerPermanence.saveTrucker(trucker);
    return this.owner;
  }

  changeCargoStatus(cargoId: number) {
    const cargo = this.cargoPermanence.getCargo(cargoId);

    this.owner.changeCargoStatus(cargo);

    this.cargoPermanence.saveCargo(cargo);
    return cargo;
  }
}

export default OwnerController;
