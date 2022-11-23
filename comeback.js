function solution(n, roads, sources, destination) {

    var g = new Graph(n + 1);
    var dis = new Array(n + 1);
    dis.fill(Infinity);

    for (let i = 0; i < roads.length; i++) {
        let a = roads[i][0];
        let b = roads[i][1];

        g.nodes[a].connections.push(b);
        g.nodes[b].connections.push(a);
    }

    dijkstra(g, dis, destination, n)

    var answer = [];
    for (let i = 0; i < sources.length; i++)
        answer.push(dis[sources[i]] == Infinity ? -1 : dis[sources[i]]);
    console.log(answer);
    return answer;
}

function dijkstra(graph, dis, destination, n) {
    var queue = [];
    var isVisited = new Array(n);

    queue.push(destination);
    isVisited[destination] = true;
    dis[destination] = 0;

    while (!(queue.length == 0)) {
        var thisNode = queue.shift();
        for (let i = 0; i < graph.nodes[thisNode].connections.length; i++) {
            var newNode = graph.nodes[thisNode].connections[i];
            if (!isVisited[newNode]) {               
                queue.push(newNode);
                isVisited[newNode] = true;
                if (dis[newNode] > dis[thisNode] + 1)
                    dis[newNode] = dis[thisNode] + 1;
            }
        }
    }
}

function List() {
    this.connections = [];
}

function Graph(num) {
    this.nodes = [];

    for (let i = 0; i < num; i++)
        this.nodes.push(new List());
}