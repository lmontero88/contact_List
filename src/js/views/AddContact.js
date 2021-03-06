import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const [agregarContacto, setAgregarContacto] = useState({
		full_name: " ",
		email: " ",
		agenda_slug: "LML_Agenda",
		address: " ",
		phone: " "
	});

	const { full_name, email, agenda_slug, address, phone } = agregarContacto;

	const handleInputChange = ({ target }) => {
		setAgregarContacto({
			...agregarContacto,
			[target.name]: target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(agregarContacto)
		};
		const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", params);
		const data = await response.json();
		setAgregarContacto({
			full_name: " ",
			email: " ",
			agenda_slug: "LML_Agenda",
			address: " ",
			phone: " "
		});
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							value={agregarContacto.full_name}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							value={agregarContacto.email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							value={agregarContacto.phone}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							value={agregarContacto.address}
							onChange={handleInputChange}
						/>
					</div>
					<button type="button" className="btn btn-primary form-control" onClick={handleSubmit}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
