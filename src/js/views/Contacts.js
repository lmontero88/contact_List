import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false
	});

	const [contacts, setContacts] = useState([]);

	const getList = async tareas => {
		try {
			const response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/LML_Agenda");
			const data = await response.json();
			setContacts(data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteOnclick = id => {
		fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(null)
		})
			.then(response => {
				return response.json();
			})
			.then(data =>
				// this is the data we get after doing the delete request, do whatever you want with this data
				console.log(data)
			);
	};

	useEffect(() => {
		getList();
	}, [handleDeleteOnclick]);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{contacts.map((contact, index) => {
							return (
								<ContactCard
									key={index}
									full_name={contact.full_name}
									adress={contact.address}
									phone={contact.phone}
									email={contact.email}
									id={contact.id}
									handleDeleteOnclick={handleDeleteOnclick}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
