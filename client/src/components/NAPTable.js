import React, {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown/with-html";
import axios from "axios";
import jwt from "jsonwebtoken";

const ListFAQs = (props) => {
	const [NAP, setNAP] = useState([]);
	const [numCols, setNumCols] = useState([]);
	const [maxRows, setMaxRows] = useState(0);
	const [maxCols, setMaxCols] = useState(0);

	useEffect(() => {
		axios.get(`http://localhost:3001/api/nap/get_nap`) 
			.then(res => {setNAP(res.data)});
	}, []);

	//builds the table
	useEffect(() => {
		//find the number of rows
		let rows = 0;
		NAP.forEach(item => {
			if (item.x > rows) {
				rows = item.x;
			}
		});
		//add 1 for code easiness
		rows++;
		
		//create empty array for cols
		//https://stackoverflow.com/questions/18947892/creating-range-in-javascript-strange-syntax
		let colArr = Array.apply(null, { length: rows }).map(function () {return 0});
		//set the number of columns in each row
		NAP.forEach(item => {
			if (colArr[item.x] < item.y) {
				colArr[item.x] = item.y;
			}
		});

		//find the biggest number of columns
		let cols = 0;
		colArr.forEach(item => {
			if( cols < item) {
				cols = item;
			}
		});

		//set all the vars
		setNumCols(colArr);
		setMaxRows(rows);
		setMaxCols(cols);
	}, [NAP]);
	
	return (
		<div class="flex mx-4">
			<table class="table table-bordered">
				{
					//https://stackoverflow.com/questions/18947892/creating-range-in-javascript-strange-syntax
					Array.apply(null, { length: maxRows }).map(Number.call, Number).map(row => {
						return (
							<tr>
								{
									Array.apply(null, { length: numCols[row] }).map(Number.call, Number).map(col => {
										return (
											NAP.filter(item => item.x == row && item.y == col + 1).map(item => {
												let colSize = 1;
												if (numCols[row] < maxCols) {
													colSize += maxCols - numCols[row];
												}
												return(
													<td colSpan={colSize}>
														{item.hasHeader ? <p class="font-weight-bold">{item.header}</p> : <></>}
														{item.hasDescription ? <p>{item.description}</p> : <></>}
														<a class="text-link" href={item.link}>{item.linkText}</a>
													</td>
												)
											})
										)
									})
								}
							</tr>
						)
					})
				}
			</table>
		</div>
	)
}

export default ListFAQs;