const fakeAccount = {
  phone: "987 987 9877"
};
module.exports = body => {
  Object.keys(body.slots).forEach(slot => {
    body.slots[slot].values.forEach(value => {
      Object.assign(value, {
        resolved: 1,
        value: value.tokens
      });
    });
  });

  if (body.state === "change_details_confirmed") {
    if (body.slots._DETAIL_TYPE_.values[0].detail_type_dest === "phone") {
      const phone = body.slots._DETAIL_VALUE_.values[0].tokens;
      Object.assign(fakeAccount, { phone });
      const responseData = Object.assign({}, fakeAccount, {
        response_key: "UPDATED_PHONE"
      });

      body.response_slots = {
        response_type: body.state,
        speakables: responseData,
        visuals: responseData
      };
    }
  }
  return body;
};
