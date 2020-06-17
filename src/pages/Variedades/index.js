import React from 'react'
import {View,Text} from 'react-native'

export default function Variedades({route}){
    const {item} = route.params
    
    return(
        <View>
            <Text>Super Informática</Text>           
        </View>
    )
}