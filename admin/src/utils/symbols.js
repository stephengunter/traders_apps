import { SYMBOL_TYPES } from '@/consts';

export const getSymbolTypeColor = (type) => {
   if(type === SYMBOL_TYPES.Stock) return 'info';
   else if(type === SYMBOL_TYPES.Index) return 'info';
   else if(type === SYMBOL_TYPES.Futures) return 'success';
   else if(type === SYMBOL_TYPES.Crypto) return 'red';
   else return '';
}