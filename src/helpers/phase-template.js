module.exports = {
  phase_num: 0,
  phase_name: '',
  phase_status: '',
  registration: {
    start_date: '',
    end_date: '',
    website: '',
    terms: ''
  },
  terms: {
    issued_tokens: '',
    sold_tokens: '',
    share_of_sold: 0,
    token_distribution_date: '',
    cap_limit: [
      {
        currency: '',
        amount: ''
      }
    ],
    vesting: [
      {
        supply_percent: 0,
        lockup_condition: '',
        lockup_date: ''
      }
    ],
    crowdsale_addresses: [
      {
        currency: '',
        address: ''
      }
    ]
  },
  dates: {
    start_date: '',
    end_date: '',
    duration: ''
  },
  raised_funds: [
    {
      currency: 'USD',
      amount: 0
    },
    {
      currency: 'ETH',
      amount: 0
    },
    {
      currency: 'BTC',
      amount: 0
    }
  ],
  prices: {
    token_final_price: [
      {
        currency: 'BTC',
        price: 0
      }
    ],
    bonuses: [
      {
        amount: '',
        condition: ''
      }
    ]
  },
  contract: [
    {
      contract_address: '',
      contract_type: ''
    }
  ]
}