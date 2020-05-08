import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ddd'
    },
    header:{
        backgroundColor: '#8A2BE2',
        height: 40,
        justifyContent: 'center'
    },
    txtHeader:{
        fontSize: 25,
        color: '#fff',
        alignSelf: 'center'
    },
    cardProduto:{
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000',
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
        alignItems: 'center'
    },
    btnQtd:{
        backgroundColor: '#777',
        height: 30,
        width: 30,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewTotPreco:{
        flexDirection: 'row',
        backgroundColor: '#8A2BE2',
        justifyContent: 'space-evenly',
        alignItems: 'center',        
    },
    txtTotPreco:{
        fontSize: 20,
        color: '#fff'
    },  
    btnPedir:{
        backgroundColor: '#00FA9A',
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtnPedir:{
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#fff'
    },
    modalView: {
        marginTop: '90%',
        backgroundColor: "#4fd",
        borderRadius: 20,
        padding: 10,
    },
    inputPedido:{
        backgroundColor: '#ddd',
        borderRadius: 10,
        padding: 5,
        marginBottom:10
    }
})
