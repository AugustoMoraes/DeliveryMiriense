import React, {useEffect, useState} from 'react'
import {View,Text, FlatList, Image, TouchableOpacity,ImageBackground,StatusBar,Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from 'firebase'
import background from '../../images/background.jpeg'
import logo from '../../images/logo.png'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()
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
    function verInstagram(){
        Linking.openURL('https://www.instagram.com/alvarosuperinformatica/')
    }
    function verFacebook(){
        Linking.openURL('https://www.facebook.com/Super-Inform%C3%A1tica-480569719415063/')
    }
    function verWhatzapp(){
        Linking.openURL(`whatsapp://send?text=Olá, Como podemos ajudar?&phone=5591991560809`)
    }
    return(
        <View style={styles.container}>
            <StatusBar 
                backgroundColor="#99c89a"
            />
            <ImageBackground source={background} style={{flex:1}}>
            <Image source={logo} style={{height: 120, width: '100%', alignSelf:'center', marginTop: 20}}/>
            
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
            <View style={styles.rodape}>
                <Text style={styles.txtRodape}>Super Informática |</Text>
                <View style={{width: '20%',flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=> verInstagram()}>
                    <Text>
                        <Ionicons name="logo-instagram" size={35} color="#A4C639"/>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> verFacebook()}>
                    <Text>
                        <Ionicons name="logo-facebook" size={35} color="#A4C639"/>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> verWhatzapp()}>
                    <Text>
                        <Ionicons name="logo-whatsapp" size={35} color="#A4C639"/>
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>
    )
}