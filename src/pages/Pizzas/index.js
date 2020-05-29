import React,{useState, useEffect} from 'react'
import { View, 
         Text, 
         Image, 
         TouchableOpacity, 
         Modal, 
         FlatList, 
         TextInput,
         Linking,
         ImageBackground
        } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../database/firebase'

import styles from './styles'
import image from '../../images/Brasão_Igarapé-Miri_oficial.png'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
Icon.loadFont()
Ionicons.loadFont()
    
export default function Pizzas({route}){
    const navigation = useNavigation()
    const {item} = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')

    const phone =  item.contato

    useEffect(()=> {
      async function loadingList(){

        await firebase.database().ref(item.key).orderByChild('nome').on('value', (snapshot)=> {
          setProdutos([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              ingredientes: childItem.val().ingredientes,
              contM: parseFloat(childItem.val().contM),
              contG: parseFloat(childItem.val().contG),
              contF: parseFloat(childItem.val().contF),
              media: parseFloat(childItem.val().media),
              grande: parseFloat(childItem.val().grande),
              familia: parseFloat(childItem.val().familia),
              img: childItem.val().img
            };
            setProdutos(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList();
      
    }, []);
    
    function confirmar(){
      if(nome != '' && endereco != '' && bairro!= ''){
       let pedido = montarPedidoUnidade()
       let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotalPreco())
       setModalVisible(false)
       zerarQtdProdutos()
       zerarForm()
       Linking.openURL(`whatsapp://send?text=Olá, me chamo ${nome} e gostaria de pedir:\n\n${pedido}Total: ${total}\n\nLocal de Entrega: \n${endereco} nº ${numero}\n${bairro}\n${complemento}&phone=${phone}`)
      }else{
        alert('Voce deve preencher o(s) campo(s) obrigatórios!')
      }
    }
    function zerarQtdProdutos(){
      produtos.map( produto =>{
        produto.cont = 0
      })
    }
    function zerarForm(){
      setNome('')
      setEndereco('')
      setNumero('')
      setBairro('')
      setComplemento('')
    }
    function isValidaProdutoMedia(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contM > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    function isValidaProdutoGrande(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contG > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    function isValidaProdutoFamilia(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contF > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }

    
    function pedir(){
      if(isValidaProdutoMedia() || isValidaProdutoGrande() || isValidaProdutoFamilia()){
        setModalVisible(true)
      }else{
        alert('Nenhum Produto selecionado para compra!')
      }
    }
    function montarPedidoUnidade(){
        var msg =''
        produtos.map((childItem)=>{
        if(childItem.contM > 0){
            msg += `${childItem.contM} ${childItem.nome} Média\n`
          }
        })
        produtos.map((childItem)=>{
        if(childItem.contG > 0){
            msg += `${childItem.contG} ${childItem.nome} Grande\n`
          }
        })
        produtos.map((childItem)=>{
        if(childItem.contF > 0){
            msg += `${childItem.contF} ${childItem.nome} Família\n`
          }
        })
        return msg
    }


    function cancelar(){
      setModalVisible(false)
      zerarForm()
    }

    function decrementarProdutoMedia(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contM != 0)){
          produto.contM--
        }
        return produto
      }))
    }

    function incrementProdutoMedia(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contM++
        }
        return produto
      }))
    }
    
    function decrementarProdutoGrande(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contG != 0)){
          produto.contG--
        }
        return produto
      }))
    }

    function incrementProdutoGrande(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contG++
        }
        return produto
      }))
    }
    
    function decrementarProdutoFamilia(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contF != 0)){
          produto.contF--
        }
        return produto
      }))
    }

    function incrementProdutoFamilia(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contF++
        }
        return produto
      }))
    }
    
    function getTotalMedia(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.media * produto.contM)
        return total
      },0)
    }
    function getTotalGrande(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.grande * produto.contG)
        return total
      },0)
    }
    function getTotalFamilia(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.familia * produto.contF)
        return total
      },0)
    }
    
    function getTotalUnidade(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.contM+produto.contG+produto.contF)
        return total
      },0)
    }
    function getTotalPreco(){
      return getTotalMedia() + getTotalGrande() + getTotalFamilia()
    }
    function getQtdTotalProdutos(){
      return getTotalUnidade()
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
              <TouchableOpacity style={styles.btnIconHeader} onPress={()=>{navigation.goBack()}}>
              <Text style={styles.iconHeader}> 
                {<Ionicons name="md-arrow-round-back" size={25} color="#fff"/>} 
              </Text>
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Delivery Miriense</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>{<Icon name="shoppingcart" size={30} color="#fff"/>}</Text>
                <Text style={{fontSize: 20, paddingLeft: 5, color: '#fff'}}>
                  {getQtdTotalProdutos()}
                </Text>
              </View>
            </View>
            <ImageBackground source={image} style={styles.imgLogo}>
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={produtos}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>Sabor: {item.nome}</Text>
                    <Text style={[styles.txtDesc, {color: '#999'}]}>{item.ingredientes}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Média: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.media)}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoMedia(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contM}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoMedia(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Grande: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.grande)}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoGrande(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contG}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoGrande(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Família: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.familia)}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoFamilia(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contF}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoFamilia(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>               
                    </View>
                    
                )}
            />      
            </View>
            </ImageBackground>
            <View style={styles.viewTotPreco}>
            <Text style={styles.txtTotPreco}>
              TOTAL: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotalPreco())} </Text>
            <TouchableOpacity style={styles.btnPedir} onPress={()=>pedir()}>
                <Text style={styles.txtBtnPedir}>Pedir</Text>
            </TouchableOpacity>    
            </View>
           
        <Modal
        animationType="slide"
        visible={modalVisible}
        transparent= {true}
        >
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputPedido}
              returnKeyType = 'next'
              //enablesReturnKeyAutomatically = {true}
              //ref = { input => { inputNome = input}}
              placeholder= "Digite seu nome"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
              //onSubmitEditing={() => { this.input_2.focus(); }}
              //blurOnSubmit={false}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.inputPedido,{marginRight: 10, width: '80%'}]}
                //ref={(input) => { this.input_2 = input; }}
                placeholder= "Endereço"
                value={endereco}
                onChangeText={(value)=>{setEndereco(value)}}
              />
              <TextInput
                style={styles.inputPedido}
                placeholder= "Nº (OPC)"
                keyboardType= 'numeric'
                value={numero}
                onChangeText={(value)=>{setNumero(value)}}
              />
            </View>
            <TextInput
                style={styles.inputPedido}
                placeholder= "Bairro"
                value={bairro}
                onChangeText={(value)=>{setBairro(value)}}
            />
            <TextInput
                style={styles.inputPedido}
                placeholder= "Complemento (OPICIONAL)"
                value={complemento}
                onChangeText={(value)=>{setComplemento(value)}}
            />

            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={cancelar}
            >
              <Text style={styles.txtPedido}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirmar}
              onPress={confirmar}
            >
              <Text style={styles.txtPedido}>Confirmar</Text>
            </TouchableOpacity>
            </View>
          </View>

          </View>
        </Modal>

        </View>
    )
}