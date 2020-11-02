import { Button, Table, Upload } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import ImportFile from "./components/ImportFile";
import { exportToCsv } from "./utils/helper";
import Grid from "./components/Grid";

const UtilPanelContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  margin: 20px;
`;

function App() {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  return (
    <>
      <UtilPanelContainer>
        <ImportFile setColumns={setColumns} setDataSource={setDataSource} />
        <Button onClick={() => exportToCsv(dataSource)}>Export to Csv</Button>
      </UtilPanelContainer>

      <ContentContainer>
        {/* <Table
          columns={columns}
          dataSource={dataSource}
          bordered={true}
          pagination={true}
          pageSize={10}
          scroll={{
            x: 200,
            y: 300,
          }}
        /> */}
        <Grid
          dataSource={dataSource}
          columns={columns}
          setDataSource={setDataSource}
          setColumns={setColumns}
        />
      </ContentContainer>
    </>
  );
}

export default App;
