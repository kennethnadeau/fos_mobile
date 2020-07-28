import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Dimensions, Alert, ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {SCREENS} from '@fos/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '@fos/themes';
import Carousel from 'react-native-snap-carousel';
import {useDispatch} from 'react-redux';
import {updateActiveDotIndex} from 'redux/slices/navigationSlice';
import RequestOtpCode from 'components/screen/CreateNewAccount/RequestOtpCode';
import VerifyOtpCode, {
  VerificationCodeStatus,
} from 'components/screen/CreateNewAccount/VerifyOtpCode';
import EmailAddress from 'components/screen/CreateNewAccount/EmailAddress';
import Name from 'components/screen/CreateNewAccount/Name';
import {apiService} from '@fos/shared';
const {auth} = apiService;

type CarouselItem = 'requestCode' | 'verifyCode' | 'emailAddress' | 'name';

const carouselItems: Array<CarouselItem> = [
  'requestCode',
  'verifyCode',
  'emailAddress',
  'name',
];

const CreateNewAccountScreen: ScreenFC = () => {
  const dispatch = useDispatch();
  const carouselRef = useRef<Carousel<CarouselItem>>();
  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('17272649460');
  const [otpRequestStatus, setOtpRequestStatus] = useState<
    'sending' | 'sent' | 'idle'
  >('idle');
  const [otpCode, setOtpCode] = useState('');
  const [otpCodeVerificationStatus, setOtpCodeVerificationStatus] = useState<
    VerificationCodeStatus
  >('unverified');
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registrationUuid, setRegistrationUuid] = useState('');

  const [showSpinner, setShowSpinner] = useState(false);

  const clearMobileNumber = () => setMobileNumber('');
  const clearEmailAddress = () => setEmailAddress('');
  const clearFirstName = () => setFirstName('');
  const clearLastName = () => setLastName('');

  const goToNextStep = () => carouselRef.current?.snapToNext();

  const sendOtpCode = useCallback(
    () =>
      auth.postOtpRegistration({
        phone: mobileNumber,
      }),
    [mobileNumber],
  );

  const handleOtpCodeRequest = () => {
    setOtpRequestStatus('sending');

    return sendOtpCode()
      .then(() => {
        setOtpRequestStatus('sent');
        goToNextStep();
      })
      .catch(() => Alert.alert('Whoops!', 'Something went wrong!'))
      .finally(() => {
        setOtpRequestStatus('idle');
      });
  };

  const handleOtpCodeResend = () => {
    Alert.alert('Resend Code', 'Are you sure?', [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          setShowSpinner(true);

          sendOtpCode()
            .then(() => {
              Alert.alert('Success', 'Code resent!');
            })
            .finally(() => setShowSpinner(false));
        },
      },
    ]);
  };

  const handleOnSnapToItem = (slideIndex: number) => {
    dispatch(updateActiveDotIndex(slideIndex));
  };

  const handleOtpCodeVerification = (code: string) => {
    setShowSpinner(true);
    auth
      .postOtpRegistrationVerify({
        code,
        phone: mobileNumber,
      })
      // FIXME Provide proper typing!
      .then(({data}: any) => {
        setRegistrationUuid(data.uuid);
        setOtpCodeVerificationStatus('verified');
        goToNextStep();
      })
      .catch(() => {
        setOtpCodeVerificationStatus('invalid');
      })
      .finally(() => setShowSpinner(false));
  };

  const carouselItemMap: {[key in CarouselItem]: JSX.Element} = {
    requestCode: (
      <RequestOtpCode
        {...{countryCode, mobileNumber}}
        loading={otpRequestStatus === 'sending'}
        onCountryCodeChange={setCountryCode}
        onMobileNumberChangeText={setMobileNumber}
        onMobileNumberClear={clearMobileNumber}
        onRequestCodePress={handleOtpCodeRequest}
      />
    ),
    verifyCode: (
      <VerifyOtpCode
        code={otpCode}
        mobileNumber={`${countryCode}${mobileNumber}`}
        onCodeChange={setOtpCode}
        onCodeFilled={handleOtpCodeVerification}
        onResendPress={handleOtpCodeResend}
        verificationStatus={otpCodeVerificationStatus}
      />
    ),
    emailAddress: (
      <EmailAddress
        emailAddress={emailAddress}
        onEmailAddressChangeText={setEmailAddress}
        onEmailClear={clearEmailAddress}
        onNextPress={goToNextStep}
      />
    ),
    name: (
      <Name
        {...{firstName, lastName}}
        onCreateUserPress={() => {
          setShowSpinner(true);
          auth
            .postAccountRegistration({
              email: emailAddress,
              firstName,
              lastName,
              phone: mobileNumber,
              registrationUuid,
            })
            .finally(() => {
              setShowSpinner(false);
            })
            .catch(() => {
              Alert.alert('Whoops!', 'Something went wrong.');
            });
        }}
        onFirstNameChangeText={setFirstName}
        onFirstNameClear={clearFirstName}
        onLastNameChangeText={setLastName}
        onLastNameClear={clearLastName}
      />
    ),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Carousel
        data={carouselItems}
        itemWidth={Dimensions.get('window').width}
        keyboardShouldPersistTaps="always"
        lockScrollWhileSnapping
        onSnapToItem={handleOnSnapToItem}
        // FIXME outstanding TS issue https://github.com/archriss/react-native-snap-carousel/issues/718
        // @ts-ignore for now
        ref={carouselRef}
        renderItem={({item}: {item: CarouselItem}) => carouselItemMap[item]}
        // scrollEnabled={otpRequestStatus === 'sent'}
        sliderWidth={Dimensions.get('window').width}
      />
      <Overlay isVisible={showSpinner}>
        <ActivityIndicator />
      </Overlay>
    </SafeAreaView>
  );
};

CreateNewAccountScreen.screenName = SCREENS.CREATE_NEW_ACCOUNT;
CreateNewAccountScreen.options = {
  topBar: {
    visible: false,
    rightButtons: [
      {
        id: 'questionIcon',
        icon: Images.question,
      },
    ],
  },
};

export default CreateNewAccountScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
