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
    
export default function Bebidas({route}){
    const navigation = useNavigation()
    const {item} = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [produtosCaixa, setProdutosCaixa] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')

    const phone =  item.contato

    useEffect(()=> {
      async function loadingList(){

        await firebase.database().ref(item.key).on('value', (snapshot)=> {
          setProdutos([])
          setProdutosCaixa([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
              contCaixa: parseFloat(childItem.val().contCaixa),
              caixa: parseFloat(childItem.val().caixa),
              qtdCaixa: parseFloat(childItem.val().qtdCaixa),
              img: childItem.val().img
            };
            setProdutos(oldArray => [...oldArray, list]); 
            setProdutosCaixa(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList();
      
    }, []);
    
    function confirmar(){
      if(nome != '' || endereco != '' || numero != '' || bairro!= ''){
       let pedido = montarPedidoUnidade()
       let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotal())
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
      produtosCaixa.map( produto =>{
        produto.contCaixa = 0
      })
    }
    function zerarForm(){
      setNome('')
      setEndereco('')
      setNumero('')
      setBairro('')
      setComplemento('')
    }
    function isValidaProduto(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.cont > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    function isValidaProdutoCaixa(){
      let conProdutoCaixa = 0
      produtos.map( produto =>{
        if(produto.contCaixa > 0){
          conProdutoCaixa++
        }
      })

      return conProdutoCaixa > 0 ? true : false 
    }

    
    function pedir(){
      if(isValidaProduto() || isValidaProdutoCaixa()){
        setModalVisible(true)
      }else{
        alert('Nenhum Produto selecionado para compra!')
      }
    }
    function montarPedidoUnidade(){
        var msg =''
        produtos.map((childItem)=>{
        if(childItem.cont > 0){
            msg += `${childItem.cont} ${childItem.nome}\n`
          }
        })
        produtosCaixa.map((item)=>{
          if(item.contCaixa > 0){
            msg += `${item.contCaixa} caixas de ${item.nome}\n`
          }

        })
        return msg
    }


    function cancelar(){
      setModalVisible(false)
      setNome('')
      setEndereco('')
      setComplemento('')
      setBairro('')
      setNumero('')
    }

    function decrementarProduto(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont--
        }
        return produto
      }))
    }

    function incrementProduto(item){
      setProdutos(produtosCaixa.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    function incrementProdutoCaixa(item){
      setProdutosCaixa(produtosCaixa.map(produto =>{
        if(item.key == produto.key){
          produto.contCaixa++
        }
        return produto
      }))
    }
    function decrementarProdutoCaixa(item){
      setProdutosCaixa(produtosCaixa.map(produto =>{
        if((item.key == produto.key) && (produto.contCaixa != 0)){
          produto.contCaixa--
        }
        return produto
      }))
    }
    function getTotal(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.valor * produto.cont)
        return total
      },0)
    }
    function getTotalCaixa(){
      return produtosCaixa.reduce((totalCaixa,produto)=>{
        totalCaixa+= (produto.caixa * produto.contCaixa)
        return totalCaixa
      },0)
    }
    function getTotalUnidadeCaixa(){
      return produtosCaixa.reduce((totalCaixa,produto)=>{
        totalCaixa+= (produto.contCaixa * produto.qtdCaixa)
        return totalCaixa
      },0)
    }
    function getTotalUnidade(){
      return produtos.reduce((totalCaixa,produto)=>{
        totalCaixa+= (produto.cont)
        return totalCaixa
      },0)
    }
    function getQtdTotalProdutos(){
      return getTotalUnidade() //+ getTotalUnidadeCaixa()
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
                    <Text style={styles.txtDesc}>{item.nome}</Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                       {/** 
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Pacote {item.qtdCaixa}/uni:</Text>
                            <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoCaixa(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            
                            <Text>
                              {item.contCaixa}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoCaixa(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                      */}
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Unidade:</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProduto(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProduto(item)}>
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
              TOTAL: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotal())} </Text>
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
                placeholder= "Numero"
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