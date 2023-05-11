import { expect, assert } from "chai";
import AccountImpl from "../../Usecase/accountImpl";

describe("AccountImpl test", () => {
  it("accountImpl property test", () => {
    const account = new AccountImpl(0, 10);
    expect(account.accountId).to.equal(0);
    expect(account.balance).to.equal(10);
  });

  it("accountImpl method deposit test", () => {
    const account = new AccountImpl(0, 10);
    account.deposit(5);
    expect(account.balance).to.equal(15);
  });

  it("accountImpl method withdraw test with enough balance", () => {
    const account = new AccountImpl(0, 10);
    account.withdraw(7);
    expect(account.balance).to.equal(3);
  });

  it("accountImpl method withdraw test with not enough balance", () => {
    const account = new AccountImpl(0, 10);
    assert.throw(
      () => {
        account.withdraw(11);
      },
      Error,
      "Account doesn't have enough money"
    );
  });
});
