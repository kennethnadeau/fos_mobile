import React, {FC} from 'react';
import RoundedButton from '@fos/components/RoundedButton';
import TextInput from '@fos/components/TextInput';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import CarouselItemContainer from './CarouselItemContainer';
import FooterText from './FooterText';

export type EmailAddressProps = {
  emailAddress: string;
  onEmailAddressChangeText: (email: string) => void;
  onEmailClear: () => void;
  onNextPress: () => void;
  loading?: boolean;
};

const EmailAddress: FC<EmailAddressProps> = ({
  emailAddress,
  onEmailAddressChangeText,
  onEmailClear,
  onNextPress,
  loading = false,
}) => {
  const {t} = useTranslation();

  return (
    <CarouselItemContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: t(
          'screens.createNewAccount.enterEmailAddressHeader',
        ),
      }}
      containerStyle={styles.carouselContainer}
      header={t('screens.createNewAccount.enterEmailAddressHeader')}>
      <TextInput
        accessibilityLabel={t('screens.createNewAccount.emailAddressInput')}
        accessible
        autoCapitalize="none"
        containerStyle={styles.emailAddressInput}
        keyboardType="email-address"
        onChangeText={onEmailAddressChangeText}
        onClear={onEmailClear}
        placeholder={t('screens.createNewAccount.emailAddressInput')}
        textContentType="emailAddress"
        value={emailAddress}
      />

      <RoundedButton
        accessibilityLabel={t(
          'screens.createNewAccount.enterEmailAddressButton.next',
        )}
        accessible
        disabled={!emailAddress || loading}
        loading={loading}
        onPress={onNextPress}
        size="large"
        title={t('screens.createNewAccount.enterEmailAddressButton.next')}
      />

      <FooterText style={styles.footer}>
        {t('screens.createNewAccount.enterEmailAddressFooter')}
      </FooterText>
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
