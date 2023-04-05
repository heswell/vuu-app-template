import { Tab, Tabstrip, Toolbar } from "@heswell/salt-lab";
import {
  DataSource,
  DataSourceConfig,
  RemoteDataSource,
  SchemaColumn,
} from "@vuu-ui/vuu-data";
import { GridConfig } from "@vuu-ui/vuu-datagrid-types";
import { Flexbox, registerComponent, useViewContext } from "@vuu-ui/vuu-layout";
import { Table } from "@vuu-ui/vuu-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./cell-renderers";
import { ColumnConfig } from "./ColumnConfig";
import { OrdersSchema } from "./OrdersSchema";
import { DataSourceStats } from "@vuu-ui/vuu-table-extras";

import { Filter } from "@vuu-ui/vuu-filter-types";
import {
  addFilter,
  filterAsQuery,
  FilterInput,
  useFilterSuggestionProvider,
} from "@vuu-ui/vuu-filters";
import "@vuu-ui/vuu-filters/index.css";
import "@vuu-ui/vuu-popups/index.css";
import "@vuu-ui/vuu-table-extras/index.css";
import "@vuu-ui/vuu-table/index.css";
import "./Blotter.css";

const classBase = "vuuBlotter";

type BlotterConfig = {
  "datasource-config"?: DataSourceConfig;
  "table-config"?: Omit<GridConfig, "headings">;
};

type FilterState = {
  filter: Filter | undefined;
  filterQuery: string;
  filterName?: string;
};

const toSchemaColumn = (columnName: string): SchemaColumn => {
  const column = OrdersSchema.columns.find(({ name }) => name === columnName);
  if (column) {
    const columnConfig = ColumnConfig[columnName];
    if (columnConfig) {
      return {
        ...column,
        ...columnConfig,
      };
    } else {
      return column;
    }
  } else {
    throw Error(`No column '${columnName}' in schema`);
  }
};

