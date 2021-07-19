Url forms:
  
  // baseUrl/api
  // /command

  // /{someId}

  // /{someId}/action
  // /{someId}/action/{someOtherId}


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