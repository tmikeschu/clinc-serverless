// Search for "EXAMPLE" in this file for common transformations/mutations

const {
  resolveAllSlots,
  setAllTokensToValue,
  getSlotValues,
  makeSlot,
  path,
  setResponseSlots,
  setResponseKey
} = require("./utils");

const fakeAccount = {
  phone: "987 987 9877",
  defaultEmail: "default@aol.com"
};

module.exports = {
  resolve: body => {
    const { intent, slots, query } = body;
    const slotValuesFor = getSlotValues(slots);

    const detailValue = slotValuesFor("detail_value");

    if (intent.includes("change_details_update")) {
      // EXAMPLE remove slots if user intends to change their mind

      Object.keys(body.slots).forEach(slot => {
        if (body.slots[slot].values.length > 1) {
          body.slots[slot].values.shift();
        }
      });
    }

    if (["phone_number_update", "email_update"].includes(intent)) {
      // EXAMPLE: adding a new slot

      const { query: value } = body;
      Object.assign(body.slots, makeSlot("detail_value", value.toUpperCase()));
      return body;
    } else if (path([0, "tokens"])(detailValue) === "@") {
      // EXAMPLE email extracted wrongly by SVP, replace slot with regex match

      const email = query.match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/)[0];
      Object.assign(
        body.slots,
        makeSlot("detail_value", email, { detail_type_dest: "email" })
      );
    }

    return Object.assign(body, {
      slots: setAllTokensToValue(resolveAllSlots(body.slots))
    });
  },
  resolveConfirmed: body => {
    const { slots } = body;
    const slotValuesFor = getSlotValues(slots);

    Object.assign(body, {
      slots: setAllTokensToValue(resolveAllSlots(slots))
    });

    const detailType = slotValuesFor("detail_type");

    if (path([0, "detail_type_dest"])(detailType) === "phone") {
      const phone = path([0, "value"])(slotValuesFor("detail_value"));
      const { phone: oldPhone } = fakeAccount;

      Object.assign(fakeAccount, { phone });

      // EXAMPLE: set response_slots

      Object.assign(body, setResponseKey("updated_phone", body));
      Object.assign(
        body,
        setResponseSlots(
          {
            new_phone: phone,
            old_phone: oldPhone
          },
          body
        )
      );

      /*
       * EXAMPLE Jinja template

        {% if response_key is not defined %}
          I don't know what you want.
        {% endif %}

        {% if response_key == "UPDATED_PHONE" %}
          We updated your phone from {{ old_phone }} to {{ new_phone }}.
        {% endif %}

       */

      return body;
    } else if (path([0, "detail_type_dest"])(detailType) === "email") {
      // EXAMPLE: add data to existing slot

      Object.assign(body.slots._DETAIL_TYPE_.values[0], {
        default_email: fakeAccount.defaultEmail
      });
      return body;
    }

    return body;
  }
};
