import React,{useState, useEffect} from 'react'
import { View, 
         Text, 
         Image, 
         TouchableOpacity, 
         Modal, 
         FlatList, 
         TextInput,
         Linking
        } from 'react-native'

import heineken from '../../images/heineken.jpg'
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
//import IconPlus from 'react-native-vector-icons/AntDesign'
Icon.loadFont()
//IconPlus.loadFont()
import firebase from '../../database/firebase'

export default function Porao(){

    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [total, setTotal] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [msg, setMsg] = useState('')
    const phone =  '55091998189662'
    useEffect(()=> {
      
      async function loadingList(){
        await firebase.database().ref('porao').on('value', (snapshot)=> {
          setProdutos([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
            };
            setProdutos(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList();
      
    }, []);
    
    function confirmar(){
      if(nome != '' || endereco != '' || numero != '' || bairro!= '' || complemento!= ''){
        Linking.openURL(`whatsapp://send?text=${msg}&phone=${phone}`)
      }else{
        alert('Preencha todos os campos!')
      }
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
    function montarMsg(){
        var mesg =''
        produtos.map((childItem)=>{
        if(childItem.cont > 0){
            mesg += `${childItem.cont} ${childItem.nome}\n`
         }
      })
      let mensagem = `Olá, me chamo ${nome} e gostaria de pedir:\n${mesg}Total: ${getTotal()}\nLocal de entrega:\nendereço: ${endereco}\nnúmero? ${numero}\ncomplemento: ${complemento}`
      //msg += `\nnome: ${nome}\nendereço: ${endereco}\nnúmero? ${numero}\ncomplemento: ${complemento}\nTotal: ${getTotal()}`
      montarMsg()
      return setMsg(mensagem)
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
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
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
    
    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtHeader}>Delivery Miriense</Text>
            </View>
            <FlatList
                key= {item => item.key}
                data={produtos}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <Image source={heineken} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>Cerveja:{item.nome} </Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade:</Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProduto(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                                {/** <Text style={{fontSize:30}}> - </Text>*/}
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProduto(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                                {/** <Text style={{fontSize:30}}> + </Text>*/}
                            </TouchableOpacity>
                        </View>
                    </View>               
                    </View>
                    
                )}
            />      
            
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
              enablesReturnKeyAutomatically = {true}
              placeholder= "Digite seu nome"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.inputPedido,{marginRight: 10, width: '80%'}]}
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
                placeholder= "Complemento"
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