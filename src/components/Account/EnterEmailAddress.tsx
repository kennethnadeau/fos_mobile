import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";

import { FOSButton } from "../Button";
import { TextInput } from "../TextInput";
import AuthenticationContainer from "./AuthenticationContainer";
import FooterText from "./FooterText";

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
  const { t } = useTranslation("dotItems");

  const enterEmailAddressText = t("Enter Email Address");
  const yourEmailText = t("Your Email");
  const nextText = t("Next");

  return (
    <AuthenticationContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: enterEmailAddressText,
      }}
      containerStyle={styles.dotContainer}
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

      <FOSButton
        accessibilityLabel={nextText}
        accessible
        disabled={!emailAddress || loading}
        loading={loading}
        onPress={onNextPress}
        size="large"
        title={nextText}
      />

      <FooterText style={styles.footer}>{t("Email Usage")}</FooterText>
    </AuthenticationContainer>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    paddingHorizontal: s(28),
  },
  emailAddressInput: {
    paddingHorizontal: 0,
  },
  footer: { marginTop: vs(16), textAlign: "center" },
});

export default EmailAddress;
