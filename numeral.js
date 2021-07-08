/*
*num 需要转换的数字
*len 分割的长度
*/ 

numeral = (num,len=3)=>{
  if(num === '' || num == null) return 0
  if(isNaN(num)) return 0
  let strNum = num.toString()
  let dec = strNum.split('.').length == 2?strNum.split('.')[1]:0//小数
  let int = strNum//小数点前面的数
  if(dec.length){
    int = strNum.split('.')[0]
  }
  int = int.split('')
  let res = []
  let counter = 0
  for(let i = int.length - 1;i>=0;i--){
    counter++
    res.unshift(int[i])
    if(counter%len == 0 && i!=0){
      res.unshift(',')
    }
  }
  int = res.join('')
  return int+'.'+dec
}