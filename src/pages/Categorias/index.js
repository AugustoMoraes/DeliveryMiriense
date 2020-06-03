import React, {useEffect, useState} from 'react'
import {View,Text, FlatList, Image, TouchableOpacity,ImageBackground} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from 'firebase'
import background from '../../images/background.jpeg'
import logo from '../../images/logo.png'
import styles from './styles'

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
        item.nome == 'SuperInformatica' ? navigation.navigate('SuperInformatica', {item}) :navigation.navigate('Home', {item})
    }
    return(
        <View style={styles.container}>
            <ImageBackground source={background} style={{flex:1}}>
            <Image source={logo} style={{height: 120, width: '100%', alignSelf:'center'}}/>
            
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
            </ImageBackground>
        </View>
    )
}