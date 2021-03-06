---
layout: page
title: "Configuration"
subheadline: "Setting up a Semagrow federation"
show_meta: false
teaser: "Semagrow allows both minimal and extensive configuration and
can make the most out of whatever you can provide"
permalink: "/configuration/"
header: no
---
## Minimal configuration

As a bare minimum, one must declare the remote endpoints that Semagrow
federates. These are specified in RDF using the [Turtle][1] format.
By default, Semagrow looks at
<samp>/etc/default/semagrow/metadata.ttl</samp>
to find information about its federation. A
<samp>metadata.ttl</samp> can be as minimal as:

{% highlight sparql %}
@prefix void: <http://rdfs.org/ns/void#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

_:DatasetRoot rdf:type void:Dataset .

_:Dataset1 rdf:type void:Dataset ;
     void:subset _:DatasetRoot ;
     void:sparqlEndpoint <http://dbpedia.org/sparql> .

_:Dataset2 rdf:type void:Dataset ;
     void:subset _:DatasetRoot ;
     void:sparqlEndpoint <http://data.nobelprize.org/sparql> .
{% endhighlight %}


## Schema-level metadata

The configuration shown above uses the [VoID vocabulary][2] to define
a federation of DBPedia and the Nobel prize laureates dataset without
providing any further details. A fuller VoID description would also
provide information about the properties and classes used in each
dataset. Such information is exploited by Semagrow in order to
formulate a finer-grained query execution plan that is aware of which
endpoints should be contacted in order to get relevant triples.

Many public endpoints publish VoID descriptions. See, for example,
[http://data.nobelprize.org/.well-known/void][4] for the description
of the Nobel dataset. These descriptions can be downloaded and
aggregated into a Semagrow configuration file. Our choice of Turtle
for serializing the RDF metadata that configures Semagrow is in fact
motivated by the ease of combining Turtle files by simple
concatenation.

The metadata.ttl file can be inspected and modified with any text
editor or RDF editor. The [ELEON][5] editor is such an RDF editor,
specifically adapted to editing Semagrow metadata. 
You can find a detailed ELEON User Guide [here][6].


## Instance-level metadata

Besides the schema-level information descussed above, Semagrow can
also take advantage of statistics about the entities described by a
dataset and the relations between them, as well as about the
linkes across datasets. Such statistics are used by the Semagrow query
execution planner in order to optimize query execution.

The [VoID vocabulary][2] provides properties regarding the number of
triples and distinct entities contained in a dataset. Semagrow can
also exploit even more detailed information represented in our
[Sevod vocabulary][1] that extends VoID with statistical information
akin to database histograms.

However, statistical VoID properties and, even more so, Sevod
properties are not used by the descriptions actually published by the
dataset providers. Such detailed descriptions can be generated by
Semagrow deployment administrators using either of the following
tools:

 * [sevod-scraper][7] scrapes Sevod histograms from RDF dumps

 * [STRHist][8] estimates Sevod histograms by generalizing the
   results obtained by a query workload

STRHist is one of the most ambitious aspects of Semagrow, as it aims
at the efficient federation of endpoints for which neither a dump nor
detailed metadata are published, and without imposing a query workload
solely for the purpose of estimating histograms: STRHist gradually
improves the estimation of what data is behind an endpoint by
observing the results of a client query workload.

The time it takes for [sevod-scraper][7] to construct a detailed metadata file
out of an RDF dumps is proportional to the size of the dump itself. Detailed
measurements of the size over time is depicted in the following line chart.

<img src="/assets/img/metadatagen.png" alt="Metadata" style="width:100%;height:auto;"> 


[1]: http://www.w3.org/TeamSubmission/turtle
[2]: http://www.w3.org/TR/void/ 
[3]: http://www.w3.org/2015/03/sevod
[4]: http://data.nobelprize.org/.well-known/void
[5]: https://github.com/semagrow/fork-eleon
[6]: /assets/pdf/metadata-editing.pdf 
[7]: https://github.com/semagrow/sevod-scraper
[8]: https://github.com/semagrow/strhist
