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
  const {t} = useTranslation('carouselItems');

  const enterNameText = t('Enter Name');
  const firstNameText = t('First Name');
  const lastNameText = t('Last Name');
  const createUserText = t('Create User');

  return (
    <CarouselItemContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: enterNameText,
      }}
      containerStyle={styles.carouselContainer}
      header={enterNameText}>
      <TextInput
        accessibilityLabel={firstNameText}
        accessible
        autoCapitalize="words"
        containerStyle={styles.nameInput}
        onChangeText={onFirstNameChangeText}
        onClear={onFirstNameClear}
        placeholder={firstNameText}
        value={firstName}
      />

      <TextInput
        accessibilityLabel={lastNameText}
        accessible
        containerStyle={styles.nameInput}
        onChangeText={onLastNameChangeText}
        onClear={onLastNameClear}
        placeholder={lastNameText}
        value={lastName}
      />

      <RoundedButton
        accessibilityLabel={createUserText}
        accessible
        disabled={!firstName || !lastName || loading}
        loading={loading}
        onPress={onCreateUserPress}
        size="large"
        title={createUserText}
      />

      <FooterText style={styles.footer}>
        {t('Enter name footer text')}
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
