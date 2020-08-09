import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Dot } from "@fos/components/Dot";

type CarouselPaginationProps = {
  dotsLength: number;
  activeDotIndex: number;
};

// TODO: rename this
export const CarouselPagination: FC<CarouselPaginationProps> = (props) => {
  const { t } = useTranslation();
  const { activeDotIndex, dotsLength } = props;
  const dots = [];
  for (let i = 0; i < dotsLength; i = i + 1) {
    const isActive = i === activeDotIndex;
    dots.push(<Dot active={isActive} key={`dot_${i}`} />);
  }

  return (
    <View accessibilityLabel={t("Carousel Pagination")} accessible>
      <View style={styles.dotContainer}>{dots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 0,
  },
});
