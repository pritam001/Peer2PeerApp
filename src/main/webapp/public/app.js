
//toastr.options.progressBar = true;

var App = React.createClass({

	loadEmployeesFromServer: function () {
		var self = this;
		$.ajax({
			url: "http://localhost:8080/api/employees"
		}).then(function (data) {
			self.setState({employees: data._embedded.employees});
		});
	},

	getInitialState: function () {
		return {employees: []};
	},

	componentDidMount: function () {
		this.loadEmployeesFromServer();
	},

	render() {
		return ( <EmployeeTable employees={this.state.employees}/> );
	}
});

var Employee = React.createClass({
	getInitialState: function() {
		return {display: true };
	},
	handleDelete() {
		toastr.warning("Deleting");
		var self = this;
		$.ajax({
			url: self.props.employee._links.self.href,
			type: 'DELETE',
			success: function(result) {
				self.setState({display: false});
			},
			error: function(xhr, ajaxOptions, thrownError) {
				toastr.error(xhr.responseJSON.message);
			}
		});
	},
	render: function() {
		return (
				<tr>
				<td>{this.props.employee.eName}</td>
				<td>{this.props.employee.eType}</td>
				<td>{this.props.employee.eManagerName}</td>
				<td>{this.props.employee.eEmail}</td>
				<td>
				<button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
				</td>
				</tr>);
	}
});

var EmployeeTable = React.createClass({
	
	render: function() {
		var rows = [];
		this.props.employees.forEach(function(employee) {
			rows.push(<Employee employee={employee} />);
		});
		return (
				<div className="container">
				<table className="table table-striped">
				<thead>
				<tr>
				<th>Name</th><th>Type</th><th>Manager</th><th>Email</th><th>Delete</th>
				</tr>
				</thead>
				<tbody>{rows}</tbody>
				</table>
				</div>);
	}
});


ReactDOM.render(<App />, document.getElementById('root') );

