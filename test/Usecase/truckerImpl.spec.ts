import { expect, assert } from "chai";

import OwnerImpl from "../../source/usecase/ownerImpl";
import AccountImpl from "../../source/usecase/accountImpl";
import TruckerImpl from "../../source/usecase/truckerImpl";

describe("TruckerImpl test", () => {
  const account = new AccountImpl(0, 100);
  const trucker = new TruckerImpl(0, "trucker", account);

  const ownerAccount = new AccountImpl(0, 1000);
  const owner = new OwnerImpl(0, "name", ownerAccount);
  const cargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);

  it("TruckerImpl property test", () => {
    expect(trucker.truckerId).to.equal(0);
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
      auctionId: localAuction.auctionId,
      truckerId: trucker.truckerId,
      transportFee: 100,
    };
    trucker.participateAuction(localAuction, 100);

    expect(localAuction.auctionHistory).deep.equal([bid]);
  });

  it("TruckerImpl method eraseLastestAuctionBid test", () => {
    const localAuction = owner.createAuction(
      1,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );

    trucker.participateAuction(localAuction, 100);
    trucker.eraseLatestAuctionBid(localAuction);
    expect(localAuction.auctionHistory.length).to.equal(0);
  });

  it("TruckerImpl method eraseLastestAuctionBid no history test", () => {
    const localAuction = owner.createAuction(
      1,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );

    assert.throw(
      () => {
        trucker.eraseLatestAuctionBid(localAuction);
      },
      Error,
      "Auction doesn't have bids"
    );
  });

  it("TruckerImpl method eraseLastestAuctionBid other trucker try test", () => {
    const localAuction = owner.createAuction(
      1,
      cargo,
      "2023-02-28",
      "2023-02-20",
      50
    );
    const account = new AccountImpl(1, 100);
    const localTrucker = new TruckerImpl(1, "trucker", account);

    trucker.participateAuction(localAuction, 100);

    assert.throw(
      () => {
        localTrucker.eraseLatestAuctionBid(localAuction);
      },
      Error,
      "You can erase your bid only when your bid is latest one"
    );
  });

  it("TruckerImpl method changeCargoStatus test", () => {
    const localCargo = owner.registerCargo(1, "cargo", "2023-02-20", undefined);

    localCargo.truckerId = 0;

    const result = trucker.changeCargoStatus(localCargo);

    expect(result).to.equal(true);
    expect(localCargo.status).to.equal("progress");
  });

  it("TruckerImpl method changeCargoStatus no trucker test", () => {
    const localCargo = owner.registerCargo(1, "cargo", "2023-02-20", undefined);

    assert.throw(
      () => {
        trucker.changeCargoStatus(localCargo);
      },
      Error,
      "This cargo didn't get trucker yet"
    );
  });

  it("TruckerImpl method changeCargoStatus wrong trucker test", () => {
    const localCargo = owner.registerCargo(1, "cargo", "2023-02-20", undefined);

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
    const localCargo = owner.registerCargo(1, "cargo", "2023-02-20", undefined);

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
