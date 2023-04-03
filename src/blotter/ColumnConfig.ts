import { ColumnDescriptor } from "@vuu-ui/vuu-datagrid-types";

export const ColumnConfig: { [key: string]: Partial<ColumnDescriptor> } = {
  side: {
    align: "left",
    type: {
      name: "string",
      renderer: {
        map: { "1": "Sell", "2": "Buy" },
        name: "buy-sell",
      },
    },
  },
  status: {
    align: "left",
    label: "State",
    type: {
      name: "string",
      renderer: {
        map: {
          "1": "In Progress",
          "2": "Completed",
          "3": "Cancelled",
          "4": "Rejected",
        },
        name: "order-status",
      },
    },
  },
  subSatus: {
    align: "left",
    label: "Sub State",
    type: {
      name: "string",
      renderer: {
        map: {
          "0": "Tempor",
          "1": "Elit, sed do",
          "2": "Ut labore et",
          "3": "Magna aliqua",
          "4": "Lorem ipsum",
          "5": "Consectetur",
        },
        name: "mapped-lookup",
      },
    },
  },
  validUntil: {
    align: "left",
    label: "Valid Until",
    type: {
      name: "date",
      formatting: {
        pattern: "dd.mm.yyyy",
      },
      renderer: {
        name: "time-threshold",
      },
    },
  },
};
