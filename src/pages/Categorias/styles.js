import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        backgroundColor: '#8A2BE2',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomLeftRadius: 100
    },
    txtHeader:{
        fontSize: 35,
        color: '#fff',
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
    }
})