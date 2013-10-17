# Replication Graphs

Fauxton addon. To install, go to your CouchDB install's root, then:

    cd src/fauxton/app/addons
    git clone git@github.com:garbados/replicationgraphs.git

Then, in `src/fauxton/settings.json`, add this line to the array in the `deps` field:

    { "name": "replicationgraphs" }

Finally, `grunt dev` and you should see your replication graph as an addon :D

## Coming Soon

* Mouseover Effects: When you mouse-over a given replication, its paths will highlight, making it easier to see who replicates to who.
* Tests: Gosh, I'm lazy.