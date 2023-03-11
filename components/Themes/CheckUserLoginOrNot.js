import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';
import {AuthContext} from "../AuthContext/context";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    ScrollView
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader:true
        };


    }

    static contextType = AuthContext

    componentDidMount() {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener("focus", () => {

            this.checkAuth();
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            // console.log('Bum END')
        }

    }


    checkAuth = async() => {
        let userToken = await AsyncStorage.getItem('userToken');

        console.log(userToken, 'userTokenuserTokenuserTokenuserToken')
        let auth_user =  userToken ? true : false

        await this.setState({
            loader:false
        })
        if(auth_user)
        {
            this.props.navigation.navigate('ThemesCatalogComponent')
        } else {
            this.props.navigation.navigate('SignIn')
        }

        // alert(auth_user)
    }

    backToDashboard= () => {
        this.props.navigation.navigate("Dashboard");

    }
    redirectToRecoveryAccountEmail = () => {
        this.props.navigation.navigate("RecoveryAccountEmail");
    }



    render() {

        return (
            <SafeAreaView style={styles.container} >

                <StatusBar style="dark" />


                {this.state.loader &&

                    <View style={{width: '100%', height: '100%', backgroundColor: '#ffffff', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                        {/*<Image style={{width: 300, marginBottom: 30}} source={require('../assets/images/band_rate_logo.png')} />*/}
                        <ActivityIndicator size="large" color="red"/>
                    </View>

                }

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",
        paddingTop: 37,


    },

    sign_in_header: {
        height: 122,
        paddingHorizontal: 25,
        marginBottom: 30,

    },

    back_to_dashboard_btn_wrapper: {
        marginBottom: 30,
    },


    sing_in_inputs_title_wrapper: {
        width: "100%",
        paddingHorizontal: 25,
        flex: 1,
    },
    sign_in_inputs_main_box: {
        marginBottom: 85,
        // paddingHorizontal: 25,
    },

    sing_in_title: {
        marginBottom: 30,
        color: '#333333',
        fontSize: 36,
        fontWeight: 'bold',
    },
    sign_in_input_title: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5,
        lineHeight: 24,
    },
    sign_in_input_wrapper: {
        marginBottom: 15,
    },
    sign_in_input_field: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: '#E4E4E4',
        height: 50,
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 15,
    },
    sign_in_btn: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        marginBottom: 18,
        width: "100%",
        maxWidth: 265,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    sign_in_btn_text: {
        color: '#ffffff',
        fontWeight:'bold',
        fontSize: 18,
        lineHeight: 29,
    },
    forget_password_btn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    forget_password_btn_text: {
       color: '#000000',
        fontWeight:'bold',
        fontSize: 15,
    },
    // activeInputRadioBorder: {
    //    borderColor: '#D0251D',
    // },

    inputRadio: {
        backgroundColor: "#E4E4E4",
        width: 28,
        height: 28,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    activeRadioRound:{
        width: 28,
        height: 28,
        backgroundColor: "#D0251D",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    privacy_policy_checkbox_input: {
        flexDirection: 'row',
    },
    privacy_policy_text: {
        color: '#000000',
        fontSize: 12,
        fontWeight: '400',
        paddingRight: 5,

    },

    privacy_policy_text_bold: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000000',
        paddingLeft: 5,

    },

    error_text: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
       marginTop: 5,
    },





});
