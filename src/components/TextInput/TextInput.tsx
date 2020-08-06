import React, { FC } from "react";
import { Input, InputProps } from "react-native-elements";
import { Colors } from "@fos/themes";

export type TextInputProps = InputProps & {
  hideClearIcon?: boolean;
  onClear?: () => void;
};

const TextInput: FC<TextInputProps> = ({
  value,
  hideClearIcon = false,
  onClear,
  ...props
}) => {
  return (
    <Input
      {...props}
      rightIcon={
        hideClearIcon
          ? undefined
          : {
              name: "times-circle",
              type: "font-awesome",
              color: value ? Colors.muted : Colors.transparent,
              onPress: onClear,
            }
      }
      value={value}
    />
  );
};

export default TextInput;
