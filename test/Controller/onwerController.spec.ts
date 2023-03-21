import { expect } from "chai";

import AccountImpl from "../../Usecase/accountImpl";

import OnwerCreateController from "../../Controller/ownerCreateController";

import OwnerPermanenceMock from "./onwerPermanenceMock";

describe("OnwerCreateController test", () => {
  const ownerPermanenceMock = new OwnerPermanenceMock();
  it("ownerCreateContoller property test", () => {
    const ownerCreateController = new OnwerCreateController(
      ownerPermanenceMock
    );

    expect(ownerCreateController.ownerPermanence).deep.equal(
      ownerPermanenceMock
    );
  });
});
