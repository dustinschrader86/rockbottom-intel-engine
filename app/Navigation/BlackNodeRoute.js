// /app/navigation/BlackNodeRoute.js

import { CommonActions } from "@react-navigation/native";

let navigatorRef = null;

export function registerNavigator(ref) {
  navigatorRef = ref;
}

export function openBlackNode() {
  if (!navigatorRef) return;

  navigatorRef.dispatch(
    CommonActions.navigate({
      name: "BlackNode"
    })
  );
}

export default {
  registerNavigator,
  openBlackNode
};

