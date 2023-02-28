class Cargo {
  id: number;
  name: string;
  category: string;
  transportDueDate: string;
  description: string | undefined;
  ownerId: number;
  status: "todo" | "progress" | "arrived";

  constructor(
    id: number,
    name: string,
    category: string,
    transportDueDate: string,
    description: string | undefined,
    ownerId: number
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.transportDueDate = transportDueDate;
    this.description = description;
    this.ownerId = ownerId;
    this.status = "todo";
  }
}

export default Cargo;
