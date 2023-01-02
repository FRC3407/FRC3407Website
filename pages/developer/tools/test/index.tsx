import { IDevToolConfig } from "types/devtools";

export default function Test() {
  return <h1>hi</h1>;
}

const postSettings: IDevToolConfig = {
  name: "Test Page",
  description: "hi",
};

Test.postSettings = postSettings;
