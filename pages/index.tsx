import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout title="Home">
      <h1>New Robotics Website!</h1>
      <div className="container-narrow">
        <div className="content">
          <div className="row-fluid">
            <div className="span12">
              <div className="page-header home-header">
                <h2>Mounds View Robotics</h2>
                <h3>FRC TEAM 3407</h3>
              </div>

              <h3 className="center">Who are the WildCards?</h3>
              <p>
                The WildCards are the Robotics team from Mounds View High School
                in Arden Hills, MN. Founded in 2009, we have competed annually
                in FIRST (For Inspiration and Recognition of Science and
                Technology) Robotics competition as team 3407. Each year we are
                presented a task in January and are given six weeks to design
                and build a robot from the ground up. We then bring our robot to
                the Williams Arena at the University of Minnesota to compete
                against teams from throughout the state in the 10,000 Lakes
                Regional Competition.
              </p>
              <p>
                We focus on providing students with hands-on experience in
                science and technology, but our team consists of more than that.
                While our primary objective is to build a robot each year, we
                strive to have groups that focus on the behind-the-scenes
                structure of our team, including finding sponsors to support us
                and recruiting new members. These groups have members with
                interests in marketing, sales, researching, graphic design, and
                so much more, and do everything from managing our finances to
                designing our T-shirts.
              </p>

              <h3>Announcements</h3>
              <p>Well done at the 2021 10,000 Lakes Competition!</p>
              <p>
                The next competition will be{" "}
                <a href="https://firebears.org/2022-minnesota-robotics-invitational/">
                  Minnesota Robotics Invitational
                </a>{" "}
                on October 15th, 2022 at Roseville High School.
              </p>
              <p>
                <br />
                Come back soon to see the new and improved website!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
