interface Trucker {
  id: number;
  userName: string;
  account: string;
  getAuctions: Function;
  participateAuction: Function;
  getTransportFee: Function;
  changeCargoStatus: Function;
}

export default Trucker;
