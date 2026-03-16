import React from "react";
import{ View , Text , Button , StyleSheet }from 'react-native';
import { useSelector , useDispatch} from 'react-redux';
import { RootState, AppDispatch } from "../redux/store";
import { increment, decrement ,incrementByAmount } from "../redux/counterSlice";


const CounterScreen = () => {
    const count = useSelector((state:RootState)=> state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return(
        <View style={styles.container}>
            <Text style={styles.countText}>Count: {count}</Text>
            <Button title="Increment" onPress={()=> dispatch(increment())}/>
            <Button title="Decrement" onPress={()=> dispatch(decrement())}/>
            <Button title="Increment by 5" onPress={()=> dispatch(increment())}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    countText:{
        fontSize:24,
        marginBottom:20,
    },
});
export default CounterScreen;
