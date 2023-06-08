class Cargo {
  cargoId: number;
  name: string;
  transportDueDate: string;
  description: string | undefined;
  ownerId: number;
  truckerId: number | undefined;
  status: "todo" | "progress" | "arrived";

  constructor(
    cargoId: number,
    name: string,
    transportDueDate: string,
    description: string | undefined,
    ownerId: number,
    truckerId: number | undefined,
    status: "todo" | "progress" | "arrived"
  ) {
    this.cargoId = cargoId;
    this.name = name;
    this.transportDueDate = transportDueDate;
    this.description = description;
    this.ownerId = ownerId;
    this.truckerId = truckerId;
    this.status = status;
  }
}

export default Cargo;
