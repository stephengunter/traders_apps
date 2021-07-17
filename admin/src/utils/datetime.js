export const toTimeNumber = (val) => {
   let parts = val.split(':');
   let hour =  parts[0];
   let minute =  parts[1];
   return (hour * 10000) + (minute * 100);
}

export const toTimeString = (val) => {
   let strVal = String(val);
   let hour = '';
   let minute = '';
   if(strVal.length === 6) {
      hour = strVal.substr(0, 2);
      minute = strVal.substr(2, 2);
      return `${hour}:${minute}`;
   }else if(strVal.length === 5) {
      hour = strVal.substr(0, 1);
      minute = strVal.substr(1, 2);
      return `${hour}:${minute}`;
   }
   else if(Number(val) === 0) {
      return '0:00'
   }
}