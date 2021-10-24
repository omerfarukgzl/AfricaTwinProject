
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container:
    {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 30,
    },
    textInputStyle:
    {
        backgroundColor:'#eaeaea',
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        borderRadius: 20,
        marginTop: 20,
    },
    errorMsg: {
        color: '#760707',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonStyle:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d2651',
        width: '100%',
        height: 50,
        borderRadius: 50,
        marginTop: 40,
    },
});