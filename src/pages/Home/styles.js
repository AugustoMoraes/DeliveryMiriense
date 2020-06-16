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
        fontSize: 35,
        color: '#fff',
    },
    btnIconHeader:{
        height: 60,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardVendedores:{
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000',
        elevation: 5,
        opacity: 0.9
    },
    img:{
        height: 135,
        width: 135,
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