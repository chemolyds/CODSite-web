import React, {useState} from 'react';
import {Card, CardDeck, Carousel} from 'react-bootstrap';
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

	const [index, setIndex] = useState(0);

	const handleSelect =(selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const MostFrequentlyUsed = () => {
		return (
			<>
				<h2 class="text-left" style={{"font-family": "Raleway-Bold"}}>Most Frequently Used</h2>
				<br/>
				<Card border="light">
					<div class="row no-gutters">
						<div class="col align-self-center px-2 py-2" style={{maxwidth: "205px"}}>
							<img src={erlenmeyer} class="card-img"/>
						</div>
						<div class="col-10">
							<div class="card-body text-left">
								<h3 class="card-title">Introductory Guide</h3>
								<p class="card-text">Want to get into Competitive Chemistry? Start here.</p>
							</div>
						</div>
						<a href="/guides/6022346ca4789c00179f9522" class="stretched-link"/>
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
								<h3 class="card-title">Advanced Guide</h3>
								<p class="card-text">Have no idea what IChO Prep problems you should try out? Start here.</p>
							</div>
						</div>
						<a href="/guides/60224e575ea64a0017a1245c" class="stretched-link"/>
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
						<a href="/notes" class="stretched-link"/>
					</div>
				</Card>
			</>
		)
	}

	const blueSection = () => {
		return (
			<>
				<div class="py-2 px-2">
					<h2 class="text-left" style={{"font-family": "Raleway-Bold"}}>Recommended by Staff</h2>
					<hr/>
					<Card border="border-e2">
						<div class="vidcontain">
							<embed type="video/webm" class="videobox" src="https://www.youtube.com/embed/videoseries?list=PLmcn3B80rhSq_jc58knX_XSE4oB08GyDB"/>
						</div>
					</Card>
				</div>
				<br/>
				<div class="py-2 px-2">
					<h2 class="text-left" style={{"font-family": "Raleway-Bold"}}>Recent News</h2>
					<hr/>
					{/*
					<Card border="white" class="text-left">
						<Card.Title class="h3 pt-2 text-left">WCC Results</Card.Title>
						<Card.Body class="text-left" style={{"padding-top": "0%"}}>
							<p>All of our testing materials for the Winter Chemistry Competition have been released. This includes detailed statistics, our thoughts, results, etc. Check it out now!</p>
						</Card.Body>
						<a href="/about/5ff5da9321914a0017536d59/5ff6083521914a0017536d5d" class="stretched-link"/>
					</Card>
					*/}
					<li class="text-left">
						<ui class="h5">
							SChO sign-ups are open! We are providing three levels of competition this year, from beginner to expert. Check it out <a href="https://chemistry.isodn.org/competitions/601979c50f948d0017a40995">here</a>.
						</ui>
					</li>
					<li class="text-left">
						<ui class="h5">
							We've recently revamped our introductory guides to make it appliciable for a wider audience. Check it out <a href="https://chemistry.isodn.org/guides/6022346ca4789c00179f9522">here</a>. In addition, CODSNotes Section 6 has been released.
						</ui>
					</li>
					<li class="text-left">
						<ui class="h5">
						Here is our 2021 USNCO Locals Detailed explanations for the most trickiest questions. Check it out <a href="https://tinyurl.com/usncolocals2021sol">here</a>. We will be releasing our national annotations soon.
						</ui>
					</li>
					<li class="text-left">
						<ui class="h5">
							Competitions and Guides for CODS will be changing significantly over the summer. Read more about our new competition structure <a href="https://tinyurl.com/CODSCompGuide">here</a>. If you'd like to contribute to our project, please contact fizzest#0001.
						</ui>
					</li>
				</div>
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
					<div class="col-8 ">
						<div class="mx-2 px-3 py-3 bg-f2">
							{MostFrequentlyUsed()}
						</div>
					</div>
					<div class="col mx-2 py-0 px-0">
						{blueSection()}
					</div>
				</div>
			</div>

			<div class="d-block d-sm-none container-fluid py-5">
				<div class="mx-2 px-2 my-4 bg-f2 pt-2">
					{MostFrequentlyUsed()}
				</div>
				<div class="mx-2 my-4 px-0 py-0">
				{blueSection()}
				</div>
			</div>

			<div class="container-fluid bg-e2 my-5 py-5 px-md-5">
				<h2 class="font-weight-bold">CODS is a global community made for Chemistry Olympiad participants.</h2>
				<h3 style={{"font-family": "Raleway"}}>Haven't joined the community yet? You can join <a href="https://tinyurl.com/codsinvite" class="text-link">here</a>.</h3>

				<p class="my-5 py-2"/>

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
					<h3 class="font-weight-bold my-4">Open Educational Resources at CODSite</h3>
					<p class="my-5"/>
					<CardDeck>
						<Card key="Lectures">
							<Card.Title class="h3 pt-3 mb-0 font-weight-bold">Lectures</Card.Title>
							<Card.Body>
								<p>We provide lectures for everyone, from introductory lectures to problem solving and advanced topic lectures. You can watch our lectures on our YouTube channel.</p>
								<a href="https://www.youtube.com/channel/UCyO5Wn2qKDRYWC-F5EfN2kA" class="stretched-link"/>
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
								<p>We provide four annual chemistry competitions for anyone to participate. For more information:</p>
								<p class="my-0">Q1: <a href="/competitions/6019788e0f948d0017a40993" class="text-link">SOCC</a></p>
								<p class="my-0">Q2: <a href="/competitions/601979c50f948d0017a40995" class="text-link">SChO (CODSChO)</a></p>
								<p class="my-0">Q3: <a href="/competitions/601979f80f948d0017a40996" class="text-link">ACOT</a></p>
								<p class="my-0">Q4: <a href="/competitions/60197a320f948d0017a40997" class="text-link">WCC</a></p>

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

					<p class="my-4 py-3"></p>

					<h3 class="text-left font-weight-bold my-4">What is CODServer for?</h3>
					<p class="text-left">
						CODServer is a global community on Discord to discuss with your friends, rant about exams, and have fun! We also hold <b>live lectures</b> and <b>competitions</b> on Discord.
					</p>
					<br class="my-5"/>
					<h1 class="font-weight-bold my-4">Features of CODServer</h1>
					<p class="my-3"/>

					<div class="row mx-2 px-2">
						<div class="col-md-3"/>
						<div class="col-md">
						<Carousel activeIndex={index} onSelect={handleSelect} style={{"margin-left": "auto", "margin-right": "auto"}}>
							<Carousel.Item>
								<img src="https://i.imgur.com/ISTvSZ9.png" class="d-block w-100"/>
								<div class="carousel-caption">
									<h5 class="font-weight-bold">Study Topics</h5>
									<p class="d-none d-md-block">with six study topics ranging from organic chemistry to analytical chemistry, you can discuss with our community members about all chemistry topics.</p>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<img src="https://i.imgur.com/oXkF2NT.png" class="d-block w-100"/>
								<div class="carousel-caption">
									<h5 class="font-weight-bold">Chemistry Help</h5>
									<p class="d-none d-md-block"> Have any questions about chemistry? Feel free to ask here! If you have a question about past tests, you can use Lavoisier to summon questions at command.</p>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<img src="https://i.imgur.com/mFj0bfz.png" class="d-block w-100"/>
								<div class="carousel-caption">
									<h5 class="font-weight-bold">Book Club</h5>
									<p class="d-none d-md-block">Have a chemistry book you’re reading? Join our book clubs and talk with other members of our community about your journey!</p>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<img src="https://i.imgur.com/oupjuzL.png" class="d-block w-100"/>
								<div class="carousel-caption">
									<h5 class="font-weight-bold">Bots</h5>
									<p class="d-none d-md-block">We have bots on the server to amplify your experience at CODS. If you’re feeling bored, you can have Lavoisier pick a random problem, or you could pick a playlist if you’re up for a challenge.</p>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<img src="https://i.imgur.com/XyDvWF7.png" class="d-block w-100"/>
								<div class="carousel-caption">
									<h5 class="font-weight-bold">Competitions</h5>
									<p class="d-none d-md-block">All of our competitions are held on Discord. You can learn more about them in our About section!</p>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<img src="https://i.imgur.com/74NEfGP.png" class="d-block w-100"/>
								<div class="carousel-caption">
									<h5 class="font-weight-bold">Fun</h5>
									<p class="d-none d-md-block">A community wouldn’t be a community without some fun. Here at CODS, we have a lot of interaction between the staff and the community and make the worse chemistry jokes and debate about tea vs. coffee every day.</p>
								</div>
							</Carousel.Item>
						</Carousel>
						</div>
						<div class="col-md-3"/>
					</div>

					<p class="my-5 py-2"/>

					<h3 class="font-weight-bold">What are you waiting for?</h3>
					<br/>
					<a href="https://tinyurl.com/codsinvite">
						<button type="button" class="btn btn-lg btn-primary">
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
