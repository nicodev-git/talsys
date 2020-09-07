import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from 'client/actions/userActions';
import moment from 'moment'

import { Table, Tag, Space, Button, Icon, Popconfirm, message } from 'antd';



export class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }

    this.deleteUser = this.deleteUser.bind(this)
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      await this.props.getUsers();
      this.setState({ loading: false });
    } catch(err) {
      this.setState({ loading: false });
    }
  }


  async deleteUser(id) {
    await this.props.deleteUser(id)
  }

  render() {
  	const { user } = this.props;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (cell, row) => `${row.firstName} ${row.lastName}`,
        sorter: (a, b) => `${a.firstName} ${a.lastName}`.length - `${b.firstName} ${b.lastName}`.length
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Role',
        dataIndex: 'user',
        key: 'user',
        render: (user) => <span style={{textTransform: 'capitalize'}}>{user.role}</span>
      },
      {
        title: 'Plan',
        dataIndex: 'plan',
        key: 'plan',
      },
      {
        title: 'Registered At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (date) => moment(new Date(date)).format('MMM DD, YYYY')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (<>{
          record.user.role === 'user' && 
            <div>
              <Popconfirm
                title="Are you sure delete this user?"
                onConfirm={() => this.deleteUser(record.user._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" shape="circle" icon="delete"/>
              </Popconfirm>
            </div>
        }</>),
      },
    ];


    return (
      <div className="w-100 users-page my-4 container">
      	<Table columns={columns} dataSource={user.allUsers} loading={this.state.loading}/>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.users
});


const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers,
  deleteUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)