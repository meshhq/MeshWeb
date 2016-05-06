
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer, ToastMessage } from 'react-toastr'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'

// Forms
import UserForm from '../Forms/UserForm'
import DeleteForm from '../Forms/DeleteForm'
import ProviderForm from '../Forms/ProviderForm'
import ErrorForm from '../Forms/ErrorForm'

// Actions
import * as UserActions from '../../actions/users'

const { Table, Column, Cell } = FixedDataTable;
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

const TextColumn = ({ data, ...props }) => {
  this.displayName = 'TextColumn'
  let cell = <TextCell {...props} col="test" data={data}/>
  let headerCell = <Cell {...props}>{'Test'}</Cell>

  return (
    <Column cell={cell} header={headerCell} width={150}/>
  )
}

class UserTable extends React.Component {
  constructor(props) {
    super(props);

      // User Selection
      this.handleSelectOne = this._handleSelectOne.bind(this)
      this.handleSelectAll = this._handleSelectAll.bind(this)

      // New User Handlers
      this.handleNewClick = this._handleNewClick.bind(this)
      this.handleSaveUser = this._handleSaveUser.bind(this)
      this.handleCloseUserForm = this._handleCloseUserForm.bind(this)

      // Delete User Handlers
      this.handleDeleteClick = this._handleDeleteClick.bind(this)
      this.handleDeleteUser = this._handleDeleteUser.bind(this)
      this.handleCloseDeleteForm = this._handleCloseDeleteForm.bind(this)

      // Publish User Handlers
      this.handlePublishClick = this._handlePublishClick.bind(this)
      this.handlePublishUser = this._handlePublishUser.bind(this)
      this.handleCloseProviderForm = this._handleCloseProviderForm.bind(this)

      // Add User To Handlers
      this.handleAddToClick = this._handleAddToClick.bind(this)
      this.handleAddUserTo = this._handleAddUserTo.bind(this)
      this.handleCloseAddToFrom = this._handleCloseAddToForm.bind(this)

      // Searching
      this.handleSearch = this._handleSearch.bind(this)

      // Errors
      this.handleCloseErrorForm = this._handleCloseErrorForm.bind(this)

      // Setup our data source
      this.dataList = new DataListWrapper(this.props.users)
      this.state = {
        selectedList: [],
        selectedProvider: null,
        filteredDataList: this.dataList,
        newFormDisplayed: false,
        providerFormDisplayed: false,
        deleteFormDisplayed: false,
        addToFormDisplayed: false,
        errorFormDisplayed: false
      };
    }

    componentWillReceiveProps(nextProps) {
      this._dataList = new DataListWrapper(nextProps.users)
      this.setState({
        filteredDataList: this.dataList
      });
    }

    /**
     * Synthetic provider injected into the provider selection list
     */
    _meshProvider() {
      return {
        name: 'Mesh',
        type: 0
      }
    }

    //----------------------------------------------------------------------------
    // Error Handling
    //----------------------------------------------------------------------------

    _handleCloseErrorForm() {
      this.setState({
        errorFormDisplayed: false
      });
    }

    //----------------------------------------------------------------------------
    // List Searching
    //----------------------------------------------------------------------------

    _handleSearch(e) {
      let dataList;
      if (e.target.value) {
        let filterBy = e.target.value.toLowerCase();
        let size = this.dataList.getSize();
        let filteredIndexes = [];
        for (let index = 0; index < size; index++) {
          let { first_name } = this.dataList.getObjectAt(index);
          if (first_name.toLowerCase().indexOf(filterBy) !== -1) {
            filteredIndexes.push(index);
          }
        }
        dataList = new DataListWrapper(this.props.users, filteredIndexes)
      } else {
        dataList = this.dataList
      }
      this.setState({
        filteredDataList: dataList
      });
    }

    //----------------------------------------------------------------------------
    // User Selection
    //----------------------------------------------------------------------------

