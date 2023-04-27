import { expect, assert } from "chai";

import AuctionImpl from "../../Usecase/auctionImpl";
import OwnerImpl from "../../Usecase/ownerImpl";
import AccountImpl from "../../Usecase/accountImpl";

describe("auction test", () => {
  const account = new AccountImpl(0, 0);
  const owner = new OwnerImpl(0, "name", account);
  const cargo = owner.registerCargo(0, "cargo", "2023-02-20", undefined);
  it("auction property test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    expect(auction.id).to.equal(0);
    expect(auction.cargo).deep.equal(cargo);
    expect(auction.ownerId).to.equal(owner.id);
    expect(auction.auctionExpireDate).to.equal("2023-02-28");
    expect(auction.auctionStartDate).to.equal("2023-02-20");
    expect(auction.transportFeeUpperLimit).to.equal(500);
    expect(auction.status).to.equal("todo");
    expect(auction.auctionHistory.length).to.equal(0);
  });

  it("auction method findMinimumBid empty test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    const result = auction.findMinimumTransportFee();
    expect(result).to.equal(auction.transportFeeUpperLimit);
  });

  it("auction method findMinimumBid add one test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );
    const bid = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 10,
    };

    auction.addBid(bid);

    const result = auction.findMinimumTransportFee();
    expect(result).to.equal(10);
  });

  it("auction method findMinimumBid add two test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );
    const bid1 = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 10,
    };
    const bid2 = {
      auctionId: 0,
      truckerId: 1,
      transportFee: 9,
    };

    auction.addBid(bid1);
    auction.addBid(bid2);

    const result2 = auction.findMinimumTransportFee();
    expect(result2).to.equal(9);
  });

  it("auction method addBid wrong auctionId test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );
    const bid = {
      auctionId: 1,
      truckerId: 0,
      transportFee: 10,
    };
    assert.throw(
      () => auction.addBid(bid),
      Error,
      "Your bid doesn't belong this auction"
    );
  });

  it("auction method addBid empty test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );
    const bid = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 10,
    };
    const result = auction.addBid(bid);

    expect(result).to.equal(true);
    expect(auction.auctionHistory).deep.equal([bid]);
  });

  it("auction method addBid wrong transportFee test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );
    const bid1 = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 10,
    };
    const bid2 = {
      auctionId: 0,
      truckerId: 1,
      transportFee: 11,
    };
    auction.addBid(bid1);
    assert.throw(
      () => auction.addBid(bid2),
      Error,
      "Your transportFee is higher than other"
    );
  });

  it("auction method addBid two bid test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );
    const bid1 = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 10,
    };
    const bid2 = {
      auctionId: 0,
      truckerId: 1,
      transportFee: 9,
    };
    auction.addBid(bid1);
    const result = auction.addBid(bid2);

    expect(result).to.equal(true);
    expect(auction.auctionHistory).deep.equal([bid1, bid2]);
  });

  it("auction method determineTrucker status fail test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    assert.throw(
      () => auction.determineTrucker(),
      Error,
      "Auction didn't end yet"
    );
  });

  it("auction method determineTrucker history empty test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    auction.status = "done";

    expect(auction.determinedTruckerId).to.equal(undefined);
    expect(auction.cargo.truckerId).to.equal(undefined);
  });

  it("auction method determineTrucker test", () => {
    const localCargo = owner.registerCargo(1, "cargo", "2023-02-20", undefined);
    const auction = new AuctionImpl(
      1,
      localCargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    auction.status = "done";

    const truckerId = 0;

    const bid = {
      auctionId: auction.id,
      truckerId: truckerId,
      transportFee: 10,
    };
    auction.addBid(bid);
    auction.determineTrucker();

    expect(auction.determinedTruckerId).to.equal(truckerId);
    expect(auction.cargo.truckerId).to.equal(truckerId);
  });

  it("auction method startAuction test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    auction.startAuction();

    expect(auction.status).to.equal("progress");
  });

  it("auction method startAuction wrong status test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    auction.status = "progress";

    assert.throw(
      () => auction.startAuction(),
      Error,
      "Auction was already started"
    );
  });

  it("auction method endAuction test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    auction.status = "progress";

    const bid = {
      auctionId: 0,
      truckerId: 0,
      transportFee: 10,
    };

    auction.addBid(bid);
    auction.endAuction();

    expect(auction.status).to.equal("done");
  });

  it("auction method endAuction wrong status test", () => {
    const auction = new AuctionImpl(
      0,
      cargo,
      owner.id,
      "2023-02-28",
      "2023-02-20",
      500
    );

    assert.throw(() => auction.endAuction(), Error, "Auction wasn't started");
  });
});
