function solution(board, skill) {
    var row = board.length;
    var col = board[0].length;

    var sum_Array = new Array(row + 1);
    for (var i = 0; i < row + 1; i++) {
        sum_Array[i] = new Array(col + 1);
        sum_Array[i].fill(0);
    }

    makeSumArray(sum_Array, skill);
    sum(sum_Array);

    var answer = 0;
    for (var i = 0; i < row; i++)
        for (var k = 0; k < col; k++) {
            board[i][k] += sum_Array[i][k];
            if (board[i][k] > 0)
                answer++;
        }
    return answer;
}

function makeSumArray(sum_Array, skill) {
    for (var i = 0; i < skill.length; i++) {
        var type = skill[i][0];
        var r1 = skill[i][1];
        var c1 = skill[i][2];
        var r2 = skill[i][3];
        var c2 = skill[i][4];
        var degree = skill[i][5];

        if (type == 1) {
            sum_Array[r1][c1] += -degree;
            sum_Array[r1][c2 + 1] += degree;
            sum_Array[r2 + 1][c1] += degree;
            sum_Array[r2 + 1][c2 + 1] += -degree;
        } else {
            sum_Array[r1][c1] += degree;
            sum_Array[r1][c2 + 1] += -degree;
            sum_Array[r2 + 1][c1] += -degree;
            sum_Array[r2 + 1][c2 + 1] += degree;
        }
    }
}

function sum(sum_Array) {
    var row = sum_Array.length;
    var col = sum_Array[0].length;
    for (var i = 0; i < row; i++)
        for (var k = 1; k < col; k++)
            sum_Array[i][k] += sum_Array[i][k - 1];

    for (var i = 1; i < row; i++)
        for (var k = 0; k < col; k++) {
            sum_Array[i][k] += sum_Array[i - 1][k];
        }
}