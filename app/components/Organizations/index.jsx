
import React, { Component, PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'

const { Table, Column, Cell } = FixedDataTable;

class Organizations extends Component {
  constructor(props) {
    super(props);
    this._dataList = new DataListWrapper(this.props.organizations)
    this.state = {
      filteredDataList: this._dataList
    };
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this._dataList = new DataListWrapper(nextProps.organizations)
    this.setState({
      filteredDataList: this._dataList
    });
  }

  handleOnFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList
      });
    }

    let filterBy = e.target.value.toLowerCase();
    let size = this._dataList.getSize();
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      let { name } = this._dataList.getObjectAt(index);
      if (name.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(this.props.organizations, filteredIndexes)
    });
  }

  render() {
    const { filteredDataList } = this.state
    return (
        <div className="data-table">
          <div className="row table-wrapper">
            <div className="col-md-12 dataTableWrapper">
              <ActionBar onActionClick={this.handleActionClick}/>
              <Table
                headerHeight={50}
                height={1000}
                rowHeight={35}
                rowsCount={filteredDataList.getSize()}
                width={this.props.width}
                {...this.props}
              >
                <Column
                  cell={<TextCell
                    col="name"
                    data={filteredDataList}
                        />}
                  header={<Cell>{'Name'}</Cell>}
                  width={150}
                />
                <Column
                  cell={<TextCell
                    col="description"
                    data={filteredDataList}
                        />}
                  header={<Cell>{'Description'}</Cell>}
                  width={400}
                />
                <Column
                  cell={<TextCell
                    col="size"
                    data={filteredDataList}
                        />}
                  header={<Cell>{'Size'}</Cell>}
                  width={50}
                />
                <Column
                  cell={<TextCell
                    col="industry"
                    data={filteredDataList}
                        />}
                  header={<Cell>{'Industry'}</Cell>}
                  width={200}
                />
                <Column
                  cell={<TextCell
                    col="website"
                    data={filteredDataList}
                        />}
                  header={<Cell>{'Website'}</Cell>}
                  width={200}
                />
              </Table>
            </div>
          </div>
        </div>
    )
  }
}

Organizations.defaultProps = {
  organizations: [],
  width: 0
}

Organizations.propTypes = {
  organizations: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  width: PropTypes.number.isRequired
}

// Display Name
Organizations.displayName = 'Organizations'

export default Organizations
