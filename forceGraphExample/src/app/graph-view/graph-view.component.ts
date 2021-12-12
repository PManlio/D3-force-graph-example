import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MyData } from '../interfaces/my-data'
// import * as d3 from '../d3Exports/myD3Exports'
import * as d3 from 'd3';
import { GraphqueriesService } from '../services/graphqueries.service';
import { Grafo } from '../interfaces/grafo';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})

/**
 * guides = {
 *    install_d3: https://blog.logrocket.com/data-visualization-angular-d3/,
 *    d3_forceSimulation_documentation: https://observablehq.com/@d3/force-directed-graph, (seguire inoltre aggiunta sottostante)
 *    D3_ADD_TYPES: https://stackoverflow.com/questions/38335087/correct-way-to-import-d3-js-into-an-angular-2-application 
 *    useful_youtube: https://www.youtube.com/watch?v=y2-sgZh49dQ&ab_channel=AndrewChen, https://www.youtube.com/watch?v=1vHjMxe-4kI&t=659s&ab_channel=AndrewChen
 *    
 *    template: https://stackoverflow.com/questions/41870684/d3-js-force-graph-with-type-script-and-angular2
 * }
 */
export class GraphViewComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
  }

  private myData: Grafo;
  private svg;

  // variabili di supporto per il grafico
  private simulation;
  private node;
  private link;
  private color;

  private text;

  constructor(private dataService: GraphqueriesService) {
    this.myData = dataService.getData()
  }

  ngAfterViewInit(): void {
    // dopo l'inizializzazione della view, prendiamo il componente svg dall'html
    this.svg = d3.select("svg");
    var width = +this.svg.attr("width")
    var height = +this.svg.attr("height")

    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(d => { return d["nome"]; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter((width - 100) / 2, (height - 100) / 2))

    // funzione implementata verso la fine:
    this.render(this.myData)
  }

  // funzione ticked() che serve per i link
  private ticked() {
    this.link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    this.node
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });

    this.text
      .attr("x", d => d.x)
      .attr("y", d => d.y)
  }

  // render del grafico
  private render(graph) {
    this.link = this.svg.append("g")
      .attr("class", "links")
      .attr("stroke", "#999")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    this.node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 10) // DIMENSIONE DEI Nodi
      .attr("fill", (d) => { return this.color(d.group); })
      .call(d3.drag()
        .on("start", (d) => { return this.dragstarted(d) })
        .on("drag", (d) => { return this.dragged(d) })
        .on("end", (d) => { return this.dragended(d) }));

    this.text = this.svg.append("g").selectAll('text').data(graph.nodes).enter().append("text").text(d => d.nome)

    this.node.append("title")
      .text(function (d) { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on("tick", () => { return this.ticked() });

    this.simulation.force("link")
      .links(graph.links);
  }

  dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  dragended(event) {
    if (!event.active) this.simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  dragstarted(event) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }


}
