import { Injectable } from '@angular/core';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { sha256 } from 'crypto-hash';
import { Grafo } from '../interfaces/grafo';
import { Link } from '../interfaces/link';
import { MyData } from '../interfaces/my-data';

@Injectable({
  providedIn: 'root'
})
export class GraphqueriesService {

  constructor() {
  }

  private dataNodes: MyData[] = [
    { nome: "Giulio", cognome: "Gambino", },
    { nome: "Antonio", cognome: "Di Bella", },
    { nome: "Francesco", cognome: "Seminara", },
    { nome: "Matteo", cognome: "Dilonardo", },
    { nome: "Federico", cognome: "Castiglione", },
    { nome: "Lorenzo", cognome: "Stramondo", },
    { nome: "Riccardo", cognome: "Maggiore", },
    { nome: "Massimiliano", cognome: "Longo", },
  ]
  private linkBetweenNodes: Link[] = [
    { source: "Giulio", target: "Antonio" },
    { source: "Giulio", target: "Francesco" },
    { source: "Francesco", target: "Antonio" },
    { source: "Lorenzo", target: "Federico" },
    { source: "Federico", target: "Matteo" },
    { source: "Federico", target: "Antonio" },
    { source: "Riccardo", target: "Massimiliano" },
  ]
  
  private grafi: Grafo = {
    nodes: this.dataNodes,
    links: this.linkBetweenNodes
  }

  getData(): Grafo {
    return this.grafi;
  }
}
