import React, { FC } from "react";
import LogoSvg from "@fos/assets/svg/logo.svg";
import { s, vs } from "react-native-size-matters";

export const Logo: FC = () => {
  return (
    <LogoSvg
      accessibilityLabel="App logo"
      accessible
      height={vs(138)}
      width={s(131)}
    />
  );
};
