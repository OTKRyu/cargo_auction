class Cargo extends Object {
  id: number;
  name: string;
  category: string;
  transferDueDate: string;
  description: string | undefined;
  ownerId: number;
  status: "todo" | "progress" | "arrived";

  constructor(
    id: number,
    name: string,
    category: string,
    transferDueDate: string,
    description: string | undefined,
    ownerId: number
  ) {
    super();
    this.id = id;
    this.name = name;
    this.category = category;
    this.transferDueDate = transferDueDate;
    this.description = description;
    this.ownerId = ownerId;
    this.status = "todo";
  }
}

export default Cargo;
