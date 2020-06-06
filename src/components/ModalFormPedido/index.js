import React,{useState} from 'react'
import {View, Text, TextInput,Modal} from 'react-native'

import styles from './styles'
export default function ModalFormPedido({data}){

    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    return(
      <View>
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
