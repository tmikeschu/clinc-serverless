const ten = str => str.repeat(10);
const markLog = str => `${ten(">")} ${str} ${ten("<")}`;
const log = (type, data) => {
  console.log(type.toUpperCase(), markLog(data), type.toUpperCase());
};

module.exports = {
  log
};
