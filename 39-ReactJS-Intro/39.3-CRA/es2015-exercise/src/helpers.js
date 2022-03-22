const choice = (items) => {
  const randIdx = Math.floor(Math.random() * items.length);
  return items[randIdx];
};

const remove = (items, item) => {
  const idx = items.indexOf(item);
  if (idx !== -1) {
    items.splice(idx, 1);
    return item;
  }
  return undefined;
};

export { choice, remove };
