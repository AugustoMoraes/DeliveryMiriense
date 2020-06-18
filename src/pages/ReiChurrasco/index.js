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
import background from '../../images/background.jpeg'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
Icon.loadFont()
Ionicons.loadFont()
    
export default function ReiChurrasco({route}){
    const navigation = useNavigation()
    const {item} = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [troco, setTroco] = useState('')

    const phone =  item.contato

    useEffect(()=> {
      async function loadingList(){

        await firebase.database().ref(item.key).orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setProdutos([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              ingredientes: childItem.val().ingredientes,
              disponivel: childItem.val().disponivel,
              pequeno: parseFloat(childItem.val().pequeno),
              medio: parseFloat(childItem.val().medio),
              contP: parseFloat(childItem.val().contP),
              contM: parseFloat(childItem.val().contM),
              img: childItem.val().img
            };
            setProdutos(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList();
      
    }, []);
    
    function confirmar(){
      if(troco == 0){
        if(nome != '' && endereco != '' && bairro!= ''){
         let pedido = montarPedidoUnidade()
         let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotal())
         setModalVisible(false)
         zerarQtdProdutos()
         zerarForm()
         Linking.openURL(`whatsapp://send?text=Olá, me chamo ${nome} e gostaria de pedir:\n\n${pedido}Total: ${total}\n\nLocal de Entrega: \n${endereco} nº ${numero}\n${bairro}\n${complemento}&phone=${phone}`)
        }else{
          alert('Voce deve preencher o(s) campo(s) obrigatórios!')
        }
      }else{ 
        if(troco<getTotal()){
          return alert('Troco incorreto!')
        }else{
          if(nome != '' && endereco != '' && bairro!= '' && troco == 0){
            let pedido = montarPedidoUnidade()
            let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotal())
            let seuTroco = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(troco)
            setModalVisible(false)
            zerarQtdProdutos()
            zerarForm()
            Linking.openURL(`whatsapp://send?text=Olá, me chamo ${nome} e gostaria de pedir:\n\n${pedido}Total: ${total}\nTroco para ${seuTroco}\n\nLocal de Entrega: \n${endereco} nº ${numero}\n${bairro}\n${complemento}&phone=${phone}`)
           }else{
             alert('Voce deve preencher o(s) campo(s) obrigatórios!')
           }
        }
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
      setTroco('')
    }
    function isValidaProduto(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contP > 0){
          conProduto++
        }
      })
      produtos.map( produto =>{
        if(produto.contM > 0){
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
        if(childItem.contP > 0){
            msg += `${childItem.contP} ${childItem.nome}\n`
          }
        })
        produtos.map((childItem)=>{
        if(childItem.contM > 0){
            msg += `${childItem.contM} ${childItem.nome}\n`
          }
        })
        return msg
    }

    function cancelar(){
      setModalVisible(false)
      zerarForm()
    }

    function decrementarProdutoPequeno(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contP != 0)){
          produto.contP--
        }
        return produto
      }))
    }

    function incrementProdutoPequeno(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contP++
        }
        return produto
      }))
    }
    function decrementarProdutoMedio(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contM != 0)){
          produto.contM--
        }
        return produto
      }))
    }

    function incrementProdutoMedio(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contM++
        }
        return produto
      }))
    }
   
    function getTotalPequena(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.pequeno * produto.contP)
        return total
      },0)
    }
    
    function getTotalMedia(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.medio * produto.contM)
        return total
      },0)
    }
    function getTotal(){
      return getTotalMedia() + getTotalPequena()
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
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={produtos}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>{item.nome}</Text>
                    <Text style={[styles.txtDesc,{color:'#999'}]}>{item.ingredientes}</Text>
                        <View style={styles.qtd}>
                        <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.pequeno)}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoPequeno(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contP}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoPequeno(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.qtd}>
                        <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.medio)}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoMedio(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contM}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoMedio(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>               
                    </View>
                    
                )}
            />      
            </View>
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
                placeholder= "Ponto de Referência"
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