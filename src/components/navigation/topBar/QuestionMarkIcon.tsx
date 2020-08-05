import React, { FC } from "react";
import QuestionMarkSvg from "@fos/assets/svg/questionMark.svg";
import { s } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

type Props = {
  onPress: () => void;
};

export const QuestionMarkIcon: FC<Props> = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress}>
      <QuestionMarkSvg
        accessibilityLabel={t("Support")}
        accessible
        fill="white"
        height={s(30)}
        width={s(30)}
      />
    </TouchableOpacity>
  );
};
