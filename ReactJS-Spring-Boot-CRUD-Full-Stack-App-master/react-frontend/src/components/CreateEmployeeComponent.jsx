import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            department: '',
            designation: '',
            phoneNumber: '',
            dateOfJoining: '',
            salary: '',

            errors: {},
            serverError: '',
            submitting: false
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeDateOfJoiningHandler = this.changeDateOfJoiningHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId,
                    department: employee.department || '',
                    designation: employee.designation || '',
                    phoneNumber: employee.phoneNumber || '',
                    dateOfJoining: employee.dateOfJoining || '',
                    salary: employee.salary != null ? employee.salary : ''
                });
            });
        }
    }

    validate() {
        const errors = {};
        const { firstName, lastName, emailId, department, designation, phoneNumber, dateOfJoining, salary } = this.state;

        if (!firstName.trim()) errors.firstName = 'First name is required';
        if (!lastName.trim()) errors.lastName = 'Last name is required';

        if (!emailId.trim()) errors.emailId = 'Email is required';
        else if (!EMAIL_REGEX.test(emailId)) errors.emailId = 'Enter a valid email address';

        if (!department.trim()) errors.department = 'Department is required';
        if (!designation.trim()) errors.designation = 'Designation is required';

        if (!phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
        else if (!PHONE_REGEX.test(phoneNumber)) errors.phoneNumber = 'Enter a valid phone number';

        if (!dateOfJoining) errors.dateOfJoining = 'Date of joining is required';
        else if (new Date(dateOfJoining) > new Date()) errors.dateOfJoining = 'Date of joining cannot be in the future';

        if (salary === '' || salary === null) errors.salary = 'Salary is required';
        else if (isNaN(salary) || Number(salary) <= 0) errors.salary = 'Salary must be a positive number';

        return errors;
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const errors = this.validate();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors, serverError: '' });
            return;
        }

        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            department: this.state.department,
            designation: this.state.designation,
            phoneNumber: this.state.phoneNumber,
            dateOfJoining: this.state.dateOfJoining,
            salary: this.state.salary
        };

        this.setState({ submitting: true, errors: {}, serverError: '' });

        const onSuccess = () => this.props.history.push('/employees');
        const onError = (err) => {
            const data = err.response && err.response.data;
            this.setState({
                submitting: false,
                errors: (data && data.fieldErrors) || {},
                serverError: (data && data.message) || 'Something went wrong. Please try again.'
            });
        };

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(onSuccess).catch(onError);
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(onSuccess).catch(onError);
        }
    }

    changeFirstNameHandler = (event) => this.setState({ firstName: event.target.value });
    changeLastNameHandler = (event) => this.setState({ lastName: event.target.value });
    changeEmailHandler = (event) => this.setState({ emailId: event.target.value });
    changeDepartmentHandler = (event) => this.setState({ department: event.target.value });
    changeDesignationHandler = (event) => this.setState({ designation: event.target.value });
    changePhoneNumberHandler = (event) => this.setState({ phoneNumber: event.target.value });
    changeDateOfJoiningHandler = (event) => this.setState({ dateOfJoining: event.target.value });
    changeSalaryHandler = (event) => this.setState({ salary: event.target.value });

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    renderError(field) {
        return this.state.errors[field] ? <div className="invalid-feedback d-block">{this.state.errors[field]}</div> : null;
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-8 offset-md-2">
                            {this.getTitle()}
                            <div className="card-body">
                                {this.state.serverError &&
                                    <div className="alert alert-danger" role="alert">{this.state.serverError}</div>
                                }
                                <form>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>First Name:</label>
                                            <input placeholder="First Name" name="firstName"
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                            {this.renderError('firstName')}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Last Name:</label>
                                            <input placeholder="Last Name" name="lastName"
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                            {this.renderError('lastName')}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>Email Id:</label>
                                            <input placeholder="Email Address" name="emailId"
                                                className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                                                value={this.state.emailId} onChange={this.changeEmailHandler} />
                                            {this.renderError('emailId')}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Phone Number:</label>
                                            <input placeholder="Phone Number" name="phoneNumber"
                                                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler} />
                                            {this.renderError('phoneNumber')}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>Department:</label>
                                            <input placeholder="e.g. Engineering" name="department"
                                                className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                                value={this.state.department} onChange={this.changeDepartmentHandler} />
                                            {this.renderError('department')}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Designation:</label>
                                            <input placeholder="e.g. Software Engineer" name="designation"
                                                className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                                value={this.state.designation} onChange={this.changeDesignationHandler} />
                                            {this.renderError('designation')}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>Date of Joining:</label>
                                            <input type="date" name="dateOfJoining"
                                                className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
                                                value={this.state.dateOfJoining} onChange={this.changeDateOfJoiningHandler} />
                                            {this.renderError('dateOfJoining')}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Salary:</label>
                                            <input type="number" step="0.01" min="0" placeholder="Salary" name="salary"
                                                className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                                value={this.state.salary} onChange={this.changeSalaryHandler} />
                                            {this.renderError('salary')}
                                        </div>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee} disabled={this.state.submitting}>
                                        {this.state.submitting ? 'Saving...' : 'Save'}
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
