import {StyleSheet} from 'react-native'

export default StyleSheet.create({
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