import Account from "../Entity/account";

import TruckerImpl from "../Usecase/truckerImpl";

import TruckerPermanence from "./truckerPermanence";

class TruckerCreateController {
  truckerPermanence: TruckerPermanence;

  constructor(truckerPermanence: TruckerPermanence) {
    this.truckerPermanence = truckerPermanence;
  }

  createNewTrucker(userName: string, account: Account) {
    const truckerId = this.truckerPermanence.getNewTruckerId();
    const trucker = new TruckerImpl(truckerId, userName, account);
    this.truckerPermanence.saveTrucker(trucker);
    return trucker;
  }
}

export default TruckerCreateController;
