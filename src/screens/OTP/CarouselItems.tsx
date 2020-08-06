import React, { RefObject } from "react";
import Carousel from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { updatePaginationActiveDotIndex } from "@fos/redux/slices/navigationSlice";

type CarouselItem = "requestCode" | "verifyCode" | "emailAddress" | "name";

type CarouselItemProps = {
  login?: boolean;
  carouselRef: RefObject<any>;
  otpCodeInputRef: RefObject<OTPInputView>;
  renderSlides: ({ item }: { item: CarouselItem }) => JSX.Element;
};

const createNewAccountItems: Array<CarouselItem> = [
  "requestCode",
  "verifyCode",
  "emailAddress",
  "name",
];
const loginItems: Array<CarouselItem> = ["requestCode", "verifyCode"];

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window",
);

const CarouselItems = (props: CarouselItemProps) => {
  const { login, carouselRef, otpCodeInputRef, renderSlides } = props;
  const dispatch = useDispatch();

  const handleOnSnapToItem = (slideIndex: number) => {
    if (slideIndex === 1) {
      otpCodeInputRef.current?.focusField(0);
    }
    dispatch(updatePaginationActiveDotIndex(slideIndex));
  };

  return (
    <Carousel
      data={login ? loginItems : createNewAccountItems}
      itemHeight={viewportHeight}
      itemWidth={viewportWidth}
      keyboardShouldPersistTaps="always"
      lockScrollWhileSnapping
      onSnapToItem={handleOnSnapToItem}
      ref={carouselRef}
      removeClippedSubviews
      renderItem={renderSlides}
      scrollEnabled={false}
      sliderWidth={viewportWidth}
    />
  );
};

export default CarouselItems;
