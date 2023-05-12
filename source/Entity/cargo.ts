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
    ownerId: number
  ) {
    this.cargoId = cargoId;
    this.name = name;
    this.transportDueDate = transportDueDate;
    this.description = description;
    this.ownerId = ownerId;
    this.status = "todo";
  }
}

export default Cargo;
