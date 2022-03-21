
const get = (itemName: string) => {
  const item = localStorage.getItem(itemName);
  return item;
}

const set = (itemName: string, item: any) => {
  localStorage.setItem(itemName, item);
}

const remove = (itemName: string) => {
  localStorage.removeItem(itemName);
}

export const localStorageService = {
  get,
  set,
  remove
}