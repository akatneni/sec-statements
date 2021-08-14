
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

const IS = "Income Statement";
const CFS = "Cash Flow Statement";
const BS = "Balance Sheet";

export const sheets = {
    IS: IS,
    CFS: CFS,
    BS: BS
}

export const allKeys = {
    [IS] : incomeKeys,
    [CFS] : cashFlowKeys,
    [BS] : balanceKeys
}
