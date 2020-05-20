import React, {useEffect, useState} from 'react'
import {View,Text, FlatList, Image, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from 'firebase'
import styles from './styles'

import imagem from '../../images/heineken.jpg'

export default function Categorias(){

    const [categorias, setCategorias] = useState([])
    const navigation = useNavigation()
    useEffect(()=>{
        async function loadingCategorias(){
            await firebase.database().ref('categorias').on('value' , (snapshot)=>{
                setCategorias([])
                snapshot.forEach( (childItem) =>{
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        img: childItem.val().img,
                        
                    }
                    setCategorias(oldArray => [...oldArray, list])
                })
            })
        }
        loadingCategorias()
    },[])

    function verListVendedores(item){
        navigation.navigate('Home', {item})
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}> 
              <Text style={styles.txtHeader}>Delivery Miriense</Text>
            </View>
            <FlatList
                style={styles.listCategorias}
                numColumns = {2}
                keyExtractor = {item => item.key}
                data= {categorias}
                renderItem = { ({item}) => (
                    <View style={styles.cardCategoria}>
                        <TouchableOpacity onPress={()=>verListVendedores(item)}>
                            <Image source={{uri:`${item.img}`}} style={styles.imgCard}/>
                        </TouchableOpacity>                       
                    </View>
                )}
            />
        </View>
    )
}