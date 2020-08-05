import React, {FC} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Text, Overlay} from 'react-native-elements';
import {s, vs} from 'react-native-size-matters';
import {Colors} from '@fos/themes';
import RoundedButton from '../RoundedButton';

export type AlertButton = {id: string; title: string; onPress?: () => void};

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
    } else if (!renderButtons && buttons?.length) {
      return (
        <View style={styles.btnContainer}>
          {buttons.map(({id, ...props}) => (
            <RoundedButton
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
    } else {
      return null;
    }
  };

  return (
    <Overlay
      hardwareAccelerated
      isVisible={isVisible}
      overlayStyle={[
        styles.overlay,
        {height: s(height), width: s(width)},
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

const styles = StyleSheet.create({
  body: {
    fontSize: s(16),
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: s(2),
  },
  header: {
    fontSize: s(20),
    fontWeight: '700',
  },
  overlay: {
    backgroundColor: Colors.secondary,
    borderRadius: s(12),
    paddingVertical: vs(30),
  },
  roundedBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: s(40),
    height: s(40),
  },
  roundedBtnContainer: {
    borderRadius: s(40),
    width: s(100),
  },
  roundedBtnTitle: {
    fontSize: s(16),
  },
});

export default Alert;
