import { expect, assert } from "chai";
import { Auction, Bid } from "../../Entity/auction";

describe("bid test", () => {
  it("bid property test", () => {
    const bid = new Bid(0, 1, 2, 10);

    expect(bid.id).to.equal(0);
    expect(bid.auctionId).to.equal(1);
    expect(bid.truckerId).to.equal(2);
    expect(bid.transportFee).to.equal(10);
  });
});

describe("auction test", () => {
  it("auction property test", () => {
    const auction = new Auction(0, 1, 2, "2023-02-28", "2023-02-20", 500);

    expect(auction.id).to.equal(0);
    expect(auction.cargoId).to.equal(1);
    expect(auction.ownerId).to.equal(2);
    expect(auction.auctionExpireDate).to.equal("2023-02-28");
    expect(auction.auctionStartDate).to.equal("2023-02-20");
    expect(auction.transportFeeUpperLimit).to.equal(500);
    expect(auction.status).to.equal("todo");
    expect(auction.auctionHistory.length).to.equal(0);
  });

  it("auction method findMinimumBid empty test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);

    const result = auction.findMinimumTransportFee();
    expect(result).to.equal(auction.transportFeeUpperLimit);
  });

  it("auction method findMinimumBid add one test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);
    const bid = new Bid(0, 0, 0, 10);

    auction.addBid(bid);

    const result = auction.findMinimumTransportFee();
    expect(result).to.equal(10);
  });

  it("auction method findMinimumBid add two test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);
    const bid1 = new Bid(0, 0, 0, 10);
    const bid2 = new Bid(1, 0, 1, 9);

    auction.addBid(bid1);
    auction.addBid(bid2);

    const result2 = auction.findMinimumTransportFee();
    expect(result2).to.equal(9);
  });

  it("auction method addBid wrong auctionId test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);
    const bid = new Bid(0, 1, 0, 10);
    assert.throw(
      () => auction.addBid(bid),
      Error,
      "Your bid doesn't belong this auction"
    );
  });

  it("auction method addBid empty test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);
    const bid = new Bid(0, 0, 0, 10);
    const result = auction.addBid(bid);

    expect(result).to.equal(true);
    expect(auction.auctionHistory).deep.equal([bid]);
  });

  it("auction method addBid wrong transportFee test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);
    const bid1 = new Bid(0, 0, 0, 10);
    const bid2 = new Bid(1, 0, 1, 11);
    auction.addBid(bid1);
    assert.throw(
      () => auction.addBid(bid2),
      Error,
      "Your transportFee is higher than other"
    );
  });

  it("auction method addBid two bid test", () => {
    const auction = new Auction(0, 0, 0, "2023-02-28", "2023-02-20", 500);
    const bid1 = new Bid(0, 0, 0, 10);
    const bid2 = new Bid(1, 0, 1, 9);
    auction.addBid(bid1);
    const result = auction.addBid(bid2);

    expect(result).to.equal(true);
    expect(auction.auctionHistory).deep.equal([bid1, bid2]);
  });
});
