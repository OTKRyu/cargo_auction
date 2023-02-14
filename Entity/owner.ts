import Account from "./account";

interface Owner {
  id: number;
  userName: string;
  account: Account;
  createCargo: Function;
  createAuction: Function;
  payTransportFee: Function;
  changeCargoStatus: Function;
}

export default Owner;
