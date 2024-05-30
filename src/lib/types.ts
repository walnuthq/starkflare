export interface UserStats {
  uniqueUsersLast7Days: number
  newUsersLast7Days: number
  lostUsersLast7Days: number
}


export interface ContractBySteps {
  contractName?: string
  contractAddress: string
  stepsNumber: number
  stepsPercentage: number
}

export interface TransactionStats {
  transactionsCountLast7Days: number[]
  stepsNumberLast7Days: number[]

}

export interface CommonStats {
  userStats: UserStats
  topContractsBySteps: ContractBySteps[]
  transactionStats: TransactionStats
}
