export const typeDefs = `
type Customer {
    id: ID!
    title: String
    firstName: String
    lastName: String
    dateOfBirth: String
    gender: String
    tenure: Int
    email: String
    homePhone: String
    mobilePhone: String
    residentialAddress: Address
    bankAccounts: [BankAccount]
    policies: [Policy]
}
type Policy {
    id: ID!
    brand: String
    termStartDate: String
    termExpiryDate: String
    status: String
    inceptionDate: String
    coverages: [Coverage]
    claims: [Claim]
}
type Claim {
    id: ID!
    reportedDate: String
    lossDate: String
    lossLocation: Address
    status: String
    description: String
    lossCause: String
    liabilityAssessment: String
    originalExcess: Float
    remainingExcess: Float
}
type Coverage {
    id: ID!
    type: String
    riskAddress: Address
    sumInsured: Float
    inceptionDate: String
    termStartDate: String
    termExpiryDate: String
}
type Address {
    addressLine1: String
    addressLine2: String
    suburb: String
    postcode: String
    state: String
}
type BankAccount {
    id: ID!
    type: String
    product: String
    title: String
    brand: String
    currency: String
    bsb: String
    accountNumber: String
    status: String
    openDate: String
    closeDate: Address
    currentBalance: Float
    currentInterestRate: Float
}

type Query {
    customers: [Customer]
}
`;