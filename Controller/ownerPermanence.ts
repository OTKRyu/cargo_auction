import Owner from "../Entity/owner";

interface Permanence {
  getOwner(ownerId: number): Owner;
  getOwners(ownerId: number): Array<Owner>;
  getNewOwnerId(): number;
  saveOwner(owner: Owner): boolean;
  fetchOwner(owner: Owner): boolean;
}

export default Permanence;
