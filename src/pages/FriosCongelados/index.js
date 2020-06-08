import React,{useState, useEffect} from 'react'
import { View, 
         Text, 
         Image, 
         TouchableOpacity, 
         Modal, 
         FlatList, 
         TextInput,
         Linking,
         ImageBackground,
         ScrollView
        } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../database/firebase'

import styles from './styles'
import background from '../../images/background.jpeg'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

Icon.loadFont()
Ionicons.loadFont()
    
export default function FriosCongelados({route}){
    const navigation = useNavigation()
    const {item} = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [produtosPrecoFixo, setProdutosPrecoFixo] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [troco, setTroco] = useState('')

    const phone =  item.contato

    useEffect(()=> {
      async function loadingList(){

        await firebase.database().ref(item.key).child('pesos').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setProdutos([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              disponivel: childItem.val().disponivel,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
              img: childItem.val().img
            };
            setProdutos(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      async function loadingListPrecosFixo(){

        await firebase.database().ref(item.key).child('valFixo').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setProdutosPrecoFixo([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              disponivel: childItem.val().disponivel,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
              img: childItem.val().img
            };
            setProdutosPrecoFixo(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList()
      loadingListPrecosFixo()
    }, []);
    
    function confirmar(){
      if(troco<getTotalPagar()){
        return alert('Troco incorreto!')
      }
      if(nome != '' && endereco != '' && bairro!= ''){
        let pedido = montarPedidoUnidade()
        let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotalPagar())
        let seuTroco = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(troco)
        setModalVisible(false)
        zerarQtdProdutos()
        zerarForm()
        Linking.openURL(`whatsapp://send?text=Olá, me chamo ${nome} e gostaria de pedir:\n\n${pedido}Total: ${total}\nTroco para ${seuTroco}\n\nLocal de Entrega: \n${endereco} nº ${numero}\n${bairro}\n${complemento}&phone=${phone}`)
      }else{
          alert('Voce deve preencher o(s) campo(s) obrigatórios!')
      }
    }
    function zerarQtdProdutos(){
      produtos.map( produto =>{
        produto.cont = 0
      })
      produtosPrecoFixo.map( produto =>{
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
    function isValidaProduto(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.cont > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    
    function pedir(){
      if(isValidaProduto()){
        setModalVisible(true)
      }else{
        alert('Nenhum Produto selecionado para compra!')
      }
    }
    function montarPedidoUnidade(){
        var msg =''
        produtos.map((childItem)=>{
        if(childItem.cont > 0){
          msg += `${childItem.cont} Kg ${childItem.nome}\n`
          }
        })
        produtosPrecoFixo.map((childItem)=>{
        if(childItem.cont > 0){
          msg += `${childItem.cont} ${childItem.nome}\n`
          }
        })
        return msg
    }
    


    function cancelar(){
      setModalVisible(false)
      zerarForm()
    }

    function decrementarProduto(item){
      setProdutosPrecoFixo(produtosPrecoFixo.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont--
        }
        return produto
      }))
    }

    function incrementProduto(item){
      setProdutosPrecoFixo(produtosPrecoFixo.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    function decrementarProdutoKilo(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont -= 0.5
        }
        return produto
      }))
    }

    function incrementProdutoKilo(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.cont += 0.5
        }
        return produto
      }))
    }
    
    function getTotalPagarKilo(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.valor * produto.cont)
        return total
      },0)
    }
    function getTotalPagarPrecoFixo(){
      return produtosPrecoFixo.reduce((total,produto)=>{
        total+= (produto.valor * produto.cont)
        return total
      },0)
    }
    function getTotalPagar(){
        return getTotalPagarKilo() + getTotalPagarPrecoFixo()
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={background} style={{flex:1}}>
            <View style={styles.header}> 
              <TouchableOpacity style={styles.btnIconHeader} onPress={()=>{navigation.goBack()}}>
              <Text style={styles.iconHeader}> 
                {<Ionicons name="md-arrow-round-back" size={25} color="#fff"/>} 
              </Text>
              </TouchableOpacity>
              <Text style={styles.txtHeader}>{item.nome}</Text>
            </View>
            <ScrollView>
            <View style={styles.viewTipoProduto}> 
              <Text style={styles.txtTipoProduto}>Produtos Vendidos à Kilo (Kg)</Text>
            </View>
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
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade(Kg):</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoKilo(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoKilo(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>               
                    </View>
                )}
            />      
            </View>
            <View style={styles.viewTipoProduto}> 
              <Text style={styles.txtTipoProduto}>Produtos Vendidos à Unidade</Text>
            </View>
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={produtosPrecoFixo}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>{item.nome}</Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade: </Text>
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
            </ScrollView>
            <View style={styles.viewTotPreco}>
            <Text style={styles.txtTotPreco}>
              TOTAL: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotalPagar())} </Text>
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
            <TextInput
              style={[styles.inputPedido,{width: '50%'}]}
              placeholder= "Troco Para Quanto?"
              value={troco}
              keyboardType= 'numeric'
              onChangeText={(value)=>{setTroco(value)}}
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
        </ImageBackground>
        </View>
    )
}