import Owner from "../Entity/owner";

interface OwnerPermanence {
  getOwner(ownerId: number): Promise<Owner>;
  getNewOwnerId(): Promise<number>;
  saveOwner(owner: Owner): Promise<void>;
  fetchOwner(owner: Owner): Promise<void>;
}

export default OwnerPermanence;
