import React, { useState, useEffect } from "react";
import Sortable  from "sortablejs";
import axios from "axios";

const EditProblemCategories = (props) => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/api/problems/get_categories")
			.then(res => {
				setCategories(res.data.categories);
			})
	}, []);

	useEffect(() => {
		var el = document.getElementById("categories");
		var sortable = Sortable.create(el);
	}, [categories]);

	return (
		<div class="container">
			<p>hello world</p>
			<ul id="categories" class="list-group">
				{categories.map(item => {
					return (
						<li class="list-group-item">{item}</li>
					)
				})}
			</ul>
		</div>
	);
};

export default EditProblemCategories;