import React, {FC} from 'react';
import RoundedButton from '@fos/components/RoundedButton';
import TextInput from '@fos/components/TextInput';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import CarouselItemContainer from './CarouselItemContainer';
import FooterText from './FooterText';

export type NameProps = {
  firstName: string;
  lastName: string;
  onFirstNameChangeText: (name: string) => void;
  onLastNameChangeText: (name: string) => void;
  onFirstNameClear: () => void;
  onLastNameClear: () => void;
  onCreateUserPress: () => void;
  loading?: boolean;
};

const Name: FC<NameProps> = ({
  firstName,
  lastName,
  onFirstNameChangeText,
  onLastNameChangeText,
  onFirstNameClear,
  onLastNameClear,
  onCreateUserPress,
  loading = false,
}) => {
  const {t} = useTranslation();

  return (
    <CarouselItemContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: t('screens.createNewAccount.enterNameHeader'),
      }}
      containerStyle={styles.carouselContainer}
      header={t('screens.createNewAccount.enterNameHeader')}>
      <TextInput
        accessibilityLabel={t('screens.createNewAccount.firstNameInput')}
        accessible
        autoCapitalize="words"
        containerStyle={styles.nameInput}
        onChangeText={onFirstNameChangeText}
        onClear={onFirstNameClear}
        placeholder={t('screens.createNewAccount.firstNameInput')}
        value={firstName}
      />

      <TextInput
        accessibilityLabel={t('screens.createNewAccount.lastNameInput')}
        accessible
        containerStyle={styles.nameInput}
        onChangeText={onLastNameChangeText}
        onClear={onLastNameClear}
        placeholder={t('screens.createNewAccount.lastNameInput')}
        value={lastName}
      />

      <RoundedButton
        accessibilityLabel={t(
          'screens.createNewAccount.enterNameButton.createUser',
        )}
        accessible
        disabled={!firstName || !lastName || loading}
        loading={loading}
        onPress={onCreateUserPress}
        size="large"
        title={t('screens.createNewAccount.enterNameButton.createUser')}
      />

      <FooterText style={styles.footer}>
        {t('screens.createNewAccount.enterNameFooter')}
      </FooterText>
    </CarouselItemContainer>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingHorizontal: s(28),
  },
  footer: {marginTop: vs(16), textAlign: 'center'},
  nameInput: {
    paddingHorizontal: 0,
  },
});

export default Name;
