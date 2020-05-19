import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './pages/Home'
import Lanches from './pages/Lanches'
import Bebidas from './pages/Bebidas'
import Categorias from './pages/Categorias'
const AppStack = createStackNavigator()

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Categorias" component={Categorias}/>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Lanches" component={Lanches}/>
                <AppStack.Screen name="Bebidas" component={Bebidas}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
