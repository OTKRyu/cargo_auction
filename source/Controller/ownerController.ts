import Owner from "../entity/owner";

import OwnerPermanence from "./ownerPermanence";
import AuctionPermanence from "./auctionPermanence";
import CargoPermanence from "./cargoPermanence";
import TruckerPermanence from "./truckerPermanence";

class OwnerController {
  ownerPermanence: OwnerPermanence;
  auctionPermanence: AuctionPermanence;
  cargoPermanence: CargoPermanence;
  truckerPermanence: TruckerPermanence;
  owner: Owner;

  constructor(
    ownerPermanence: OwnerPermanence,
    truckerPermanence: TruckerPermanence,
    cargoPermanence: CargoPermanence,
    auctionPermanence: AuctionPermanence,
    owner: Owner
  ) {
    this.ownerPermanence = ownerPermanence;
    this.auctionPermanence = auctionPermanence;
    this.cargoPermanence = cargoPermanence;
    this.truckerPermanence = truckerPermanence;
    this.owner = owner;
  }

  async registerNewCargo(
    name: string,
    transportDueDate: string,
    description: string | undefined
  ) {
    const cargoId = await this.cargoPermanence.getNewCargoId();
    const cargo = this.owner.registerCargo(
      cargoId,
      name,
      transportDueDate,
      description
    );
    await this.cargoPermanence.saveCargo(cargo);
    return cargo;
  }
  async createNewAuction(
    cargoId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    const auctionId = await this.auctionPermanence.getNewAuctionId();
    const cargo = await this.cargoPermanence.getCargo(cargoId);

    const auction = this.owner.createAuction(
      auctionId,
      cargo,
      auctionExpireDate,
      auctionStartDate,
      transportFeeUpperLimit
    );

    await this.auctionPermanence.saveAuction(auction);
    return auction;
  }

  async payTransportFee(auctionId: number, truckerId: number) {
    const auction = await this.auctionPermanence.getAuction(auctionId);
    const trucker = await this.truckerPermanence.getTrucker(truckerId);

    this.owner.payTransportFee(auction, trucker);

    await this.ownerPermanence.saveOwner(this.owner);
    await this.truckerPermanence.saveTrucker(trucker);
    return this.owner;
  }

  async changeCargoStatus(cargoId: number) {
    const cargo = await this.cargoPermanence.getCargo(cargoId);

    this.owner.changeCargoStatus(cargo);

    this.cargoPermanence.saveCargo(cargo);
    return cargo;
  }
}

export default OwnerController;
