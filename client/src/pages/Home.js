import React, {useState} from 'react';
import {Card, CardDeck} from 'react-bootstrap';
import {ChevronRightIcon} from "@primer/octicons-react";

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';

//images
import cods_banner from "../resources/cods_banner.png";
import erlenmeyer from "../resources/erlenmeyer.png";
import roundbottom from "../resources/roundbottom.png";
import docs from "../resources/docs.png";

const Home = () => {

	const MostFrequentlyUsed = () => {
		return (
			<>
				<h2 class="text-left text-weight-bold">Most Frequently Used</h2>
				<br/>
				<Card border="light">
					<div class="row no-gutters">
						<div class="col align-self-center px-2 py-2" style={{maxwidth: "205px"}}>
							<img src={erlenmeyer} class="card-img"/>
						</div>
						<div class="col-10">
							<div class="card-body text-left">
								<h3 class="card-title">Introductory Guide</h3>
								<p class="card-text">Just getting into competitive Chemistry? Read this guide to have a proper start and avoiding common traps!</p>
							</div>
						</div>
						<a href="/problems" class="stretched-link"/>
					</div>
				</Card>
				<br/>
				<Card border="light">
					<div class="row no-gutters">
						<div class="col align-self-center px-2 py-2" style={{maxwidth: "205px"}}>
							<img src={roundbottom} class="card-img"/>
						</div>
						<div class="col-10">
							<div class="card-body text-left">
								<h3 class="card-title">Intermediate Guide</h3>
								<p class="card-text">Have no idea what IChO Prep problems you should tyr out? Read llamachemist's (2020 USA Team, IChO Gold) guide!</p>
							</div>
						</div>
						<a href="/problems" class="stretched-link"/>
					</div>
				</Card>
				<br/>
				<Card border="light">
					<div class="row no-gutters">
						<div class="col align-self-center px-2 py-2" style={{maxwidth: "205px"}}>
							<img src={docs} class="card-img"/>
						</div>
						<div class="col-10">
							<div class="card-body text-left">
								<h3 class="card-title">CODSNotes</h3>
								<p class="card-text">Do you need notes to supplement your fundemental knowledge of chemistry? Click here to access our library of notes!</p>
							</div>
						</div>
						<a href="/problems" class="stretched-link"/>
					</div>
				</Card>
			</>
		)
	}

	return (
		<div className="App">
			
			<NavBar page="Home"/>

			{/*<PageContents page="home"/>*/}

			<div container-fluid>
				<img src={cods_banner}/>
			</div>
			
			<div class="d-none d-md-inline container-fluid py-5">
				<div class="row mx-5 px-5">
					<div class="col-8 mx-2 px-3 py-3 bg-light">
						{MostFrequentlyUsed()}
					</div>
					<div class="col mx-2 px-2 border border-primary bg-light pt-2">
						<p>asdf</p>
					</div>
				</div>
			</div>

			<div class="d-block d-sm-none container-fluid py-5">
				<div class="mx-2 px-2 my-4 bg-light pt-2">
					{MostFrequentlyUsed()}
				</div>
				<div class="mx-2 px-2 my-4 border border-primary bg-light pt-2">
					<p>asdf</p>
				</div>
			</div>

			<div class="container-fluid bg-light my-5 py-5 px-md-5">
				<h2 class="font-weight-bold">CODS is a global community made for Chemistry Olympiad participants.</h2>
				<h3 class="font-weight-light">Haven't joined the community yet? You can join <a class="text-link">here</a>.</h3>

				<p class="my-5"/>

				<div class="mx-2 px-2 mx-md-5 px-md-5">
					<h3 class="text-left font-weight-bold my-4">Our Mission is to make Competitive Chemistry more...</h3>
					<div class="row">
						<div class="col-md text-left">
							<h3>Accessible</h3>
							<p>to a wider audience. We run four annual competitions for anyone around the world to compete in, and provide guides for anyone to get started.</p>
						</div>
						<div class="col-md text-left">
							<h3>Fair</h3>
							<p>for everyone by providing guides for all levels of participants. We also provide high quality custom study resources to assist your journey.</p>
						</div>
						<div class="col-md text-left">
							<h3>Competitive</h3>
							<p>by leveling out the playing field of competitive chemistry, we hope to increase the standards of Chemistry Olympiads.</p>
						</div>
					</div>
				</div>
			</div>

			

			<div class="container-fluid px-md-5">
				<div class="mx-2 px-2 mx-md-5 px-md-5">
					<h3 class="text-left font-weight-bold my-4">What is CODSite for?</h3>
					<p class="text-left">
						CODSite is an all-purpose website made for our community (competitive Chemistry enthusiasts). 
						Everything on CODSite is free to use for anybody, no sign-ups or membership required. 
						We provide custom <b>open educational resources</b> such as lectures, detailed notes, 
						useful websites, problem sets, guides, tools, and all of our past competition papers. 
						Anything a chemistry freak could dream of lies within this website.
					</p>
					<br class="my-5"/>
					<h3 class="font-weight-bold my-4">Open Educational Resources at CODS</h3>
					<p class="my-5"/>
					<CardDeck>
						<Card key="Lectures">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">Lectures</Card.Title>
							<Card.Body>
								<p>We provide lectures for everyone, from introductory lectures to problem solving and advanced topic lectures. You can watch our lectures on our YouTube channel.</p>
								<a href="https://google.com" class="stretched-link"/>
							</Card.Body>
						</Card>
						<Card key="CODSNotes">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">CODSNotes</Card.Title>
							<Card.Body>
								<p>Made specially for the CODS community, these notes cover the fundamentals required for competitive Chemistry, from Atomic structures to Organic Chemistry.</p>
								<a href="/notes" class="stretched-link"/>
							</Card.Body>
						</Card>
						<Card key="Guides">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">Guides</Card.Title>
							<Card.Body>
								<p>Our staff is dedicated to writing guides for all levels. From introductory guides to those for the IChO level, there is a guide for anyone written by the best in the competitive chemistry scene.</p>
								<a href="/guides" class="stretched-link"/>
							</Card.Body>
						</Card>
					</CardDeck>
					<br class="my-2"/>
					<CardDeck>
						<Card key="Past Papers">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">Past Papers</Card.Title>
							<Card.Body>
								<p>All of our past competition papers are released to the public and can be accessed immediately. Click here to access our list of past exams.</p>
								<a href="/resources" class="stretched-link"/>
							</Card.Body>
						</Card>
						<Card key="Competitions">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">Competitions</Card.Title>
							<Card.Body>
								<p>We also translate and compile high-quality questions from chemistry competitions all around the world. Click here to see our library of problem sets.</p>
								<p class="my-0">Q1: STC (CODSCT)</p>
								<p class="my-0">Q2: SChO (CODSChO)</p>
								<p class="my-0">Q3: ACOT</p>
								<p class="my-0">Q4: WCC</p>
								<a href="/resources" class="stretched-link"/>
							</Card.Body>
						</Card>
						<Card key="Problem Sets">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">Problem Sets</Card.Title>
							<Card.Body>
								<p class="card-text">We also translate and compile high-quality questions from chemistry competitions all around the world. Click here to see our library of problem sets.</p>
								<a href="/problems" class="stretched-link"/>
							</Card.Body>
						</Card>
					</CardDeck>

					<p class="my-5 py-2"/>

					<h3 class="font-weight-bold">What are you waiting for?</h3>
					<br/>
					<a href="https://google.com">
						<button type="button" class="btn btn-lg btn-primary">
							<ChevronRightIcon size={24}/>
							Join the Community!
						</button>
					</a>
				</div>
			</div>

			<Footer/>
		</div>
	)
}

export default Home;
