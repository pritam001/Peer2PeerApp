var FeedbackId = "";
var EmployeeProfileLink = "";
var cookieArray = document.cookie.split(";");
var cookie_length = cookieArray.length;
for(var i = 0; i < cookie_length; i++){
	if(cookieArray[i].split("=")[0] == " feedback_id" || cookieArray[i].split("=")[0] == "feedback_id"){
		FeedbackId = cookieArray[i].split("=")[1];
	}
	if(cookieArray[i].split("=")[0] == " employee_href" || cookieArray[i].split("=")[0] == "employee_href"){
		EmployeeProfileLink = cookieArray[i].split("=")[1];
	}
}


var Feedback = React.createClass({
	
	loadFeedbackFromServer() {
		var self = this;
		$.ajax({
			url: "http://localhost:8080/api/feedbacks/search/findByFeedbackId?id=" + FeedbackId,
			success: function(result) {
				toastr.success("Feedback loaded.");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				toastr.danger("Feedback not found!");
			}
		}).then(function (data) {
			self.setState({feedback	: data});
		});
	},
	
	GotoHomepage() {
		window.location = "http://localhost:8080/";
	},
	
	SubmitFeedback() {
		if(document.getElementById("peerFeedback").value.toString() == ""){
			toastr.warning("Feedback is empty!","POST Failed");
		} else {
			$.ajax({
				type: "POST",
				url: EmployeeProfileLink + "/pendingfeedbacks/" + FeedbackId + "/submit",
				data: document.getElementById("peerFeedback").value,
				contentType: "application/json; charset=utf-8",
				success: function(result) {
					toastr.success("Feedback posted.");
				},
				error: function(xhr, ajaxOptions, thrownError) {
					toastr.danger("FAILED!");
				}
			}).then(function() {
				window.location = "http://localhost:8080/feedback";
			});
		}
	},
	
	getInitialState: function () {
		return {feedback: []};
	},
	
	componentDidMount: function () {
		this.loadFeedbackFromServer();
	},
	
	render: function() {
		var panelClass = "panel panel-primary";
		var isFeedbackGiven = true;
		if(this.state.feedback.peerFeedback == null) {
			panelClass = "panel panel-danger";
			isFeedbackGiven = false;
		} else {
			panelClass = "panel panel-info";
		}

		return (<div className={panelClass}>
			
			<div className="panel-heading text-center">Feedback</div>
			<div className="panel-body">
				<form className="form-horizontal">
					<div className="form-group">
						<label className="control-label col-sm-2" htmlFor="peerName">Peer Name:</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="peerName" placeholder={this.state.feedback.peerName} disabled/>
						</div>
					</div>
					
					<div className="form-group">
						<label className="control-label col-sm-2" htmlFor="eName">Employee Name:</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="eName" placeholder={this.state.feedback.eName} disabled/>
						</div>
					</div>
					
					<div className="form-group">
						<label className="control-label col-sm-2" htmlFor="eManagerName">Manager Name:</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="eManagerName" placeholder={this.state.feedback.eManagerName} disabled/>
						</div>
					</div>
					
					{isFeedbackGiven ? (
							<div>
								<div className="form-group">
								<label className="control-label col-sm-2" htmlFor="peerFeedback">Peer Feedback:</label>
								<div className="col-sm-10">
									<textarea type="text" className="form-control" id="peerFeedback" placeholder={this.state.feedback.peerFeedback} disabled/>
								</div>
							</div>
							
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
									<button type="button" className="btn btn-default" onClick={this.GotoHomepage}>Back</button>
								</div>
							</div>
							</div>
						) : (
							<div>
								<div className="form-group">
								<label className="control-label col-sm-2" htmlFor="peerFeedback">Peer Feedback:</label>
								<div className="col-sm-10">
									<textarea type="text" className="form-control" id="peerFeedback" placeholder="Enter your feedback here"/>
								</div>
							</div>
							
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
									<div className="btn-group btn-group-justified">
										<div className="btn-group">
											<button type="button" className="btn btn-primary" onClick={this.SubmitFeedback}>Submit Feedback</button>
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
			</div>);
	}
});

ReactDOM.render(<Feedback />, document.getElementById("ReactFeedback"));