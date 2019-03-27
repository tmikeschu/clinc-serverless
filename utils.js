const ten = str => str.repeat(10);
const markLog = str => `${ten(">")} ${str} ${ten("<")}`;
const log = (type, data) => {
  console.log(type.toUpperCase(), markLog(data), type.toUpperCase());
};

// this will resolve all the elements in the values array for one slot
const resolveSlot = slot =>
  Object.assign(slot, {
    values: slot.values.map(value => Object.assign(value, { resolved: 1 }))
  });

const setTokenToValue = slot =>
  Object.assign(slot, {
    values: slot.values.map(value =>
      Object.assign(
        value,
        value.value === undefined
          ? {
              value: value.tokens
            }
          : {}
      )
    )
  });

const resolveAllSlots = slots =>
  Object.entries(slots).reduce(
    (acc, [name, value]) => Object.assign(acc, { [name]: resolveSlot(value) }),
    {}
  );

const setAllTokensToValue = slots =>
  Object.entries(slots).reduce(
    (acc, [name, value]) =>
      Object.assign(acc, { [name]: setTokenToValue(value) }),
    {}
  );

const path = attrs => obj =>
  attrs.reduce((acc, el) => (acc && acc[el] ? acc[el] : acc), obj);

const toSlotFormat = str => `_${str.toUpperCase()}_`;

const getSlotValues = slots => name =>
  path([toSlotFormat(name), "values"])(slots);

const makeSlot = (name, value, data = {}) => ({
  [toSlotFormat(name)]: {
    type: "string",
    values: [
      Object.assign(data, {
        resolved: 1,
        value
      })
    ]
  }
});

const initResponseSlots = body => {
  if (!body.response_slots) {
    Object.assign(body, {
      response_slots: {
        response_type: body.state,
        speakables: {},
        visuals: {}
      }
    });
  }
  return body;
};

const setResponseSlots = (slots, body) => {
  if (!body.response_slots) {
    initResponseSlots(body);
  }

  ["speakables", "visuals"].forEach(responseType => {
    Object.assign(body.response_slots[responseType], slots);
  });
  return body;
};

const setResponseKey = (responseKey, body) =>
  setResponseSlots({ response_key: responseKey.toUpperCase() }, body);

module.exports = {
  log,
  resolveAllSlots,
  setTokenToValue,
  setAllTokensToValue,
  getSlotValues,
  resolveSlot,
  path,
  makeSlot,
  initResponseSlots,
  setResponseKey,
  setResponseSlots
};
