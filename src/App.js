import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
    
class App extends Component {  
	constructor() {  // Create and initialize state
		super();
		this.state = {
			accountBalance: 0,
			creditList: [],
			currentUser: {
			userName: 'Joe Smith',
			memberSince: '11/22/99',
		}
	};
}
	  
componentDidMount() {
	fetch('https://johnnylaicode.github.io/api/credits.json')
		.then(response => response.json())
		.then(data => {
			this.setState({ creditList: data });
			const totalCredits = data.reduce((sum, credit) => sum + credit.amount, 0);
			this.setState(prevState => ({
				accountBalance: prevState.accountBalance + totalCredits
			}));
		})
		.catch(error => console.error('Error fetching credits:', error));

	fetch('https://johnnylaicode.github.io/api/debits.json')
		.then(response => response.json())
		.then(data => {
			this.setState({ debitList: data });
			const totalDebits = data.reduce((sum, debit) => sum + debit.amount, 0);
			this.setState(prevState => ({
				accountBalance: prevState.accountBalance - totalDebits
			}));
		})
		.catch(error => console.error('Error fetching debits:', error));
}  
	
addCredit = (credit) => {
	const newCreditList = [...this.state.creditList, credit];
	this.setState(prevState => ({
		creditList: newCreditList,
		accountBalance: prevState.accountBalance + credit.amount
	}));
}
	
// Update state's currentUser (userName) after "Log In" button is clicked
mockLogIn = (logInInfo) => {  
	const newUser = {...this.state.currentUser};
	newUser.userName = logInInfo.userName;
	this.setState({currentUser: newUser})
}
	
addDebit = (debit) => {
    const newDebitList = [...this.state.debitList, debit];
    this.setState(prevState => ({
		debitList: newDebitList,
		accountBalance: prevState.accountBalance - debit.amount
	}));
}

// Create Routes and React elements to be rendered using React components
render() {   
	const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
	const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />);
	const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
	const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />);
	const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />);
    
return (
		<Router basename="/assignment-3">
		<div>
			<Route exact path="/" render={HomeComponent}/>
			<Route exact path="/userProfile" render={UserProfileComponent}/>
			<Route exact path="/login" render={LogInComponent}/>
			<Route exact path="/credits" render={CreditsComponent} />
			<Route exact path="/debits" render={DebitsComponent} />
		</div>
		</Router>
		);
	}
    
}
    
export default App;
