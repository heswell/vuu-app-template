import { TableSchema } from "@vuu-ui/vuu-data";

export const OrdersSchema: TableSchema = {
  table: { module: "ORDERMON", table: "orders1" },
  columns: [
    { name: "account", serverDataType: "string" },
    { name: "algo", serverDataType: "string" },
    { name: "assetClass", serverDataType: "int" },
    { name: "averagePrice", serverDataType: "double" },
    { name: "cancelReason", serverDataType: "string" },
    { name: "clientId", serverDataType: "string" },
    { name: "clientOrderId", serverDataType: "string" },
    { name: "created", serverDataType: "long" },
    { name: "currency", serverDataType: "string" },
    { name: "exchange", serverDataType: "string" },
    { name: "filledQuantity", serverDataType: "double" },
    { name: "id", serverDataType: "string" },
    { name: "instrument", serverDataType: "string" },
    { name: "isin", serverDataType: "string" },
    { name: "lastUpdate", serverDataType: "long" },
    { name: "lotSize", serverDataType: "string" },
    { name: "openQuantity", serverDataType: "double" },
    { name: "orderId", serverDataType: "string" },
    { name: "orderType", serverDataType: "string" },
    { name: "price", serverDataType: "string" },
    { name: "priceLevel", serverDataType: "string" },
    { name: "quantity", serverDataType: "double" },
    { name: "rejectReason", serverDataType: "string" },
    { name: "ric", serverDataType: "string" },
    { name: "settlementDate", serverDataType: "long" },
    { name: "settlementLocation", serverDataType: "int" },
    { name: "settlementType", serverDataType: "int" },
    { name: "side", serverDataType: "int" },
    { name: "status", serverDataType: "int" },
    { name: "subState", serverDataType: "int" },
    { name: "strategy", serverDataType: "string" },
    { name: "trader", serverDataType: "string" },
    { name: "validUntil", serverDataType: "long" },
    { name: "fillerGroupA01", serverDataType: "string" },
    { name: "fillerGroupA02", serverDataType: "string" },
    { name: "fillerGroupA03", serverDataType: "string" },
    { name: "fillerGroupA04", serverDataType: "string" },
    { name: "fillerGroupA05", serverDataType: "string" },
    { name: "fillerGroupA06", serverDataType: "string" },
    { name: "fillerGroupA07", serverDataType: "string" },
    { name: "fillerGroupA08", serverDataType: "string" },
    { name: "fillerGroupA09", serverDataType: "string" },
    { name: "fillerGroupA10", serverDataType: "string" },
    { name: "fillerGroupA11", serverDataType: "string" },
    { name: "fillerGroupA12", serverDataType: "string" },
    { name: "fillerGroupA13", serverDataType: "string" },
    { name: "fillerGroupA14", serverDataType: "string" },
    { name: "fillerGroupA15", serverDataType: "string" },
    { name: "fillerGroupA16", serverDataType: "string" },
    { name: "fillerGroupA17", serverDataType: "string" },
    { name: "fillerGroupA18", serverDataType: "string" },
    { name: "fillerGroupA19", serverDataType: "string" },
    { name: "fillerGroupA20", serverDataType: "string" },
    { name: "fillerGroupB01", serverDataType: "string" },
    { name: "fillerGroupB02", serverDataType: "string" },
    { name: "fillerGroupB03", serverDataType: "string" },
    { name: "fillerGroupB04", serverDataType: "string" },
    { name: "fillerGroupB05", serverDataType: "string" },
    { name: "fillerGroupB06", serverDataType: "string" },
    { name: "fillerGroupB07", serverDataType: "string" },
    { name: "fillerGroupB08", serverDataType: "string" },
    { name: "fillerGroupB09", serverDataType: "string" },
    { name: "fillerGroupB10", serverDataType: "string" },
    { name: "fillerGroupB11", serverDataType: "string" },
    { name: "fillerGroupB12", serverDataType: "string" },
    { name: "fillerGroupB13", serverDataType: "string" },
    { name: "fillerGroupB14", serverDataType: "string" },
    { name: "fillerGroupB15", serverDataType: "string" },
    { name: "fillerGroupB16", serverDataType: "string" },
    { name: "fillerGroupB17", serverDataType: "string" },
    { name: "fillerGroupB18", serverDataType: "string" },
    { name: "fillerGroupB19", serverDataType: "string" },
    { name: "fillerGroupB20", serverDataType: "string" },
    { name: "fillerGroupC01", serverDataType: "string" },
    { name: "fillerGroupC02", serverDataType: "string" },
    { name: "fillerGroupC03", serverDataType: "string" },
    { name: "fillerGroupC04", serverDataType: "string" },
    { name: "fillerGroupC05", serverDataType: "string" },
    { name: "fillerGroupC06", serverDataType: "string" },
    { name: "fillerGroupC07", serverDataType: "string" },
    { name: "fillerGroupC08", serverDataType: "string" },
    { name: "fillerGroupC09", serverDataType: "string" },
    { name: "fillerGroupC10", serverDataType: "string" },
    { name: "fillerGroupC11", serverDataType: "string" },
    { name: "fillerGroupC12", serverDataType: "string" },
    { name: "fillerGroupC13", serverDataType: "string" },
    { name: "fillerGroupC14", serverDataType: "string" },
    { name: "fillerGroupC15", serverDataType: "string" },
    { name: "fillerGroupC16", serverDataType: "string" },
    { name: "fillerGroupC17", serverDataType: "string" },
    { name: "fillerGroupC18", serverDataType: "string" },
    { name: "fillerGroupC19", serverDataType: "string" },
    { name: "fillerGroupC20", serverDataType: "string" },
    { name: "fillerGroupD01", serverDataType: "string" },
    { name: "fillerGroupD02", serverDataType: "string" },
    { name: "fillerGroupD03", serverDataType: "string" },
    { name: "fillerGroupD04", serverDataType: "string" },
    { name: "fillerGroupD05", serverDataType: "string" },
    { name: "fillerGroupD06", serverDataType: "string" },
    { name: "fillerGroupD07", serverDataType: "string" },
    { name: "fillerGroupD08", serverDataType: "string" },
    { name: "fillerGroupD09", serverDataType: "string" },
    { name: "fillerGroupD10", serverDataType: "string" },
    { name: "fillerGroupD11", serverDataType: "string" },
    { name: "fillerGroupD12", serverDataType: "string" },
    { name: "fillerGroupD13", serverDataType: "string" },
    { name: "fillerGroupD14", serverDataType: "string" },
    { name: "fillerGroupD15", serverDataType: "string" },
    { name: "fillerGroupD16", serverDataType: "string" },
    { name: "fillerGroupD17", serverDataType: "string" },
    { name: "fillerGroupD18", serverDataType: "string" },
    { name: "fillerGroupD19", serverDataType: "string" },
    { name: "fillerGroupD20", serverDataType: "string" },
    { name: "fillerGroupE01", serverDataType: "string" },
    { name: "fillerGroupE02", serverDataType: "string" },
    { name: "fillerGroupE03", serverDataType: "string" },
    { name: "fillerGroupE04", serverDataType: "string" },
    { name: "fillerGroupE05", serverDataType: "string" },
    { name: "fillerGroupE06", serverDataType: "string" },
    { name: "fillerGroupE07", serverDataType: "string" },
    { name: "fillerGroupE08", serverDataType: "string" },
    { name: "fillerGroupE09", serverDataType: "string" },
    { name: "fillerGroupE10", serverDataType: "string" },
    { name: "fillerGroupE11", serverDataType: "string" },
    { name: "fillerGroupE12", serverDataType: "string" },
    { name: "fillerGroupE13", serverDataType: "string" },
    { name: "fillerGroupE14", serverDataType: "string" },
    { name: "fillerGroupE15", serverDataType: "string" },
    { name: "fillerGroupE16", serverDataType: "string" },
    { name: "fillerGroupE17", serverDataType: "string" },
    { name: "fillerGroupE18", serverDataType: "string" },
    { name: "fillerGroupE19", serverDataType: "string" },
    { name: "fillerGroupE20", serverDataType: "string" },
  ],
};
