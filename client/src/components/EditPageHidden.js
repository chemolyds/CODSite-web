import React, { useState, useEffect } from 'react';
import axios from "axios";
//import {Button, Modal, Form} from 'react-bootstrap';
//import {PencilIcon} from "@primer/octicons-react";

const EditPageHidden = (props) => {
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		setHidden(props.page.hidden);
	}, []);

	return (
		<>
		<p>Hidden</p>
		</>
	);
}

export default EditPageHidden;