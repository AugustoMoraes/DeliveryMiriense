import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import heineken from '../../images/heineken.jpg'
import styles from './styles'
import firebase from '../../database/firebase'

export default function Home(){

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')

    const navigation = useNavigation()

    function verProdutos(){
        navigation.navigate('Porao')
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtHeader}>Delivery Miriense</Text>
            </View>

            <View style={styles.cardProduto}>
                <Image source={heineken} style={styles.img}/>
                <TouchableOpacity onPress={verProdutos}>
                    <Text>Ver Produtos</Text>
                </TouchableOpacity>
            </View>
         </View>

    )
}