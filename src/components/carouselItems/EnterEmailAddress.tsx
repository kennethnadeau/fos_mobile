import React, {FC} from 'react';
import RoundedButton from '@fos/components/RoundedButton';
import TextInput from '@fos/components/TextInput';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import CarouselItemContainer from './CarouselItemContainer';
import FooterText from './FooterText';

export type EnterEmailAddressProps = {
  emailAddress: string;
  onEmailAddressChangeText: (email: string) => void;
  onEmailClear: () => void;
  onNextPress: () => void;
  loading?: boolean;
};

const EmailAddress: FC<EnterEmailAddressProps> = ({
  emailAddress,
  onEmailAddressChangeText,
  onEmailClear,
  onNextPress,
  loading = false,
}) => {
  const {t} = useTranslation('carouselItems');

  const enterEmailAddressText = t('Enter Email Address');
  const yourEmailText = t('Your Email');
  const nextText = t('Next');

  return (
    <CarouselItemContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: enterEmailAddressText,
      }}
      containerStyle={styles.carouselContainer}
      header={enterEmailAddressText}>
      <TextInput
        accessibilityLabel={yourEmailText}
        accessible
        autoCapitalize="none"
        containerStyle={styles.emailAddressInput}
        keyboardType="email-address"
        onChangeText={onEmailAddressChangeText}
        onClear={onEmailClear}
        placeholder={yourEmailText}
        textContentType="emailAddress"
        value={emailAddress}
      />

      <RoundedButton
        accessibilityLabel={nextText}
        accessible
        disabled={!emailAddress || loading}
        loading={loading}
        onPress={onNextPress}
        size="large"
        title={nextText}
      />

      <FooterText style={styles.footer}>{t('Email Usage')}</FooterText>
    </CarouselItemContainer>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingHorizontal: s(28),
  },
  emailAddressInput: {
    paddingHorizontal: 0,
  },
  footer: {marginTop: vs(16), textAlign: 'center'},
});

export default EmailAddress;
