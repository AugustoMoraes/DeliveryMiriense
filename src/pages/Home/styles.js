import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        backgroundColor: '#429',
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
        backgroundColor: '#ddd',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000',
    },
})