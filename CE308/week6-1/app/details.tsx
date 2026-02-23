import { View ,Text, Button} from 'react-native';
import { router} from 'expo-router';


export default function DetailsScreen(){
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text style= {{fontSize:24,marginBottom:20}}>Details Screen</Text>

            <Button
                title="GO back"
                onPress={()=> router.back()}

                />
            <Button
                title="GO setting"
                onPress={()=> router.push('/setting')}
                />
        </View>

    );
}