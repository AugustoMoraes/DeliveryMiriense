import React,{useState, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, FlatList, TextInput} from 'react-native'

import heineken from '../../images/heineken.jpg'
import styles from './styles'
import IconMinus from 'react-native-vector-icons/AntDesign'
import IconPlus from 'react-native-vector-icons/AntDesign'

import firebase from '../../database/firebase'

export default function Porao(){

    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [contProdutos, setContProdutos] = useState([])
    const [nome, setNome] = useState('')
    const [msg, setMsg] = useState('')
    const [total, setTotal] = useState(0)
    useEffect(()=> {
      
      async function loadingList(){
        await firebase.database().ref('porao').once('value', (snapshot)=> {
          setProdutos([]);
          
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
            };
            
            setProdutos(oldArray => [...oldArray, list]); 
            setContProdutos(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList();
      
    }, []);
    
    function confirmar(){
      alert(msg)
    }
    
    function pedir(){
        setModalVisible(true)
      
    }
    function sair(viseble){
        setModalVisible(viseble)
    }
    function decrementarProduto(item){
          
      contProdutos.forEach((childItem)=>{
        if(item.cont > 0){
          if(item.key == childItem.key){    
            setProdutos(childItem.cont--)
          }
        }
      })
    }
    function incrementProduto(item){
       contProdutos.forEach((childItem)=>{
         if(item.key == childItem.key){
           setProdutos(childItem.cont++)
           calcTotProdutos(childItem.cont, childItem.val)
         }
       })

    }
    function calcTotProdutos(qtd, valor){  
        aux =  qtd * valor
        console.log(aux)
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtHeader}>Delivery Miriense</Text>
            </View>
            <FlatList
                key= {item => item.key}
                data={contProdutos}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <Image source={heineken} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>Cerveja:{item.nome} </Text>
                    <Text style={styles.txtDesc}>Valor: R$: {item.valor}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>quantidade:</Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProduto(item)}>
                                {/** <IconMinus name="minuscircle" size={15}/> */}
                                <Text style={{fontSize:30}}> - </Text>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProduto(item)}>
                                {/**<IconPlus name="pluscircle" size={15}/>*/}
                                <Text style={{fontSize:30}}> + </Text>
                            </TouchableOpacity>
                        </View>
                    </View>               
                    </View>
                    
                )}
            />      
            
            <View style={styles.viewTotPreco}>
            <Text style={styles.txtTotPreco}>Total a pagar: {total} </Text>
            <TouchableOpacity style={styles.btnPedir} onPress={()=>pedir()}>
                <Text style={styles.txtBtnPedir}>Pedir</Text>
            </TouchableOpacity>    
            </View>
           
        <Modal
        animationType="slide"
        visible={modalVisible}
        transparent= {true}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputPedido}
              placeholder= "Digite seu nome"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.inputPedido,{marginRight: 10, width: '80%'}]}
                placeholder= "Endereço"
                value={nome}
                onChangeText={(value)=>{setNome(value)}}
              />
              <TextInput
                style={styles.inputPedido}
                placeholder= "Numero"
                keyboardType= 'numeric'
                value={nome}
                onChangeText={(value)=>{setNome(value)}}
              />
            </View>
            <TextInput
                style={styles.inputPedido}
                placeholder= "Bairro"
                value={nome}
                onChangeText={(value)=>{setNome(value)}}
              />
              <Text>Valor Total: {total} </Text>
              <Text>Valor Total: {total} </Text>
              <Text>Valor Total: {total} </Text>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "red" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "green" }}
              onPress={confirmar}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>

        </View>
    )
}