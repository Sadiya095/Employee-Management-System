import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            searchTerm: ''
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.changeSearchTermHandler = this.changeSearchTermHandler.bind(this);
    }

    deleteEmployee(id, name) {
        if (!window.confirm(`Delete employee "${name}"? This cannot be undone.`)) {
            return;
        }
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    changeSearchTermHandler(event) {
        this.setState({ searchTerm: event.target.value });
    }

    getFilteredEmployees() {
        const term = this.state.searchTerm.trim().toLowerCase();
        if (!term) return this.state.employees;
        return this.state.employees.filter(employee => {
            return (
                (employee.firstName && employee.firstName.toLowerCase().includes(term)) ||
                (employee.lastName && employee.lastName.toLowerCase().includes(term)) ||
                (employee.emailId && employee.emailId.toLowerCase().includes(term)) ||
                (employee.department && employee.department.toLowerCase().includes(term)) ||
                (employee.designation && employee.designation.toLowerCase().includes(term))
            );
        });
    }

    formatSalary(salary) {
        if (salary === undefined || salary === null || salary === '') return '';
        const num = Number(salary);
        if (isNaN(num)) return salary;
        return num.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    }

    render() {
        const filteredEmployees = this.getFilteredEmployees();
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn btn-primary"onClick={this.addEmployee}> Add Employee</button>
                    <input
                        type="text"
                        placeholder="Search by name, email, department, designation..."
                        className="form-control"
                        style={{ maxWidth: '350px' }}
                        value={this.state.searchTerm}
                        onChange={this.changeSearchTermHandler}
                    />
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredEmployees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.firstName} </td>
                                            <td> {employee.lastName}</td>
                                            <td> {employee.emailId}</td>
                                            <td> {employee.department}</td>
                                            <td> {employee.designation}</td>
                                            <td> {this.formatSalary(employee.salary)}</td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id, `${employee.firstName} ${employee.lastName}`)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                            {
                                filteredEmployees.length === 0 &&
                                <tr>
                                    <td colSpan="7" className="text-center">No employees found.</td>
                                </tr>
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
