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


## Instance-level metadata



{% highlight sparql %}
@prefix void: <http://rdfs.org/ns/void#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix dc: <http://purl.org/dc/elements/1.1/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

_:DatasetRoot rdf:type void:Dataset .

_:Dataset1 rdf:type void:Dataset ;
     void:subset _:DatasetRoot ;
     void:sparqlEndpoint <http://dbpedia.org/sparql> ;
     void:triples 10000 ;
     void:distinctSubjects 200 ;
     void:distinctObjects  1000 ;
     void:properties 5 ;
     void:propertyPartition [
          void:property <http://localhost/my> ;
          void:triples 100 ;
          void:distinctSubjects 10 ;
          void:distinctObjects 10 ] ;
     void:propertyPartition [
          void:property <http://rdf.iit.demokritos.gr/2014/my#pred> ;
          void:triples 100 ;
          void:distinctSubjects 5 ] .
{% endhighlight %}



This file contains all the necessary information regarding the available
datasets that the SemaGrow stack can access in order to get the data the user
requests through SemaGrow using SPARQL queries.
The metadata.ttl file can be modified with a text editor or, ideally, using the
Eleon metadata editor. You can find detailed information on the usage of the
Eleon metadata editor at the Eleon User Guide.


## Advanced query execution planning

The Semagrow query planner exploits metadata about the nodes of the
federation to optimize query execution. This metadata follows our
[Sevod vocabulary][1]. Sevod extends the [VoID vocabulary][2] with
statistical information akin to database histograms.




## Non-blocking query execution

The multi-threaded execution engine of the Semagrow Stack is developed
following the reactive paradigm, operating asynchronously and
non-blocking in the face of unresponsive or slow data producers.


 [1]: http://www.w3.org/TeamSubmission/turtle
 [2]: http://www.w3.org/TR/void/ 
 [3]: http://www.w3.org/2015/03/sevod
 [4]: http://data.nobelprize.org/.well-known/void
