/* eslint-disable */
module.exports = (formData) => {
  const full = {
  "blockchain": {
    "project_name": formData.blockchain.project_name,
    "headline": formData.blockchain.headline,
    "logo": "",
    "state": formData.blockchain.state,
    "asset_type": formData.blockchain.asset_type,
    "dependency": formData.blockchain.dependency,
    "consensus_name": formData.blockchain.consensus
  },
  "ico": {
    "common_info": {
      "is_ico": true,
      "current_ico_phase": formData.ico.phase_num,
      "token_distribution": {
        "total_supply": 0,
        "shares": [
          {
            "description": "",
            "percent": 0
          }
        ]
      },
      "use_of_proceeds": formData.funds.proceeds
    },
    "phases": [
      {
        "phase_num": formData.ico.phase_num,
        "phase_name": formData.ico.phase_name,
        "phase_status": formData.ico.phase_status,
        "registration": {
          "start_date": new Date(formData.ico.reg_start_date.date),
          "end_date": new Date(formData.ico.reg_end_date.date),
          "website": formData.ico.reg_url,
          "terms": formData.ico.reg_terms
        },
        "terms": {
          "sales_agreement": formData.ico.sales_agreement,
          "sales_url": formData.ico.sales_url,
          "issued_tokens": formData.ico.issued_tokens,
          "sold_tokens": formData.ico.sold_tokens,
          "share_of_sold": 0,
          "token_distribution_date": new Date(formData.ico.token_distr_date.date),
          "cap_limit": [
            {
              "currency": formData.ico.cap_limit_currency,
              "amount": formData.ico.cap_limit_amount
            }
          ],
          "vesting": [
            {
              "supply_percent": 0,
              "lockup_condition": "",
              "lockup_date": ""
            }
          ],
          "crowdsale_addresses": formData.addresses.addresses
        },
        "dates": {
          "start_date": new Date(formData.ico.ico_start_date.date),
          "end_date": new Date(formData.ico.ico_end_date.date),
          "duration": ""
        },
        "raised_funds": [
          {
            "currency": formData.ico.raised_funds_currency,
            "amount": formData.ico.raised_funds_amount
          }
        ],
        "prices": {
          "token_final_price": [
            {
              "currency": formData.ico.token_final_price.currency,
              "price": formData.ico.token_final_price.amount
            }
          ],
          "bonuses": [
            {
              "amount": "",
              "condition": ""
            }
          ]
        },
        "contract": formData.addresses.contracts
      }
    ]
  },
  "app": {
    "info": [
      {
        "name": "",
        "same_blockchain": false,
        "sources_availability": true,
        "app_status": 1,
        "app_type": "",
        "app_url": "",
        "milestone": [
          {
            "number": 0,
            "name": "",
            "start_date": "",
            "end_date": "",
            "current_status": ""
          }
        ],
        "links": formData.links
      }
    ]
  },
  "token": [
    {
      "name": formData.token.name,
      "symbol": formData.token.symbol,
      "token_purpose": formData.token.token_purpose,
      "token_type": formData.token.token_type,
      "inflation_rate": formData.token.inflation_rate,
      "circulation_terms": formData.token.circulation_terms,
      "governance_rights_project": formData.token.governance_rights_project,
      "governance_rights_org": formData.token.governance_rights_org
    }
  ],
  "exchange": [
    {
      "exchange": "",
      "date": "",
      "price": "",
      "volume": ""
    }
  ],
  "label": [
    {
      "blockchain": "",
      "address": "",
      "balance": ""
    }
  ]
}
return full
}