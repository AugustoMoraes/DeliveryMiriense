import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ddd'
    },
    header:{
        backgroundColor: '#8A2BE2',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'  
    },
    txtHeader:{
        fontSize: 25,
        color: '#fff',
        justifyContent: 'flex-end',
    },
    cardProduto:{
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
    },
    descProduto:{
        paddingHorizontal: 5
    },
    txtDesc:{
        fontSize:17,
        marginVertical: 10,
    },
    img:{
        height: 120,
        width: 120,
    },
    qtd:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnQtd:{
        height: 30,
        width: 30,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewTotPreco:{
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#8A2BE2',
        justifyContent: 'space-around',
        alignItems: 'center',        
    },
    txtTotPreco:{
        fontSize: 25,
        color: '#fff',
        padding:3
    },  
    btnPedir:{
        //backgroundColor: '#8A2BE2',
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtnPedir:{
        fontSize: 25,
        textTransform: 'uppercase',
        color: '#fff'
    },
    modalView: {
        backgroundColor: "#8A2BE2",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 10,
    },
    viewTxtProdutos:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtProdutos:{
        fontSize: 20,
    },
    inputPedido:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 5,
        marginBottom:10
    },
    btnCancelar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 30,
        backgroundColor: '#DC143C',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnConfirmar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 30,
        backgroundColor: '#008000',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    txtPedido:{
        fontSize: 17,
        color: '#fff'
    }
})
