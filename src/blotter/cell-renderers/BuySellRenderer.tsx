import { TableCellProps } from "@vuu-ui/vuu-datagrid-types";
import { isTypeDescriptor, registerComponent } from "@vuu-ui/vuu-utils";
import cx from "classnames";

import "./BuySellRenderer.css";

const classBase = "vuuBuySell";

type MappedRenderer = {
  map: { [key: string]: string };
};

//TODO move to column-utils
const hasValueMap = (renderer: unknown): renderer is MappedRenderer =>
  typeof (renderer as MappedRenderer)?.map !== "undefined";

const BuySellRenderer = ({ column, row }: TableCellProps) => {
  //TODO what about click handling

  const { key, type } = column;
  let value = row[key];

  if (isTypeDescriptor(type) && hasValueMap(type.renderer)) {
    const { map } = type.renderer;
    if (value in map) {
      value = map[value];
    } else {
      return null;
    }
  }

  const className = cx(classBase, {
    [`${classBase}-buy`]: value.toLowerCase() === "buy",
    [`${classBase}-sell`]: value.toLowerCase() === "sell",
  });

  return (
    <div className={className} tabIndex={-1}>
      {value}
    </div>
  );
};

registerComponent("buy-sell", BuySellRenderer, "cell-renderer", {
  // serverDataType: ["long", "int", "double"],
});
