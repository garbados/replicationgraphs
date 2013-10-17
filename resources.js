// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
  "app",
  "api"
],

function (app, FauxtonAPI) {
  var ReplicationGraphs = new FauxtonAPI.addon();

  ReplicationGraphs.Task = Backbone.Model.extend({});

  ReplicationGraphs.Tasks = Backbone.Collection.extend({
    model: ReplicationGraphs.Task,
    url: function () {
      return app.host + '/_active_tasks';
    },
    parse: function(resp){
      //only want replication tasks to return
      var results = _.filter(resp, function(task){
        return task.type === "replication";
      }).map(function (task) {
        return {
          source: task.source,
          target: task.target
        };
      });

      var uniques = {},
          aggregate = [];
      results
        .forEach(function (task) {
          if (!(task.source in uniques)) {
            uniques[task.source] = [task.target];
          } else {
            uniques[task.source].push(task.target);
          }
        });

      for (var i in uniques) {
        aggregate.push({
          source: i,
          targets: uniques[i]
        });
      }

      return aggregate;
    }
  });

  ReplicationGraphs.Graph = FauxtonAPI.View.extend({
    template: "addons/replicationgraphs/templates/graph",
    serialize: function () {
      return {
        collection: this.collection.toJSON()
      };
    }
  });

  return ReplicationGraphs;
});
