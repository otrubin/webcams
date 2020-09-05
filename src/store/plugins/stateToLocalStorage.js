/**
 * required https://github.com/yahoo/serialize-javascript
 */

import serialize from 'serialize-javascript';

const NAME_PREFIX = 'vuex_';

function makeName(module, state) {
  const st = state || '';
  return `${NAME_PREFIX}${module}_${st}`;
}

function savePart(module, state, value) {
  localStorage.setItem(
    makeName(module, state),
    serialize({
      module,
      state,
      value,
    }),
  );
}

function getLocalStorageKeys() {
  const result = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    result.push(localStorage.key(i));
  }
  return result;
}

function loadState(state, lsObjString) {
  // eslint-disable-next-line no-eval
  const lsObj = eval(`(${lsObjString})`);
  if (!lsObj) {
    return;
  }
  if (state[lsObj.module] && state[lsObj.module][lsObj.state]) {
    state[lsObj.module][lsObj.state] = lsObj.value;
  }
}

function loadStateAll(state, storageKeys) {
  const localStorageKeys = getLocalStorageKeys();
  localStorageKeys.forEach((lsKey) => {
    let isLoad = false;
    for (let i = 0; i < storageKeys.length; i += 1) {
      isLoad = lsKey.indexOf(storageKeys[i]) !== -1;
      if (isLoad) {
        loadState(state, localStorage.getItem(lsKey));
        break;
      }
    }
  });
}

export default function createStateToLocalStoragePlugun(options) {
  return (store) => {
    const opt = options || {};
    // массив частей state для отслеживания,
    // в формате:
    // module.statePartName - отслеживается только указанные части state из указанного модуля
    // module - отслеживается весь state в модуле
    const watchMutations = opt.watchMutations || [];
    const watchObj = watchMutations.reduce((acc, item) => {
      const [module, part] = item.split('.');
      if (part) {
        const arr = acc[module] || [];
        arr.push(part);
        acc[module] = arr;
      } else {
        acc[module] = null;
      }
      return acc;
    }, {});

    /* загрузка состояния из LocalStorage */
    const storageKeys = [];
    Object.keys(watchObj).forEach((moduleName) => {
      const stateArr = watchObj[moduleName];
      if (stateArr) {
        stateArr.forEach((stateName) => {
          storageKeys.push(makeName(moduleName, stateName));
        });
      } else {
        storageKeys.push(makeName(moduleName));
      }
    });
    loadStateAll(store.state, storageKeys);

    /* подписка на изменения состояния */
    store.subscribe((mutation, state) => {
      const [moduleName] = mutation.type.split('/'); // tags/TAGS_ADD_TAG
      if (!(moduleName in watchObj)) {
        return;
      }
      const parts = watchObj[moduleName];
      if (parts) {
        parts.forEach((key) => {
          savePart(moduleName, key, state[moduleName][key]);
        });
      } else {
        Object.keys(state[moduleName]).forEach((key) => {
          savePart(moduleName, key, state[moduleName][key]);
        });
      }
    });
  };
}
