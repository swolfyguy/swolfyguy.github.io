import React from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import readXlsxFile from "read-excel-file";
import { getColumnSearchProps, sortDates } from "../utils/helper";

const getProps = (setColumns, setDataSource) => ({
  name: "file",
  //action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  onChange(info) {
    if (info.file.status === "done") {
    } else if (info.file.status === "error") {
      message.success(`${info.file.name} file uploaded successfully`);
      readXlsxFile(info.file.originFileObj).then((rows) => {
        const [column, ...data] = rows;
        const columns = column.map((c, i) => ({
          title: c,
          dataIndex: c,
          width: 200,
          editable: true,
          ...getColumnSearchProps(c),
          key: c,
          sorter: (a, b) => {
            // if (a && !b) return a;
            // else if (b && !a) return b;
            // else if (!b && !a) return a;
            // else if (a instanceof Date) return sortDates(a, b);
            // else if (Number(a)) return b - a;
            // else {
            //   debugger;
            if (b && a) {
              return a[column[i]]
                .toLowerCase()
                .localeCompare(b[column[i]].toLowerCase());
            }
          },
        }));
        const dateIndices = [],
          numberIndices = [];
        setDataSource(
          data.map((r, j) => {
            const row = { index: j + 1 };
            columns.forEach((c, i) => {
              if (r[i] instanceof Date) dateIndices.push(i);
              else if (Number(r[i])) numberIndices.push(i);
              row[c.title] = r[i] && r[i].toString();
            });
            return row;
          })
        );
        dateIndices.forEach((i) => {
          columns[i] = {
            ...columns[i],
            sorter: (a, b) =>
              sortDates(a[columns[i].dataIndex], b[columns[i].dataIndex]),
          };
        });
        numberIndices.forEach((i) => {
          columns[i] = {
            ...columns[i],
            sorter: (a, b) => {
              if (b && a)
                return a[columns[i].dataIndex] - b[columns[i].dataIndex];
            },
          };
        });
        setColumns([
          { title: "S.No", dataIndex: "index", width: 100 },
          ...columns,
        ]);
      });
    }
  },
  accept: ".xlsx, .xls",
  showUploadList: false,
});

const ImportFile = ({ setColumns, setDataSource }) => {
  return (
    <Upload {...getProps(setColumns, setDataSource)}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default ImportFile;