export const Blotter = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { id, dispatch, load, purge, save, loadSession, saveSession, title } =
    useViewContext();

  const columnsRef = useRef<string[]>([]);

  const namedConfigurations = useMemo(() => {
    // prettier-ignore
    const whpColumns = ["orderId", "status", "subState", "quantity", "side", "account", "algo", "assetClass", "currency", "exchange", "ric", "isin", "validUntil", "instrument"]
    // prettier-ignore
    const wovColumns = ["account", "orderId", "side", "price", "averagePrice", "quantity", "filledQuantity", "openQuantity", "validUntil"];
    // prettier-ignore
    const statusColumns = ["account", "status", "cancelReason", "rejectReason"];
    return [
      {
        "datasource-config": {
          columns: whpColumns,
        },
        "table-config": {
          columns: whpColumns.map(toSchemaColumn),
        },
      },
      {
        "datasource-config": {
          columns: wovColumns,
        },
        "table-config": {
          columns: wovColumns.map(toSchemaColumn),
        },
      },
      {
        "datasource-config": {
          columns: statusColumns,
          filter: { filter: "status = 3 or status = 4" },
        },
        "table-config": {
          columns: statusColumns.map(toSchemaColumn),
        },
      },
      {
        "datasource-config": {
          columns: OrdersSchema.columns.map((col) => col.name),
        },
        "table-config": {
          columns: OrdersSchema.columns
            .map((col) => col.name)
            .map(toSchemaColumn),
        },
      },
    ];
  }, []);

  const namedConfiguration = namedConfigurations[selectedIndex];
  const config = namedConfiguration["table-config"];
  const dataSourceConfig = namedConfiguration["datasource-config"];
  columnsRef.current = dataSourceConfig.columns;

  const handleDataSourceConfigChange = useCallback(
    (config: DataSourceConfig | undefined, confirmed?: boolean) => {
      // confirmed / unconfirmed messages are used for UI updates, not state saving
      //   if (confirmed === undefined) {
      //     save?.(config, "datasource-config");
      //   }
    },
    []
  );

  const dataSource: DataSource = useMemo(() => {
    let ds = loadSession?.("data-source") as RemoteDataSource;
    if (ds) {
      return ds;
    }
    ds = new RemoteDataSource({
      bufferSize: 200,
      viewport: id,
      table: OrdersSchema.table,
      columns: columnsRef.current,
    });
    ds.on("config", handleDataSourceConfigChange);
    saveSession?.(ds, "data-source");
    return ds;
  }, [handleDataSourceConfigChange, id, loadSession, saveSession]);

  const configRef = useRef<Omit<GridConfig, "headings">>(config);
  const [tableConfig, setTableConfig] =
    useState<Omit<GridConfig, "headings">>(config);

  useMemo(() => {
    setTableConfig((configRef.current = config));
  }, [config]);

  // Tabs
  const [tabs, setTabs] = useState([
    { label: "WHP", closeable: false },
    { label: "WOV" },
    { label: "Cancelled Orders" },
    { label: "All Columns" },
  ]);
  const handleAddTab = () => {
    const count = tabs.length;
    setTabs((state) => state.concat([{ label: `Tab ${state.length + 1}` }]));
    setSelectedIndex(count);
  };
  const onTabDidClose = (closingTabIndex: number) => {
    if (closingTabIndex !== undefined) {
      const newTabs = [...tabs];
      newTabs.splice(closingTabIndex, 1);

      let newSelectedTab = selectedIndex;
      if (selectedIndex > closingTabIndex || newTabs.length === selectedIndex) {
        newSelectedTab--;
      }

      setSelectedIndex(newSelectedTab);
      setTabs(newTabs);
    }
  };

  // Filters
  const namedFilters = useMemo(() => new Map<string, string>(), []);
  const [filterState, setFilterState] = useState<FilterState>({
    filter: undefined,
    filterQuery: "",
  });
  const suggestionProvider = useFilterSuggestionProvider({
    columns: OrdersSchema.columns,
    table: OrdersSchema.table,
  });

  //   const {
  //     "datasource-config": dataSourceConfigFromState = namedConfiguration?.[
  //       "datasource-config"
  //     ],
  //     "table-config": tableConfigFromState = namedConfiguration?.["table-config"],
  //   } = useMemo(() => (load?.() ?? NO_CONFIG) as BlotterConfig, [load]);

  //   const { getDefaultColumnConfig, handleRpcResponse } = useShellContext();
  //   const configColumns = tableConfigFromState?.columns;

  //   console.log({
  //     dataSourceConfigFromState,
  //     tableConfigFromState,
  //   });

  const handleTableConfigChange = useCallback(
    (config: Omit<GridConfig, "headings">) => {
      //   save?.(config, "table-config");
      //   tableConfigRef.current = config;
    },
    []
  );

  useEffect(() => {
    setTableConfig(
      (configRef.current = {
        columns: config.columns,
      })
    );

    dataSource.config = dataSourceConfig;

    // if (dataSourceConfig.filter) {
    //   dataSource.filter = dataSourceConfig.filter;
    // } else if (dataSource.filter.filter !== "") {
    //   dataSource.filter = { filter: "" };
    // }

    // forceUpdate({});
  }, [config, dataSource, dataSourceConfig]);

  //   const [, forceUpdate] = useState({});

  //   useEffect(() => {
  //     tableConfigRef.current.columns = namedConfiguration["table-config"].columns;
  //     dataSource.columns = namedConfiguration["datasource-config"].columns;
  //     forceUpdate({});
  //   }, [dataSource, namedConfiguration]);

  //   const tableConfig = useMemo(
  //     () => ({
  //       columns:
  //         configColumns || applyDefaults(OrdersSchema, getDefaultColumnConfig),
  //     }),
  //     [configColumns, getDefaultColumnConfig, OrdersSchema]
  //   );

  const handleSubmitFilter = useCallback(
    (
      newFilter: Filter | undefined,
      filterQuery: string,
      mode = "add",
      filterName?: string
    ) => {
      let newFilterState: FilterState;
      if (newFilter && (mode === "and" || mode === "or")) {
        const fullFilter = addFilter(filterState.filter, newFilter, {
          combineWith: mode,
        }) as Filter;
        newFilterState = {
          filter: fullFilter,
          filterQuery: filterAsQuery(fullFilter),
          filterName,
        };
      } else {
        newFilterState = {
          filter: newFilter,
          filterQuery,
          filterName,
        };
      }

      dataSource.filter = {
        filter: newFilterState.filterQuery,
        filterStruct: newFilterState.filter,
      };
      setFilterState(newFilterState);
      if (filterName && newFilterState.filter) {
        namedFilters.set(filterName, newFilterState.filterQuery);
      }
    },
    [dataSource, filterState.filter, namedFilters]
  );

  //   console.log({ tableConfig: tableConfigRef.current });

  return (
    <Flexbox className={classBase} style={{ flexDirection: "column" }}>
      <Tabstrip
        style={{ flex: "0 0 32px" }}
        activeTabIndex={selectedIndex}
        enableAddTab
        enableRenameTab
        onActiveChange={setSelectedIndex}
        onAddTab={handleAddTab}
        onCloseTab={onTabDidClose}
      >
        {tabs.map(({ label }) => (
          <Tab closeable key={label} label={label} />
        ))}
      </Tabstrip>
      <div style={{ flex: "0 0 40px" }}>
        <FilterInput
          existingFilter={filterState.filter}
          onSubmitFilter={handleSubmitFilter}
          suggestionProvider={suggestionProvider}
        />
      </div>
      <Table
        config={tableConfig}
        dataSource={dataSource}
        renderBufferSize={50}
        rowHeight={21}
        zebraStripes
      />
      <Toolbar className="vuuBlotter-footer">
        <DataSourceStats dataSource={dataSource as RemoteDataSource} />
      </Toolbar>
    </Flexbox>
  );
};

registerComponent("Blotter", Blotter, "view");
