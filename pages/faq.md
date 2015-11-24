---
layout: page
title: "FAQ"
header: no
permalink: "/faq/"
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


### Where are the logs?

The logs of the SemaGrow stack can be found at
`/var/log/semagrow/`



### How can I change the federated endpoints?

Modify the configuration file which by default is located at
<samp>/etc/default/semagrow/metadata.ttl</samp> and
restart the service:

{% include alert terminal='service semagrow restart' %}

Please consult the [configuration page][1] about generating
configuration files.


[1]: /configuration/
