import { Link } from "./link";
import { MyData } from "./my-data";

export interface Grafo {
    nodes: MyData[];
    links: Link[];
}
