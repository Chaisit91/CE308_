import { View } from 'react-native';

type CenteredViewProps = {
    children: React.ReactNode;
    backgroundColor?: string;
};

export const CenteredView = ({ children, backgroundColor = "bg-gray-100"}: CenteredViewProps) => {
    return <View className={`flex-1 justify-center items-center ${backgroundColor}`}>{children}</View>;
};