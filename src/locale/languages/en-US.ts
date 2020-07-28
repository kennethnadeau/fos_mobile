const enUs = {
  navigation: {
    component: {
      carouselPagination: 'Carousel pagination',
    },
  },
  screens: {
    createNewAccount: {
      requestOtpCodeHeader: 'Enter Mobile Number',
      requestOtpCodeInput: {
        countryCode: 'Country code',
        mobileNumber: 'Your Number',
      },
      requestOtpCodeButton: {
        requestCode: 'Request Code',
      },
      requestOtpCodeFooter: {
        terms: 'By continuing, you agree to our',
        termsOfUse: 'Terms Of Use',
        disclaimer:
          'Your phone number is how we identify your account. We will send a text to verify your mobile device - message and data rates may apply.',
      },
      verifyOtpCodeHeader: 'Enter Verification Code',
      verifyOtpCodeInput: {
        otpCodeInput: 'OTP code input',
      },
      verifyOtpCodeFooter: {
        sentToMobileNumber:
          'We texted a verification code to {{mobileNumber}}. This can take a minute.',
        resendCode: 'Didn’t receive a code? <Text>Resend</Text>',
      },
      enterEmailAddressHeader: 'Enter Email Address',
      emailAddressInput: 'Your Email',
      enterEmailAddressButton: {
        next: 'Next',
      },
      enterEmailAddressFooter:
        'Your email will be used for account recovery and occasional communication.',

      enterNameHeader: 'Enter Name',
      firstNameInput: 'Fist Name',
      lastNameInput: 'Last Name',
      enterNameButton: {
        createUser: 'Create User',
      },
      enterNameFooter: 'Your name will let others know who you are.',
    },
    landing: {
      header: 'Data. Meets. People.',
      button: {
        createNewAccount: 'Create New Account',
        login: 'Log In',
      },
    },
  },
};

export default {
  translation: enUs,
};
