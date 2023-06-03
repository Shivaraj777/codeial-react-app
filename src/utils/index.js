// all the named exports from constant.js will be exported
export * from './constants.js';

//function to convert JS object to form-urlencoded format
export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }
  
  return formBody.join('&'); // 'username=aakash&password=123213'
};

//function to store items in local storage
export const setItemsInLocalStorage = (key, value) => {
  //if key or value is not present
  if(!key || !value){
    return console.error('Cannot store in local storage');
  }

  const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);  //add the value to local storage
}

//function to get an item from local storage
export const getItemsFromLocalStorage = (key) => {
  //if key or value is not present
  if(!key){
    return console.error('Cannot find item in local storage');
  }

  localStorage.getItem(key);  //get the value from local storage
}

//function to remove item from local storage
export const removeItemsFromLocalStorage = (key) => {
  //if key or value is not present
  if(!key){
    return console.error('Cannot remove item from local storage');
  }

  localStorage.removeItem(key);  //remove the item from local storage
}