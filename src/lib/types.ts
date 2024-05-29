export interface UserStats {
  uniqueUsersLast7Days: number
  newUsersLast7Days: number
  lostUsersLast7Days: number
}

export interface TransactionStats {
  transactionsCountLast7Days: number[]
  stepsNumberLast7Days: number[]
}

export interface CommonStats {
  userStats: UserStats
  transactionStats: TransactionStats
}

export interface Entrypoint {
  name: string
  steps: number
  usage: number
}

export interface Transaction {
  hash: string
  steps: number
  timestamp: number
}
