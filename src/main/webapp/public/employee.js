var EmployeeProfileLink = "";
var cookieArray = document.cookie.split(";");
var cookie_length = cookieArray.length;
for(var i = 0; i < cookie_length; i++){
	if(cookieArray[i].split("=")[0] == " employee_href" || cookieArray[i].split("=")[0] == "employee_href"){
		EmployeeProfileLink = cookieArray[i].split("=")[1];
	}
}

var EmployeeProfile = React.createClass({
	
	loadEmployeeProfileFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink
		}).then(function (data) {
			toastr.success("Employee profile loaded");
			self.setState({employeeProfile: data});
		});
	},
	
	getInitialState: function () {
		return {employeeProfile: []};
	},
	
	componentDidMount: function () {
		this.loadEmployeeProfileFromServer();
	},
	
	render : function () {
		return (<div>
		<table className="table table-striped table-bordered">
		    <thead>
		      <tr>
		        <th>Name</th>
		        <th>Designation</th>
		        <th>Manager</th>
		        <th>Email</th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr>
		        <td id="eName">{this.state.employeeProfile.eName}</td>
		        <td id="eType">{this.state.employeeProfile.eType}</td>
		        <td id="eManagerName">{this.state.employeeProfile.eManagerName}</td>
		        <td id="eEmail">{this.state.employeeProfile.eEmail}</td>
		      </tr>
		    </tbody>
	    </table>
		</div>);
	}
});

ReactDOM.render(<EmployeeProfile />, document.getElementById("ReactProfile"));


var Feedback = React.createClass({
	
	handleClick() {
		document.cookie = "feedback_id=" + this.props.feedback.feedbackId + "; path=/";
		window.location = "http://localhost:8080/feedback";
	},
	
	render: function() {
		var timestamp = this.props.feedback.feedbackId.toString().substring(0,8);
		var date = new Date( parseInt( timestamp, 16 ) * 1000 );
		return (
				<tr data-feedbackId={this.props.feedback.feedbackId} onClick={this.handleClick}>
				
				<td>{this.props.feedback.peerName}</td>
				<td>{this.props.feedback.eName}</td>
				<td>{this.props.feedback.eManagerName}</td>
				<td>{date.toString()}</td>
				
				</tr>);
	}
});


var PendingFeedbacks = React.createClass({
	
	loadPendingFeedbacksFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/pendingfeedbacks"
		}).then(function (data) {
			self.setState({pendingFeedbacks: data});
			toastr.success("Pending feedbacks loaded");
		});
	},
	
	getInitialState: function () {
		return {pendingFeedbacks: []};
	},
	
	componentDidMount: function () {
		this.loadPendingFeedbacksFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.pendingFeedbacks.forEach(function(feedback) {
			rows.push(<Feedback feedback={feedback} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Request Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});

ReactDOM.render(<PendingFeedbacks />, document.getElementById("ReactPendingFeedbacks"));


var SentFeedbacks = React.createClass({
	
	loadSentFeedbacksFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/sentfeedbacks"
		}).then(function (data) {
			self.setState({sentFeedbacks: data});
			toastr.success("Sent feedbacks loaded");
		});
	},
	
	getInitialState: function () {
		return {sentFeedbacks: []};
	},
	
	componentDidMount: function () {
		this.loadSentFeedbacksFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.sentFeedbacks.forEach(function(feedback) {
			rows.push(<Feedback feedback={feedback} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Request Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});

ReactDOM.render(<SentFeedbacks />, document.getElementById("ReactSentFeedbacks"));



