import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
    ScrollView, Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            password: "",
            repeatPassword: "",
            email: this.props.email,

            password_error: false,
            password_error_text: '',

            confirm_password_error: false,
            confirm_password_error_text: '',

            show_successfully_popup: false,



        };


    }


    backToRecoveryCode = () => {
        this.props.navigation.navigate("RecoveryAccountCode", {
            params: this.state.email
        });
    }
    redirectToSignIn= () => {
        this.props.navigation.navigate("SignIn");

    }

    confirmNewPassword = () => {

        let password = this.state.password;
        let password_confirmation = this.state.repeatPassword;


        if (password.length ==  0 || password_confirmation.length == 0 || password != password_confirmation  ) {


            if (password.length == 0 || password_confirmation.length == 0) {


                if (password.length == 0) {
                    this.setState({
                        password_error: true,
                        password_error_text: 'Поле пароля обязательно!',
                    })
                } else {
                    this.setState({
                        password_error: false,
                        password_error_text: '',
                    })
                }

                if (password_confirmation.length == 0) {
                    this.setState({
                        confirm_password_error: true,
                        confirm_password_error_text: 'Поле подтверждения пароля обязательно!',
                    })
                } else {
                    this.setState({
                        confirm_password_error: false,
                        confirm_password_error_text: '',
                    })
                }

            } else {

                this.setState({
                    password_error: false,
                    password_error_text: '',
                    confirm_password_error: false,
                    confirm_password_error_text: '',
                })

                if (password != password_confirmation) {
                    this.setState({
                        password_error: true,
                        password_error_text: 'Пароли не совпадают!',
                    })
                }

            }

        } else {

            try {
                fetch(`${APP_URL}/updatepassword`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        password_confirmation: this.state.repeatPassword,
                    })
                }).then((response) => {
                    return response.json()
                }).then((response) => {

                    console.log(response)



                    if (response.hasOwnProperty("message")) {
                        if (response.message == "Validation errors") {

                             if (response.data.hasOwnProperty('password')) {
                                   if (response.data.password == "The password must be at least 6 characters.") {
                                       this.setState({
                                           password_error: true,
                                           password_error_text: 'Поле должно содержпть не меньше 6 символов!',
                                       })
                                   }
                             }

                            if (response.data.hasOwnProperty('password_confirmation')) {
                                if (response.data.password_confirmation == "The password confirmation must be at least 6 characters.") {
                                    this.setState({
                                        confirm_password_error: true,
                                        confirm_password_error_text: 'Поле должно содержпть не меньше 6 символов!',
                                    })
                                }
                            }


                        }
                    } else {
                        this.setState({
                            password_error: false,
                            password_error_text: "",
                            confirm_password_error: false,
                            confirm_password_error_text: "",
                            show_successfully_popup: true,
                        })
                        // this.props.navigation.navigate("RecoveryAccountCode", {
                        //     params: this.state.email,
                        // });
                    }


                    //


                    //   console.log(response)
                })
            } catch (e) {
                console.log(e)
            }

        }




    }


    render() {

        return (
            <SafeAreaView style={styles.container} >

                <StatusBar style="dark" />
                <View style={styles.new_password_header}>
                    <View style={styles.back_to_recovery_code_btn_wrapper}>
                        <TouchableOpacity style={styles.back_recovery_code_btn}  onPress={() => this.backToRecoveryCode()}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={35}
                                height={35}
                                viewBox="0 0 35 35"
                                fill="none"

                            >
                                <Path
                                    d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z"
                                    fill="#000"
                                />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.new_password_main_title}>Задайте новый пароль</Text>
                </View>

                <ScrollView style={styles.new_password_main_wrapper}>


                    <Text style={styles.new_password_second_title}>
                        Придумайте сложный пароль,содержащий
                        строчные и прописные буквы,а так же цифры
                        и символы
                    </Text>

                    <View style={styles.new_password_inputs_wrapper}>
                        <View style={styles.new_password_input_wrapper}>
                            <Text style={styles.new_password_input_title}>Новый пароль</Text>
                            <TextInput
                                style={styles.new_password_input_field}
                                onChangeText={(val) => this.setState({password: val})}
                                value={this.state.password}
                            />
                            {this.state.password_error &&

                                <Text style={styles.error_text}>
                                    {this.state.password_error_text}
                                </Text>

                            }
                        </View>
                        <View style={styles.new_password_input_wrapper}>
                            <Text style={styles.new_password_input_title}>Повторите пароль</Text>
                            <TextInput
                                style={styles.new_password_input_field}
                                onChangeText={(val) => this.setState({repeatPassword: val})}
                                value={this.state.repeatPassword}
                            />
                            {this.state.confirm_password_error &&

                                <Text style={styles.error_text}>
                                    {this.state.confirm_password_error_text}
                                </Text>

                            }
                        </View>
                    </View>



                    <View style={styles.confirm_new_password_btn_wrapper}>
                        <TouchableOpacity style={styles.confirm_new_password_btn}  onPress={() => {this.confirmNewPassword()}}>
                            <Text style={styles.confirm_new_password_btn_text}>Подтвердить</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {this.state.show_successfully_popup &&
                  <View style={styles.success_modal}>
                    <View style={styles.cash_payment_modal_wrapper}>

                        <View style={styles.online_payment_modal_icon}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={160}
                                height={160}
                                viewBox="0 0 160 160"
                                fill="none"
                            >
                                <Path
                                    d="M80 150c38.66 0 70-31.34 70-70s-31.34-70-70-70-70 31.34-70 70 31.34 70 70 70z"
                                    fill="#E6524B"
                                />
                                <Path
                                    d="M115.333 48.667L70 94 51.333 75.333 42 84.667l28 28L124.667 58l-9.334-9.333z"
                                    fill="#EFEFEF"
                                />
                            </Svg>
                        </View>
                        <Text style={styles.online_payment_modal_title}>
                            Пароль успешно изменен!
                        </Text>
                        <TouchableOpacity style={styles.online_payment_modal_go_to_catalog_button} onPress={() => {this.redirectToSignIn()}}>
                            <Text style={styles.online_payment_modal_go_to_catalog_button_text}>Войти</Text>
                        </TouchableOpacity>
                    </View>
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

    new_password_header: {
        height: 145,
        marginBottom: 10,
        paddingHorizontal: 25,
    },
    back_to_recovery_code_btn_wrapper: {
        marginBottom: 30,
    },
    new_password_main_wrapper: {
        width: '100%',
        paddingHorizontal: 25,
       flex: 1,

    },

    new_password_main_title: {
        color: "#333333",
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
        lineHeight: 40,
    },

    new_password_second_title: {
        color: '#545454',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 30,
        marginRight: 12,
        lineHeight: 22,
    },



    recovery_account_confirm_code_btn: {
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

    recovery_account_confirm_code_btn_text: {
        color: '#ffffff',
        fontWeight:'bold',
        fontSize: 18,
        lineHeight: 29,
    },

    code_input_field: {
        width: 45,
        height: 60,
        backgroundColor: '#DFDFDF',
        fontSize:15,
        color:'#000000',
        borderRadius:8,
        paddingHorizontal:14,
        borderColor: "#DFDFDF",
        borderWidth: 1,
        fontWeight: "bold",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

    },


    recovery_account_code_inputs_wrapper: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 10,
    },
    send_code_again_btn_wrapper: {
        marginBottom: 28,
    },
    send_code_again_btn: {
        alignSelf: "center",
    },
    send_code_again_btn_text: {
        color: "#D0251D",
        fontSize: 14,
        fontWeight: '400',
    },
    new_password_input_title: {
        color: "#000000",
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 5,
    },

    new_password_input_field: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: '#E4E4E4',
        height: 50,
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 15,
    },
    new_password_input_wrapper: {
        marginBottom: 15,
    },
    new_password_inputs_wrapper:{
        marginBottom: 100,
    },
    confirm_new_password_btn: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        marginBottom: 18,
        width: "100%",
        maxWidth: 265,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
    },
    confirm_new_password_btn_text: {
        color: '#ffffff',
        fontWeight:'bold',
        fontSize: 18,
        lineHeight: 29,
    },

    error_text: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        marginTop: 5,
    },


    success_modal: {
        backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        height: windowHeight,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    cash_payment_modal_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 37,
        paddingBottom: 240,
        paddingHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',

    },
    online_payment_modal_icon: {
        marginBottom: 20,
    },

    online_payment_modal_title: {
        marginBottom: 97,
        color: '#333333',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    online_payment_modal_go_to_catalog_button: {
        backgroundColor:'#D0251D',
        borderRadius: 8,
        height: 50,
        width: 265,
        justifyContent: 'center',
        alignItems: 'center',

    },
    online_payment_modal_go_to_catalog_button_text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    online_payment_modal_close_button: {
        position: 'absolute',
        right: 20,
        top:60,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },


});
