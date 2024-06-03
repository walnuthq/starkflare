export interface UserStats {
  uniqueUsersLast7Days: number
  newUsersLast7Days: number
  lostUsersLast7Days: number
}

export interface TransactionStats {
  transactionsCountLast7Days: number[]
  stepsNumberLast7Days: number[]
}

export interface ContractStats {
  contractAddress: string
  stepsNumber: bigint
  stepsPercentage: number
  contractName: string | null
}

export interface CommonStats {
  userStats: UserStats
  transactionStats: TransactionStats
  topContractsBySteps: ContractStats[]
}

export interface EntrypointData {
  name: string
  steps: number
  usage: number
}

export interface Transaction {
  hash: string
  steps: number
  timestamp: number
}

export interface RawEntrypoint {
  entrypointSelector: string
  entrypointSteps: number
  entrypointStepsPercentage: number
}

export interface RawEntrypoints {
  entrypoints: RawEntrypoint[]
}

export interface Entrypoint extends RawEntrypoint {
  entrypoint: string
}

export interface Entrypoints {
  entrypoints: Entrypoint[]
}
