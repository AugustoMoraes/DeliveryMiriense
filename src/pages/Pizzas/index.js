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
    
export default function Pizzas({route}){
    const navigation = useNavigation()
    const {item} = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [sucos, setSucos] = useState([])
    const [refri, setRefri] = useState([])
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [troco, setTroco] = useState('')

    const phone =  item.contato

    async function loadingList(){

      await firebase.database().ref(item.key).child('pizza').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
        setProdutos([])
        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            nome: childItem.val().nome,
            ingredientes: childItem.val().ingredientes,
            contB: parseFloat(childItem.val().contB),
            contP: parseFloat(childItem.val().contP),
            contM: parseFloat(childItem.val().contM),
            contG: parseFloat(childItem.val().contG),
            contGG: parseFloat(childItem.val().contGG),
            contF: parseFloat(childItem.val().contF),
            brotinho: parseFloat(childItem.val().brotinho),
            pequena: parseFloat(childItem.val().pequena),
            media: parseFloat(childItem.val().media),
            grande: parseFloat(childItem.val().grande),
            familia: parseFloat(childItem.val().familia),
            img: childItem.val().img
          };
          setProdutos(oldArray => [...oldArray, list]); 
        });
        
        });
    }
    
    async function loadingListSucos(){

      await firebase.database().ref(item.key).child('sucos').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
        setSucos([])
        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            nome: childItem.val().nome,
            cont: parseFloat(childItem.val().cont),
            valor: parseFloat(childItem.val().valor),
            img: childItem.val().img
          };
          setSucos(oldArray => [...oldArray, list]); 
        });
        
        });
    }
    
    async function loadingListRefri(){

      await firebase.database().ref(item.key).child('refrigerantes').orderByChild('disponivel').equalTo('true').on('value', (snapshot)=> {
        setRefri([])
        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            nome: childItem.val().nome,
            sabores: childItem.val().sabores,
            cont: parseFloat(childItem.val().cont),
            valor: parseFloat(childItem.val().valor),
            img: childItem.val().img
          };
          setRefri(oldArray => [...oldArray, list]); 
        });
        
        });
    }
    
    
    useEffect(()=> {
      loadingList()
      loadingListSucos()
      loadingListRefri()
    }, []);
    
    function confirmar(){
      if(troco == 0){
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
      }else{
        if(troco<getTotalPreco()){
          return alert('Troco incorreto!')
        }else{
          if(nome != '' && endereco != '' && bairro!= ''){
            let pedido = montarPedidoUnidade()
            let total = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(getTotalPreco())
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
    function isValidaSuco(){
      let conProduto = 0
      sucos.map( produto =>{
        if(produto.cont > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    function isValidaRefri(){
      let conProduto = 0
      refri.map( produto =>{
        if(produto.cont > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    function isValidaProdutoPequena(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contP > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
    }
    function isValidaProdutoBrotinho(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contB > 0){
          conProduto++
        }
      })
      return conProduto > 0 ? true : false 
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
    function isValidaProdutoGigante(){
      let conProduto = 0
      produtos.map( produto =>{
        if(produto.contGG > 0){
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
      if(isValidaProdutoMedia() || isValidaProdutoGrande() || isValidaProdutoFamilia() 
          || isValidaProdutoGigante() || isValidaProdutoPequena() || isValidaProdutoBrotinho() ||
          isValidaRefri() || isValidaSuco()){
        setModalVisible(true)
      }else{
        alert('Nenhum Produto selecionado para compra!')
      }
    }
    function montarPedidoUnidade(){
        var msg =''
        produtos.map((childItem)=>{
        if(childItem.contB > 0){
            msg += `${childItem.contB} ${childItem.nome} Brotinho\n`
          }
        })
        produtos.map((childItem)=>{
        if(childItem.contP > 0){
            msg += `${childItem.contP} ${childItem.nome} Pequena\n`
          }
        })
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
        if(childItem.contGG > 0){
            msg += `${childItem.contGG} ${childItem.nome} Gigante\n`
          }
        })
        produtos.map((childItem)=>{
        if(childItem.contF > 0){
            msg += `${childItem.contF} ${childItem.nome} Família\n`
          }
        })
        sucos.map((childItem)=>{
        if(childItem.cont > 0){
            msg += `${childItem.cont} ${childItem.nome} Família\n`
          }
        })
        refri.map((childItem)=>{
        if(childItem.cont > 0){
            msg += `${childItem.cont} ${childItem.nome} Família\n`
          }
        })
        return msg
    }


    function cancelar(){
      setModalVisible(false)
      zerarForm()
    }

    function decrementarProdutoBrotinho(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contB != 0)){
          produto.contB--
        }
        return produto
      }))
    }

    function incrementProdutoBrotinho(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contB++
        }
        return produto
      }))
    }

    function decrementarProdutoPequena(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contP != 0)){
          produto.contP--
        }
        return produto
      }))
    }

    function incrementProdutoPequena(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contP++
          getTotalPequena()
        }
        return produto
      }))
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
    function decrementarProdutoGigante(item){
      setProdutos(produtos.map(produto =>{
        if((item.key == produto.key) && (produto.contGG != 0)){
          produto.contGG--
        }
        return produto
      }))
     
    }

    function incrementProdutoGigante(item){
      setProdutos(produtos.map(produto =>{
        if(item.key == produto.key){
          produto.contGG++
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
    function decrementarSuco(item){
      setSucos(sucos.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont--
        }
        return produto
      }))
    }

    function incrementSuco(item){
      setSucos(sucos.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    function decrementarRefri(item){
      setRefri(refri.map(produto =>{
        if((item.key == produto.key) && (produto.cont != 0)){
          produto.cont--
        }
        return produto
      }))
    }

    function incrementRefri(item){
      setRefri(refri.map(produto =>{
        if(item.key == produto.key){
          produto.cont++
        }
        return produto
      }))
    }
    
    function getTotalRefri(){
        return refri.reduce((total,produto)=>{
          total+= (produto.valor * produto.cont)
          return total
        },0)
    }
    function getTotalSucos(){
        return sucos.reduce((total,produto)=>{
          total+= (produto.valor * produto.cont)
          return total
        },0)
    }
    function getTotalBrotinho(){
        return produtos.reduce((total,produto)=>{
          if(!isNaN(produto.contB))
            total+= (produto.brotinho * produto.contB)
          return total
        },0)
    }
    function getTotalPequena(){
      return produtos.reduce((total,produto)=>{
        if(!isNaN(produto.contP))
          total+= (produto.pequena * produto.contP)
        return total
      },0)
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
    function getTotalGigante(){
      return produtos.reduce((total,produto)=>{
        total+= (produto.grande * produto.contGG)
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
        if(!isNaN(produto.contP)){
          total+= (produto.contP+produto.contM+produto.contG+produto.contGG+produto.contF)
        }
        if(!isNaN(produto.contB)){
          total+= (produto.contB)
        }
        
        return total
      },0)
    }
  
    function getTotalPreco(){
      return getTotalBrotinho() + getTotalPequena() + getTotalMedia() + getTotalGrande() + getTotalGigante() + getTotalFamilia() + getTotalSucos() + getTotalRefri()
    }
    function getQtdTotalProdutos(){
      return getTotalUnidade()
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
              <Text style={styles.txtHeader}>Delivery Miriense</Text>
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
                data={produtos}
                renderItem= {({item})=>(
                  <View style={styles.cardProduto}>
                  <Image source={{uri: item.img}} style={styles.img}/>
                  <View style={styles.descProduto}>
                  <Text style={styles.txtDesc}>Sabor: {item.nome}</Text>
                  <Text style={[styles.txtDesc, {color: '#999'}]}>{item.ingredientes}</Text>
                  {
                      !isNaN(item.contB) &&(
                      <View style={styles.qtd}>
                          <Text style={styles.txtDesc}>Brotinho: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.brotinho)}</Text>
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                          <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoBrotinho(item)}>
                              <Icon name="minuscircle" size={25} color="#ff0000"/>
                          </TouchableOpacity>
                          <Text>
                            {item.contB}
                          </Text>
                          <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoBrotinho(item)}>
                              <Icon name="pluscircle" size={25} color= '#008000'/>
                          </TouchableOpacity>
                          </View>
                      </View>
                    )
                  }
                  {
                      !isNaN(item.contP) &&(
                      <View style={styles.qtd}>
                          <Text style={styles.txtDesc}>Pequena: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.pequena)}</Text>
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                          <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoPequena(item)}>
                              <Icon name="minuscircle" size={25} color="#ff0000"/>
                          </TouchableOpacity>
                          <Text>
                            {item.contP}
                          </Text>
                          <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoPequena(item)}>
                              <Icon name="pluscircle" size={25} color= '#008000'/>
                          </TouchableOpacity>
                          </View>
                      </View>
                    )
                  }
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
                          <Text style={styles.txtDesc}>Gigante: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.grande)}</Text>
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                          <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarProdutoGigante(item)}>
                              <Icon name="minuscircle" size={25} color="#ff0000"/>
                          </TouchableOpacity>
                          <Text>
                            {item.contGG}
                          </Text>
                          <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementProdutoGigante(item)}>
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
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={sucos}
                renderItem= {({item})=>(
                  <View style={styles.cardProduto}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>Sabor: {item.nome}</Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade:</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarSuco(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementSuco(item)}>
                                <Icon name="pluscircle" size={25} color= '#008000'/>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>               
                  </View>
                )}
            />      
            </View>
            <View style={styles.viewCard}>
            <FlatList
                key= {item => item.key}
                data={refri}
                renderItem= {({item})=>(
                  <View style={styles.cardProduto}>
                    <Image source={{uri: item.img}} style={styles.img}/>
                    <View style={styles.descProduto}>
                    <Text style={styles.txtDesc}>Refrigerante: {item.nome}</Text>
                    <Text style={styles.txtDesc}>Sabores: {item.sabores}</Text>
                    <Text style={styles.txtDesc}>Valor: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>Quantidade:</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>decrementarRefri(item)}>
                                <Icon name="minuscircle" size={25} color="#ff0000"/>
                            </TouchableOpacity>
                            <Text>
                              {item.cont}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>incrementRefri(item)}>
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