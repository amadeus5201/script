// 封装报名请求函数
function enrollRequest() {
var myHeaders = new Headers();
myHeaders.append("authorization", "Bearer "+localStorage.token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
   "courseCode": "KK230003",
   "promotionChannel": "kkjzgw"
});

var requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: raw,
   redirect: 'follow'
};

fetch("https://lite-api.krenz.art/enrolments", requestOptions)
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));
    
}

// 计算下一个中午12点的时间差
function getNextNoonDelay() {
  const now = new Date();
  const target = new Date();

  // 如果当前时间已经过了12点，设置目标为明天12点
if (now.getHours() >= 12) {
    target.setDate(target.getDate() + 1);
  }
  
  target.setHours(12, 0, 0, 0); // 设置目标时间为12:00:00.000
  
  return target - now; // 返回剩余毫秒数
}

// 调度下一次执行
function scheduleEnrollment() {
  const delay = getNextNoonDelay();
  
  setTimeout(function() {
    enrollRequest();
  }, delay);
  
  console.log('下次执行时间:', new Date(Date.now() + delay).toLocaleString());
}

// 首次启动调度
scheduleEnrollment();
