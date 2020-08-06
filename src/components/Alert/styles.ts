import { StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";
import { Colors } from "@fos/themes";

export const styles = StyleSheet.create({
  body: {
    fontSize: s(16),
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    padding: s(2),
  },
  header: {
    fontSize: s(20),
    fontWeight: "700",
  },
  overlay: {
    backgroundColor: Colors.secondary,
    borderRadius: s(12),
    paddingVertical: vs(30),
  },
  roundedBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: s(40),
    height: s(40),
  },
  roundedBtnContainer: {
    borderRadius: s(40),
    width: s(100),
  },
  roundedBtnTitle: {
    fontSize: s(16),
  },
});
