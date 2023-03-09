import { expect, assert } from "chai";

import Bid from "../../Entity/bid";
import OwnerImpl from "../../Usecase/ownerImpl";
import AccountImpl from "../../Usecase/accountImpl";

describe("OwnerImpl test", () => {
  const account = new AccountImpl("abc", 100);
  const owner = new OwnerImpl(0, "name", account);
  const cargo = owner.createCargo(
    0,
    "cargo",
    "container",
    "2023-02-20",
    undefined
  );

  it("OwnerImpl property test", () => {
    expect(owner.id).to.equal(0);
    expect(owner.userName).to.equal("name");
    expect(owner.account).deep.equal(account);
  });

  it("OwnerImpl method creatCargo test", () => {
    const cargo = owner.createCargo(
      0,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    expect(cargo.id).to.equal(0);
    expect(cargo.name).to.equal("cargo");
    expect(cargo.category).to.equal("container");
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
    const truckerAccount = new AccountImpl("bcd", 100);
    const auction = owner.createAuction(
      0,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    assert.throw(
      () => {
        owner.payTransportFee(auction, truckerAccount);
      },
      Error,
      "Your auction isn't done yet"
    );
  });

  it("owner method payTransportFee no trucker test", () => {
    const truckerAccount = new AccountImpl("bcd", 100);
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
        owner.payTransportFee(auction, truckerAccount);
      },
      Error,
      "Your auction doesn't have trucker"
    );
  });

  it("owner method payTransportFee test", () => {
    const truckerAccount = new AccountImpl("bcd", 100);
    const auction = owner.createAuction(
      0,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    const bid = new Bid(0, 0, 0, 50);
    auction.status = "done";
    auction.addBid(bid);
    auction.determineTrucker();
    expect(owner.payTransportFee(auction, truckerAccount)).to.equal(true);
    expect(owner.account.balance).to.equal(50);
    expect(truckerAccount.balance).to.equal(150);
  });

  it("owner method changeCargeStatus test", () => {
    const localAccount = new AccountImpl("abc", 100);
    const localOwner = new OwnerImpl(0, "name", localAccount);
    const localCargo = localOwner.createCargo(
      0,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    localCargo.status = "progress";

    localOwner.changeCargoStatus(localCargo);

    expect(localCargo.status).to.equal("arrived");
  });

  it("owner method changeCargeStatus wrong owner test", () => {
    const localAccount = new AccountImpl("abc", 100);
    const localOwner = new OwnerImpl(0, "name", localAccount);
    const localCargo = localOwner.createCargo(
      0,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    localCargo.status = "progress";

    const otherAccount = new AccountImpl("bcd", 100);
    const otherOwner = new OwnerImpl(1, "other neme", otherAccount);

    assert.throw(
      () => otherOwner.changeCargoStatus(localCargo),
      Error,
      "This cargo isn't yours"
    );
  });

  it("owner method changeCargeStatus wrong status test", () => {
    const localAccount = new AccountImpl("abc", 100);
    const localOwner = new OwnerImpl(0, "name", localAccount);
    const localCargo = owner.createCargo(
      0,
      "cargo",
      "container",
      "2023-02-20",
      undefined
    );

    assert.throw(
      () => localOwner.changeCargoStatus(localCargo),
      Error,
      "Your cargo isn't in progress"
    );
  });
});