    /**
     * handleSelectOne takes care of handling the event where one list is selected.
     * @param  {[type]} e The event
     * @param  {[type]} idx The index for the list.
     */
    _handleSelectOne(e, idx) {
      let selectedList = this.state.selectedList
      const id = this.state.filteredDataList.getObjectAt(idx).id
      if (e.target.checked) {
        selectedList.push(id)
      } else {
        selectedList.pop(id)
      }
      this.setState({
        selectedList: selectedList
      });
    }

    /**
     * handleSelectAll takes care of handling the event where all users are toggles
     * @param  {[type]} e The event
     */
    _handleSelectAll(e) {
      let selectedList = []
      if (e.target.checked) {
        for (let idx = 0; idx < this.state.filteredDataList.getSize(); idx++) {
          const id = this.state.filteredDataList.getObjectAt(idx).id
          selectedList.push(id)
        }
      }
      this.setState({
        selectedList: selectedList
      });
    }

    //----------------------------------------------------------------------------
    // New Action
    //----------------------------------------------------------------------------

    /**
     * _handleNewUser handles a click to the `New` action bar button.
     */
    _handleNewClick() {
      this.setState({
        newFormDisplayed: true
      });
    }

    _handleSaveUser(params) {
      // Optimistically add the list to the model.
      let user = { 'name': params.name, 'description': params.description }
      this.props.users.push(user)
      this.dataList = new DataListWrapper(this.props.users)

      // Create list via Mesh API.
      this.props.userActions.createUser(user)
      this.setState({
        filteredDataList: this.dataList,
        newFormDisplayed: false
      });
    }

    _handleCloseUserForm() {
      this.setState({
        newFormDisplayed: false
      });
    }

    //----------------------------------------------------------------------------
    // Publish Action
    //----------------------------------------------------------------------------

    /**
     * _handlePublishClick handles a click to the `Publish` action bar button.
     */
    _handlePublishClick() {
      if (this.state.selectedList.length == 0) {
        this.setState({
          errorFormDisplayed: true
        });
      } else {
        this.setState({
          providerFormDisplayed: true
        });
      }
    }

    _handlePublishUser(params) {
      let providers = [];
      this.props.providers.map(function(provider) {
        let name = provider['name']
        let shouldPublish = params[name]
        if (shouldPublish === true) {
          providers.push(provider.name)
        }
      });

      for (let idx in this.state.selectedList) {
        let userID = this.state.selectedList[idx]
        this.props.userActions.publishUser(userID, providers)
      }

      this.setState({
        selectedList: [],
        providerFormDisplayed: false
      });
    }

    _handleCloseProviderForm() {
      this.setState({
        providerFormDisplayed: false
      });
    }

    //----------------------------------------------------------------------------
    // Delete Action
    //----------------------------------------------------------------------------

    /**
     * _handleDeleteClick handles a click to the `Delete` action bar button.
     */
    _handleDeleteClick() {
      if (this.state.selectedList.length == 0) {
        this.setState({
          errorFormDisplayed: true
        });
      } else {
        this.setState({
          deleteFormDisplayed: true
        });
      }
    }

    _handleDeleteUser() {
      for (let idx in this.state.selectedList) {
        let userID = this.state.selectedList[idx]
        this.props.users.splice(idx, 1);
        this.props.userActions.deleteUser(userID)
      }

      this.dataList = new DataListWrapper(this.props.users)
      this.setState({
        selectedList: [],
        filteredDataList: this.dataList,
        deleteFormDisplayed: false
      });
    }

    _handleCloseDeleteForm() {
      this.setState({
        deleteFormDisplayed: false
      });
    }

    //----------------------------------------------------------------------------
    // New Action
    //----------------------------------------------------------------------------

    /**
     * _handleNewUser handles a click to the `New` action bar button.
     */
    _handleAddToClick() {
      this.setState({
        addToFormDisplayed: true
      });
    }

