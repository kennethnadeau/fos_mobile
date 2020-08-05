import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
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
import Toast from '@fos/components/Toast';
import Alert from '@fos/components/Alert';
import {useTranslation} from 'react-i18next';
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

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const OTPScreen: ScreenFC<OTPScreenProps> = ({componentId, login}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const carouselRef = useRef<Carousel<CarouselItem>>(null);
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

  const [toastMessage, setToastMessage] = useState('');
  const [showResendAlert, setShowResendAlert] = useState(false);

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
      .catch(() => setToastMessage('Whoops! Something went wrong!'))
      .finally(() => {
        setOtpRequestStatus('idle');
      });
  };

  const handleOtpCodeResend = () => setShowResendAlert(true);

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
      const runAsync = async () => {
        try {
          const {
            data: otpVerificationResponse,
          } = await auth.postOtpAuthenticateVerify(requestData);
          const {data: userInfo} = await auth.getUserInfo(
            // @ts-ignore
            otpVerificationResponse.token,
          );

          setOtpCodeVerificationStatus('verified');
          // @ts-ignore
          goToWelcomeScreen(`${userInfo.firstName} ${userInfo.lastName}`);
        } catch (error) {
          setToastMessage(t('Invalid Code'));
          setOtpCodeVerificationStatus('invalid');
        } finally {
          setShowSpinner(false);
        }
      };

      runAsync();
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
          setToastMessage(t('Invalid Code'));
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
        setToastMessage('Whoops! Something went wrong.');
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

  const renderSlides = ({item}: {item: CarouselItem}) => carouselItemMap[item];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Carousel
        data={login ? carouselItems.slice(0, 2) : carouselItems}
        itemHeight={viewportHeight}
        itemWidth={viewportWidth}
        keyboardShouldPersistTaps="always"
        lockScrollWhileSnapping
        onSnapToItem={handleOnSnapToItem}
        ref={carouselRef}
        removeClippedSubviews
        renderItem={renderSlides}
        scrollEnabled={true}
        sliderWidth={viewportWidth}
      />
      <Overlay isVisible={showSpinner}>
        <ActivityIndicator />
      </Overlay>
      <Toast isVisible={!!toastMessage} message={toastMessage} />
      <Alert
        body={t('Are you sure?')}
        buttons={[
          {
            id: 'no',
            title: t('NO'),
            onPress: () => setShowResendAlert(false),
          },
          {
            id: 'yes',
            title: t('YES'),
            onPress: () => {
              setShowSpinner(true);
              setShowResendAlert(false);

              sendOtpCode()
                .then(() => {
                  setToastMessage(t('Code Resent'));
                })
                .catch(() => setToastMessage(t('Code Resend Failed')))
                .finally(() => {
                  setShowSpinner(false);
                });
            },
          },
        ]}
        header={t('Resend Code')}
        isVisible={showResendAlert}
      />
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
