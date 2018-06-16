import { Iterable, fromJS, isImmutable } from 'immutable';
// import { createBrowserHistory } from 'history';
export const asImmutable = (obj) => (Iterable.isIterable(obj) ? obj : fromJS(obj));

export const emptyMap = asImmutable({});

export const buildActions = (moduleName, prefix, sulfix) => ({
  'REQUESTED': `${moduleName}/${prefix}_${sulfix ? sulfix : ''}${sulfix ? '_' : ''}REQUESTED`,
  'STARTED': `${moduleName}/${prefix}_${sulfix ? sulfix : ''}${sulfix ? '_' : ''}STARTED`,
  'SUCCEEDED': `${moduleName}/${prefix}_${sulfix ? sulfix : ''}${sulfix ? '_' : ''}SUCCEEDED`,
  'FAILED': `${moduleName}/${prefix}_${sulfix ? sulfix : ''}${sulfix ? '_' : ''}FAILED`
});

export const toArrayPath = (path) => path.split("/").filter(p => p.replace(" ", "").length > 0);
// 
// export const getHistory = () => {
//   if (window.browserHistory) {
//     return window.browserHistory;
//   } else {
//     return window.browserHistory = createBrowserHistory();
//   }
// }
