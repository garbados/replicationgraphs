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
  "api",
  "addons/replicationgraphs/resources"
],
function(app, FauxtonAPI, ReplicationGraphs) {
  var Routes = FauxtonAPI.RouteObject.extend({
    layout: "one_pane",
    roles: ["_admin"],
    crumbs: [
      {
        "name": "Replication Graphs",
        "link": "_replicationgraphs"
      }
    ],
    routes: {
      '_replicationgraphs': 'defaultView'
    },
    apiUrl:'plugins',
    selectedHeader: "Replication Graph",
    initialize: function () {
      this.tasks = new ReplicationGraphs.Tasks({});
    },
    defaultView: function () {
      this.setView('#dashboard-content', new ReplicationGraphs.Graph({
        collection: this.tasks
      }));
    },
    establish: function () {
      return [this.tasks.fetch()];
    }
  });

  ReplicationGraphs.RouteObjects = [Routes];
  return ReplicationGraphs;
});
