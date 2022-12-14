import Layout from "../components/layout"

export default function StudentResources() {
  return (
    <Layout title="Student Resources">

		<div className="page-header">
		  <h2>Student Resources</h2>
		</div>
	
		<h2 id="software-resources">Software Resources</h2>
		<h3 id="vs-code-setup">VS Code Setup</h3>
		<p>VS Code is the recommended editor for software development.  It acts as a program to check out the code, make edits, and build the project in one place.
		You can find instructions for installation on Windows here:</p>
		<ul>
		  <li><a href="https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html">VS Code and WPILib Install Instructions</a></li>
		  <li><a href="https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/frc-game-tools.html">FRC Tools for VS Code Download</a></li>
		</ul>
		
		<h3 id="3407-team-githubs">3407 Team Githubs</h3>
		<ul>
		  <li><a href="https://github.com/FRC3407">3407 Public Github</a></li>
		  <li><a href="https://github.com/FRC3407/FRC3407.github.io">3407 Team Website Github</a></li>
		</ul>
		
		<h3 id="java-resources">Java Resources</h3>
		<p>Currently, Java is the main coding language used, though Labview and C++ have been suggested.
		See links below for learning Java in your spare time:</p>
		
		<ul>
		  <li><a href="https://www.youtube.com/playlist?list=PL59LTecnGM1NRUyune3SxzZlYpZezK-oQ">Basics</a></li>
		  <li><a href="https://www.youtube.com/watch?v=RRubcjpTkks">Condensed</a></li>
		  <li><a href="https://www.hackerrank.com/domains/java">HackerRank Java courses</a></li>
		  <li><a href="https://www.w3schools.com/java/">W3 Schools courses</a></li>
		</ul>
		
		<h2 id="cadmechanical-resources">CAD/Mechanical Resources</h2>
		
		<h2 id="other-resources">Other Resources</h2>
		<ul>
		  <li><a href="https://www.andymark.com/pages/first-robotics-competition">AndyMark FIRST resources</a></li>
		  <li><a href="https://www.chiefdelphi.com/">ChiefDelphi</a>
			<ul>
			  <li>Great resource for general questions, inspiration for build, pit area layout, drivers station, etc</li>
			</ul>
		  </li>
		</ul>
		
		<hr/>
		<p><em>This page is a work in progress, stay tune for updates.</em></p>
    </Layout>
  )
}
