import Account from "../Entity/account";

import TruckerImpl from "../Usecase/truckerImpl";

import TruckerPermanence from "./truckerPermanence";

class TruckerCreateController {
  truckerPermanence: TruckerPermanence;

  constructor(ownerPermanence: TruckerPermanence) {
    this.truckerPermanence = ownerPermanence;
  }

  createNewTrucker(userName: string, account: Account) {
    const truckerId = this.truckerPermanence.getNewTruckerId();
    const trucker = new TruckerImpl(truckerId, userName, account);
    this.truckerPermanence.saveTrucker(trucker);
  }
}

export default TruckerCreateController;
