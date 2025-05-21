export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addData = (key, newItem) => {
  const data = getData(key);
  data.push(newItem);
  saveData(key, data);
};

export const updateData = (key, updatedItem, idField = 'id') => {
  let data = getData(key);
  data = data.map(item => item[idField] === updatedItem[idField] ? updatedItem : item);
  saveData(key, data);
};

export const deleteData = (key, id, idField = 'id') => {
  let data = getData(key);
  data = data.filter(item => item[idField] !== id);
  saveData(key, data);
};
