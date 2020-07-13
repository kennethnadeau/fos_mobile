import "react-native";
import React from "react";
import App, { persistor } from "../src/app";

import { render } from "react-native-testing-library";

it("renders correctly", done => {
  const rendered = render(<App />);

  persistor.subscribe(() => {
    expect(rendered.toJSON()).toMatchSnapshot();
    done();
  });
});
