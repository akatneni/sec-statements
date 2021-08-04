
const incomeKeys = [
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "CostOfGoodsAndServicesSold",
    "GrossProfit",
    "MarketingExpense",
    "ResearchAndDevelopmentExpense",
    "SellingGeneralAndAdministrativeExpense",
    "GeneralAndAdministrativeExpense",
    "OtherOperatingIncomeExpenseNet",
    "CostsAndExpenses",
    "OperatingExpenses",
    "OperatingIncomeLoss",
    "InvestmentIncomeInterest",
    "InterestExpense",
    "OtherNonoperatingIncomeExpense",
    "NonoperatingIncomeExpense",
    "IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments",
    "IncomeTaxExpenseBenefit",
    "IncomeLossFromEquityMethodInvestments",
    "NetIncomeLoss",
    "EarningsPerShareBasic",
    "EarningsPerShareDiluted"]

// Must add all increasedecrease tags later
// investing: Add payments, proceeds: should be in latest period and be non-zero
// financing: add payments, proceeds with debt/stock/share
// can add free cash flow
const cashFlowKeys = [
    "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents",
    "NetIncomeLoss",
    "DepreciationDepletionAndAmortization",
    "ShareBasedCompensation",
    "OtherOperatingActivitiesCashFlowStatement",
    "OtherNoncashIncomeExpense",
    "DeferredIncomeTaxExpenseBenefit",
    "NetCashProvidedByUsedInOperatingActivities",
    "NetCashProvidedByUsedInInvestingActivities",
    "NetCashProvidedByUsedInFinancingActivities",
    "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect",
    "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"
]

const balanceKeys = [
    "CashAndCashEquivalentsAtCarryingValue",
    "MarketableSecuritiesCurrent",
    "AccountsReceivableNetCurrent",
    "InventoryNet",
    "NontradeReceivablesCurrent",
    "OtherAssetsCurrent",
    "AssetsCurrent",
    "MarketableSecuritiesNoncurrent",
    "PropertyPlantAndEquipmentNet",
    "OtherAssetsNoncurrent",
    "AssetsNoncurrent",
    "Assets",
    "AccountsPayableCurrent",
    "OtherLiabilitiesCurrent",
    "ContractWithCustomerLiabilityCurrent",
    "CommercialPaper",
    "LongTermDebtCurrent",
    "LiabilitiesCurrent",
    "LongTermDebtNoncurrent",
    "OtherLiabilitiesNoncurrent",
    "LiabilitiesNoncurrent",
    "Liabilities",
    "CommonStocksIncludingAdditionalPaidInCapital",
    "RetainedEarningsAccumulatedDeficit",
    "AccumulatedOtherComprehensiveIncomeLossNetOfTax",
    "StockholdersEquity",
    "LiabilitiesAndStockholdersEquity"
]

export const allKeys = {
    "is" : incomeKeys,
    "cfs" : cashFlowKeys,
    "bs" : balanceKeys
}