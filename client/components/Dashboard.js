import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/userItems';
import mutation from '../mutations/itemRemove';

import UserItems from './UserItems';

class DashBoard extends Component {

  constructor(props) {
    super(props);

    this.onItemDelete = this.onItemDelete.bind(this);
  }

  onItemDelete(id){
    this.props.mutate({variables: { id } })
      .then(()=> this.props.data.refetch())
  }

  render() {
    const { user } = this.props.data;
    if(!user) {
      return <div>Loading...</div>;

    }

    return (
      <div>
        <h3>User</h3>
        <UserItems items={user.items} onItemDelete={this.onItemDelete}/>
        <Link to="items/new">Create New Item</Link>
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(DashBoard)
);
