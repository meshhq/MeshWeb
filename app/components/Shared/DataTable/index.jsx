import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import FixedDataTable from 'fixed-data-table'
const { Table } = FixedDataTable;

let HEADER_HEIGHT = 40
let ROW_HEIGHT = 35

class DataTable extends Component {
  render() {
    let rowsHeight = (this.props.rowCount * ROW_HEIGHT)
    let tableHeight = rowsHeight + HEADER_HEIGHT + 5

    let height = tableHeight
    if (tableHeight > this.props.maxHeight) {
      height = this.props.maxHeight
    }

    return (
      <Row className="data-table-row">
        <Col className="data-table-column" md={12}>
          <Table
            headerHeight={HEADER_HEIGHT}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowsCount={this.props.rowCount}
            width={this.props.width}
            {...this.props}
          >
            {this.props.columns}
          </Table>
        </Col>
      </Row>
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
