Url forms:
  
  // baseUrl/api
  // /command

  // /{someId} // call this a filtered-command

  // /{someId}/action  // call this an filtered-action ()
  // /{someId}/action/{someOtherId} // member-action (doing to a sub item)


const baseUrls = {
  sandbox: ``,
  production: ``
}

const apiStandard = {
payments: ``,
orders: ``,
subscriptions: ``,
invoices: ``,
customers: ``,
  loyalty: ``,
  merchants: ``,
  teamMembers: ``,
  sites: ``,
  
  
  
}


const apiSpecial = {
  catalog: `items`,  // has it's own structure
  inventory: ``,
  terminals: ``,
  giftCards: ``,
  bookings: ``,
  banksAccounts: ``,
  authorize
  
  
  
  
}


const commands = {
  list: ``,
  retrieve: ``,
  create: ``,
  search: ``,
  delete: ``,
  get: ``,
  upate: ``,
  cancel: ``,
  publish: ``,
}

const idTypes = {
  merchant: ``,
  invoice: ``,
  customer: ``,
  order: ``,
  subscription: ``,
  
  
}

const actions = {
  groups: ``,
  events: ``,
  
  

}