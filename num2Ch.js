num2Ch = (section) => {
  let index = 0;
  const chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
  const chnUnitChar = ["", "十", "百", "千"];
  let strIns = "",
    chnStr = "";
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    index++;
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      if (strIns == "一" && chnUnitChar[unitPos] == "十") strIns = "";
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}