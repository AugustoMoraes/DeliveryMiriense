import React, {useEffect, useState} from 'react'
import {View,Text, FlatList, Image, TouchableOpacity, Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from 'firebase'
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
        navigation.navigate('Home', {item})
    }
    function contato(){
        Linking.openURL(`whatsapp://send?text=Obrigado pelo preferência, como podemos ajudar? &phone=5591998189662`)
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
            <View style={styles.viewFooter}>
                <Text style={styles.txtFooter}>
                    Se  você deseja criar um sistema para facilitar seu trabalho, entre em contato:
                </Text>
                    <TouchableOpacity style={styles.btnContato} onPress={contato}>
                        <Text style={styles.txtContato}>
                            Contato
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}