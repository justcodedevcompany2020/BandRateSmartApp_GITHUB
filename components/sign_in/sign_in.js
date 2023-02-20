import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';
import {AuthContext} from "../AuthContext/context";


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
            email: null,
            password: null,
            privacy_policy: true,

            privacy_policy_valid: false,
            privacy_policy_error: false,
            privacy_policy_error_text: "",

            email_valid: false,
            email_error: false,
            email_error_text: "",

            password_valid: false,
            password_error: false,
            password_error_text: ''


        };


    }

    static contextType = AuthContext

    componentDidMount() {

    }



    backToDashboard= () => {
        this.props.navigation.navigate("Dashboard");

    }
    redirectToRecoveryAccountEmail = () => {
        this.props.navigation.navigate("RecoveryAccountEmail");
    }

    // redirectToCatalog = () => {
    //     this.props.navigation.navigate("Catalog");
    // }
    //

    signInHandler = async () => {
        let {email, password, privacy_policy} = this.state;

            try {
                fetch(`http://37.230.116.113/BandRate-Smart/public/api/login`, {
                    method: 'POST',
                    headers: {

                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                }).then((response) => {
                    return response.json()
                }).then((response) => {

                    console.log(response)

                    if (response.message == "User does not exist" || privacy_policy === false || response.message == "Validation errors" || response.message == "Password mismatch" ) {

                        console.log("Validation Error")

                        if (response.message == "User does not exist") {
                            this.setState({
                                email_error: true,
                                email_valid: false,
                                email_error_text: 'Пользователь не найден!'

                            })
                        }
                        else {
                            this.setState({
                                email_error: false,
                                email_valid: false,
                                email_error_text: ''
                            })
                        }



                        if (privacy_policy === false) {
                            this.setState({
                                privacy_policy_valid: false,
                                privacy_policy_error: true,
                                privacy_policy_error_text: "Согласитесь с правилами!",
                            })
                        } else  {
                            this.setState({
                                privacy_policy_valid: false,
                                privacy_policy_error: false,
                                privacy_policy_error_text: "",
                            })
                        }

                        if ( response.message == "Validation errors") {
                            if (response.data.hasOwnProperty('email')) {
                                this.setState({
                                    email_error: true,
                                    email_valid: false,
                                    email_error_text: 'Некоректный E-email'
                                })
                            } else {
                                this.setState({
                                    email_error: false,
                                    email_valid: false,
                                    email_error_text: ''
                                })
                            }

                            if (response.data.hasOwnProperty('password')) {
                                this.setState({
                                    password_error: true,
                                    password_valid: false,
                                    password_error_text: 'Некоректный пароль!'
                                })
                            } else {
                                this.setState({
                                    password_error: false,
                                    password_valid: false,
                                    password_error_text: ''
                                })
                            }
                        } else {
                            this.setState({
                                password_error: false,
                                password_valid: false,
                                password_error_text: ''
                            })
                        }

                        if (response.message == "Password mismatch") {
                            this.setState({
                                password_error: true,
                                password_valid: false,
                                password_error_text: 'Пароли не верный!'

                            })
                        }
                        else {
                            this.setState({
                                password_error: false,
                                password_valid: false,
                                password_error_text: ''
                            })
                        }


                    } else {


                        let foundUser = {
                            email: email,
                            password: password,
                            token: response.data.token
                        }

                        // console.log(response, "user");
                        console.log(response.data.token, "user");


                        this.setState({
                            email: '',
                            password: '',
                            email_error: false,
                            password_error: false,
                        })

                        this.context.signIn(foundUser, () => {
                            this.props.navigation.navigate('CatalogCategory')
                        });

                    }

                    //   console.log(response)
                })
            } catch (e) {
                console.log(e)
            }





        // this.props.navigation.navigate("DogsBreeds");
    }





    render() {

        return (
            <SafeAreaView style={styles.container} >

                <StatusBar style="dark" />



               <View style={styles.sign_in_header}>
                   <View style={styles.back_to_dashboard_btn_wrapper}>
                       <TouchableOpacity style={styles.back_to_dashboard_btn}  onPress={() => this.backToDashboard()}>
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
                   <Text style={styles.sing_in_title}>Вход</Text>
               </View>


                <ScrollView style={styles.sing_in_inputs_title_wrapper}>

                    <View style={styles.sign_in_inputs_main_box}>
                        <View style={styles.sign_in_input_wrapper}>
                                <Text style={styles.sign_in_input_title}>Электронная почта</Text>

                            <TextInput
                                style={styles.sign_in_input_field}
                                onChangeText={(val) => this.setState({email: val})}
                                value={this.state.email}
                            />

                            {this.state.email_error &&

                                <Text style={styles.error_text}>
                                    {this.state.email_error_text}
                                </Text>

                            }
                        </View>
                        <View style={styles.sign_in_input_wrapper}>
                                <Text style={styles.sign_in_input_title}>Пароль</Text>

                            <TextInput
                                style={styles.sign_in_input_field}
                                onChangeText={(val) => this.setState({password: val})}
                                value={this.state.password}
                                secureTextEntry={true}

                            />
                            {this.state.password_error &&

                                <Text style={styles.error_text}>
                                    {this.state.password_error_text}
                                </Text>

                            }
                        </View>
                        <View style={styles.privacy_policy_checkbox_input}>
                            <TouchableOpacity
                                style={[styles.inputRadio, this.state.privacy_policy ? styles.activeInputRadioBorder : {}]}
                                onPress={()=> {
                                    this.setState({
                                        privacy_policy: !this.state.privacy_policy,
                                    })
                                }}>
                                {this.state.privacy_policy &&
                                <View style={styles.activeRadioRound}>

                                    <Svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 83 65"
                                        fill="none"
                                    >
                                        <Path
                                            d="M73.333.667L28 46 9.333 27.333 0 36.667l28 28L82.667 10 73.333.667z"
                                            fill="#EFEFEF"
                                        />
                                    </Svg>

                                </View>
                                }
                            </TouchableOpacity>
                           <Text style={[styles.privacy_policy_text]}>
                                   Согласен с правилами

                               <View style={{paddingRight:5}}></View>
                               <Text style={[styles.privacy_policy_text_bold]}>
                                         бренда и политикой конфиденциальности

                               </Text>
                           </Text>


                        </View>
                        {this.state.privacy_policy_error &&

                            <Text style={[styles.error_text, {marginTop: 5}]}>
                                {this.state.privacy_policy_error_text}
                            </Text>

                        }
                    </View>

                        <TouchableOpacity style={styles.sign_in_btn} onPress={() => this.signInHandler()}>
                            <Text style={styles.sign_in_btn_text}>Войти</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.forget_password_btn} onPress={() => this.redirectToRecoveryAccountEmail()}>
                            <Text style={styles.forget_password_btn_text}>Забыли пароль?</Text>
                        </TouchableOpacity>

                </ScrollView>



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
