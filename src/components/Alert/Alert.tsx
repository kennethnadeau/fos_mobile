import React, { FC } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { Text, Overlay } from "react-native-elements";
import { s } from "react-native-size-matters";
import FOSButton from "../Button/FOSButton";
import { styles } from "./styles";

export type AlertButton = { id: string; title: string; onPress?: () => void };

export type AlertProps = {
  header: string;
  body?: string;
  isVisible?: boolean;
  renderButtons?: () => JSX.Element;
  width?: number;
  height?: number;
  buttons?: Array<AlertButton>;
  overlayStyle?: StyleProp<ViewStyle>;
};

const Alert: FC<AlertProps> = ({
  header,
  body,
  renderButtons,
  buttons,
  isVisible = false,
  width = 250,
  height = 210,
  overlayStyle,
}) => {
  const internalButtonRendering = () => {
    if (renderButtons && !buttons?.length) {
      return renderButtons();
    }
    if (!renderButtons && buttons?.length) {
      return (
        <View style={styles.btnContainer}>
          {buttons.map(({ id, ...props }) => (
            <FOSButton
              accessibilityLabel={props.title}
              buttonStyle={styles.roundedBtn}
              containerStyle={styles.roundedBtnContainer}
              key={id}
              titleStyle={styles.roundedBtnTitle}
              {...props}
            />
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <Overlay
      hardwareAccelerated
      isVisible={isVisible}
      overlayStyle={[
        styles.overlay,
        { height: s(height), width: s(width) },
        overlayStyle,
      ]}>
      <View style={styles.container}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.body}>{body}</Text>
        {internalButtonRendering()}
      </View>
    </Overlay>
  );
};

export default Alert;
