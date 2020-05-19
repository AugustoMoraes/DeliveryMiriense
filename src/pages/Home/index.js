import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import heineken from '../../images/heineken.jpg'
import styles from './styles'
import firebase from '../../database/firebase'

import Icon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

Icon.loadFont()
Ionicons.loadFont()
MaterialIcons.loadFont()
export default function Home({route}){

    const {item} = route.params
    const [vendedores, setVendedores] = useState([])
    const navigation = useNavigation()

    useEffect( () => {
        async function loadingVendedores(){
            await firebase.database().ref('vendedores').orderByChild('categoria').equalTo(item.nome).on('value' , (snapshot)=>{
                setVendedores([])
                snapshot.forEach( (childItem) =>{
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        endereco: childItem.val().endereco,
                        h_inicio: childItem.val().h_inicio,
                        h_fim: childItem.val().h_fim,
                        categoria: childItem.val().categoria,
                        contato: childItem.val().contato,
                        img: childItem.val().img 
                    }
                    setVendedores(oldArray => [...oldArray, list])
                })
            })
        }
        loadingVendedores()
    },[])

    function verProdutos(item){
        let horaAtual = new Date().getHours() +':'+ new Date().getMinutes()
        if(horaAtual > item.h_inicio && horaAtual < item.h_fim){
            if(item.categoria == 'bebidas'){
                navigation.navigate('Bebidas', {item})
            }else{
                navigation.navigate('Lanches', {item})
            }
        }else{
            alert('Nosso Delivery está encerrado por hoje, Voltamos amanha!')
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <TouchableOpacity style={styles.btnIconHeader} onPress={()=>{navigation.goBack()}}>
                  <Text style={styles.iconHeader}> {<Ionicons name="md-arrow-round-back" size={25} color="#fff"/>} </Text>
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Delivery Miriense</Text>
            </View>
            <FlatList
                key= {item => item.key}
                data={vendedores}
                renderItem= {({item})=>(
                    <View style={styles.cardVendedores}>
                    <View style={{justifyContent: 'center'}}> 
                        <Image source={{uri:`${item.img}`}} style={styles.img}/>
                    </View>
                    <View style={styles.descEstabelecimento}>
                        <Text style={styles.txtDesc}>{item.nome} </Text>
                        <Text style={styles.txtDesc}>{item.endereco} </Text>
                        <Text style={styles.txtDesc}>Categoria: {item.categoria} </Text>
                        <View style={styles.viewHorario}>
                            <Text style={styles.txtDesc}>{<MaterialIcons name="access-time" size={17} color="#000"/>}: </Text>
                            <Text style={styles.txtDesc}>{item.h_inicio} </Text>
                            <Text style={styles.txtDesc}> às </Text>
                            <Text style={styles.txtDesc}> {item.h_fim} </Text>
                        </View>
                    <View style={styles.viewBtn}> 
                        <TouchableOpacity style={styles.btn} onPress={()=>verProdutos(item)}>
                            <Text style={styles.txtBtn}>Ver Produtos {<Icon name= "arrow-right" size={20} color="#fff"/>}</Text>
                        </TouchableOpacity>
                    </View>    
                    </View>
                    </View>               
                )}
            />
            <View style={styles.viewFooter}>
                <Text style={styles.txtFooter}>
                    CRIADO POR SUPER INFORMÁTICA 
                </Text>
            </View>
         </View>
    )
}