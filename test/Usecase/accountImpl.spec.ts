import { expect } from "chai";
import AccountImpl from "../../Usecase/accountImpl";

describe("AccountImpl test", () => {
  it("accountImpl property test", () => {
    const account = new AccountImpl("abc", 10);
    expect(account.id).to.equal("abc");
    expect(account.balance).to.equal(10);
  });

  it("accountImpl method deposit test", () => {
    const account = new AccountImpl("abc", 10);
    account.deposit(5);
    expect(account.balance).to.equal(15);
  });

  it("accountImpl method deposit test", () => {
    const account = new AccountImpl("abc", 10);
    account.withdraw(7);
    expect(account.balance).to.equal(3);
  });
});
