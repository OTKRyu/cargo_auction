import Owner from "../Entity/owner";

interface OwnerPermanence {
  getOwner(ownerId: number): Promise<Owner> | Promise<undefined>;
  getOwners(): Promise<Array<Owner>> | Promise<undefined>;
  getNewOwnerId(): Promise<number> | Promise<undefined>;
  saveOwner(owner: Owner): Promise<void> | Promise<undefined>;
  fetchOwner(owner: Owner): Promise<void> | Promise<undefined>;
}

export default OwnerPermanence;
