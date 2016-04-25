
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

  //****************************************************************************
  // Action Bar Handlers
  //****************************************************************************

  _handleActionClick(idx) {
    switch(idx) {
    case 0:
        // Select All
        break;
    case 1:
        // Show form
        break;
    case 2:

        break;
    case 3:
        // Merge
        break;
    case 4:
        // More
        break;
      }
  }

  /**
   * _handleNewOrganization handles a click to the `New` action bar button.
   */
  _handleNewOrganization() {
    /*
      1. Present for organization data entry.
      2. Optimistically add organization model to data source.
      2. Add the orgainzation via API.
     */
  }

  /**
   * _handlePublishOrganization handles a click to the `Publish` action bar button.
   */
  _handlePublishOrganization() {
    /*
      1. Present integration view with options to select one or multiple integtrations.
      2. Publish the orgainzation to the selected integrations.
     */
  }

  /**
   * _handleDeleteOrganization handles a click to the `Delete` action bar button.
   */
  _handleDeleteOrganization() {
    /*
      1. Present deletion confirmation box.
      2. Optimistically delete organization from data source.
      2. Delete the organization via Mesh API.
     */
  }

  //****************************************************************************
  // User Detail
  //****************************************************************************

  /**
   * _handleShowOrganizationDetail handles a click on the actual list in the table.
   */
  _handleShowOrganizationDetail() {
    /*
      1. Present the organization detail view.
     */
  }

  //****************************************************************************
  // Organization Filtering
  //****************************************************************************

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
    // Setting up our action bar.
    let newAction = { handler: this.handleActionClick, title: 'New', type: 0 };
    let publishAction = { handler: this.handleActionClick, title: 'Publish', type: 0 };
    let deleteAction = { handler: this.handleActionClick, title: 'Delete', type: 0 };
    let actions = [newAction, publishAction, deleteAction];

    const { filteredDataList } = this.state
    return (
      <div className="data-table">
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
            <ActionBar actions={actions} onActionClick={this.handleActionClick}/>
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
