package net.javaguides.springboot.model;

import java.time.LocalDate;
import java.math.BigDecimal;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank(message = "First name is required")
	@Size(max = 50, message = "First name must be at most 50 characters")
	@Column(name = "first_name")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(max = 50, message = "Last name must be at most 50 characters")
	@Column(name = "last_name")
	private String lastName;

	@NotBlank(message = "Email is required")
	@Email(message = "Email must be a valid email address")
	@Column(name = "email_id", unique = true)
	private String emailId;

	@NotBlank(message = "Department is required")
	@Size(max = 50, message = "Department must be at most 50 characters")
	@Column(name = "department")
	private String department;

	@NotBlank(message = "Designation is required")
	@Size(max = 50, message = "Designation must be at most 50 characters")
	@Column(name = "designation")
	private String designation;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[0-9+\\-\\s()]{7,15}$", message = "Phone number must be a valid phone number")
	@Column(name = "phone_number")
	private String phoneNumber;

	@NotNull(message = "Date of joining is required")
	@PastOrPresent(message = "Date of joining cannot be in the future")
	@Column(name = "date_of_joining")
	private LocalDate dateOfJoining;

	@NotNull(message = "Salary is required")
	@DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than 0")
	@Digits(integer = 10, fraction = 2, message = "Salary must be a valid amount with up to 2 decimal places")
	@Column(name = "salary")
	private BigDecimal salary;

	public Employee() {

	}

	public Employee(String firstName, String lastName, String emailId, String department, String designation,
			String phoneNumber, LocalDate dateOfJoining, BigDecimal salary) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.department = department;
		this.designation = designation;
		this.phoneNumber = phoneNumber;
		this.dateOfJoining = dateOfJoining;
		this.salary = salary;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public LocalDate getDateOfJoining() {
		return dateOfJoining;
	}
	public void setDateOfJoining(LocalDate dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}
	public BigDecimal getSalary() {
		return salary;
	}
	public void setSalary(BigDecimal salary) {
		this.salary = salary;
	}
}
