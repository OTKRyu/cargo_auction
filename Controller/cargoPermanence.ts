import Cargo from "../Entity/cargo";

interface CargoPermanence {
  getCargo(cargoId: number): Cargo;
  getCargos(cargoId: number): Array<Cargo>;
  getNewCargoId(): number;
  saveCargo(cargo: Cargo): boolean;
  fetchCargo(cargo: Cargo): boolean;
}

export default CargoPermanence;
