import { expect } from "chai";
import AccountImpl from "../../Usecase/accountImpl";

describe("AccountImpl test", () => {
  it("accountImpl property test", () => {
    const account = new AccountImpl(10, "abc");
    expect(account.balance).to.equal(10);
    expect(account.id).to.equal("abc");
  });

  it("accountImpl method deposit test", () => {
    const account = new AccountImpl(10, "abc");
    account.deposit(5);
    expect(account.balance).to.equal(15);
  });

  it("accountImpl method deposit test", () => {
    const account = new AccountImpl(10, "abc");
    account.withdraw(7);
    expect(account.balance).to.equal(3);
  });
});
