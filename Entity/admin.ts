interface Admin {
  id: number;
  userName: string;
  getCargos: string;
  getAuctions: Function;
  getOwners: Function;
  getTruckers: Function;
}

export default Admin;
