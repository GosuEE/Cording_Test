function solution(n, k, cmd) {

    var root = new Node(0)

    let curNode = root;
    let prevNode = root;
    root.prev = null;

    const deleted = [];

    var answer = [];
    for(let i = 0; i < n; i++){
        answer.push("O");
    }

    for (let i = 1; i < n; i++) {
        const newNode = new Node(i, prevNode);
        prevNode.next = newNode;
        prevNode = newNode;

        if (i === k)
            curNode = newNode;
    }

    for (let i = 0; i < cmd.length; i++) {
        var line = cmd[i].split(" ")
        console.log(cmd[i])
        switch (line[0]) {
            case "U":
                let j = 0;
                while (j < line[1] * 1 && curNode.prev) {
                    curNode = curNode.prev;
                    j++;
                }
                console.log(curNode)
                break;
            case "D":
                let k = 0;
                while (k < line[1] * 1 && curNode.next) {
                    curNode = curNode.next;
                    k++;
                }
                console.log(curNode)
                break;
            case "C":
                deleted.push(curNode)
                if (curNode.prev && curNode.next) {
                    curNode.prev.next = curNode.next;
                    curNode.next.prev = curNode.prev;
                    curNode = curNode.next;
                } else if (curNode.prev) {
                    curNode.prev.next = null;
                    curNode = curNode.prev;
                } else if (curNode.next)
                {
                    curNode.next.prev = null;
                    curNode = curNode.next;
                }
                console.log(curNode)
                    break;
            case "Z":
                var newNode = deleted.pop()
                if(newNode.prev)
                    newNode.prev.next = newNode;
                if(newNode.next)    
                    newNode.next.prev = newNode;
                console.log(curNode) 
                break;
        }
    }
    while(deleted.length!==0)
        answer[deleted.pop().idx] = "X"

    return answer.join("");
}

const Node = function (idx, prevNode) {
    this.idx = idx;
    this.prev = prevNode;
    this.next;
}

console.log(solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z", "U 1", "C"]))