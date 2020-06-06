import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    header:{
        //backgroundColor: '#8A2BE2',
        height: 100,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //borderBottomLeftRadius: 100
    },
    txtHeader:{
        fontSize: 30,
        color: '#fff',
        width: '60%',
        textAlign: 'center'
    },
    listCategorias:{

    },
    cardCategoria:{
        flexGrow: 1,
        margin: 16,
        marginTop: 15,
        height: 200,
    },
    imgCard:{
        width: '100%',
        height: '100%',
        borderRadius: 7
    },
    viewFooter:{
        backgroundColor: '#8A2BE2',
        alignItems: 'center',        
    },
    txtFooter:{
        paddingHorizontal: 15,
        fontSize: 17,
        color: '#fff',
    },
    btnContato:{
        backgroundColor: '#fff',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    txtContato:{
        fontSize: 20,
        color: '#8A2BE2'
    }
})