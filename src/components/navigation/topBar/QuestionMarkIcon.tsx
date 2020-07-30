import React, {FC} from 'react';
import QuestionMarkSvg from '@fos/assets/svg/questionMark.svg';
import {s} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native';

type Props = {
  onPress: () => void;
};

export const QuestionMarkIcon: FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <QuestionMarkSvg
        // FIXME Add i18n key for Support
        accessibilityLabel="Support"
        accessible
        fill="white"
        height={s(30)}
        width={s(30)}
      />
    </TouchableOpacity>
  );
};
