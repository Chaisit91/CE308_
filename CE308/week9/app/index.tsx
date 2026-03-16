import React from "react";
import { Provider} from 'react-redux';
import { store } from './redux/store';
import CounterScreen  from "./screens/ShoppingCartScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import TodoScreen from "./screens/TodoScreen";



export default function App(){
  return (
    <Provider store={store}>
      <ShoppingCartScreen />
      <TodoScreen />
    </Provider>
  )
}