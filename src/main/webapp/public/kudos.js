var EmployeeProfileLink = "";
var cookieArray = document.cookie.split(";");
var cookie_length = cookieArray.length;
for(var i = 0; i < cookie_length; i++){
	if(cookieArray[i].split("=")[0] == " employee_href" || cookieArray[i].split("=")[0] == "employee_href"){
		EmployeeProfileLink = cookieArray[i].split("=")[1];
	}
}

var Kudos = React.createClass({
	
	handleClick() {
		document.cookie = "feedback_id=" + this.props.kudos.feedbackId + "; path=/";
		window.location = "http://localhost:8080/kudos";
	},
	
	render: function() {
		var timestamp = this.props.kudos.feedbackId.toString().substring(0,8);
		var date = new Date( parseInt( timestamp, 16 ) * 1000 );
		return (
				<tr data-kudosId={this.props.kudos.feedbackId} onClick={this.handleClick}>
				
				<td>{this.props.kudos.peerName}</td>
				<td>{this.props.kudos.eName}</td>
				<td>{this.props.kudos.eManagerName}</td>
				<td>{date.toString()}</td>
				
				</tr>);
	}
});

function gotoHomepage(){
	window.location = "http://localhost:8080/";
}

var SendKudos = React.createClass({
	
	sendKudosToServer() {
		var self = this;
		var kudosData = {};
		kudosData["peerName"] = document.getElementById("eName").innerHTML;
		kudosData["eName"] = document.getElementById("selectizeKudosPeerName").value;
		kudosData["eManagerName"] = document.getElementById("eManagerName").innerHTML;
		kudosData["peerFeedback"] = document.getElementById("kudosMessage").value;
		kudosData["kudosFlag"] = "true"; //boolean?
		if(kudosData["eName"] == ""){
			toastr.warning("Select a peer to send kudos");
		} else if(kudosData["peerFeedback"] == ""){
			toastr.warning("Write a kudos message");
		} else {
			$.ajax({
				type: "POST",
				url: EmployeeProfileLink + "/sendkudos",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(kudosData),
				success: function(result) {
					toastr.success("Kudos sent.");
					setTimeout(function() { gotoHomepage(); }, 500);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					toastr.danger("Kudos sending failed!");
				}
				}).then(function () {
					
			});
		}
	},
	
	render: function() {
		return (
			<form className="form-horizontal">
				<br/>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="searchPeerName">To :</label>

					<div className="col-sm-10">
						<input type="text" id="selectizeKudosPeerName" placeholder="Peer Name"/>
					</div>
					
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="kudosMessage">Kudos Message : <span className="label label-default">* Limited to 160 chars</span></label>
					<div className="col-sm-10">
						<textarea type="text" maxLength="160" className="form-control" id="kudosMessage" placeholder="Type your message here"/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2"></label>
					<div className="col-sm-10">
						<button type="button" className="btn btn-info" id="sendKudos" onClick={this.sendKudosToServer}>Send</button>
					</div>
				</div>
			</form>
		);
	}
});

ReactDOM.render(<SendKudos />, document.getElementById("ReactSendKudos"));


$('#selectizeKudosPeerName').selectize({
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



var SentKudos = React.createClass({

	loadSentKudosFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/sentkudos"
		}).then(function (data) {
			self.setState({sentKudos: data});
			//toastr.success("Sent Kudos loaded");
		});
	},
	
	getInitialState: function () {
		return {sentKudos: []};
	},
	
	componentDidMount: function () {
		this.loadSentKudosFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.sentKudos.forEach(function(kudos) {
			rows.push(<Kudos kudos={kudos} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Sent Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});
		
ReactDOM.render(<SentKudos />, document.getElementById("ReactSentKudos"));

var ReceivedKudos = React.createClass({

	loadReceivedKudosFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/receivedkudos"
		}).then(function (data) {
			self.setState({receivedKudos: data});
			//toastr.success("Received Kudos loaded");
		});
	},
	
	getInitialState: function () {
		return {receivedKudos: []};
	},
	
	componentDidMount: function () {
		this.loadReceivedKudosFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.receivedKudos.forEach(function(kudos) {
			rows.push(<Kudos kudos={kudos} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Receive Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});
		
ReactDOM.render(<ReceivedKudos />, document.getElementById("ReactReceivedKudos"));

var ConsolidatedKudosReceived = React.createClass({

	loadConsolidatedKudosReceivedFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/consolidatedkudos/received"
		}).then(function (data) {
			self.setState({consolidatedKudosReceived: data});
			//toastr.success("Consolidated Kudos Received loaded");
		});
	},
	
	getInitialState: function () {
		return {consolidatedKudosReceived: []};
	},
	
	componentDidMount: function () {
		this.loadConsolidatedKudosReceivedFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.consolidatedKudosReceived.forEach(function(kudos) {
			rows.push(<Kudos kudos={kudos} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Received Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});
		
ReactDOM.render(<ConsolidatedKudosReceived />, document.getElementById("ReactConsolidatedKudosReceived"));

var ConsolidatedKudosSent = React.createClass({

	loadConsolidatedKudosSentFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink + "/consolidatedkudos/sent"
		}).then(function (data) {
			self.setState({consolidatedKudosSent: data});
			toastr.success("Consolidated Kudos Sent loaded");
		});
	},
	
	getInitialState: function () {
		return {consolidatedKudosSent: []};
	},
	
	componentDidMount: function () {
		this.loadConsolidatedKudosSentFromServer();
	},
	
	render: function(){
		var rows = [];
		this.state.consolidatedKudosSent.forEach(function(kudos) {
			rows.push(<Kudos kudos={kudos} />);
		});
		return (<div>
					<table className="table table-striped table-hover table-bordered">
					<thead>
					<tr>
					<th>Peer Name</th><th>Employee Name</th><th>Manager Name</th><th>Sent Time</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
					</table>
				</div>);
	}
});
		
ReactDOM.render(<ConsolidatedKudosSent />, document.getElementById("ReactConsolidatedKudosSent"));

