import Cargo from "../entity/cargo";

interface CargoPermanence {
  getCargo(cargoId: number): Cargo;
  getOwnersCargos(ownerId: number): Array<Cargo>;
  getTruckerCargos(truckerId: number): Array<Cargo>;
  getNewCargoId(): number;
  saveCargo(cargo: Cargo): void;
  fetchCargo(cargo: Cargo): void;
}

export default CargoPermanence;
