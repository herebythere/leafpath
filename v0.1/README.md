# Leafpath

derive a set of instructions from a directed graph

## Abstract

DSP chains can be constructed from node graphs

The same pattern can be used for different kinds of rendering targets.

A funcitonal pipeline can be expressed through a directed graph.

The goal is to take JSON, generate a graph, and create a set of instructions
based on the data flow in the graph.

## Wants

// user creates a patch

[input~\]

[num widget\]

[osc~ \]

[$hello \]

[\*~\]

[output\]

How do we represent it as json as much as possible?

Challenge: patch

connect subgraphs

just need inputs and outputs

## Notes

we want to separate creating dsp graphs from their functionality

to generate a list of instructions from a graph, need inputs and outputs

those instructions can be shared

the idea being we need a workstation to fiddle with maths visually (ie pure data
<3) but we also need to share that series of instructions (which could be
represented by f(x)) to other applications

So designers can directly share code with software engineers.

Visually construct DSP pipelines and port them to other languages.

As in, design for an audio experience and deploy in Unity, Android, linux, VSTs.

## Scope

Leafpaths describes the flow of data in a DSP chain

User app oriented LeafPath
{
    // ctrl
    midi,
    buttons,
    mouse,
    pointers,
    keyboards,
    broadcasts

    // signal
    audio
    delays
    broadcasts
}