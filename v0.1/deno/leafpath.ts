/*
  we want to separate creating dsp graphs from their functionality

  to generate a list of instructions from a graph, need inputs
  and outputs

  those instructions can be shared

  the idea being we need a workstation to fiddle with maths visually
  (ie pure data <3) but we also need to share that series of instructions
  (which could be represented by f(x)) to other applications

  So designers can directly share code with software engineers.

  Visually construct DSP pipelines and port them to other languages.

  As in, design for an audio experience and deploy in Unity, Android,
  linux, VSTs.
*/

/*
  Challenges:

  User interaction, "action" and "reactions". How does a user manipulate
  these DSP experiences.

  How to store and transfer tables of data?
  How to save state when working?
*/

export { createGraph, createInstructions } from "./edges.ts";
