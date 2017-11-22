import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class HomeComponent extends React.Component {
	render() {
		const {user} = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi {user.username}!</h1>
				<p>You're logged!</p>
				<p>
					<Link to="/login">Logout</Link>
				</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {authentication} = state;
	const {user} = authentication;
	return {
		user
	};
}

const connectedHomeComponent = connect(mapStateToProps)(HomeComponent);
export {connectedHomeComponent as HomeComponent};