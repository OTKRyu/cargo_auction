import { expect } from "chai";
import Bid from "../../Entity/bid";

describe("bid test", () => {
  it("bid property test", () => {
    const bid = new Bid(0, 0, 0, 10);

    expect(bid.id).to.equal(0);
    expect(bid.auctionId).to.equal(0);
    expect(bid.truckerId).to.equal(0);
    expect(bid.transportFee).to.equal(10);
  });
});
