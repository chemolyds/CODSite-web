import React, {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown/with-html";
import axios from "axios";
import jwt from "jsonwebtoken";

const ListFAQs = (props) => {
	const [FAQs, setFAQs] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:3001/api/user/get_faq`) 
			.then(res => {setFAQs(res.data)});
	}, []);

	return (
		<div class="flex mx-4">
			<table class="table table-bordered">
				<tbody>
					<tr>
						<td>ONE<br/>TWO<br/>THREE</td>
						<td>ONE<br/>TWO<br/>THREE</td>
						<td>ONE<br/>TWO<br/>THREE</td>
					</tr>
					<tr>
						<td>ONE<br/>TWO<br/>THREE</td>
						<td>ONE<br/>TWO<br/>THREE</td>
						<td>ONE<br/>TWO<br/>THREE</td>
					</tr>
					<tr>
						<td>ONE<br/>TWO<br/>THREE</td>
						<td>ONE<br/>TWO<br/>THREE</td>
						<td>ONE<br/>TWO<br/>THREE</td>
					</tr>
					<td colspan="3">DONATIONS</td>
				</tbody>
			</table>
		</div>
	)
}

export default ListFAQs;