import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList,ImageBackground, StatusBar, Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import firebase from '../../database/firebase'

import background from '../../images/background.jpeg'
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
                        img: childItem.val().img ,
                        site: childItem.val().site
                    }
                    setVendedores(oldArray => [...oldArray, list])
                })
            })
        }
        loadingVendedores()
    },[])

    function verProdutos(item){        
            if(item.categoria == 'bebidas' || item.categoria == 'agua_gas'){
                navigation.navigate('Bebidas', {item})
            }else if(item.categoria == 'refeicoes' && item.nome == 'Delícias Mirienses'){
                navigation.navigate('DeliciasMirienses', {item})
            }else if(item.categoria == 'refeicoes' && item.nome == 'Frangão do Denis'){
                navigation.navigate('FrangoAssado', {item})
            }else if(item.categoria == 'refeicoes' && item.nome == 'Rei do Churrasco'){
                navigation.navigate('ReiChurrasco', {item})
            }else if(item.categoria == 'refeicoes'){
                navigation.navigate('Refeicoes', {item})
            }
            else if(item.categoria == 'lachonetes'){
                navigation.navigate('Lanches', {item})
            }else if(item.categoria == 'acai' || item.nome == 'Mariscos Miriense'){
                navigation.navigate('Acai', {item})
            }else if(item.nome == 'Ana Doces e Salgados'){
                navigation.navigate('Pizzas', {item})
            }else if(item.nome == 'Pizzaria La Praça'){
                navigation.navigate('RosePizzaria', {item})
            }
            else if(item.categoria == 'frios_congelados' && item.nome == 'Frangão do Denis'){
                navigation.navigate('FriosCongelados', {item})
            }else if(item.categoria == 'variedades'){
                Linking.openURL(item.site)
            }else{
                alert('Desculpe, Houve um problema, Tente Atualizar seu Aplicativo!')
            }
        
    }

    return(
        <View style={styles.container}>
            <StatusBar 
                backgroundColor="#8A2BE2"
            />
            <ImageBackground source={background} style={{flex:1}}>
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
                        <Text style={[styles.txtDesc,{color:'#999'}]}>{item.endereco} </Text>
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
            </ImageBackground>
         </View>
    )
}