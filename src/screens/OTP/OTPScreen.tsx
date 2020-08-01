import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Dimensions, Alert, ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {SCREENS} from '@fos/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {useDispatch} from 'react-redux';
import {
  updatePaginationActiveDotIndex,
  setPaginationDotsLength,
} from 'redux/slices/navigationSlice';
import RequestOtpCode from '@fos/components/carouselItems/RequestOtpCode';
import VerifyOtpCode, {
  VerificationCodeStatus,
} from '@fos/components/carouselItems/VerifyOtpCode';
import EnterEmailAddress from '@fos/components/carouselItems/EnterEmailAddress';
import Name from '@fos/components/carouselItems/EnterName';
import {apiService} from '@fos/shared';
import {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
} from 'react-native-navigation-hooks/dist';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {goToWelcomeScreen} from 'helpers/navigation';
const {auth} = apiService;

type CarouselItem = 'requestCode' | 'verifyCode' | 'emailAddress' | 'name';

const carouselItems: Array<CarouselItem> = [
  'requestCode',
  'verifyCode',
  'emailAddress',
  'name',
];

type OTPScreenProps = {
  login?: boolean;
};

const OTPScreen: ScreenFC<OTPScreenProps> = ({componentId, login}) => {
  const dispatch = useDispatch();

  const carouselRef = useRef<Carousel<CarouselItem>>();
  const otpCodeInputRef = useRef<OTPInputView | null>(null);

  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');
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

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const formatPhoneNumber = useCallback(
    () => `${countryCode.replace('+', '')}${mobileNumber}`,
    [countryCode, mobileNumber],
  );

  const sendOtpCode = useCallback(() => {
    const postRequestMethod = login
      ? auth.postOtpAuthenticate
      : auth.postOtpRegistration;

    return postRequestMethod({phone: formatPhoneNumber()});
  }, [formatPhoneNumber, login]);

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
    if (slideIndex === 1) {
      otpCodeInputRef.current?.focusField(0);
    }
    dispatch(updatePaginationActiveDotIndex(slideIndex));
  };

  const handleOtpCodeVerification = (code: string) => {
    setShowSpinner(true);

    const requestData = {
      code,
      phone: formatPhoneNumber(),
    };

    if (login) {
      auth
        .postOtpAuthenticateVerify(requestData)
        .then((data) => {
          console.log(data);
          setOtpCodeVerificationStatus('verified');
          goToWelcomeScreen('John Doe');
        })
        .catch(() => setOtpCodeVerificationStatus('invalid'))
        .finally(() => setShowSpinner(false));
    } else {
      auth
        .postOtpRegistrationVerify(requestData)
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
    }
  };

  const handleOnCreateUserPress = () => {
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
        ref={otpCodeInputRef}
        verificationStatus={otpCodeVerificationStatus}
      />
    ),
    emailAddress: (
      <EnterEmailAddress
        emailAddress={emailAddress}
        onEmailAddressChangeText={setEmailAddress}
        onEmailClear={clearEmailAddress}
        onNextPress={goToNextStep}
      />
    ),
    name: (
      <Name
        {...{firstName, lastName}}
        onCreateUserPress={handleOnCreateUserPress}
        onFirstNameChangeText={setFirstName}
        onFirstNameClear={clearFirstName}
        onLastNameChangeText={setLastName}
        onLastNameClear={clearLastName}
      />
    ),
  };

  useNavigationComponentDidAppear(
    () => dispatch(setPaginationDotsLength(login ? 2 : 4)),
    componentId,
  );

  useNavigationComponentDidDisappear(
    () => dispatch(setPaginationDotsLength(0)),
    componentId,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Carousel
        data={login ? carouselItems.slice(0, 2) : carouselItems}
        itemWidth={Dimensions.get('window').width}
        keyboardShouldPersistTaps="always"
        lockScrollWhileSnapping
        onSnapToItem={handleOnSnapToItem}
        // FIXME outstanding TS issue https://github.com/archriss/react-native-snap-carousel/issues/718
        // @ts-ignore for now
        ref={carouselRef}
        removeClippedSubviews
        renderItem={({item}: {item: CarouselItem}) => carouselItemMap[item]}
        scrollEnabled={false}
        sliderWidth={Dimensions.get('window').width}
      />
      <Overlay isVisible={showSpinner}>
        <ActivityIndicator />
      </Overlay>
    </SafeAreaView>
  );
};

OTPScreen.screenName = SCREENS.OTP;
OTPScreen.options = {
  topBar: {
    visible: false,
    rightButtons: [
      {
        id: SCREENS.COMPONENTS.TOP_BAR.QUESTION_MARK,
        component: {
          name: SCREENS.COMPONENTS.TOP_BAR.QUESTION_MARK,
        },
      },
    ],
  },
};

export default OTPScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
