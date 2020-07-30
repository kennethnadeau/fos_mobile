import React, {FC} from 'react';
import RoundedButton from '@fos/components/RoundedButton';
import TextInput from '@fos/components/TextInput';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Keyboard} from 'react-native';
import {Text} from 'react-native-elements';
import {ms, s, vs} from 'react-native-size-matters';
import CarouselItemContainer from './CarouselItemContainer';
import FooterText from './FooterText';

export type RequestCodeProps = {
  mobileNumber: string;
  onMobileNumberChangeText: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (value: string) => void;
  onMobileNumberClear: () => void;
  onRequestCodePress: () => void;
  loading?: boolean;
};

const RequestOtpCode: FC<RequestCodeProps> = ({
  countryCode,
  onCountryCodeChange,
  mobileNumber,
  onMobileNumberChangeText,
  onMobileNumberClear,
  onRequestCodePress,
  loading,
}) => {
  const {t: translate} = useTranslation();

  const t = (path: string) => translate(`screens.createNewAccount.${path}`);

  const onSubmit = () => {
    onRequestCodePress();
    Keyboard.dismiss();
  };

  return (
    <CarouselItemContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: t('requestOtpCodeHeader'),
      }}
      header={t('requestOtpCodeHeader')}>
      <View style={styles.inputContainer}>
        <TextInput
          accessibilityLabel={t('requestOtpCodeInput.countryCode')}
          accessible
          containerStyle={styles.countryCodeContainer}
          hideClearIcon
          inputContainerStyle={styles.countryCodeInputContainer}
          keyboardType="phone-pad"
          onChangeText={onCountryCodeChange}
          placeholder="US +1"
          value={countryCode}
        />
        <TextInput
          accessibilityLabel={t('requestOtpCodeInput.mobileNumber')}
          accessible
          containerStyle={styles.mobileNumberContainer}
          inputContainerStyle={styles.mobileNumberInputContainer}
          keyboardType="phone-pad"
          onChangeText={onMobileNumberChangeText}
          onClear={onMobileNumberClear}
          onSubmitEditing={onSubmit}
          placeholder={t('requestOtpCodeInput.mobileNumber')}
          value={mobileNumber}
        />
      </View>
      <RoundedButton
        accessibilityLabel={t('requestOtpCodeButton.requestCode')}
        accessible
        containerStyle={styles.btnRequestCode}
        disabled={!mobileNumber || loading}
        loading={loading}
        onPress={onSubmit}
        size="large"
        title={t('requestOtpCodeButton.requestCode')}
      />
      <FooterText style={styles.terms}>
        {t('requestOtpCodeFooter.terms')}
      </FooterText>
      <Text>{t('requestOtpCodeFooter.termsOfUse')}.</Text>

      <FooterText style={styles.disclaimer}>
        {t('requestOtpCodeFooter.disclaimer')}
      </FooterText>
    </CarouselItemContainer>
  );
};

const styles = StyleSheet.create({
  btnRequestCode: {
    width: '100%',
  },

  countryCodeContainer: {
    paddingHorizontal: 0,
    paddingRight: ms(10),
    width: '35%',
  },
  countryCodeInputContainer: {
    padding: s(8),
  },
  disclaimer: {
    marginVertical: vs(25),
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vs(10),
  },
  mobileNumberContainer: {
    paddingHorizontal: 0,
    width: '65%',
  },
  mobileNumberInputContainer: {
    padding: s(4),
  },

  terms: {
    marginTop: vs(30),
    textAlign: 'center',
  },
});

export default RequestOtpCode;
