import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setPartial("ScreenName", "{{name}}Screen");

  plop.setGenerator("screen", {
    description: "Generate RN navigation screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Screen name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/screens/{{name}}/index.ts",
        templateFile: "plop-templates/screen/index.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{name}}/{{name}}Screen.tsx",
        templateFile: "plop-templates/screen/component.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{name}}/{{name}}Screen.test.tsx",
        templateFile: "plop-templates/screen/component.test.hbs",
      },
    ],
  });
}
