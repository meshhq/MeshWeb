
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import RadioHeader from '../Shared/DataTableHeaders/RadioHeader'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'
import DataTable from '../Shared/DataTable'

// Forms
import UserForm from '../Forms/UserForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Actions
import * as UserActions from '../../actions/users'

const { Column, Cell } = FixedDataTable;

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
      this.handleCloseIntegrationForm = this._handleCloseIntegrationForm.bind(this)

      // Add User To Handlers
      this.handleAddToClick = this._handleAddToClick.bind(this)
      this.handleAddUserTo = this._handleAddUserTo.bind(this)
      this.handleCloseAddToFrom = this._handleCloseAddToForm.bind(this)

      // Cell Selection
      this.handleCellClick = this._handleCellClick.bind(this)
      this.handleUpdateUser = this._handleUpdateUser.bind(this)

      // Searching
      this.handleSearch = this._handleSearch.bind(this)

      // Errors
      this.handleCloseErrorForm = this._handleCloseErrorForm.bind(this)

      // Setup our data source
      
      this.dataList = new DataListWrapper(this.props.users)
      this.state = {
        selectedList: [],
        selectedIntegration: null,
        selectedUser: null,
        filteredDataList: this.dataList,
        userFormDisplayed: false,
        providerFormDisplayed: false,
        deleteFormDisplayed: false,
        addToFormDisplayed: false,
        errorFormDisplayed: false
      };
    }

    componentWillReceiveProps(nextProps) {
      this.dataList = new DataListWrapper(nextProps.users)
      this.setState({
        filteredDataList: this.dataList
      });
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
      const user = this.state.filteredDataList.getObjectAt(idx)
      if (e.target.checked) {
        selectedList.push(user)
      } else {
        selectedList.pop(user)
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
          const user = this.state.filteredDataList.getObjectAt(idx)
          selectedList.push(user)
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
        userFormDisplayed: true
      });
    }

    // Create list via Mesh API.
    _handleSaveUser(params) {
      this.props.userActions.createUser(params)
      this.setState({
        userFormDisplayed: false
      });
    }

    _handleCloseUserForm() {
      this.setState({
        selectedUser: null,
        userLists: null,
        userFormDisplayed: false
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
          providers.push(provider.key)
        }
      });
      for (let idx in this.state.selectedList) {
        let user = this.state.selectedList[idx]
        this.props.userActions.publishUser(user, providers)
      }

      this.setState({
        selectedList: [],
        providerFormDisplayed: false
      });
    }

    _handleCloseIntegrationForm() {
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
        let user = this.state.selectedList[idx]
        this.props.userActions.deleteUser(user)
      }

      this.setState({
        selectedList: [],
        deleteFormDisplayed: false
      });
    }

    _handleCloseDeleteForm() {
      this.setState({
        deleteFormDisplayed: false
      });
    }

    //----------------------------------------------------------------------------
    // Add To Action
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
    this.props.userActions.createUser(params)
      this.setState({
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
     _handleCellClick(idx) {
       let user = this.state.filteredDataList.getObjectAt(idx)
       //this.props.userActions.getListsForUser(user)
       this.setState({
         selectedUser: user,
         userFormDisplayed: true
       });
     }

    _handleUpdateUser(params) {
      this.props.userActions.updateUser(this.state.selectedUser, params)
      this.setState({
        userLists: null,
        selectedUser: null,
        userFormDisplayed: false
      });
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
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0, glyph:'glyphicon glyphicon-plus' };
    let publishAction = { handler: this.handlePublishClick, title: 'Publish', type: 0, glyph:'glyphicon glyphicon-refresh' };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0, glyph: 'glyphicon glyphicon-remove' };
    let addToAction = { handler: this.handleAddToClick, title: 'Add To', type: 0, glyph: 'glyphicon glyphicon-asterisk' };
    let actions = [newAction, publishAction, deleteAction, addToAction];

    let forms = (
      <div className={'forms'}>
        <UserForm
          displayed={this.state.userFormDisplayed}
          lists={this.state.userLists}
          onCancel={this.handleCloseUserForm}
          onSave={this.handleSaveUser}
          onUpdate={this.handleUpdateUser}
          user={this.state.selectedUser}
        />
        <DeleteForm
          displayed={this.state.deleteFormDisplayed}
          onCancel={this.handleCloseDeleteForm}
          onDelete={this.handleDeleteUser}
        />
        <IntegrationForm
          displayed={this.state.providerFormDisplayed}
          integrations={this.props.integrations}
          onCancel={this.handleCloseIntegrationForm}
          onPublish={this.handlePublishUser}
        />
        <ErrorForm
          displayed={this.state.errorFormDisplayed}
          error={"Please Select a User"}
          onOK={this.handleCloseErrorForm}
        />
      </div>
    )

    let columns = []

    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    columns.push(<Column cell={radioCell} header={<RadioHeader onSelectAll={this.handleSelectAll}/>} key={'radio'} width={32}/>)

    let firstNameCall = (<TextCell col="first_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={firstNameCall} header={<Cell>{'First Name'}</Cell>} key={'first_name'} width={100}/>)

    let lastNameCell = (<TextCell col="last_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={lastNameCell} header={<Cell>{'Last Name'}</Cell>} key={'last_name'} width={100}/>)

    let emailCell = (<TextCell col="email" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={emailCell} header={<Cell>{'Email'}</Cell>} key={'email'} width={250}/>)

    let phoneCell = (<TextCell col="phone" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={phoneCell} header={<Cell>{'Phone'}</Cell>} key={'phone'} width={200}/>)

    let mobileCell = (<TextCell col="mobile" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={mobileCell} header={<Cell>{'Mobile'}</Cell>} key={'mobile'} width={200}/>)

    let organizationCell = (<TextCell col="organization_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={organizationCell} header={<Cell>{'Organization'}</Cell>} key={'organization_name'} width={200}/>)

    let priorityCell = (<TextCell col="priority" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={priorityCell} header={<Cell>{'Priority'}</Cell>} key={'priority'} width={100}/>)

    let titleCell = (<TextCell col="title" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={titleCell} header={<Cell>{'Tilte'}</Cell>} key={'title'} width={240}/>)

    return (
      <Grid fluid>
        {forms}
        <ActionBar
          actions={actions}
          onSearchInput={this.handleSearch}
          providers={this.props.providers}
        />
        <DataTable
          columns={columns}
          maxHeight={680}
          rowCount={filteredDataList.getSize()}
          width={this.props.width}
          {...this.props}
        />
      </Grid>
    );
  }
}

UserTable.displayName = 'User Table';

UserTable.defaultProps = {
  users: [],
  width: 0
}

UserTable.propTypes = {
  integrations: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  lists: PropTypes.arrayOf(React.PropTypes.object),
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
