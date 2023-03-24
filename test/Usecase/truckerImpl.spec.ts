import { expect, assert } from "chai";

import OwnerImpl from "../../Usecase/ownerImpl";
import AccountImpl from "../../Usecase/accountImpl";
import TruckerImpl from "../../Usecase/truckerImpl";

describe("TruckerImpl test", () => {
  const account = new AccountImpl("abc", 100);
  const trucker = new TruckerImpl(0, "trucker", account);

  const ownerAccount = new AccountImpl("abc", 1000);
  const owner = new OwnerImpl(0, "name", ownerAccount);
  const cargo = owner.registerCargo(
    0,
    "cargo",
    "container",
    "2023-02-20",
    undefined
  );

  it("TruckerImpl property test", () => {
    expect(trucker.id).to.equal(0);
    expect(trucker.userName).to.equal("trucker");
    expect(trucker.account).deep.equal(account);
  });

  it("TruckerImpl method participateAuction test", () => {
    const localAuction = owner.createAuction(
      1,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    const bid = {
      auctionId: localAuction.id,
      truckerId: trucker.id,
      transportFee: 100};
    trucker.participateAuction(localAuction, 100);

    expect(localAuction.auctionHistory).deep.equal([bid]);
  });

  it("TruckerImpl method changeCargoStatus test", () => {
    const localCargo = owner.registerCargo(
      1,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    localCargo.truckerId = 0;

    const result = trucker.changeCargoStatus(localCargo);

    expect(result).to.equal(true);
    expect(localCargo.status).to.equal("progress");
  });

  it("TruckerImpl method changeCargoStatus no trucker test", () => {
    const localCargo = owner.registerCargo(
      1,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    assert.throw(
      () => {
        trucker.changeCargoStatus(localCargo);
      },
      Error,
      "This cargo didn't get trucker yet"
    );
  });

  it("TruckerImpl method changeCargoStatus wrong trucker test", () => {
    const localCargo = owner.registerCargo(
      1,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    localCargo.truckerId = 1;

    assert.throw(
      () => {
        trucker.changeCargoStatus(localCargo);
      },
      Error,
      "This cargo isn't yours"
    );
  });

  it("TruckerImpl method changeCargoStatus wrong status test", () => {
    const localCargo = owner.registerCargo(
      1,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    localCargo.truckerId = 0;
    localCargo.status = "progress";

    assert.throw(
      () => {
        trucker.changeCargoStatus(localCargo);
      },
      Error,
      "Your cargo was already departed"
    );
  });
});
