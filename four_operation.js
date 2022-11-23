function solution(arr) {
    var length = Math.ceil(arr.length / 2)
    var numbers = []
    var op = []

    var max_dp = new Array(length).fill().map(_ => new Array(length).fill(-Infinity));
    var min_dp = new Array(length).fill().map(_ => new Array(length).fill(Infinity));

    for (var i = 0; i < arr.length; i++) {
        if (i % 2 == 0)
            numbers.push(arr[i] * 1)
        else
            op.push(arr[i])
    }
    
    for (var i = 0; i < length; i++) {
        max_dp[i][i] = numbers[i]
        min_dp[i][i] = numbers[i]
    }

    for (var count = 1; count < length; count++) {
        for (var i = 0; i < length - count; i++) {
            var j = i + count;
            for (var k = i; k < j; k++) {
                if (op[k] === "+") {
                    max_dp[i][j] = Math.max(max_dp[i][j], max_dp[i][k] + max_dp[k + 1][j]);
                    min_dp[i][j] = Math.min(min_dp[i][j], min_dp[i][k] + min_dp[k + 1][j]);
                } else {
                    max_dp[i][j] = Math.max(max_dp[i][j], max_dp[i][k] - min_dp[k + 1][j]);
                    min_dp[i][j] = Math.min(min_dp[i][j], min_dp[i][k] - max_dp[k + 1][j]);
                }
            }
        }
    }

    var answer = max_dp[0][length-1];
    return answer;
}

console.log(solution(["5", "-", "3", "+", "1", "+", "2", "-", "4"]))