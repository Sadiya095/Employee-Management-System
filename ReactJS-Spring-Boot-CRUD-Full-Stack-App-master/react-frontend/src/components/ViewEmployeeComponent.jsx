import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
    }

    formatSalary(salary) {
        if (salary === undefined || salary === null || salary === '') return '';
        const num = Number(salary);
        if (isNaN(num)) return salary;
        return num.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    }

    render() {
        const employee = this.state.employee;
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Employee First Name: </label>
                            <div> {employee.firstName}</div>
                        </div>
                        <div className="row">
                            <label> Employee Last Name: </label>
                            <div> {employee.lastName}</div>
                        </div>
                        <div className="row">
                            <label> Employee Email ID: </label>
                            <div> {employee.emailId}</div>
                        </div>
                        <div className="row">
                            <label> Phone Number: </label>
                            <div> {employee.phoneNumber}</div>
                        </div>
                        <div className="row">
                            <label> Department: </label>
                            <div> {employee.department}</div>
                        </div>
                        <div className="row">
                            <label> Designation: </label>
                            <div> {employee.designation}</div>
                        </div>
                        <div className="row">
                            <label> Date of Joining: </label>
                            <div> {employee.dateOfJoining}</div>
                        </div>
                        <div className="row">
                            <label> Salary: </label>
                            <div> {this.formatSalary(employee.salary)}</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
