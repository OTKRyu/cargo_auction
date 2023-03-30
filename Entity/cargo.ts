class Cargo {
  id: number;
  name: string;
  transportDueDate: string;
  description: string | undefined;
  ownerId: number;
  truckerId: number | undefined;
  status: "todo" | "progress" | "arrived";

  constructor(
    id: number,
    name: string,
    transportDueDate: string,
    description: string | undefined,
    ownerId: number
  ) {
    this.id = id;
    this.name = name;
    this.transportDueDate = transportDueDate;
    this.description = description;
    this.ownerId = ownerId;
    this.status = "todo";
  }
}

export default Cargo;
