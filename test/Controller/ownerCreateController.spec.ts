import { expect } from "chai";

import OnwerCreateController from "../../Controller/ownerCreateController";

import OwnerPermanenceMock from "./onwerPermanenceMock";

describe("OnwerCreateController test", () => {
  const ownerPermanenceMock = new OwnerPermanenceMock();
  const ownerCreateController = new OnwerCreateController(ownerPermanenceMock);

  it("ownerCreateController property test", () => {
    expect(ownerCreateController.ownerPermanence).deep.equal(
      ownerPermanenceMock
    );
  });
});
