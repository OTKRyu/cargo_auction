type Cargo = {
  id: number;
  name: string;
  category: string;
  transferDueDate: string;
  description: string | undefined;
  ownerId: number;
  status: "todo" | "progress" | "arrived";
};

export default Cargo;
