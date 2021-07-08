const creatCalendar = function(year,month,day,today){
  if(!today){
      today = getToday();
  }
  var daynumber = getMonthDayNumber(year,month,day); //当月天数
  var week = getDayofWeek(year,month,day); //获取月第一天周几
  var upMonthDayNub = week ? week-1 : 7-1; //上月显示多少天
  var lastMonthYear, lastMonthMonth,lastMonthDay, nextMonthYear, nextMonthMonth, nextMonthDay;//当前月的上月对应年和月日
  if(month == 1){
      lastMonthYear = year-1;
      lastMonthMonth = 12;
      lastMonthDay = 1;
  }else{
      lastMonthYear = year;
      lastMonthMonth = (month-1);
      lastMonthMonth = lastMonthMonth<10 ? ('0'+lastMonthMonth) : lastMonthMonth;
      lastMonthDay = 1;
  }
  if(month == 12){
      nextMonthYear = year+1;
      nextMonthMonth = 1;
      nextMonthDay = 1;
  }else{
      nextMonthYear = year;
      nextMonthMonth = (month+1);
      nextMonthMonth = nextMonthMonth<10 ? ('0'+nextMonthMonth) : nextMonthMonth;
      nextMonthDay = 1;
  }
  var lastMonthNmber = getMonthDayNumber(lastMonthYear,lastMonthMonth, lastMonthDay); //上月天数
  var lastMonthShowNumb = []; //上月显示的日期
  var thisday = ""
  for (var i = 0; i < upMonthDayNub; i++) {
      lastMonthShowNumb.push({
          _name: lastMonthYear+'-'+lastMonthMonth+'-'+lastMonthNmber,
          _class:"lastmonth",
          _day: lastMonthNmber,
          _index: upMonthDayNub-i,
          _timestamp: +(new Date(lastMonthYear+'/'+lastMonthMonth+'/'+lastMonthNmber))
      });
      lastMonthNmber--;
  }
  lastMonthShowNumb.reverse(); //上月显示的日期

  var nextMonthShowNumb = 7-(daynumber % 7 - (7 - upMonthDayNub)); //下月显示的日期
  var nextMonthShowNumbs = [];
  for (var index = 1; index <= nextMonthShowNumb; index++) {
      thisday = index<10?('0'+index):index;
      nextMonthShowNumbs.push({
          _name: nextMonthYear+'-'+nextMonthMonth+'-'+thisday,
          _class:"nextmonth",
          _day: thisday,
          _index: index,
          _timestamp: +(new Date(nextMonthYear+'/'+nextMonthMonth+'/'+thisday))
      });
  }

  function getDayofWeek(year,month,day){
      //获取月第一天周几
      let d = new Date(year+'/'+month+'/'+1);
      return d.getDay();
  };

  function getMonthDayNumber(year,month,day){ 
      //获取月天数
      var d = new Date(year, month, 0);
      return d.getDate();
  }

  function getNewMonthTable (year,month,day,daynumber,maxday,attrbuld){ //获取当月日期表
      var m = '', d = '';
      if(month<10){
          m = '0'+ month;
      }else{
          m = ''+ month;
      }
      var list = [], times = null, timestamp = 0;
      if(maxday){
          times = +(new Date(maxday.replace(/-/gi,'/')));
      }
      for(var i = 1;i<=daynumber;i++){
          if(i<10){
              d = '0'+i;
          }else{
              d = ''+i;
          }
          var dayy = year+'-'+m+'-'+d;
          timestamp = +(new Date(year+'/'+m+'/'+d))

          var o = {
              _name: dayy,
              _day: d,
              _class:"newmonth",
              _index:i,
              _timestamp: timestamp
          }
          if(attrbuld && attrbuld[dayy]){
              Object.assign(o,attrbuld[dayy]);    
          }
          if(times && timestamp > times){
              o.class="disabled"
          }
          list.push(o); 
      }
      var daylist = lastMonthShowNumb.concat(list.concat(nextMonthShowNumbs));
      var aa = 0;
      var sevenDayList = [];
      for (let index = 0; index < daylist.length; index++) {
          if(daylist[index]._name == today){
              aa = parseInt((index)/7);
              sevenDayList =  daylist.slice(aa*7,aa*7+7);
              break
          }
      }
      if(!sevenDayList.length){
          sevenDayList =  daylist.slice(0,7);
      }
      return [daylist,sevenDayList]
  }
  function getToday(){
      var date = new Date();
      var month = date.getMonth()+1;
      var day = date.getDate();
      month = month<10 ?'0'+month:month;
      day = day<10 ?'0'+day:day;
      return date.getFullYear()+'-'+month+'-'+day;
  }
  return getNewMonthTable(year,month,day, daynumber);
}