    _handleAddUserTo(params) {
      // Optimistically add the list to the model.
      let user = { 'name': params.name, 'description': params.description }
      this.props.users.push(user)
      this.dataList = new DataListWrapper(this.props.users)

      // Create list via Mesh API.
    //  this.props.userActions.createUser(user)
      this.setState({
        filteredDataList: this.dataList,
        addToFormDisplayed: false
      });
    }

    _handleCloseAddToForm() {
      this.setState({
        addToFormDisplayed: false
      });
    }

    //----------------------------------------------------------------------------
    // Show Action
    //----------------------------------------------------------------------------

    /**
     * _handleShowUserDetail handles a click on the actual list in the table.
     */
    _handleShowUserDetail() {
      /*
        1. Present the user detail view.
       */
    }

    //----------------------------------------------------------------------------
    // Filtering Action
    //----------------------------------------------------------------------------

    handleOnFilterChange(e) {
      if (!e.target.value) {
        this.setState({
          filteredDataList: this.dataList
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
        filteredDataList: new DataListWrapper(this.props.users, filteredIndexes)
      });
    }

  render() {
    const { filteredDataList, selectedList  } = this.state

    // Setting up our action bar.
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0 };
    let publishAction = { handler: this.handlePublishClick, title: 'Publish', type: 0 };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0 };
    let addToAction = { handler: this.handleAddToClick, title: 'Add To', type: 0 };
    let actions = [newAction, publishAction, deleteAction, addToAction];

    let actionDivs = (
      <div className={'actions'}>
        <ToastContainer className={'toast-top-full-width'} ref={'container'} toastMessageFactory={ToastMessageFactory} />
        <ActionBar actions={actions} onSearchInput={this.handleSearch} providers={this.props.providers}/>
        <UserForm displayed={this.state.newFormDisplayed} onCancel={this.handleCloseUserForm} onSave={this.handleSaveUser}/>
        <DeleteForm displayed={this.state.deleteFormDisplayed} onCancel={this.handleCloseDeleteForm} onDelete={this.handleDeleteUser}/>
        <ProviderForm displayed={this.state.providerFormDisplayed} onCancel={this.handleCloseProviderForm} onPublish={this.handlePublishUser} providers={this.props.providers} />
        <ErrorForm displayed={this.state.errorFormDisplayed} error={"Please Select a User"} onOK={this.handleCloseErrorForm}/>
      </div>
    )

    // Setup Cells
    let selectAllHeader = (<Cell>
      <div className="input-group">
        <input aria-label="..." onChange={this.handleSelectAll} type="checkbox"/>
      </div>
    </Cell>)
    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    let idCell = (<TextCell col="id" data={filteredDataList} />)
    let firstNameCall = (<TextCell col="first_name" data={filteredDataList} />)
    let lastNameCell = (<TextCell col="last_name" data={filteredDataList} />)
    let emailCell = (<TextCell col="email" data={filteredDataList} />)
    let phoneCell = (<TextCell col="phone" data={filteredDataList} />)

    return (
      <div className="data-table">
        <div className="row">
          <div className="col-md-12">
            {actionDivs}
          </div>
        </div>
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
            <Table headerHeight={40} height={800} rowHeight={35} rowsCount={filteredDataList.getSize()} width={this.props.width} {...this.props} >
              <TextColumn data={filteredDataList}/>
              <Column cell={radioCell} header={selectAllHeader} width={32}/>
              <Column cell={idCell} header={<Cell>{'ID'}</Cell>} width={200}/>
              <Column cell={firstNameCall} header={<Cell>{'First Name'}</Cell>} width={150}/>
              <Column cell={lastNameCell} header={<Cell>{'Last Name'}</Cell>} width={150}/>
              <Column cell={emailCell} header={<Cell>{'Email'}</Cell>} width={300}/>
              <Column cell={phoneCell} header={<Cell>{'Phone'}</Cell>} width={200}/>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

UserTable.displayName = 'User Table';

UserTable.defaultProps = {
  users: [],
  width: 0
}

UserTable.propTypes = {
  providers: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  userActions: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable)
