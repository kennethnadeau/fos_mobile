import React, {forwardRef} from 'react';
import CarouselItemContainer from './CarouselItemContainer';
import {Text} from 'react-native-elements';
import {s, vs} from 'react-native-size-matters';
import {Colors} from '@fos/themes';
import {useTranslation, Trans} from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {View, StyleSheet, TextStyle} from 'react-native';
import FooterText from './FooterText';

export type VerificationCodeStatus = 'unverified' | 'verified' | 'invalid';

export type VerifyCodeProps = {
  mobileNumber?: string;
  verificationStatus?: VerificationCodeStatus;
  code?: string;
  onCodeChange?: (code: string) => void;
  onCodeFilled?: (code: string) => void;
  onResendPress: () => void;
};

const VerifyOtpCode = forwardRef<OTPInputView, VerifyCodeProps>(
  (
    {
      mobileNumber,
      code,
      verificationStatus = 'unverified',
      onCodeChange,
      onCodeFilled,
      onResendPress,
    },
    ref,
  ) => {
    const {t: translate} = useTranslation();

    const t = (path: string) => translate(`screens.createNewAccount.${path}`);
    const verificationStatusBorderColor: {
      [key in VerificationCodeStatus]: TextStyle;
    } = {
      unverified: styles.codeInputField,
      invalid: {...styles.codeInputField, ...styles.invalid},
      verified: {...styles.codeInputField, ...styles.verified},
    };

    return (
      <CarouselItemContainer
        containerProps={{
          accessible: true,
          accessibilityLabel: t('verifyOtpCodeHeader'),
        }}
        containerStyle={{
          paddingHorizontal: s(16),
        }}
        header={t('verifyOtpCodeHeader')}>
        <View
          accessibilityLabel={t('verifyOtpCodeInput.otpCodeInput')}
          accessible>
          <OTPInputView
            autoFocusOnLoad={false}
            code={code}
            codeInputFieldStyle={
              verificationStatusBorderColor[verificationStatus]
            }
            onCodeChanged={onCodeChange}
            onCodeFilled={onCodeFilled}
            pinCount={6}
            ref={ref}
            selectionColor={Colors.secondary}
            style={styles.otpInput}
          />
        </View>

        <FooterText style={styles.sentToDescription}>
          <Trans
            i18nKey="screens.createNewAccount.verifyOtpCodeFooter.sentToMobileNumber"
            values={{mobileNumber}}
          />
        </FooterText>
        <FooterText style={styles.resend}>
          <Trans
            components={{
              Text: <Text onPress={onResendPress} />,
            }}
            i18nKey="screens.createNewAccount.verifyOtpCodeFooter.resendCode"
          />
        </FooterText>
      </CarouselItemContainer>
    );
  },
);

const styles = StyleSheet.create({
  codeInputField: {
    borderRadius: s(8),
    fontSize: s(32),
    fontWeight: '900',
    height: s(60),
  },
  invalid: {
    borderColor: Colors.error,
  },
  otpInput: {
    height: vs(100),
    paddingHorizontal: s(16),
  },
  resend: {
    marginTop: vs(50),
    textAlign: 'center',
  },
  sentToDescription: {
    marginTop: vs(20),
    paddingHorizontal: s(30),
    textAlign: 'center',
  },
  verified: {
    borderColor: Colors.success,
  },
});

export default VerifyOtpCode;
