import { expect, assert } from "chai";

import OwnerImpl from "../../Usecase/ownerImpl";
import AccountImpl from "../../Usecase/accountImpl";
import TruckerImpl from "../../Usecase/truckerImpl";

describe("OwnerImpl test", () => {
  const account = new AccountImpl(0, 100);
  const owner = new OwnerImpl(0, "name", account);
  const cargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);

  it("OwnerImpl property test", () => {
    expect(owner.id).to.equal(0);
    expect(owner.userName).to.equal("name");
    expect(owner.account).deep.equal(account);
  });

  it("OwnerImpl method registerCargo test", () => {
    const cargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);

    expect(cargo.id).to.equal(0);
    expect(cargo.name).to.equal("cargo");
    expect(cargo.transportDueDate).to.equal("2023-02-20");
    expect(cargo.description).to.equal(undefined);
    expect(cargo.ownerId).to.equal(owner.id);
    expect(cargo.status).to.equal("todo");
  });

  it("Owner method createAuction test", () => {
    const auction = owner.createAuction(
      0,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );

    expect(auction.id).to.equal(0);
    expect(auction.cargo).deep.equal(cargo);
    expect(auction.ownerId).to.equal(owner.id);
    expect(auction.auctionExpireDate).to.equal("2023-02-28");
    expect(auction.auctionStartDate).to.equal("2023-02-20");
    expect(auction.transportFeeUpperLimit).to.equal(50);
    expect(auction.status).to.equal("todo");
    expect(auction.auctionHistory.length).to.equal(0);
  });

  it("Owner method createAuction not enough balance test", () => {
    assert.throw(
      () => {
        owner.createAuction(0, cargo, "2023-02-28", "2023-02-20", 500);
      },
      Error,
      "Your balance isn't enough for making auction"
    );
  });

  it("owner method payTransportFee wrong status test", () => {
    const truckerAccount = new AccountImpl(1, 100);
    const trucker = new TruckerImpl(0, "trucker", truckerAccount);
    const auction = owner.createAuction(
      0,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    assert.throw(
      () => {
        owner.payTransportFee(auction, trucker);
      },
      Error,
      "Your auction isn't done yet"
    );
  });

  it("owner method payTransportFee no trucker test", () => {
    const truckerAccount = new AccountImpl(1, 100);
    const trucker = new TruckerImpl(0, "trucker", truckerAccount);
    const auction = owner.createAuction(
      0,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    auction.status = "done";
    assert.throw(
      () => {
        owner.payTransportFee(auction, trucker);
      },
      Error,
      "Your auction doesn't have trucker"
    );
  });

  it("owner method payTransportFee test", () => {
    const truckerAccount = new AccountImpl(1, 100);
    const trucker = new TruckerImpl(0, "trucker", truckerAccount);
    const auction = owner.createAuction(
      0,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    const bid = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 50,
    };
    auction.status = "done";
    auction.addBid(bid);
    auction.determineTrucker();
    expect(owner.payTransportFee(auction, trucker)).to.equal(true);
    expect(owner.account.balance).to.equal(50);
    expect(trucker.account.balance).to.equal(150);
  });

  it("owner method changeCargeStatus test", () => {
    const localAccount = new AccountImpl(0, 100);
    const localOwner = new OwnerImpl(0, "name", localAccount);
    const localCargo = localOwner.registerCargo(
      0,
      "cargo",
      "2023-02-20",
      undefined
    );

    localCargo.status = "progress";

    localOwner.changeCargoStatus(localCargo);

    expect(localCargo.status).to.equal("arrived");
  });

  it("owner method changeCargeStatus wrong owner test", () => {
    const localAccount = new AccountImpl(0, 100);
    const localOwner = new OwnerImpl(0, "name", localAccount);
    const localCargo = localOwner.registerCargo(
      0,
      "cargo",
      "2023-02-20",
      undefined
    );

    localCargo.status = "progress";

    const otherAccount = new AccountImpl(1, 100);
    const otherOwner = new OwnerImpl(1, "other neme", otherAccount);

    assert.throw(
      () => otherOwner.changeCargoStatus(localCargo),
      Error,
      "This cargo isn't yours"
    );
  });

  it("owner method changeCargeStatus wrong status test", () => {
    const localAccount = new AccountImpl(0, 100);
    const localOwner = new OwnerImpl(0, "name", localAccount);
    const localCargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);

    assert.throw(
      () => localOwner.changeCargoStatus(localCargo),
      Error,
      "Your cargo isn't in progress"
    );
  });
});
