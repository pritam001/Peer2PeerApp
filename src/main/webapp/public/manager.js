var EmployeeProfileLink = "";
var cookieArray = document.cookie.split(";");
var cookie_length = cookieArray.length;
for(var i = 0; i < cookie_length; i++){
	if(cookieArray[i].split("=")[0] == " employee_href" || cookieArray[i].split("=")[0] == "employee_href"){
		EmployeeProfileLink = cookieArray[i].split("=")[1];
	}
}

var Request = React.createClass({
	
	handleClick() {
		document.cookie = "request_id=" + this.props.request.requestId + "; path=/";
		window.location = "http://localhost:8080/request";
	},
	
	render: function() {
		var timestamp = this.props.request.requestId.toString().substring(0,8);
		var date = new Date( parseInt( timestamp, 16 ) * 1000 );
		return (
				<tr data-requestId={this.props.request.requestId} onClick={this.handleClick}>

				<td>{this.props.request.eName}</td>
				<td>{this.props.request.eManagerName}</td>
				<td>{date.toString()}</td>
				
				</tr>
				);
	}
});

var PendingApprovals = React.createClass({
	
	loadPendingRequestsFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/pendingapprovals"
		}).then(function (data) {
			self.setState({pendingRequests: data});
			toastr.success("Pending approvals loaded");
		});
	},
	
	getInitialState: function () {
		return {pendingRequests: []};
	},
	
	componentDidMount: function () {
		this.loadPendingRequestsFromServer();
	},
	
	render: function() {
		var rows = [];
		this.state.pendingRequests.forEach(function(request) {
			rows.push(<Request request={request} />);
		});
		return (
				<div>
				<table className="table table-striped table-bordered">
				<thead>
				<tr>
				<th>Employee Name</th><th>Manager Name</th><th>Request sent on</th>
				</tr>
				</thead>
				<tbody>{rows}</tbody>
				</table>
				</div>
				);
	}
});


ReactDOM.render(<PendingApprovals />, document.getElementById('ReactPendingApprovals') );



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

var FeedbacksReceivedByTeam = React.createClass({
	
	loadViewFeedbacksFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/viewfeedbacks"
		}).then(function (data) {
			self.setState({viewFeedbacks: data});
			toastr.success("Feedbacks received by team loaded");
		});
	},
	
	getInitialState: function () {
		return {viewFeedbacks: []};
	},
	
	componentDidMount: function () {
		this.loadViewFeedbacksFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.viewFeedbacks.forEach(function(feedback) {
			rows.push(<Feedback feedback={feedback} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});

ReactDOM.render(<FeedbacksReceivedByTeam />, document.getElementById("ReactFeedbacksReceivedByTeam"));

var SearchFeedbacks = React.createClass({
	
	loadViewFeedbacksFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/viewfeedbacks"
		}).then(function (data) {
			self.setState({viewFeedbacks: data});
			toastr.success("Feedback search data loaded");
		});
	},
	
	getInitialState: function () {
		return {viewFeedbacks: []};
	},
	
	componentDidMount: function () {
		this.loadViewFeedbacksFromServer();
	},
	
	handleClick() {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/viewfeedbacks/searchbyename/" + document.getElementById("selectizeSearchEmployeeName").value
		}).then(function (data) {
			self.setState({viewFeedbacks: data});
			toastr.success("Feedback search data loaded");
		});
	},
	
	render: function(){
		var rows = [];
		this.state.viewFeedbacks.forEach(function(feedback) {
			rows.push(<Feedback feedback={feedback} />);
		});
		return (<div>
					<form className="form-horizontal">
						<br/>
						<div className="form-group">
							<label className="control-label col-sm-2" htmlFor="searchEmployeeName">Filter :</label>

							<div className="col-sm-8">
								<input type="text" id="selectizeSearchEmployeeName" placeholder="Employee Name"/>
							</div>
								
							<div className="col-sm-2">
								<button type="button" className="btn btn-warning btn-block" id="searchEmployeeNameButton" onClick={this.handleClick}>Search</button>
							</div>
						</div>
					</form>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});

ReactDOM.render(<SearchFeedbacks />, document.getElementById("ReactSearchFeedbacks"));

$('#selectizeSearchEmployeeName').selectize({
	valueField: 'eName',
    labelField: 'eName',
    searchField: 'eName',
    maxItems: 1,
    create: false,
    render: {
        option: function(item, escape) {
            return '<div>' +
			          '<span class="title">' +
			          '<span class="eName">' + escape(item.eName) + '</span>' +
			      '</span>' +
			      '<ul class="meta">' +
			          '<li class="eType">Designation : <span>' + escape(item.eType) + '<span></li>' +
			          '<li class="eManagerName">Manager :<span>' + escape(item.eManagerName) + '</span></li>' +
			          '<li class="eEmail">Email : <span>' + escape(item.eEmail) + '</span></li>' +
			      '</ul>' +
			  '</div>';
        }
    },
    load: function(query, callback) {
        if (!query.length) return callback();
        $.ajax({
            url: 'http://localhost:8080/api/employees/search/findByENameLike?name=' + encodeURIComponent(query),
            type: 'GET',
            error: function() {
                callback();
            },
            success: function(res) {
            	//toastr.success(res._embedded.employees.length);
                callback(res._embedded.employees.slice(0, 5));
            }
        });
    }
});
