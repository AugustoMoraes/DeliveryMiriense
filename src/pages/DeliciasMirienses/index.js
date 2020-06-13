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

import firebase from '../../database/firebase'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'

import background from '../../images/background.jpeg'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

Icon.loadFont()
Icon.loadFont()
    
export default function DeliciasMirienses({route}){

    const {item} = route.params
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [lanches2, setLanches2] = useState([])
    const [comida, setComida] = useState([])
    const [combo, setCombo] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [troco, setTroco] = useState('')

    const phone =  item.contato
    useEffect(()=> {
      async function loadingList(){

        await firebase.database().ref(item.key).child('lanches').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setProdutos([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
              img: childItem.val().img
            };
            setProdutos(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      async function loadingListLanches2(){

        await firebase.database().ref(item.key).child('lanches2').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setLanches2([])
         
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              grande: parseFloat(childItem.val().grande),
              medio: parseFloat(childItem.val().medio),
              pequeno: parseFloat(childItem.val().pequeno),
              fatia: parseFloat(childItem.val().fatia),
              contG: parseFloat(childItem.val().contG),
              contM: parseFloat(childItem.val().contM),
              contP: parseFloat(childItem.val().contP),
              contF: parseFloat(childItem.val().contF),
              img: childItem.val().img
            };
            setLanches2(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      async function loadingListComidas(){

        await firebase.database().ref(item.key).child('comidas').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setComida([])
         
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              ingredientes: childItem.val().ingredientes,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
              img: childItem.val().img
            };
            setComida(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      async function loadingListCombo(){

        await firebase.database().ref(item.key).child('combo').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
          setCombo([])
         
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nome: childItem.val().nome,
              valor: parseFloat(childItem.val().valor),
              cont: parseFloat(childItem.val().cont),
              img: childItem.val().img
            };
            setCombo(oldArray => [...oldArray, list]); 
          });
          
        });
      }
      
      loadingList();
      loadingListLanches2();
      loadingListComidas();
      loadingListCombo();
    }, []);
    
    function confirmar(){
      if(troco<getTotal()){
        return alert('Troco incorreto!')
      }
      if(nome != '' && endereco != '' && bairro!= ''){
       let pedido = montarMsg()
       let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotal())
       let seuTroco = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(troco)
       setModalVisible(false)
       zerarQtdProdutos()
       zerarForm()
       Linking.openURL(`whatsapp://send?text=Olá, me chamo ${nome} e gostaria de pedir: \n${pedido}\nTotal: ${total}\nTroco para ${seuTroco}\n\nLocal de Entrega: \n${endereco} nº ${numero}\n${bairro}\n${complemento}&phone=${phone}`)
      }else{
        alert('Preencha todos os campos!')
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
    function isValidaProduto(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.cont > 0){
          conProduto++
        }
      })
      lanches2.map( produto =>{
        if(produto.contG > 0){
          conProduto++
        }
      })
      lanches2.map( produto =>{
        if(produto.contM > 0){
          conProduto++
        }
      })
      lanches2.map( produto =>{
        if(produto.contP > 0){
          conProduto++
        }
      })
      lanches2.map( produto =>{
        if(produto.contF > 0){
          conProduto++
        }
      })
      combo.map( produto =>{
        if(produto.cont > 0){
          conProduto++
        }
      })
      
      comida.map( produto =>{
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
        var msg =''
        produtos.map((childItem)=>{
            if(childItem.cont > 0){
                msg += `${childItem.cont} ${childItem.nome}\n`
            }
        })
        lanches2.map((childItem)=>{
            if(childItem.contG > 0){
                msg += `${childItem.contG} ${childItem.nome} (Grande)\n`
            }
        })
        lanches2.map((childItem)=>{
            if(childItem.contM > 0){
                msg += `${childItem.contM} ${childItem.nome} (Médio)\n`
            }
        })
        lanches2.map((childItem)=>{
            if(childItem.contP > 0){
                msg += `${childItem.contP} ${childItem.nome} (Pequeno)\n`
            }
        })
        lanches2.map((childItem)=>{
            if(childItem.contF > 0){
                msg += `${childItem.contF} ${childItem.nome} (Fatia)\n`
            }
        })
        combo.map((childItem)=>{
            if(childItem.contF > 0){
                msg += `${childItem.cont} ${childItem.nome}\n`
            }
        })
        comida.map((childItem)=>{
            if(childItem.cont > 0){
                msg += `${childItem.cont} ${childItem.nome}\n`
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
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    function decrementarComida(item){
      setComida(comida.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont--
        }
        return produto
      }))
    }

    function incrementComida(item){
      setComida(comida.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    function decrementarCombo(item){
      setCombo(combo.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont--
        }
        return produto
      }))
    }

    function incrementCombo(item){
      setCombo(combo.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    
    function decrementarGrande(item){
      setLanches2(lanches2.map(produto =>{
        if((item.key == produto.key) && (produto.contG != 0)){
          produto.contG--
        }
        return produto
      }))
    }

    function incrementGrande(item){
        setLanches2(lanches2.map(produto =>{
        if(item.key == produto.key){
          produto.contG++
        }
        return produto
      }))
    }
    function decrementarMedio(item){
      setLanches2(lanches2.map(produto =>{
        if((item.key == produto.key) && (produto.contM != 0)){
          produto.contM--
        }
        return produto
      }))
    }

    function incrementMedio(item){
        setLanches2(lanches2.map(produto =>{
        if(item.key == produto.key){
          produto.contM++
        }
        return produto
      }))
    }
    function decrementarPequeno(item){
      setLanches2(lanches2.map(produto =>{
        if((item.key == produto.key) && (produto.contP != 0)){
          produto.contP--
        }
        return produto
      }))
    }

    function incrementPequeno(item){
        setLanches2(lanches2.map(produto =>{
        if(item.key == produto.key){
          produto.contP++
        }
        return produto
      }))
    }
    function decrementarFatia(item){
      setLanches2(lanches2.map(produto =>{
        if((item.key == produto.key) && (produto.contF != 0)){
          produto.contF--
        }
        return produto
      }))
    }

    function incrementFatia(item){
        setLanches2(lanches2.map(produto =>{
        if(item.key == produto.key){
          produto.contF++
        }
        return produto
      }))
    }

    function getTotalPagarLanche(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.valor * produto.cont)
        return total
      },0)
    }
    function getTotalPagarCombo(){
      return combo.reduce((total,produto)=>{
        total+= (produto.valor * produto.cont)
        return total
      },0)
    }
    
    function getTotalPagarComida(){
      return comida.reduce((total,produto)=>{
        total+= (produto.valor * produto.cont)
        return total
      },0)
    }
    
    function getTotalPagarGrande(){
      return lanches2.reduce((total,produto)=>{
        total+= (produto.grande * produto.contG)
        return total
      },0)
    }
    function getTotalPagarMedio(){
      return lanches2.reduce((total,produto)=>{
        total+= (produto.medio * produto.contM)
        return total
      },0)
    }
    function getTotalPagarPequeno(){
      return lanches2.reduce((total,produto)=>{
        total+= (produto.pequeno * produto.contP)
        return total
      },0)
    }
    function getTotalPagarFatia(){
      return lanches2.reduce((total,produto)=>{
        if(!isNaN(produto.contF))
          total+= (produto.fatia * produto.contF)
        return total
      },0)
    }
    function getTotalUnidade(){
      return lanches2.reduce((total,produto)=>{
        if(!isNaN(produto.contF)){
          total+= (produto.contP+produto.contM+produto.contG+produto.contGG+produto.contF)
       }
        return total
      },0)
    }
    function getTotal(){
      return  getTotalPagarLanche() + getTotalPagarMedio() + getTotalPagarGrande() + getTotalPagarPequeno() + getTotalPagarCombo() + getTotalPagarComida()  + getTotalPagarFatia()
    }

    function getQtdTotalProdutos(){
        return getQtdTotalLanches() + getQtdTotalGrande() + getQtdTotalMedio() + getQtdTotalPequeno() + getQtdTotalCombo() + getQtdTotalComida() + getQtdTotalFatia()
     
     }

    function getQtdTotalLanches(){
      return produtos.reduce( (total, produto) => {
        total+= produto.cont
        return total
      },0)
    }
    function getQtdTotalCombo(){
      return combo.reduce( (total, produto) => {
        total+= produto.cont
        return total
      },0)
    }
    function getQtdTotalComida(){
      return comida.reduce( (total, produto) => {
        total+= produto.cont
        return total
      },0)
    }
    
    function getQtdTotalGrande(){
      return lanches2.reduce( (total, produto) => {
        total+= produto.contG
        return total
      },0)
    }
    function getQtdTotalMedio(){
      return lanches2.reduce( (total, produto) => {
        total+= produto.contM
        return total
      },0)
    }
    function getQtdTotalPequeno(){
      return lanches2.reduce( (total, produto) => {
        total+= produto.contP
        return total
      },0)
    }
    function getQtdTotalFatia(){
      return lanches2.reduce((total,produto)=>{
        if(!isNaN(produto.contF)){
          total+= (produto.contP+produto.contM+produto.contG+produto.contF)
       }
        return total
      },0)
    }
    
    return(
      <View style={styles.container}>
            <ImageBackground source={background} style={{flex:1}}>
            <View style={styles.header}> 
              <TouchableOpacity style={styles.btnIconHeader} onPress={()=>{navigation.goBack()}}>
                  <Text style={styles.iconHeader}> {<Ionicons name="md-arrow-round-back" size={25} color="#fff"/>} </Text>
              </TouchableOpacity>
              <Text style={styles.txtHeader}>{item.nome}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>{<Icon name="shoppingcart" size={30} color="#fff"/>}</Text>
                <Text style={{fontSize: 20, paddingLeft: 5, color: '#fff'}}>
                  {getQtdTotalProdutos()}
                </Text>
              </View>
            </View>
            <ScrollView>
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={comida}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <View style={{justifyContent: 'center'}}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    </View>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>{item.nome} </Text>
                    {
                        (item.ingredientes != null) && (
                            <Text style={[styles.txtDesc,{color:'#999'}]}>Acompanhamento: {item.ingredientes} </Text>
                        )
                    }
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade:</Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarComida(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementComida(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                        </View>
                    </View>               
                    </View>     
                )}
            />      
            </View>     
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={produtos}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <View style={{justifyContent: 'center'}}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    </View>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>{item.nome} </Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade:</Text>
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
                )}
            />      
            </View>     
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={combo}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <View style={{justifyContent: 'center'}}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    </View>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>{item.nome} </Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade:</Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarCombo(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementCombo(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                        </View>
                    </View>               
                    </View>     
                )}
            />      
            </View>     
             
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={lanches2}
                renderItem= {({item})=>(
                    <View style={styles.cardProduto}>
                    <View style={{justifyContent: 'center'}}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    </View>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>{item.nome} </Text>
                        <View style={styles.qtd}>
                            <View style={{width:'60%'}}>
                            <Text style={styles.txtDesc}>Grande: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.grande)}</Text>
                            </View>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarGrande(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contG}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementGrande(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.qtd}>
                            <View style={{width:'60%'}}>
                                <Text style={styles.txtDesc}>Médio: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.medio)}</Text>
                            </View>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarMedio(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contM}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementMedio(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.qtd}>
                            <View style={{width:'60%'}}>
                                <Text style={styles.txtDesc}>Pequeno: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.pequeno)}</Text>
                            </View>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarPequeno(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.contP}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementPequeno(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                        </View>
                        {
                          !isNaN(item.contF) &&(
                            <View style={styles.qtd}>
                                <View style={{width:'60%'}}>
                                    <Text style={styles.txtDesc}>Fatia: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.fatia)}</Text>
                                </View>
                                <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarFatia(item)}>
                                    <Icon name="minuscircle" size={25} color="#ff0000"/>
                                </TouchableOpacity>
                                <Text>
                                  {item.contF}
                                </Text>
                                <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementFatia(item)}>
                                    <Icon name="pluscircle" size={25} color= '#008000'/>
                                </TouchableOpacity>
                            </View>
                          )
                        }
                    </View>               
                    </View>     
                )}
            />      
            </View>
            </ScrollView>
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