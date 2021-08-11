const data = require('./graphs.json')

function addLabel(node) {
  // input in form {id: <id>}
  // output in form {id: <id>, label: <id>}
  let temp = node["id"]
  return {"id": temp, "label": temp, "shape": "box"}
}

function fromto(edge){
  // input in form {source: <id1>, target: <id2>}
  // output in form {from: <id1>, to: <id2>}
  let tempid = edge["source"] + edge["target"];
  return {"id": tempid, "from": edge["source"], "to": edge["target"]}
}

function fixJSON() {
  for (let i = 0; i < data.length; i++) {
    let graph = data[i]
    let nodes = graph["nodes"]
    let edges = graph["edges"]
    graph["nodes"] = nodes.map(addLabel)
    graph["edges"] = edges.map(fromto)
  }
}

fixJSON()

export default data