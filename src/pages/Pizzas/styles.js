import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    header:{
        backgroundColor: '#8A2BE2',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20
    },
    txtHeader:{
        fontSize: 30,
        color: '#fff',
        width: '60%',
        textAlign: 'center'
    },
    btnIconHeader:{
        height: 60,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewBtnProdutos:{
        backgroundColor: '#8A2BE2',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5
    },
    btnProduto:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    txtBtnProduto:{
        color: '#fff',
        fontSize: 20
    },
    viewCard:{
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    cardProduto:{
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        opacity: 0.9 
    },
    descProduto:{
        paddingHorizontal: 5,
        width: '70%',
    },
    txtDesc:{
        fontSize:17,
        marginTop: 2,
    },
    img:{
        marginTop: 10,
        marginBottom: 5,
        height: 210,
        width: '90%',
    },
    qtd:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: '#ddd',
        marginVertical: 3,
    },
    btnQtd:{
        height: 30,
        width: 30,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewTotPreco:{
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#8A2BE2',
        justifyContent: 'space-around',
        alignItems: 'center',        
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20
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
        height: 40,
        backgroundColor: '#DC143C',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnConfirmar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 40,
        backgroundColor: '#008000',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    txtPedido:{
        fontSize: 22,
        color: '#fff'
    }
})
