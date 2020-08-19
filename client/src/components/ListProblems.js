import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import {StarIcon, StarFillIcon, TriangleDownIcon} from "@primer/octicons-react";

//Components
import CreateProblem from "./CreateProblem";
import EditProblem from "./EditProblem";
import DeleteProblem from "./DeleteProblem";
import EditProblemCategories from "./EditProblemCategoriesReact";

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
			return <CreateProblem categories={categories}/>
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
					<EditProblem problem={item} ID={item._id} categories={categories}/>
					<DeleteProblem problem={item} ID={item._id} categories={categories}/>
				</div>
			)
		}
	}
}

const balancer = () => {
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
					<button class="row btn px-0 py-0 mx-0 my-0" ><TriangleDownIcon/></button>
					<button class="row btn px-0 py-0 mx-0 my-0" ><TriangleDownIcon/></button>
				</div>
			)
		}
	}
}

const ListProblems = (props) => {
	const [Problems, setProblems] = useState([]);
	const [Categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:3001/api/problems/get_problem`)
			.then(res => {
				//get problems
				setProblems(res.data);
			});
		axios.get(`http://localhost:3001/api/problems/get_categories`)
			.then(res => {
				//get categories
				setCategories(res.data.categories);
			});
	}, []);

	const ProblemList = Categories.map(category => {
		return(
			<div class="flex mx-5">
				<h1>{category}</h1>
				<hr/>
				<div key={category}>
					<div class="row" key="header">
						<div class="col-2" key="Problem">Problem</div>
						<div class="col" key="Rating">Rating</div>
						<div class="col" key="Difficulty">Difficulty</div>
						<div class="col" key="Length">Length</div>
						<div class="col-6" key="Description">Description</div>
						{balancer()}
					</div>
					{Problems.filter(item => item.category === category).map(item => {
						return(
							<div class="row" key={item.name}>
								<div class="col-2" key="Problem">
									<a href={item.problemPDFName}>{item.name}</a>
									{item.hasSolution ? (<a> <a href={item.solutionPDFName}>[S]</a></a>) : <a/>}
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

			<EditProblemCategories/>

			{ProblemList}
		</div>
	)
}

export default ListProblems;