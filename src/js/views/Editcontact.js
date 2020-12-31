import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const Editcontact = ({ match }) => {
	const id = match.params.id.split(":")[1];
	const [contactoModificado, setContactoModificado] = useState({
		full_name: " ",
		email: " ",
		agenda_slug: "LML_Agenda",
		address: " ",
		phone: " "
	});

	const { full_name, email, agenda_slug, address, phone } = contactoModificado;

	//GET para traer la info del contacto por ID
	const getContactoID = async tareas => {
		try {
			const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`);
			const data = await response.json();
			setContactoModificado(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getContactoID();
	}, []);

	//realizar PUT para editar contacto

	const handleInputChange = ({ target }) => {
		setContactoModificado({
			...contactoModificado,
			[target.name]: target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const params = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(contactoModificado)
		};
		const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, params);
		const data = await response.json();
		setContactoModificado({
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
				<h1 className="text-center mt-5">Editar Contacto</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							value={contactoModificado.full_name}
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
							value={contactoModificado.email}
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
							value={contactoModificado.phone}
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
							value={contactoModificado.address}
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

Editcontact.propTypes = {
	match: PropTypes.object
};
