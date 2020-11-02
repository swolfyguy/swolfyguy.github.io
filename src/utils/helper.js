import React from "react";
import { ExportToCsv } from "export-to-csv";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

export const exportToCsv = (dataSource) => {
  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "My Awesome CSV",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(options);
  return csvExporter.generateCsv(
    dataSource.map((item) => {
      const { index, ...data } = item;
      return data;
    })
  );
};

export const getColumnSearchProps = (dataIndex) => {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          //   ref={node => {
          //     this.searchInput = node;
          //   }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        {/* <Space>
          <Button
            type="primary"
            //onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space> */}
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    //filterDropdownVisible: true,
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (!visible) {
    //     //setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
  };
};

export const sortDates = (a, b) => {
  const d1 = moment(new Date(a), "dd/mm/yyyy");
  const d2 = moment(new Date(b), "dd/mm/yyyy");
  return d1 - d2;
};
