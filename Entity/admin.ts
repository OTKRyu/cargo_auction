interface Admin {
  id: number;
  userName: string;
  getCargos: string;
  getOwners: Function;
  getTruckers: Function;
  checkCargoStatus: Function;
}

export default Admin;
