import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import FixedDataTable from 'fixed-data-table'
const { Table } = FixedDataTable;

class DataTable extends Component {
  render() {
    return (
      <Row className="data-table-row">
        <Col className="data-table-column" md={12}>
          <Table
            headerHeight={this.props.headerHeight}
            height={this.props.height}
            rowHeight={this.props.rowHeight}
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
  columns: PropTypes.object.isRequired,
  headerHeight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rowCount:PropTypes.numberisRequired,
  rowHeight: PropTypes.number.isRequired,
  width:PropTypes.number.isRequired
}

export default DataTable
