import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1
    },
    cardVendedores:{
        marginVertical: 10,
        marginHorizontal: 10,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000',
        elevation: 5
    },
    txtDesc:{
        fontSize: 20,
    },
    descEstabelecimento:{
        marginTop: 5,
        marginBottom: 5
    },
    viewHorario:{
        flexDirection: 'row',
    },
    viewBtn:{
        marginBottom: 10,
        backgroundColor: '#008000',
        borderRadius: 7,
        height: 40,
        width: 150,
        alignSelf: 'flex-end',
        marginRight: 7

    },
    btn:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtBtn:{
        fontSize: 17,
        color: '#fff'
    }
})