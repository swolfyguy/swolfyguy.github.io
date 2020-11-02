import React from "react";
import { Table, Button } from "antd";
import { EditableCell, EditableRow } from "./EditableCell";

class EditableTable extends React.Component {
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.props.setDataSource(dataSource.filter((item) => item.key !== key));
  };

  handleAdd = () => {
    const { dataSource, columns } = this.props;
    const newData = {
      key: dataSource.length,
    };
    columns.forEach((item) => {
      newData[item.title] = "";
    });
    newData["index"] = newData.key + 1;
    this.props.setDataSource([...dataSource, newData]);
  };

  handleSave = (row) => {
    const newData = [...this.props.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.props.setDataSource(newData);
  };

  render() {
    const { dataSource } = this.props;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          pagination={true}
          pageSize={10}
          scroll={{
            x: 100,
            y: 600,
          }}
        />
      </div>
    );
  }
}

export default EditableTable;
