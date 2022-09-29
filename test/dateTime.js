var timezone = 8; //东8时区
var offset_GMT = new Date().getTimezoneOffset();
var nowDate = new Date().getTime();

//获取标准时间
var today = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);

//获取日期
var date = today.getFullYear() + "-"
    + String((today.getMonth() + 1)).padStart(2, '0')
    + "-" + String(today.getDate()).padStart(2, '0');

//获取时间
var time = String(today.getHours()).padStart(2, '0') + ":"
    + String(today.getMinutes()).padStart(2, '0') + ":"
    + String(today.getSeconds()).padStart(2, '0');

console.log(`${date} ${time}`);