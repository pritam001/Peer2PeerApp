
var RequestId = "";
var RequestExists = true;
var EmployeeProfileLink = "";
var cookieArray = document.cookie.split(";");
var cookie_length = cookieArray.length;
for(var i = 0; i < cookie_length; i++){
	if(cookieArray[i].split("=")[0] == " request_id" || cookieArray[i].split("=")[0] == "request_id"){
		RequestId = cookieArray[i].split("=")[1];
		if(RequestId == "null"){
			RequestExists = false;
		}
	}
	if(cookieArray[i].split("=")[0] == " employee_href" || cookieArray[i].split("=")[0] == "employee_href"){
		EmployeeProfileLink = cookieArray[i].split("=")[1];
	}
}

function gotoHomepage(){
	window.location = "http://localhost:8080/";
}

var Request = React.createClass({
	loadRequestFromServer() {
		var self = this;
		$.ajax({
			url: "http://localhost:8080/api/requests/search/findByRequestId?id=" + RequestId,
			success: function(result) {
				toastr.success("Request loaded.");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				toastr.danger("Request not found!");
			}
			}).then(function (data) {
				self.setState({request: data});
		});
	},
	
	loadEmployeeProfileFromServer: function () {
		var self = this;
		$.ajax({
			url: EmployeeProfileLink
		}).then(function (data) {
			toastr.success("Employee profile loaded");
			self.setState({employeeProfile: data});
		});
	},
	
	GotoHomepage() {
		window.location = "http://localhost:8080/";
	},
	
	SubmitRequest() {
		var self = this;
		var requestData = {};
		requestData["eName"] = document.getElementById("eName").value.toString();
		requestData["eManagerName"] = document.getElementById("eManagerName").value.toString();
		requestData["peerList"] = document.getElementById("selectizerID").value.split(",");
		requestData["approvalStatus"] = "Pending";
		if(document.getElementById("selectizerID").value == ""){
			toastr.warning("Peer list is empty!");
		} else {
			$.ajax({
				type: "POST",
				url: EmployeeProfileLink + "/sendrequest",
				data: JSON.stringify(requestData),
				contentType: "application/json; charset=utf-8",
				success: function(result) {
					toastr.success("Request sent.");
					setTimeout(function() { gotoHomepage(); }, 1000);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					toastr.danger("Request sending failed!");
				}
				}).then(function () {
					
			});
		}
	},
	
	RequestApprove() {
		var self = this;
		$.ajax({
			type: "POST",
			url: EmployeeProfileLink + "/pendingapprovals/" + RequestId + "/approve",
			success: function(result) {
				toastr.success("Request approved.");
				setTimeout(function() { gotoHomepage(); }, 500);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				toastr.danger("Request approval failed!");
			}
			}).then(function () {
				
		});
	},
	
	RequestReject() {
		var self = this;
		$.ajax({
			type: "POST",
			url: EmployeeProfileLink + "/pendingapprovals/" + RequestId + "/reject",
			success: function(result) {
				toastr.success("Request rejected.");
				setTimeout(function() { gotoHomepage(); }, 500);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				toastr.danger("Request rejection failed!");
			}
			}).then(function () {
				
		});
	},
	
	ModifyPeerList() {
		var self = this;
		var modifiedPeerData = [];
		modifiedPeerData = document.getElementById("selectizerModifyPeerList").value.split(",");
		if(document.getElementById("selectizerModifyPeerList").value == ""){
			toastr.warning("Peer list is empty!");
		} else {
			$.ajax({
				type: "POST",
				url: EmployeeProfileLink + "/pendingapprovals/" + RequestId + "/modifypeer",
				data: JSON.stringify(modifiedPeerData),
				contentType: "application/json; charset=utf-8",
				success: function(result) {
					toastr.success("Peer list modified.");
					setTimeout(function() { gotoHomepage(); }, 500);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					toastr.danger("Peer list modification failed!");
				}
				}).then(function () {
					
			});
		}
	},
	
	getInitialState: function () {
		if (RequestExists) {
			return {request: []};
		}else{
			return {employeeProfile: []};
		}		
	},
	
	componentDidMount: function () {
		if (RequestExists) {
			this.loadRequestFromServer();
		}else{
			this.loadEmployeeProfileFromServer();
		}
	},
	
	render: function() {
		var panelClass = "panel panel-primary";
		if(RequestExists) {
			panelClass = "panel panel-info";
		} else {
			panelClass = "panel panel-danger";
		}

		return (
				<div className={panelClass}>
				
					<div className="panel-heading text-center">{RequestExists ? (<span>Feedback Details</span>) :(<span>Feedback Request Form</span>)}</div>
					<div className="panel-body">
						<form className="form-horizontal">
							
							{RequestExists ? (
								<div>
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="eName">Employee Name:</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="eName" placeholder={this.state.request.eName} disabled/>
										</div>
									</div>
									
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="eManagerName">Manager Name:</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="eManagerName" placeholder={this.state.request.eManagerName} disabled/>
										</div>
									</div>
									
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="approvalStatus">Approval Status:</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="approvalStatus" placeholder={this.state.request.approvalStatus} disabled/>
										</div>
									</div>
									
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="peerList">Peer List:</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="peerList" placeholder={this.state.request.peerList} disabled/>
										</div>
									</div>
									
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10">
											<div className="btn-group btn-group-justified">
												<div className="btn-group">
													<button type="button" className="btn btn-success" onClick={this.RequestApprove}>Approve</button>
												</div>
												<div className="btn-group">
													<button type="button" className="btn btn-danger" onClick={this.RequestReject}>Reject</button>
												</div>
												<div className="btn-group">
													<button type="button" className="btn btn-default" onClick={this.GotoHomepage}>Back</button>
												</div>
											</div>
										</div>
									</div>
									
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="selectizerModifyPeerList">Modify Peer List:</label>
										<div className="col-sm-10">
											<input type="text" id="selectizerModifyPeerList" placeholder="Enter new peer list"/>
										</div>
									</div>
									
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10">
											<div className="btn-group">
												<button type="button" className="btn btn-primary" onClick={this.ModifyPeerList}>Modify</button>
											</div>
										</div>
									</div>
								
								</div>
							) : (
								<div>
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="eName">Employee Name:</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="eName" value={this.state.employeeProfile.eName} disabled/>
										</div>
									</div>
								
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="eManagerName">Manager Name:</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="eManagerName" value={this.state.employeeProfile.eManagerName} disabled/>
										</div>
									</div>
									
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="peerList">Peer List :</label>
										<div className="col-sm-10">
											<input type="text" id="selectizerID"/>
										</div>
									</div>
									
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10">
											<div className="btn-group btn-group-justified">
												<div className="btn-group">
													<button type="button" className="btn btn-success" onClick={this.SubmitRequest}>Submit Request</button>
												</div>
												<div className="btn-group">
													<button type="button" className="btn btn-default" onClick={this.GotoHomepage}>Back</button>
												</div>
											</div>
										</div>
									</div>
									
								</div>
								
							)}
						
						
						</form>
					</div>
				</div>
		);
	}
});

ReactDOM.render(<Request />, document.getElementById("ReactRequest"));

$('#selectizerID').selectize({
	valueField: 'eName',
    labelField: 'eName',
    searchField: 'eName',
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


$('#selectizerModifyPeerList').selectize({
	valueField: 'eName',
    labelField: 'eName',
    searchField: 'eName',
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