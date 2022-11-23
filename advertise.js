function solution(play_time, adv_time, logs) {
    
    var tempString = play_time.split(":")
    var play_sec = tempString[0] * 3600 + tempString[1] * 60 + tempString[2] * 1
    
    tempString = adv_time.split(":")
    var adv_sec = tempString[0] * 3600 + tempString[1] * 60 + tempString[2] * 1
    
    var time = new Array(play_sec).fill(0);
    
    for (var i = 0; i < logs.length; i++) {
        tempString = logs[i].split("-")[0].split(":")
        time[(tempString[0] * 3600 + tempString[1] * 60 + tempString[2] * 1)]++

        tempString = logs[i].split("-")[1].split(":")
        time[(tempString[0] * 3600 + tempString[1] * 60 + tempString[2] * 1)]--
    }
    for (var i = 1; i < play_sec; i++)
        time[i] += time[i - 1]
    for (var i = 1; i < play_sec; i++)
        time[i] += time[i - 1]
    var max = 0;
    var sum = time[adv_sec-1];
    for(var i=adv_sec-1;i<play_sec;i++)
    {
        if(sum<(time[i]-time[i-adv_sec]))
        {
            sum = time[i]-time[i-adv_sec]
            max = i-adv_sec+1
        }
    }
    return formatterTime(max);
}

const formatterTime = (time) => {
    let HH = time / 3600 >> 0;
    let MM = (time / 60 >> 0) % 60;
    let SS = time % 60;
    
    HH = HH > 9 ? HH : '0' + HH;
    MM = MM > 9 ? MM : '0' + MM;
    SS = SS > 9 ? SS : '0' + SS;
    
    return `${HH}:${MM}:${SS}`
  }

console.log(solution("02:03:55", "00:14:15", ["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]))