import Cargo from "../entity/cargo";

interface CargoPermanence {
  getCargo(cargoId: number): Promise<Cargo>;
  getOwnersCargos(ownerId: number): Promise<Array<Cargo>>;
  getTruckerCargos(truckerId: number): Promise<Array<Cargo>>;
  getNewCargoId(): Promise<number>;
  saveCargo(cargo: Cargo): Promise<void>;
  fetchCargo(cargo: Cargo): Promise<void>;
}

export default CargoPermanence;
