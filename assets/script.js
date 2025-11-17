// Load markdown dynamically
function loadLesson(path) {
  fetch(path)
    .then(res => res.text())
    .then(md => {
      document.getElementById("content").innerHTML = marked.parse(md);
    });
}

// Simple D3 node demo
document.addEventListener("DOMContentLoaded", () => {
  const svg = d3.select("#graph");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const nodes = [
    {id: "A"}, {id: "B"}, {id: "C"}
  ];

  const links = [
    {source: "A", target: "B"},
    {source: "A", target: "C"}
  ];

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width/2, height/2));

  const link = svg.append("g")
      .attr("stroke", "#999")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 2);

  const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node");

  node.append("circle").attr("r", 25);
  node.append("text").text(d => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });
});
