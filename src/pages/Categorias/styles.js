import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
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
    rodape:{
        backgroundColor: '#55aa',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtRodape:{
        fontSize: 30,
        paddingHorizontal: 10,
        color: '#fff'
    },
})