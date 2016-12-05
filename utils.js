/*
 * 时间格式转换
 * @param time 时间戳
 * @param type 时间格式类型
 * 		1. 2016-06-23 12:24
 * 		2. 2016-06-23
 * 		3. 2016.06.23
 * 		4. 2016.06.23 12:24
 * 		5. 2016/06/23
 * 		若需要更复杂的格式，请使用下面的timeFormat函数
 */
function convertTime(time,type){
  var tDate = new Date(time*1000);
  var year = tDate.getFullYear();
  var month = tDate.getMonth()+1;
  var day = tDate.getDate();
  var hour = tDate.getHours();
  var mil = tDate.getMinutes();
  if(type==1){
	  /*2016-06-23 12:24*/
	  return year+'-'+toDouble(month)+'-'+toDouble(day)+' '+toDouble(hour)+':'+toDouble(mil);
  }
  if(type==2){
	  /*2016-06-23*/
	  return year+'-'+toDouble(month)+'-'+toDouble(day);
  }
  if(type==3){
	  /*2016.06.23*/
	  return year+'.'+toDouble(month)+'.'+toDouble(day);
  }
  if(type==4){
	  /*2016.06.23 12:24*/
	  return year+'.'+toDouble(month)+'.'+toDouble(day)+' '+toDouble(hour)+':'+toDouble(mil);;
  }
  if(type==5){
	  /*2016/06/23*/
	  return year+'/'+toDouble(month)+'/'+toDouble(day);
  }
  return null;
}
exports.convertTime = convertTime;

/**
* 将Date 转化为指定格式的String
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* 例子： 
* timeFormat("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* timeFormat("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
* @param fmt String 格式化字符串
 * @param date Date对象或者时间戳(单位秒) 默认当前时间
* @auth yangc
*/
exports.timeFormat = function (fmt, date) {
if(Object.prototype.toString.call(date) !== '[object Date]') {
  date = date ? new Date(date * 1000) : new Date();
}
  var o = {
	  "M+": date.getMonth() + 1, //月份 
	  "d+": date.getDate(), //日 
	  "h+": date.getHours(), //小时 
	  "m+": date.getMinutes(), //分 
	  "s+": date.getSeconds(), //秒 
	  "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
	  "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
/* 把数字转换成至少两位，如果是个位数前面补0，如果多于两位会返回多位 */
function toDouble(num){
	if(num>=10){
		return num;
	}else{
		return '0'+num;
	}
}
exports.toDouble = toDouble;
function unitTest() {
	console.log('单元测试：');
	console.log('日期转换：' + convertTime(1533223535, 1));
}
exports.unitTest = unitTest;

