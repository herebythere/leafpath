import type {
  EdgeJSON,
  Graph,
  GraphJSON,
  Instruction,
} from "./leafpath_types.ts";

// traverse a graph and output a set of instructions

const instructions = [];

const queue = [];
const nodePortCount = {};


const createGraph = (graphJSON: GraphJSON): Graph => {
  const graph: Graph = {};

  for (const output of graphJSON.outputs) {
    graph[output] = {
      id: output,
      edges: [],
    };
  }

  for (const edge of graphJSON.edges) {
    // if 0 signal, 1 control

    if (graph[edge[1]] === undefined) {
      graph[edge[1]] = {
        id: edge[1],
        edges: [],
      };
    }

    graph[edge[1]].edges.push(edge);
  }

  return graph;
};

const createInstructions = (
  graphJSON: GraphJSON,
  graph: Graph,
): Instruction[] => {
  const instructions: Instruction[] = [];

  let nextQueue: number[] = [];
  let queue: number[] = [...graphJSON.inputs];

  let safety = 0;
  const max_safety = 1000;
  while (queue.length > 0) {
    if (safety > max_safety) {
      break;
    }

    for (const nodeID of queue) {
      // compute node
      instructions.push({
        type: "compute",
        node_id: nodeID,
      });
    }

    for (const nodeID of queue) {
      if (graph[nodeID] === undefined) {
        continue;
      }

      for (const edge of graph[nodeID].edges) {
        instructions.push({
          type: "send",
          edge: edge,
        });

        if (!queue.includes(edge[3]) && !nextQueue.includes(edge[3])) {
          nextQueue.push(edge[3]);
        }
      }
    }

    queue = nextQueue;
    nextQueue = [];

    safety += 1;
  }

  return instructions;
};

const createCtrlInstructions = (
  graph: Graph,
  target: number,
): Instruction[] => {
  const instructions: Instruction[] = [];

  let nextQueue: number[] = [];
  let queue: number[] = [target];

  let safety = 0;
  const max_safety = 1000;
  while (queue.length > 0) {
    if (safety > max_safety) {
      break;
    }

    for (const nodeID of queue) {
      if (graph[nodeID] === undefined) {
        continue;
      }

      // compute node
      instructions.push({
        type: "compute",
        node_id: nodeID,
      });
    }

    for (const nodeID of queue) {
      if (graph[nodeID] === undefined) {
        continue;
      }

      for (const edge of graph[nodeID].edges) {
        instructions.push({
          type: "send",
          edge: edge,
        });

        if (
          edge[0] === 1 && !nextQueue.includes(edge[3]) &&
          !queue.includes(edge[3])
        ) {
          nextQueue.push(edge[3]);
        }
      }
    }

    queue = nextQueue;
    nextQueue = [];
    // iterate across all in the queue

    safety += 1;
  }

  return instructions;
};

// 0 A
// 1 B
// 2 C
// 3 D
// 4 E

// 5 F
// 6 G
// 7 H

// A    F
// | \  | \
// B  C |  G
// |  |/   |
// |  D    |
// | /     |
// E       H

const graphJSON: GraphJSON = {
  num_nodes: 8,
  inputs: [0, 5],
  outputs: [4, 7],
  edges: [
    [0, 0, 0, 1, 0], // ~A ~B
    [0, 0, 0, 2, 0], // ~A ~C
    [0, 1, 0, 4, 0], // ~B ~E
    [0, 2, 0, 3, 0], // ~C ~D
    [0, 3, 0, 4, 0], // ~D ~E
    [1, 5, 0, 3, 1], //  F  D
    [1, 5, 0, 6, 0], //  F  G
    [1, 6, 0, 7, 0], //  G  H
  ],
};

const graph = createGraph(graphJSON);

const signalInstructions = createInstructions(graphJSON, graph);
const ctrlInstructions = createCtrlInstructions(graph, 5);

console.log("ctrl instructions:");
console.log(ctrlInstructions);

console.log("signal instructions:");
console.log(signalInstructions);

export { createGraph, createInstructions };
