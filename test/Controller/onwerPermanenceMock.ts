import Owner from "../../Entity/owner";

import AccountImpl from "../../Usecase/accountImpl";
import OwnerImpl from "../../Usecase/ownerImpl";

import OwnerPermanence from "../../Controller/ownerPermanence";

class OwnerPermanenceMock implements OwnerPermanence {
  getOwner(ownerId: number) {
    const account = new AccountImpl(0, 100);
    const owner = new OwnerImpl(ownerId, "name", account);
    return owner;
  }
  getOwners(ownerId: number) {
    const account = new AccountImpl(0, 100);
    const owner = new OwnerImpl(ownerId, "name", account);
    return [owner];
  }
  getNewOwnerId() {
    return 0;
  }
  saveOwner(owner: Owner) {
    return true;
  }
  fetchOwner(owner: Owner) {
    return true;
  }
}

export default OwnerPermanenceMock;
