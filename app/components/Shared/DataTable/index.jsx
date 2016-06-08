
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import FixedDataTable from 'fixed-data-table'
const { Table } = FixedDataTable;

let HEADER_HEIGHT = 40
let ROW_HEIGHT = 35

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 2500
    };
  }

  render() {
    return (
      <div className="datatable-wrapper">
        <Row className="data-table-row">
          <Col className="data-table-column" md={12}>
            <Table
              {...this.props}
              headerHeight={HEADER_HEIGHT}
              maxHeight={this.props.containerHeight}
              height={this.props.containerHeight - 57}
              rowHeight={ROW_HEIGHT}
              rowsCount={this.props.rowCount}
              width={this.props.containerWidth}
            >
              {this.props.columns}
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

DataTable.displayName = 'DataTable';

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired,
  rowCount:PropTypes.number.isRequired,
  width:PropTypes.number.isRequired
}

export default DataTable
