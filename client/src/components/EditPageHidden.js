import React, { useState, useEffect } from 'react';
import axios from "axios";
import {CircleIcon, CheckCircleFillIcon} from "@primer/octicons-react";

const EditPageHidden = (props) => {
	const [hidden, setHidden] = useState(true);
	const [icon, setIcon] = useState();
	const [text, setText] = useState("");

	const handleSubmit = () => {
		axios.get(`/api/admin/toggle_page/${props.page}`)
			.then((res) => {
				window.location.reload(true);
			});
	}

	useEffect(() => {
		axios.get(`/api/user/get_page/${props.page}`) 
			.then(res => {
				setHidden(res.data.hidden);
			});
	}, []);

	useEffect(() => {
		console.log(hidden);
		hidden ? setIcon(<CheckCircleFillIcon/>) : setIcon(<CircleIcon/>);
		hidden ? setText("") : setText("Not ");
	}, [hidden])

	return (
		<button class="row btn px-1 py-1 mx-1" checked={hidden} onClick={(event) => handleSubmit()}>
			{icon}
			<a class="mx-1 align-middle">Hidden</a>
		</button>
	);
}

export default EditPageHidden;