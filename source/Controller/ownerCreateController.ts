import Account from "../entity/account";

import OwnerImpl from "../usecase/ownerImpl";

import OwnerPermanence from "./ownerPermanence";

class OwnerCreateController {
  ownerPermanence: OwnerPermanence;

  constructor(ownerPermanence: OwnerPermanence) {
    this.ownerPermanence = ownerPermanence;
  }

  async createNewOwner(userName: string, account: Account) {
    const ownerId = await this.ownerPermanence.getNewOwnerId();
    const owner = new OwnerImpl(ownerId, userName, account);
    await this.ownerPermanence.saveOwner(owner);
    return owner;
  }
}

export default OwnerCreateController;
