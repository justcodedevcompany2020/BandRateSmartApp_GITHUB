import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { StatusBar } from 'expo-status-bar';

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

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    redirectToSignUp= () => {
        this.props.navigation.navigate("SignUp");

    }


    redirectToSignIn= () => {
        this.props.navigation.navigate("SignIn");

    }

    redirectToCatalogCategory= () => {
        this.props.navigation.navigate("CatalogCategory");
    }

    render() {

        return (
            <View style={styles.container} >
                <StatusBar style="light" />
                <ScrollView style={styles.dashboard_main_wrapper}>
                    <View style={styles.dashboard_img_parent}>
                        <Image style={styles.dashboard_img} source={require('../../assets/images/dashboard_img.png')} />
                    </View>
                    <View style={styles.dashboard_info_wrapper}>
                        <Text style={styles.dashboard_info_title}>Добро пожаловать!</Text>
                        <Text style={styles.dashboard_info_text}>
                            Регистрирутесь или зайдите в уже
                            существующий аккаунт
                        </Text>
                    </View>

                    <View style={styles.register_login_buttons_wrapper}>
                        <TouchableOpacity style={styles.register_btn}  onPress={() => this.redirectToCatalogCategory()}>
                            <Text style={styles.register_btn_text}>Каталог</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.login_btn}  onPress={() => this.redirectToSignIn()}>
                            <Text style={styles.login_btn_text}>Войти</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>





            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%"


    },
    dashboard_img_parent: {
        width: "100%",
        height: 375,
        marginBottom: 40,
    },
    dashboard_img:{
        width:"100%",
        height: "100%",
    },
    dashboard_info_title: {
        color: "#333333",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    dashboard_info_text: {
      color: "#545454",
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center",
    },

    dashboard_info_wrapper: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 35,
        marginBottom: 100,
    },
    register_login_buttons_wrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    register_btn: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        paddingHorizontal: 19,
        paddingVertical: 13,
        marginRight: 16,
        width: 215,
        alignItems: 'center',
        justifyContent: 'center',
    },

    register_btn_text: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold',
    },

    login_btn: {
        borderWidth: 1,
        borderBottomColor: '#000000',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        paddingHorizontal: 13,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },

    login_btn_text: {
        color: '#000000',
        fontSize: 16,
        fontWeight: "bold",
    },

    dashboard_main_wrapper: {
         flex: 1,
        width: '100%',
    }






});
