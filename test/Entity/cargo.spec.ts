import { expect } from "chai";
import Cargo from "../../source/entity/cargo";

describe("cargo test", () => {
  it("cargo property test", () => {
    const cargo = new Cargo(0, "cargo", "2023-02-20", undefined, 0);

    expect(cargo.cargoId).to.equal(0);
    expect(cargo.name).to.equal("cargo");
    expect(cargo.transportDueDate).to.equal("2023-02-20");
    expect(cargo.description).to.equal(undefined);
    expect(cargo.ownerId).to.equal(0);
    expect(cargo.status).to.equal("todo");
  });
});
