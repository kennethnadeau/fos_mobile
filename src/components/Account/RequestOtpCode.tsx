import React, { FC } from "react";
import { useTranslation, Trans } from "react-i18next";
import { StyleSheet, View, Keyboard } from "react-native";
import { Text } from "react-native-elements";
import { ms, s, vs } from "react-native-size-matters";

import { FOSButton } from "../Button";
import { TextInput } from "../TextInput";
import AuthenticationContainer from "./AuthenticationContainer";
import FooterText from "./FooterText";

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
  const { t } = useTranslation("dotItems");

  const enterMobileNumberText = t("Enter Mobile Number");
  const yourNumberText = t("Your Number");
  const requestCodeText = t("Request Code");

  const onSubmit = () => {
    onRequestCodePress();
    Keyboard.dismiss();
  };

  return (
    <AuthenticationContainer
      containerProps={{
        accessible: true,
        accessibilityLabel: enterMobileNumberText,
      }}
      header={enterMobileNumberText}>
      <View style={styles.inputContainer}>
        <TextInput
          accessibilityLabel={t("Country code")}
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
          accessibilityLabel={yourNumberText}
          accessible
          containerStyle={styles.mobileNumberContainer}
          inputContainerStyle={styles.mobileNumberInputContainer}
          keyboardType="phone-pad"
          onChangeText={onMobileNumberChangeText}
          onClear={onMobileNumberClear}
          onSubmitEditing={onSubmit}
          placeholder={yourNumberText}
          value={mobileNumber}
        />
      </View>
      <FOSButton
        accessibilityLabel={requestCodeText}
        accessible
        containerStyle={styles.btnRequestCode}
        disabled={!mobileNumber || loading}
        loading={loading}
        onPress={onSubmit}
        size="large"
        title={requestCodeText}
      />
      <FooterText style={styles.terms}>
        <Trans components={{ Text: <Text /> }}>Agree to Terms of Use</Trans>
      </FooterText>

      <FooterText style={styles.disclaimer}>{t("OTP Disclaimer")}</FooterText>
    </AuthenticationContainer>
  );
};

const styles = StyleSheet.create({
  btnRequestCode: {
    width: "100%",
  },

  countryCodeContainer: {
    paddingHorizontal: 0,
    paddingRight: ms(10),
    width: "35%",
  },
  countryCodeInputContainer: {
    padding: s(8),
  },
  disclaimer: {
    marginVertical: vs(25),
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: vs(10),
  },
  mobileNumberContainer: {
    paddingHorizontal: 0,
    width: "65%",
  },
  mobileNumberInputContainer: {
    padding: s(4),
  },

  terms: {
    marginTop: vs(30),
    textAlign: "center",
  },
});

export default RequestOtpCode;
