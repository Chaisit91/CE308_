import "./global.css"
import { Text } from "react-native";
import { CenteredView } from "./component/CenteredView";
import { View } from "react-native";
import { ItemList } from "./component/ItemList";
import { CustomButton } from "./CustomButton";


// export default function Index() {
//   return (
//     <View className="flex-1 justify-center items-center bg-blue-500">
//       <Text className="text-white text-lg font-bold">Hello Nativeind with TypeScipst!</Text>
//     </View>
//   );
// }

// export default function Index() {
//   return (
//     <CenteredView BackgroundColor="bg-blue-100">
//       <Text className="text-xl font-bold text-blue-600">Hello nativeWind!</Text>
//     </CenteredView>
//   );
// }

// export default function Index() {
//   const data = [
//     { id: "1", title: "Apple", pcs: 3 },
//     { id: "2", title: "Banana", pcs: 5 },
//     { id: "3", title: "Mango", pcs: 9 },
//   ];

//   return (
//     <CenteredView>
//       <ItemList items={data} />
//     </CenteredView>
//   );
// }

// export default function Index() {
//   return (
//     <CenteredView>
//       <CustomButton title="Primary" variant="primary" size="md" onPress={() => alert("Primary Clicked!")} />
//       <CustomButton title="Secondary" variant="secondary" size="lg" onPress={() => alert("Secondary Clicked!")} />
//       <CustomButton title="Danger" variant="danger" size="sm" onPress={() => alert("Danger Clicked!")} />
//     </CenteredView>
//   );
// }

export default function Index() {
  const items = [
    { id: "1", title: "Banana", price: 2000, pcs: 10, btnSize: "small", btnColor: "primary" },
    { id: "2", title: "Mango", price: 1500, pcs: 5, btnSize: "medium", btnColor: "secondary" },
    { id: "3", title: "Apple", price: 2000, pcs: 8, btnSize: "large", btnColor: "danger" },
    
  ];
  return (
    <CenteredView>
      {items.map((item) => (
        <View key={item.id} className="mb-4 items-center">
          <Text className="text-lg font-semibold mb-2">{item.title} - ${item.price} - {item.pcs} pcs</Text>
          <CustomButton
            title={`Buy ${item.title}`}
            variant={item.btnColor as "primary" | "secondary" | "danger"}
            size={item.btnSize as "sm" | "md" | "lg"}
            onPress={() => alert(`Bought ${item.title}`)}
          />
        </View>
      ))}
    </CenteredView>
  );
}