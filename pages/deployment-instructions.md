---
layout:  page-fullwidth
show_meta: false
title: "Deployment Instructions"
subheadline: "A Step-by-Step Guide"
teaser: "This step-by-step guide helps you start using SemaGrow"
header: no
permalink: "/deployment-instructions/"
---
<div class="row">
<div class="medium-4 medium-push-8 columns" markdown="1">
<div class="panel radius" markdown="1">
**Table of Contents**
{: #toc }
*  TOC
{:toc}
</div>
</div><!-- /.medium-4.columns -->

<div class="medium-8 medium-pull-4 columns" markdown="1">



## Installation

### Debian distribution

Semagrow is available as a .deb distribution. To install on Debian-based systems
execute the following in a terminal:

{% include alert terminal='echo \'deb http://semagrow.semantic-web.at/deb/ lucid free\' > /etc/apt/sources.list.d/semagrow.list' %}

{% include alert terminal='wget -q http://semagrow.semantic-web.at/deb/packages.semagrow.key -O- \| apt-key add -' %}

Semagrow depends on Java 8 or later. To start the SemaGrow endpoint, issue:

{% include alert terminal='service semagrow start' %}

At this point, the Semagrow endpoint is up and running:

{% include alert terminal='service semagrow status' %}
{% include alert terminal='[ ok ] SemaGrow Stack is running with pid ******.' %}

Semagrow is a SPARQL endpoint meant to be used by a client
application, but a human-usable Web app is also provided for testing
and monitoring. The Semagrow Web app can be accessed at
http://localhost:8080/SemaGrow

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }



### Docker image

Semagrow is available as a Docker image. To install the image execute
the following in a terminal:

{% include alert terminal='docker run semagrow/semagrow:latest' %}



### Build from sources

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }

Semagrow is an open source project developed on Github. The source
repository can be cloned from
[https://github.com/semagrow/semagrow][3] and the most recent stable
version can be downloaded from the *master* branch. This is
always the version from which the Debian and Docker distributions are
produced. The current stable version is [version 1.4.0][4].

Maven is required in order to build the sources.

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }



## Configuration

As a bare minimum, one must declare the remote endpoints that Semagrow
federates. These are specified in RDF using the [Turtle][5] format.
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

More complex configuration files provide Semagrow with important
metadata and statistics about the contents of the federated endpoints.
Please consult the [configuration page][6] about generating such files.

Each time the <samp>metadata.ttl</samp> file is modified, the Semagrow
service must be restarted in order to read in the modified
configuration:

{% include alert terminal='service semagrow restart' %}

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }



## Usage

Semagrow is a SPARQL endpoint meant to be used by a client
application, but a human-usable Web app is also provided for testing
and monitoring. The Semagrow Web app can be accessed at
<samp>http://localhost:8080/SemaGrow</samp>.
Clicking on the “Sparql” tab presents the SPARQL query environment.

For our simple example, we will use the <samp>metadata.ttl</samp>
provided at the [Semagrow repository][1]. This
<samp>metadata.ttl</samp> describes the AGRIS endpoint that serves
agricultural science bibliography.

You can see a simple usage of the SemaGrow stack by submitting a
SPARQL query that retrieves the number of images published between the
years 2006 and 2008:

{% highlight sparql %}
prefix dct: <http://purl.org/dc/terms/>.
prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
select (count(?s) as ?num) {
   ?s dct:issued ?a.
   ?s dct:type "Image".
   filter(xsd:integer(?a) > 2005).
   filter(xsd:integer(?a) < 2009).
}
{% endhighlight %}

Press the `Execute` button to execute the query. The results are
presented in JSON format.

To demonstrate federated querying, we will now add a second dataset to
the federation by replacing <samp>metadata.ttl</samp> with a new
configuration file, also available at the [Semagrow repository][2].
This new configuration federates AGRIS with a dataset of that
annotates AGRIS resources with a “clean publication year” property
that disambiguates and normalizes publication years. The new dataset
does not add publications, but the publication year is guaranteed to
be an integer so that the same query yields more results.



<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }

</div><!-- /.medium-8.columns -->
</div><!-- /.row -->

[1]: https://github.com/semagrow/semagrow-stack-assembly/blob/master/src/resources/docs/metadata.ttl
[2]: https://github.com/semagrow/semagrow-stack-assembly/blob/master/src/resources/docs/metadata-2.ttl
[3]: https://github.com/semagrow/semagrow
[4]: https://github.com/semagrow/semagrow/archive/1.4.0.zip
[5]: http://www.w3.org/TeamSubmission/turtle
[6]: /configuration/
