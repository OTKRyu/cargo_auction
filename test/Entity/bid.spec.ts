import { expect } from "chai";
import Bid from "../../Entity/bid";

describe("bid test", () => {
  it("bid property test", () => {
    const bid = new Bid(0, 1, 2, 10);

    expect(bid.id).to.equal(0);
    expect(bid.auctionId).to.equal(1);
    expect(bid.truckerId).to.equal(2);
    expect(bid.transportFee).to.equal(10);
  });
});
