interface Admin {
  id: number;
  userName: string;
  getCargos: string;
  getOwners: Function;
  getTruckers: Function;
  getAuctions: Function;
}

export default Admin;
