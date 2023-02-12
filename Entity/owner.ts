interface Owner {
  id: number;
  userName: string;
  account: string;
  getCargos: Function;
  registerAuction: Function;
  payTransportFee: Function;
  changeCargoStatus: Function;
}

export default Owner;
