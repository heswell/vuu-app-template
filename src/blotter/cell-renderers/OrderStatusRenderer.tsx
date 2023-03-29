import { TableCellProps } from "@vuu-ui/vuu-datagrid-types";
import { isTypeDescriptor, registerComponent } from "@vuu-ui/vuu-utils";
import cx from "classnames";

import "./OrderStatusRenderer.css";

const classBase = "vuuOrderStatus";

type MappedRenderer = {
  map: { [key: string]: string };
};

//TODO move to column-utils
const hasValueMap = (renderer: unknown): renderer is MappedRenderer =>
  typeof (renderer as MappedRenderer)?.map !== "undefined";

const OrderStatusRenderer = ({ column, row }: TableCellProps) => {
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
    [`${classBase}-progress`]: value?.toLowerCase() === "in progress",
    [`${classBase}-complete`]: value?.toLowerCase() === "completed",
    [`${classBase}-cancelled`]: value?.toLowerCase() === "cancelled",
    [`${classBase}-rejected`]: value?.toLowerCase() === "rejected",
  });

  return (
    <div className={className} tabIndex={-1}>
      <span className={`${classBase}-background`}>{value}</span>
    </div>
  );
};

registerComponent("order-status", OrderStatusRenderer, "cell-renderer", {
  // serverDataType: ["long", "int", "double"],
});
