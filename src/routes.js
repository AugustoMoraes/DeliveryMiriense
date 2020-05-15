import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './pages/Home'
import Porao from './pages/Porao'
import Bebidas from './pages/Bebidas'
const AppStack = createStackNavigator()

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Porao" component={Porao}/>
                <AppStack.Screen name="Bebidas" component={Bebidas}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
