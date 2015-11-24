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

SemaGrow is available as a .deb distribution. To install on Debian based system
you need to execute the following on a terminal:

{% include alert terminal='echo \'deb http://semagrow.semantic-web.at/deb/ lucid free\' > /etc/apt/sources.list.d/semagrow.list' %}

{% include alert terminal='wget -q http://semagrow.semantic-web.at/deb/packages.semagrow.key -O- \| apt-key add -' %}

{% include alert terminal='apt-get update && apt-get install openjdk-7-jdk semagrow' %}

To start the SemaGrow endpoint, issue:

{% include alert terminal='service semagrow start' %}

At this point, the SemaGrow stack should be up and running and the output of the

{% include alert terminal='service semagrow status' %}
{% include alert terminal='[ ok ] SemaGrow Stack is running with pid ****.' %}

To access SemaGrow Stack endpoint through a browser, enter the following
 url: http://<ip>:8080/SemaGrow, where <ip> is the IP of your computer.
 By default, SemaGrow uses the 8080 port

At http://143.233.226.43:8080/SemaGrow you can find a publicly available example
deployment of the SemaGrow stack.

The logs of the SemaGrow stack are found in your computer in the path:
`/var/log/semagrow/`

### WAR file

### Docker image

{% include alert terminal='docker run semagrow/semagrow:latest' %}


### Build from sources

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }


## Configuration

The information that the SemaGrow stack needs regarding the available datasets,
in the form of metadata, is found locally in your computer in the turtle file
metadata.ttl. This file is located at the path:
<samp>/etc/default/semagrow/metadata.ttl</samp>

This file contains all the necessary information regarding the available
datasets that the SemaGrow stack can access in order to get the data the user
requests through SemaGrow using SPARQL queries.
The metadata.ttl file can be modified with a text editor or, ideally, using the
Eleon metadata editor. You can find detailed information on the usage of the
Eleon metadata editor at the Eleon User Guide. Each time you modify the
<samp>metadata.ttl</samp> file you must restart the semagrow service by issuing  

{% include alert terminal='service semagrow restart' %}

Semagrow is a SPARQL endpoint meant to be used by a client
application, but a human-usable Web app is also provided for testing
and monitoring. The Semagrow Web app can be accessed at
<samp>http://localhost:8080/SemaGrow</samp>.
Clicking on the “Sparql” tab presents the SPARQL query environment (Screenshot 1).

By submitting SPARQL queries, one can get relevant results from the datasets
whose metadata information is provided through the <samp>metadata.ttl</samp> file. In our
example, the <samp>metadata.ttl</samp> file[1] contains metadata regarding the AGRIS dataset,
which is an international information system for the agricultural science and
technology.

You can see a simple usage of the SemaGrow stack by submitting the SPARQL query
already filled out in the SPARQL query box:

{% highlight sparql %}
select * {
  ?s ?p ?o
} limit 20
{% endhighlight %}

Simply press the SPARQL button below the box (by pressing the SPARQL button,
SemaGrow executes the query written inside the query box). This will return and
show on screen the first 20 results from AGRIS (Screenshot 2). As can be seen in
the screenshot, the query was successfully executed and the results are shown
on the right side of the page, in JSON format.

The great benefit from using the SemaGrow stack is that by altering the metadata
file, especially by adding metadata of new datasets semantically relevant to the
ones already used, SemaGrow can “understand” the relevance between the datasets
and thus provide an even greater and enriched result set, even by submitting the
same query as before the metadata change.

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }


## My First Example

Let's say one wants to get the agricultural images published between the years
2006 and 2008. The SPARQL query that can provide this result set is
(the metadata file contains information only for the AGRIS dataset and can be
found at [1]):

{% highlight sparql %}
prefix dct: <http://purl.org/dc/terms/>.
prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
select ?s ?a {
   ?s dct:issued ?a.
   ?s dct:type "Image".
   filter(xsd:integer(?a) > 2005).
   filter(xsd:integer(?a) < 2009).
}
{% endhighlight %}

The results showing the title of the publications (published between 2006 and
2008) will be shown on the right side of the page (Screenshot 3).


In order to receive the total number of those publications, we can execute the
following query:

{% highlight sparql %}
prefix dct: <http://purl.org/dc/terms/>.
prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
select (count(?s) as ?no) {
  ?s dct:issued ?a.
  ?s dct:type "Image".
  filter(xsd:integer(?a) > 2005).
  filter(xsd:integer(?a) < 2009).
}
{% endhighlight %}

see Screenshot 4: Counting images published during 2006 – 2008.

As mentioned above, the metadata file can be enriched with new datasets that the
user wants to be available to the SemaGrow stack for accessing and querying. So,
using the Eleon metadata editor, we add a new dataset that contains information
specifically for the year of publication of the publications contained in AGRIS.
The difference is that the new dataset contains a “cleaner” version of the year
of publication, than that of the AGRIS dataset, thus being able to match more
publications to a specific year, and in that way acquiring, by executing the
same query as before, a larger number of results (superset of the previous
result set). After the addition of the new dataset, the articles / publications
are exactly the same as before, only now we got a dataset with “cleaner” dates
matched to those publications. We can confirm that, by executing the same query
as before:

{% highlight sparql %}
prefix dct: <http://purl.org/dc/terms/>.
prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
select (count(?s) AS ?no) where {
  ?s dct:issued ?a.
  ?s dct:type "Image".
  filter(xsd:integer(?a) > 2005).
  filter(xsd:integer(?a) < 2009).
}
{% endhighlight %}

after having replaced the old metadata.ttl file with the one[2] containing new
information for the year_of_publication dataset, the number of results is
greater than the one before.

This is due to the fact that SemaGrow joined the two related datasets and, since
the new dataset can match more triples that satisfy the

```
filter(xsd:integer(?a) > 2005).
filter(xsd:integer(?a) < 2009).
```

triple patterns to publications, it gives back as a result the union of the two
result sets, that now contains the results of the first dataset as well as
additional results from the second dataset, that were not contained in the
first one, because of ambiguous statement of the publication year, as in “10/11/07”.

<small markdown="1">[Up to table of contents](#toc)</small>
{: .text-right }

</div><!-- /.medium-8.columns -->
</div><!-- /.row -->

[1]: https://github.com/semagrow/semagrow-stack-assembly/blob/master/src/resources/docs/metadata.ttl
[2]: https://github.com/semagrow/semagrow-stack-assembly/blob/master/src/resources/docs/metadata-2.ttl
