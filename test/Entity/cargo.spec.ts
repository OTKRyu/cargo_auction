import { expect } from "chai";
import Cargo from "../../Entity/cargo";

describe("cargo test", () => {
  it("cargo property test", () => {
    const cargo = new Cargo(
      0,
      "cargo",
      "container",
      "2023-02-20",
      undefined,
      0
    );

    expect(cargo.id).to.equal(0);
    expect(cargo.name).to.equal("cargo");
    expect(cargo.category).to.equal("container");
    expect(cargo.transportDueDate).to.equal("2023-02-20");
    expect(cargo.description).to.equal(undefined);
    expect(cargo.ownerId).to.equal(0);
    expect(cargo.status).to.equal("todo");
  });
});
