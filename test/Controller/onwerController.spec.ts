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

  it("ownerCreateController method test", () => {
    const ownerCreateController = new OnwerCreateController(
      ownerPermanenceMock
    );
    const account = new AccountImpl("abc", 100);
    expect(ownerCreateController.createNewOwner("name", account)).to.equal(
      true
    );
  });
});
