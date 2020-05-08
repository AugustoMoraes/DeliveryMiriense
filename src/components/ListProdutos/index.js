import React from 'react'
import {View, Text} from 'react-native'

export default function ListProdutos({data}){
    <View>
        <Text>Teste</Text>
    </View>
}

/**
 *  
 * <View style={styles.cardProduto}>
                    <Image source={heineken} style={styles.img}/>
                    <View style={styles.descProduto}> 
                    <Text style={styles.txtDesc}>Cerveja: {produto.nome}</Text>
                        <Text style={styles.txtDesc}>Valor: R$: {produto.valor}</Text>

                        <View style={styles.qtd}>
                            <Text style={styles.txtDesc}>quantidade:</Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>subtrairQtd(qtdProdutoHeiniken,setQtdProdutoHeiniken, 6)}>
                                <IconMinus name="minuscircle" size={15}/>
                            </TouchableOpacity>
                            <Text>
                                {qtdProdutoHeiniken}
                            </Text>
                            <TouchableOpacity style={styles.btnQtd} onPress={()=>somarQtd(qtdProdutoHeiniken, setQtdProdutoHeiniken, 6)}>
                                <IconPlus name="pluscircle" size={15}/>
                            </TouchableOpacity>
                        </View>
                    </View>               
                    </View>
 */