---
layout: page
title: "Features"
subheadline: "Why another query federation Engine?"
show_meta: false
teaser: "Semagrow is both algorithmically sophisticated and well-engineered and has been shown to outperform all other federated querying engines on both standard benchmarks and our own use cases."
permalink: "/features/"
header: no
---
## Data integration made easy

Semagrow allows combining, cross-indexing and, in general, making the
best out of all public data, regardless of their size, update rate,
and schema: Semagrow offers a single SPARQL endpoint that serves data
from remote data sources and that hides from client applications
heterogeneity in both form (federating non-SPARQL endpoints) and
meaning (transparently mapping queries and query results between
vocabularies).



## Advanced query execution planning

The Semagrow query planner exploits metadata about the nodes of the
federation to optimize query execution. Semagrow allows full
flexibility on the level of detail of this metadata, and exhibits
pay-as-you-go behaviour where robustness to lack of detail and
accuracy of the metadata is matched with the quality of the
optimization in the presence of detailed and accurate metadata.



## Non-blocking query execution

The multi-threaded execution engine of the Semagrow Stack is developed
following the reactive paradigm, operating asynchronously and
non-blocking in the face of unresponsive or slow data producers.



## Performance

Semagrow has been evaluated on FedBench, the de facto standard
benchmark in the federated querying community and compared against
SPLENDID and FedX, the best performing systems in previous surveys.
Semagrow was measured to [outperform both systems][1].



## Run-time Testing

Semagrow features an extensive logging and log visualization
component, used both for experimentation and for monitoring system
health from the Semagrow Web app.

 [1]: http://dx.doi.org/10.1145/2814864.2814886
