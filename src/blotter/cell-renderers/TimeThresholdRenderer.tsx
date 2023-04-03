// Demo only renderer with hardcoded chacks
import { TableCellProps } from "@vuu-ui/vuu-datagrid-types";
import { registerComponent } from "@vuu-ui/vuu-utils";
import cx from "classnames";

import "./TimeThresholdRenderer.css";

const classBase = "vuuTimeThreshold";

export type TimeThreshold = {
  name: string;
  unit: "day";
  value: number;
};
export type TimeThresholdParams = {
  thresholds: TimeThreshold[];
};

const msInADay = 24 * 60 * 60 * 1000;

const getTimeDiff = (date: Date, unit: "day") => {
  if (unit === "day") {
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    return (+targetDate - +todayDate) / msInADay;
  } else {
    throw Error(`TimeThresholdRenderer unsupported time unit ${unit}`);
  }
};

const TimeThresholdRenderer = ({ column, row }: TableCellProps) => {
  const { key, valueFormatter } = column;
  const rawValue = row[key];
  const value = valueFormatter(rawValue);

  const timeDiff =
    rawValue === 0 ? 1000 : getTimeDiff(new Date(rawValue), "day");
  const className = cx(classBase, {
    [`${classBase}-expired`]: timeDiff < 0,
    [`${classBase}-due`]: timeDiff == 0,
    [`${classBase}-almost-due`]: timeDiff > 0 && timeDiff < 2,
  });

  return (
    <div className={className} tabIndex={-1}>
      <span className={`${classBase}-background`}>{value}</span>
    </div>
  );
};

registerComponent("time-threshold", TimeThresholdRenderer, "cell-renderer", {
  // serverDataType: ["long", "int", "double"],
});
