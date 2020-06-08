import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './pages/Home'
import Lanches from './pages/Lanches'
import Bebidas from './pages/Bebidas'
import Categorias from './pages/Categorias'
import Acai from './pages/Acai'
import Pizzas from './pages/Pizzas'
import FriosCongelados from './pages/FriosCongelados'
import SuperInformatica from './pages/SuperInformatica'
import DeliciasMirienses from './pages/DeliciasMirienses'
import Refeicoes from './pages/Refeicoes'
import RosePizzaria from './pages/RosePizzaria'

const AppStack = createStackNavigator()

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Categorias" component={Categorias}/>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Lanches" component={Lanches}/>
                <AppStack.Screen name="Bebidas" component={Bebidas}/>
                <AppStack.Screen name="Acai" component={Acai}/>
                <AppStack.Screen name="Pizzas" component={Pizzas}/>
                <AppStack.Screen name="FriosCongelados" component={FriosCongelados}/>
                <AppStack.Screen name="SuperInformatica" component={SuperInformatica}/>
                <AppStack.Screen name="DeliciasMirienses" component={DeliciasMirienses}/>
                <AppStack.Screen name="Refeicoes" component={Refeicoes}/>
                <AppStack.Screen name="RosePizzaria" component={RosePizzaria}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
