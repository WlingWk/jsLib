const num2Ch = function(num) {
  var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
  var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
  if(!num || isNaN(num)){
      return "零";
  }
  var english = num.toString().split("")
  var result = "";
  for (var i = 0; i < english.length; i++) {
      var des_i = english.length - 1 - i;//倒序排列设值
      result = arr2[i] + result;
      var arr1_index = english[des_i];
      result = arr1[arr1_index] + result;
  }
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
  result = result.replace(/零+/g, '零');
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
  result = result.replace(/亿万/g, '亿');
  result = result.replace(/零+$/, '')
  result = result.replace(/^一十/g, '十');
  return result;
}