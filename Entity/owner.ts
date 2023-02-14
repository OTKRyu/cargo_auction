interface Owner {
  id: number;
  userName: string;
  account: string;
  getCargoes: Function;
  registerAuction: Function;
  payTransportFee: Function;
  changeCargoStatus: Function;
}

export default Owner;
