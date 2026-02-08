import { View, Text, FlatList } from 'react-native';
import { ItemCard } from './ItemCard';
import { CustomButton } from './CustomButton';

type ItemListProps = {
    items: {id: string; 
    productName: string,
    price: number,
    pcs: number,
    btnSize: string,
    btnColor: string,
    }[];
};

export const ItemList = ({ items }: ItemListProps) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className='p-4 border-b border-gray-400'>
                <CustomButton
                    title="ซื้อเลย"
                    onPress={() => console.log("ซื้อ", item.productName)}
                    size={item.btnSize === "small" ? "sm" : item.btnSize === "large" ? "lg" : "md"}
                    variant={item.btnColor === "primary" ? "primary" : item.btnColor === "secondary" ? "secondary" : "danger"}
                />
                </View>
            )}
        />
    );
};