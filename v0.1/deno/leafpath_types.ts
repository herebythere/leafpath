// signal / ctrl, source node id, source port, destination node id, destination node part
type EdgeJSON = [number, number, number, number, number];

type Node = {
  id: number;
  edges: EdgeJSON[];
};

type Graph = Record<number, Node>;

type GraphJSON = {
  num_nodes: number;
  inputs: number[];
  outputs: number[];
  edges: EdgeJSON[];
};

interface Send {
  type: "send";
  edge: EdgeJSON;
}

interface Compute {
  type: "compute";
  node_id: number;
}

type Instruction =
  | Send
  | Compute;

export type { EdgeJSON, Graph, GraphJSON, Instruction, Node };
