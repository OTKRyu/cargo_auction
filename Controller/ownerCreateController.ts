import Account from "../Entity/account";

import OwnerImpl from "../Usecase/ownerImpl";

import OwnerPermanence from "./ownerPermanence";

class OwnerController {
  ownerPermanence: OwnerPermanence;

  constructor(ownerPermanence: OwnerPermanence) {
    this.ownerPermanence = ownerPermanence;
  }

  createNewOwner(userName: string, account: Account) {
    const ownerId = this.ownerPermanence.getNewOwnerId();
    const owner = new OwnerImpl(ownerId, userName, account);
    this.ownerPermanence.saveOwner(owner);
  }
}

export default OwnerController;
