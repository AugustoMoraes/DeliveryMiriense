import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import heineken from '../../images/heineken.jpg'
import styles from './styles'
import firebase from '../../database/firebase'

import Icon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont()
MaterialIcons.loadFont()
export default function Home(){

    const [vendedores, setVendedores] = useState([])
    const navigation = useNavigation()

    useEffect( () => {
        async function loadingVendedores(){
            await firebase.database().ref('vendedores').on('value' , (snapshot)=>{
                setVendedores([])
                snapshot.forEach( (childItem) =>{
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        endereco: childItem.val().endereco,
                        h_inicio: childItem.val().h_inicio,
                        h_fim: childItem.val().h_fim,
                        categoria: childItem.val().categoria,
                        contato: childItem.val().contato
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
                navigation.navigate('Porao', {item})
            }
        }else{
            alert('Nosso Delivery está encerrado por hoje, Voltamos amanha!')
        }
    }

    return(
        <View style={styles.container}>
            <FlatList
                key= {item => item.key}
                data={vendedores}
                renderItem= {({item})=>(
                    <View style={styles.cardVendedores}>
                    <Image source={heineken} style={styles.img}/>
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
                    </View>
                    <View style={styles.viewBtn}> 
                        <TouchableOpacity style={styles.btn} onPress={()=>verProdutos(item)}>
                            <Text style={styles.txtBtn}>Ver Produtos {<Icon name= "arrow-right" size={20} color="#fff"/>}</Text>
                        </TouchableOpacity>
                    </View>
                    </View>               
                )}
            />      
         </View>

    )
}