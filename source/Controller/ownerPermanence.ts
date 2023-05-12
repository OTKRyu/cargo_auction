import Owner from "../Entity/owner";

interface Permanence {
  getOwner(ownerId: number): Owner;
  getOwners(ownerId: number): Array<Owner>;
  getNewOwnerId(): number;
  saveOwner(owner: Owner): void;
  fetchOwner(owner: Owner): void;
}

export default Permanence;
