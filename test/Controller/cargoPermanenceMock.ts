import Cargo from "../../Entity/cargo";

import CargoPermanence from "../../Controller/cargoPermanence";

class CargoPermanenceMock implements CargoPermanence {
  createCargo(cargoId: number) {
    const cargo = new Cargo(
      cargoId,
      "cargo",
      "container",
      "2023-02-20",
      undefined,
      0
    );
    return cargo;
  }
  getCargo(cargoId: number) {
    const cargo = this.createCargo(cargoId);
    return cargo;
  }
  getCargos() {
    const cargo = this.createCargo(0);
    return [cargo];
  }
  getNewCargoId() {
    return 0;
  }
  saveCargo(cargo: Cargo) {
    return;
  }
  fetchCargo(cargo: Cargo) {
    return;
  }
}

export default CargoPermanenceMock;
