export const removeWhiteSpaces = (strVal) => strVal.replace(/\s/g,'');

export const isSmallScreen = () => window.innerWidth < 991;

export const tryParseInt = (val) => val ? parseInt(val) : 0;

export const isEmptyObject = (obj) => {
   if (obj == null) return true;

   // Assume if it has a length property with a non-zero value
   // that that property is correct.
   if (obj.length > 0)    return false;
   if (obj.length === 0)  return true;

   // If it isn't an object at this point
   // it is empty, but it can't be anything *but* empty
   // Is it empty?  Depends on your application.
   if (typeof obj !== 'object') return true;

   // Otherwise, does it have any properties of its own?
   // Note that this doesn't handle
   // toString and valueOf enumeration bugs in IE < 9
   for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
   }

   return true;
}

export const isTrue = (val) => {
   if (typeof val === 'boolean') return val;
   if (typeof val === 'number') return val > 0;
   if (typeof val === 'string') {
      if (val.toLowerCase() === 'true') return true;
      if (val === '1') return true;
      return false;
   }
   return false;
}

export const isValidURL = (str) => {
   const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
   return !!pattern.test(str);
}


export const toRocYear = (val) => val - 1911;

export const cnNumbers = ['零','一','二','三','四','五','六','七','八','九','十'];

export const toCnNumber = (num) => {
   let strVal = String(num);
   let length = strVal.length;
   let int = strVal[length - 1];
   
   let intStr = Number(int) ? cnNumbers[Number(int)] : '';
   if(length === 1) return intStr;

   let ten = strVal[length - 2];
   let tenStr = cnNumbers[Number(ten)];
   if(length === 2) {
      if(intStr) {
         if(Number(ten) > 1) return `${tenStr}十${intStr}`;
         return `十${intStr}`; 
      } 
      else return `${tenStr}十`;
   } 

   let hundred = strVal[length - 3];
   let hundredStr = cnNumbers[Number(hundred)];
   if(length === 3) {
      if(intStr) return `${hundredStr}百${tenStr}十${intStr}`;
      else return `${hundredStr}百${tenStr}十`;
   }
  
   return '';
}

export const replaceBR = (text) => text.replace(/<br>/g, '\n').replace(new RegExp('<br/>', 'g'), '\n');