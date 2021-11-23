import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      maps: {
        ...StyleSheet.absoluteFillObject,
        width:'100%',
      },
      locationAdButton:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d2651',
        padding: 5,
        height: 50,
        width:50,
        borderRadius: 50,
        marginLeft:'80%',
        marginBottom:'15%',
    },
});