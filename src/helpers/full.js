/* eslint-disable */
module.exports = (formData) => {
  formData.phases.phases = formData.phases.phases.filter(phase => phase !== null)
  console.log(formData.phases.phases)
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
      "current_ico_phase": formData.phases.phases.length - 1,
      "current_phase_status": formData.ico.phase_status,
      "token_distribution": {
        "total_supply": formData.ico.supply || 0,
        "shares": (formData.ico.distr.length !== 0) ? formData.ico.distr
          : [{description: '', percent: 0}]
      },
      "use_of_proceeds": (formData.ico.proceeds.length !== 0) ? formData.ico.proceeds
        : [{description: '', percent: 0}]
    },
    "phases": formData.phases.phases
  },
  "app": {
    "info": [
      {
        "name": formData.app.name,
        "same_blockchain": formData.app.same,
        "sources_availability": formData.app.availability,
        "app_status": formData.app.status,
        "app_type": formData.app.app_type,
        "app_url": formData.app.app_url,
        "milestone": formData.roadmap.milestones,
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
      "circulation_terms": formData.token.circulation_terms || "",
      "governance_rights_project": formData.token.governance_rights_project || "",
      "governance_rights_org": formData.token.governance_rights_org || ""
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
full.ico.phases = full.ico.phases.filter(phase => phase !== null).map((phase, i) => {
  phase.terms.sales_agreement = formData.ico.sales_agreement
  phase.terms.sales_url = formData.ico.sales_url
  phase.phase_num  = i
  return phase
})
return full
}
