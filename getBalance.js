const accounts = {
  checking: { balance: 123 },
  savings: { balance: 987 },
  "credit card": { balance: 4 }
};

module.exports = body => {
  let responseSlots = {
    response_type: body.state,
    speakables: {},
    visuals: {}
  };

  if (!body.slots._ACCT_TYPE_) {
    const responseKey = "default_account";
    const data = {
      response_key: responseKey,
      account: "checking",
      balance: accounts.checking.balance
    };

    Object.assign(responseSlots, {
      speakables: data,
      visuals: data
    });
  } else {
    if (
      body.intent.includes("account_update") &&
      body.slots._ACCT_TYPE_ &&
      body.slots._ACCT_TYPE_.values.length > 1
    ) {
      body.slots._ACCT_TYPE_.values.shift();
    }

    const tokens = body.slots._ACCT_TYPE_.values.map(({ tokens }) => tokens);
    const accts = tokens
      .filter(token => Boolean(accounts[token]))
      .map(token => Object.assign({}, accounts[token], { name: token }));

    switch (accts.length) {
      case 0: {
        const responseKey = "invalid_account";
        const data = { response_key: responseKey, account: tokens[0] };

        Object.assign(responseSlots, {
          speakables: data,
          visuals: data
        });
        break;
      }

      case 1: {
        const responseKey = "single_account";
        const { name: account, balance } = accts[0];
        const data = {
          response_key: responseKey,
          account,
          balance
        };

        Object.assign(responseSlots, {
          speakables: data,
          visuals: data
        });

        body.slots._ACCT_TYPE_.values[0].resolved = 1;
        break;
      }
      default: {
        const responseKey = "multiple_accounts";
        const data = {
          response_key: responseKey,
          accounts: accts
        };

        body.slots._ACCT_TYPE_.values.forEach(value => {
          value.resolved = 1;
        });
        Object.assign(responseSlots, {
          speakables: data,
          visuals: data
        });
      }
    }
  }

  return Object.assign(body, { response_slots: responseSlots });
};
