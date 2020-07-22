import React, {FC} from 'react';
import LogoSvg from '@fos/assets/svg/logo.svg';
import {s, vs} from 'react-native-size-matters';

const Logo: FC = () => {
  return (
    <LogoSvg
      accessibilityLabel="App logo"
      accessible
      height={vs(109)}
      width={s(118)}
    />
  );
};

export default Logo;
