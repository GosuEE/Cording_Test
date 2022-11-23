function solution(n, s, a, b, fares) {
    var d = new Array(n);
    var cost = new Array(n);

    for (var k = 0; k < n; k++) {
        d[k] = new Array(n);
        d[k].fill(Infinity);
        d[k][k] = 0;
    }

    for (var k = 0; k < fares.length; k++) {
        d[fares[k][0] - 1][fares[k][1] - 1] = fares[k][2];
        d[fares[k][1] - 1][fares[k][0] - 1] = fares[k][2];
    }
    floyd(d, n);
    solve(d, cost, s-1, a-1, b-1, n);

    console.log(cost);

    var answer = Math.min.apply(null, cost);
    return answer;
}

function floyd(d, n) {
    for (var i = 0; i < n; i++)
        for (var j = 0; j < n; j++)
            for (var k = 0; k < n; k++)
                d[j][k] = Math.min(d[j][k], d[j][i] + d[i][k]);
}

function solve(d, cost, s, a, b, n) {
    for (var i = 0; i < n; i++)
        cost[i] = d[s][i] + d[i][a] + d[i][b];
}

solution(6, 4, 6, 2, [[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]);