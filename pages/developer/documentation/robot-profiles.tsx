import CodeBlock from "@components/codeBlock";
import Layout from "@components/layout";

export default function RobotProfiles() {
  return (
    <Layout title="Robot Profiles Format">
      <h1>Robot Profiles</h1>
      <p>
        The Robot Profiles are dynamically managed Markdown files that are meant
        to give information and list design specs and details for sponsors and
        other teams to view
      </p>
      <h4>How to create a robot profile:</h4>
      <ul>
        <li>
          Create a new MD file in the <code>public/static/md/robots</code>{" "}
          folder.
          <br />
          Name Format: SeasonYear_robot-name or ID or season-name
          <br />
          Example: 2023_charged-up.md
        </li>
        <li>
          Add the Meta Data:
          <br />
          <code>
            robot-id: (This will be the url for the robot)
            <br />
            title: (This will be the page title)
            <br />
            icon: (This will be the image used when referring to the page)
          </code>
        </li>
        <li>
          Add the page content
          <br />
          Pictures, stats, team members, etc...
        </li>
        <li>The page will be automatically rendered during the next build</li>
      </ul>
      <h4>Example of a page</h4>
      <CodeBlock lang="md">
        {`
                    ---
                    robot-id: 2023_charged-up
                    title: 2023 Charged Up Robot
                    icon: /static/images/assets/johnl.jpg
                    ---
                    
                    Our Robot!
                    
                    <img src="/static/images/assets/2023_charged-up-robot-img.jpg" height=400px width=200px>
                    
                `}
      </CodeBlock>
    </Layout>
  );
}
