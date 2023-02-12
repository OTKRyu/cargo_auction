interface Trucker {
  id: number;
  userName: string;
  account: string;
  getCargoList: Function;
  participateAuction: Function;
  getTransportFee: Function;
  changeCargoStatus: Function;
}

export default Trucker;
