interface Trucker {
  id: number;
  userName: string;
  account: string;
  getCargoes: Function;
  participateAuction: Function;
  getTransportFee: Function;
  changeCargoStatus: Function;
}

export default Trucker;
