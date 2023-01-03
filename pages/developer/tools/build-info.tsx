import Layout from "@components/layout";
import { IDevToolConfig } from "types/devtools";
import { DeveloperAuth } from "..";

const postSettings: IDevToolConfig = {
  name: "Build Information",
  description: "Information on the Current Build",
};

export default function BuildInfo() {
  return (
    <Layout title="Build Information">
      <table>
        <tr>
          <td>Env Variable</td>
          <td>Value</td>
        </tr>
        {Object.entries(process.env).map((env, index) => (
          <tr key={index}>
            <td>{env[0]}</td>
            <td>{env[1]}</td>
          </tr>
        ))}
      </table>
    </Layout>
  );
}

BuildInfo.postSettings = postSettings;
BuildInfo.auth = DeveloperAuth;
