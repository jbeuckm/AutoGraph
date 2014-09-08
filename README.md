AutoGraph
=========

[![Build Status](https://travis-ci.org/jbeuckm/AutoGraph.png)](https://travis-ci.org/jbeuckm/AutoGraph)

This project is a port of my original [AutoGraph](https://github.com/jbeuckm/AutoGraph--old-version- "Original AutoGraph Project") to AngularJS.

The original was getting usable but needed a redesign to support the next steps in the roadmap: serialization, complexes, etc.

I am expecting a variety of benefits from the port:

1. better architecture with lessons learned
  * simple hash for serializable component models
  * ~~direct calls instead of events for wires~~ (thought better of that plan)
2. automated data binding (originally manual)
3. ~~cleaner testing with Protractor~~ (went with karma for TravisCI)
4. markup instead of procedural component interface building
5. cleaner ancestor references with inherited scopes
6. automated view building (originally manual)
7. so much more...

###ROADMAP###

+ ~~establish NPM project~~
+ ~~verify SVG directives will work as they do in my wildest dreams~~
+ ~~protractor running on TravisCI~~ (using karma with firefox instead)
+ ~~D3 Wires interface~~
+ ~~ComponentLibrary~~
+ ~~serialization to LocalStorage~~
+ ~~deserialization~~
+ templated Component directive interface
+ OOP Controllers (this may not happen exactly - angular is cool but weird)
+ All v1 Components *represents parity with the original version*
+ Time Series Graph Component
+ Complex Component building
+ OAuth.io interface

