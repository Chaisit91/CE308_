import { Background } from "@react-navigation/elements";
import {View} from "react-native";

type CenteredViewProps = {
  children: React.ReactNode;
  BackgroundColor?: string;
};

export const CenteredView = ({ children, BackgroundColor = "bg-gray-100" }: CenteredViewProps) => {
  return (
    <View className={`flex-1 items-center justify-center ${BackgroundColor}`}>{children}</View>
  );
};