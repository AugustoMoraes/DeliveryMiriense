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
    cardVendedores:{
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000',
        elevation: 5
    },
    img:{
        height: 130,
        width: 130,
    },
    txtDesc:{
        fontSize: 20,
        textAlign: 'center'
    },
    viewHorario:{
        flexDirection: 'row',
    },
    descEstabelecimento:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewBtn:{
        marginBottom: 10,
        backgroundColor: '#008000',
        borderRadius: 7,
        height: 40,
        width: 150,
        marginTop: 5

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
    },
    viewFooter:{
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#8A2BE2',
        alignItems: 'center',        
        borderTopRightRadius: 100,
    },
    txtFooter:{
        fontSize: 23,
        color: '#fff',
        padding:3
    },
})