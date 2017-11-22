import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../common/helpers';
import {alertActions} from '../common/actions';
import {PrivateRoute} from '../common/components';

import {HomeComponent} from '../home.component';
import {LoginComponent} from '../login.component';
import {RegistrationComponent} from '../registration.component';

class App extends React.Component {
	constructor(props) {
		super(props);

		const {dispatch} = this.props;
		history.listen((location, action) => {
			dispatch(alertActions.clear());
		});
	}

	render() {
		const {alert} = this.props;
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						{alert.message &&
						<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
						<Router history={history}>
							<div>
								<PrivateRoute exact path="/" component={HomeComponent}/>
								<Route path="/login" component={LoginComponent}/>
								<Route path="/register" component={RegistrationComponent}/>
							</div>
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {alert} = state;
	return {
		alert
	};
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};