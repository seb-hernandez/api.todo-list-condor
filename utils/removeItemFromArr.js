const removeItemFromArr = (model, path, id) => {
  const index = model[path].indexOf(id);
  if (index > -1) {
    model[path].splice(index, 1);
  }
  return model;
};

module.exports = removeItemFromArr;
