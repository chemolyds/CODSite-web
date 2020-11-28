import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import {StarIcon, StarFillIcon, TriangleDownIcon} from "@primer/octicons-react";

//Components
import CreateResource from "./CreateResource";
import EditResource from "./EditResource";
import DeleteResource from "./DeleteResource";
import EditResourceCategories from "./EditResourceCategories";
import DeleteCategory from './DeleteResourceCategory';
import EditResourceCategoryName from './EditResourceCategoryName';

function stars (num) {
	return (
		<>
			{ num >= 1 ? <StarFillIcon/> : <StarIcon/> }
			{ num >= 2 ? <StarFillIcon/> : <StarIcon/> }
			{ num >= 3 ? <StarFillIcon/> : <StarIcon/> }
			{ num >= 4 ? <StarFillIcon/> : <StarIcon/> }
			{ num >= 5 ? <StarFillIcon/> : <StarIcon/> }
		</>
	)
}

const addable = (categories) => {
	const token = localStorage.getItem("user_logged");
	let isAdmin;
	if (token) {
		jwt.verify(token, "jerdan1980", function (err, decoded) {
			if (decoded) {
				isAdmin = decoded.user_info.isAdmin;
			}
		});
		if (isAdmin) {
			return (
				<>
				<CreateResource categories={categories}/>
				<EditResourceCategories/>
				</>
			)
		}
	}
}

const editable = (item, categories) => {
	const token = localStorage.getItem("user_logged");
	let isAdmin;
	if (token) {
		jwt.verify(token, "jerdan1980", function (err, decoded) {
			if (decoded) {
				isAdmin = decoded.user_info.isAdmin;
			}
		});
		if (isAdmin) {
			return (
				<div>
					<EditResource resource={item} ID={item._id} categories={categories}/>
					<DeleteResource resource={item} ID={item._id} categories={categories}/>
				</div>
			)
		}
	}
}

const balancer = (category) => {
	const token = localStorage.getItem("user_logged");
	let isAdmin;
	if (token) {
		jwt.verify(token, "jerdan1980", function (err, decoded) {
			if (decoded) {
				isAdmin = decoded.user_info.isAdmin;
			}
		});
		if (isAdmin) {
			return (
				<div>
					<EditResourceCategoryName category={category}/>
					<DeleteCategory category={category}/>
				</div>
			)
		}
	}
}

const ListResources = (props) => {
	const [Resources, setResources] = useState([]);
	const [Categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get(`/api/resources/get_resource`)
			.then(res => {
				//get resources
				setResources(res.data);
			});
		axios.get(`/api/resources/get_categories`)
			.then(res => {
				//get categories
				setCategories(res.data.categories);
			});
	}, []);

	const ResourceList = Categories.map(category => {
		return(
			<div class="flex mx-5">
				<h1>{category}</h1>
				<hr/>
				<div key={category}>
					<div class="row" key="header">
						<div class="col-2" key="Resource">Resource</div>
						<div class="col" key="Rating">Rating</div>
						<div class="col" key="Difficulty">Difficulty</div>
						<div class="col" key="Length">Length</div>
						<div class="col-6" key="Description">Description</div>
						{balancer(category)}
					</div>
					{Resources.filter(item => item.category === category).map(item => {
						return(
							<div class="row" key={item.name}>
								<div class="col-2" key="Resource">
									<a href={item.resourceLink}>{item.name}</a>
								</div>
								<div class="col" key="Rating">{stars(item.rating)}</div>
								<div class="col" key="Difficulty">{stars(item.difficulty)}</div>
								<div class="col" key="Length">{stars(item.length)}</div>
								<div class="col-6 text-left" key="Description">{item.description}</div>
								{editable(item, Categories)}
							</div>
						)
					})}
					<br class="my-4"/>
				</div>
			</div>
		)
	})

	return (
		<div>
			{addable(Categories)}

			{ResourceList}
		</div>
	)
}

export default ListResources;