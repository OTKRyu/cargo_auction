import Account from "../Entity/account";

import TruckerImpl from "../Usecase/truckerImpl";

import TruckerPermanence from "./truckerPermanence";

class TruckerCreateController {
  truckerPermanence: TruckerPermanence;

  constructor(truckerPermanence: TruckerPermanence) {
    this.truckerPermanence = truckerPermanence;
  }

  async createNewTrucker(userName: string, account: Account) {
    const truckerId = await this.truckerPermanence.getNewTruckerId();
    const trucker = new TruckerImpl(truckerId, userName, account);
    await this.truckerPermanence.saveTrucker(trucker);
    return trucker;
  }
}

export default TruckerCreateController;
