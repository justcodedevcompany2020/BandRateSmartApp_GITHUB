import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            phone: null,
            password: null,
            repeatPassword: null,



            name_valid: false,
            name_error: false,
            name_error_text: "",

            email_valid: false,
            email_error: false,
            email_error_text: "",

            phone_valid: false,
            phone_error: false,
            phone_error_text: "",

            password_valid: false,
            password_error: false,
            password_error_text: '',

            password_confirmation_error: false,
            password_confirmation_valid: false,
            password_confirmation_error_text: '',
            isOpenCodeDropDown: false,
            selectedPhoneCode: "+7",
            error_phone_code: false,
            valid_phone_code: true,
            phoneCodesArray: [
                {
                    "label": "Russian",
                    "value": "+7",
                },
                {
                    "label": "Belarusia",
                    "value": "+375",
                },

          ],

        };


    }

    static contextType = AuthContext

    componentDidMount() {

    }




    backToDashboard= () => {
        this.props.navigation.navigate("Dashboard");

    }
    registerForPushNotificationsAsync = async () => {
        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                throw new Error('Permission not granted!')
            }
            const token = (await Notifications.getExpoPushTokenAsync({experienceId: "@a200796a/BandRateSmart"})).data;

            return token
        } catch (error) {
            console.error(error)
        }
    }

    signUpHandler = async () => {
        let {name, email, phone, password, repeatPassword, selectedPhoneCode } = this.state;
        let push_ident = Device.isDevice ?  await this.registerForPushNotificationsAsync() : 'f65f1f1232f123e51f35ef1we35f1we351fw35';

        console.log(push_ident, 'push_ident')

        try {
            fetch(`http://37.230.116.113/BandRate-Smart/public/api/register`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phoneCode: selectedPhoneCode,
                    phone: phone,
                    password: password,
                    password_confirmation: repeatPassword,
                    I_agree: true,
                    push_ident: push_ident

                })
            }).then((response) => {
                return response.json()
            }).then((response) => {

                console.log(response, 'fefe')

                    if ( response.message == "Validation errors") {

                        if (response.data.hasOwnProperty('name')) {
                            this.setState({
                                name_error: true,
                                name_valid: false,
                                name_error_text: 'Необходимо ввести имя в поле'
                            })
                        } else {
                            this.setState({
                                name_error: false,
                                name_valid: false,
                                name_error_text: ''
                            })
                        }

                        if (response.data.hasOwnProperty('email')) {

                            let email_error_text = "";

                            if (response.data.email == "The email field is required.") {
                                email_error_text = "Поле E-email обязательно."
                            }
                            if (response.data.email == "The email must be a valid email address.") {
                                 email_error_text = "Неверный E-email"
                            }

                            if (response.data.email == "The email has already been taken.") {
                                 email_error_text = "Пользователь с данным E-mail существует"
                            }



                            this.setState({
                                email_error: true,
                                email_valid: false,
                                email_error_text: email_error_text
                            })
                        } else {
                            this.setState({
                                email_error: false,
                                email_valid: false,
                                email_error_text: ''
                            })
                        }


                        if (response.data.hasOwnProperty('phone')) {

                            let phone_error_text = "";

                            if (response.data.phone == "The phone field is required.") {
                                phone_error_text = "Поле телефон обязательно."
                            }
                            if (response.data.phone == "The phone has already been taken.") {
                                phone_error_text = "Номер телефона занят."
                            }


                            this.setState({
                                phone_error: true,
                                phone_valid: false,
                                phone_error_text:  phone_error_text
                            })
                        } else {
                            this.setState({
                                phone_error: false,
                                phone_valid: false,
                                phone_error_text: ''
                            })
                        }

                        if (response.data.hasOwnProperty('password')) {
                            let password_error_text = "";

                            if (response.data.password == "The password field is required.") {
                                password_error_text = "Поле пароля обязательно."
                            }
                            if (response.data.password == "The password must be at least 6 characters.") {
                                password_error_text = "Пароль должен быть не менее 6 символов."
                            }
                            if (response.data.password == "The password confirmation does not match.") {
                                password_error_text = "Подтверждение пароля не совпадает."
                            }
                            this.setState({
                                password_error: true,
                                password_valid: false,
                                password_error_text:   password_error_text
                            })

                        } else {
                            this.setState({
                                password_error: false,
                                password_valid: false,
                                password_error_text: ''
                            })
                        }


                        if (response.data.hasOwnProperty('password_confirmation')) {
                            let password_confirmation_error_text = "";

                            if (response.data.password_confirmation == "The password confirmation field is required.") {
                                password_confirmation_error_text = "Поле подтверждения  пароля обязательно."
                            }
                            if (response.data.password_confirmation == "The password confirmation does not match.") {
                                password_confirmation_error_text = "Подтверждение пароля не совпадает."
                            }
                            this.setState({
                                password_confirmation_error: true,
                                password_confirmation_valid: false,
                                password_confirmation_error_text:  password_confirmation_error_text
                            })

                        } else {
                            this.setState({
                                password_confirmation_error: false,
                                password_confirmation_valid: false,
                                password_confirmation_error_text: ''
                            })
                        }



                    }


                    else {

                      let user_token = response.data.token;
                        console.log(user_token, "user_token");


                            let foundUser = {
                               token: user_token,
                               email: email,
                            }
                            this.setState({
                                name: '',
                                email: '',
                                phone: '',
                                password: '',
                                repeatPassword: '',
                                email_error: false,
                                name_error: false,
                                phone_error: false,
                                password_error: false,
                                password_confirmation_error: false,

                            })
                            this.context.signIn(foundUser, () => {
                                this.props.navigation.navigate('CatalogCategory')
                            }).then(r => console.log("asyncStorageSetItemError"));
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

                <View style={styles.sign_up_header}>
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

                    <Text style={styles.sing_up_title}>Регистрация</Text>
                </View>


                    {Platform.OS === 'ios'
                        ?
                        <KeyboardAwareScrollView style={styles.sign_up_inputs_main_box}>
                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Имя</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
                                    onChangeText={(val) => this.setState({name: val})}
                                    value={this.state.name}
                                />
                                {this.state.name_error &&

                                    <Text style={styles.error_text}>
                                        {this.state.name_error_text}
                                    </Text>

                                }
                            </View>
                            <View style={styles.sign_up_input_wrapper}>
                                    <Text style={styles.sign_up_input_title}>Электронная почта</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
                                    onChangeText={(val) => this.setState({email: val})}
                                    value={this.state.email}
                                />
                                {this.state.email_error &&

                                    <Text style={styles.error_text}>
                                        {this.state.email_error_text}
                                    </Text>

                                }
                            </View>

                            <View style={styles.phone_code_number_wrapper}>
                                {/*Custom DropDown START*/}

                                <View style={[styles.phone_code_dropdown_wrapper, {marginRight: 10,}]}>

                                    <Text style={styles.sign_up_input_title}>Тел. коды</Text>

                                    <View style={{height: 50, width: 95,    borderRadius: 5}}>


                                        <TouchableOpacity
                                            onPress={() => {this.setState({
                                                isOpenCodeDropDown: !this.state.isOpenCodeDropDown
                                            })}}
                                            style={[
                                                {height: 51, width: 95, justifyContent:'center', alignItems: 'center', borderRadius: 6, flexDirection: 'row',  backgroundColor: '#E4E4E4',},
                                                // {borderWidth:1,borderColor: this.state.error_phone_code ? '#A4223C' : this.state.valid_phone_code ? '#337363' :  '#d9d9d9'  },

                                            ]}
                                        >
                                            <Text style={{
                                                fontSize: 15,
                                                color: "#55545F",
                                                fontWeight: 'bold',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                marginRight: 5,
                                            }}>
                                                {this.state.selectedPhoneCode}
                                            </Text>


                                            {this.state.isOpenCodeDropDown &&
                                            <View style={{   transform: [{ rotate: '180deg' }],}}>
                                                <Svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={11}
                                                    viewBox="0 0 8 4"
                                                    fill="none"
                                                >
                                                    <Path d="M7 1L4 3 1 1" stroke="#333" strokeLinecap="round" />
                                                </Svg>
                                            </View>


                                            }


                                            {!this.state.isOpenCodeDropDown &&
                                            <View >
                                                <Svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={11}
                                                    viewBox="0 0 8 4"
                                                    fill="none"
                                                >
                                                    <Path d="M7 1L4 3 1 1" stroke="#333" strokeLinecap="round" />
                                                </Svg>
                                            </View>


                                            }


                                        </TouchableOpacity>


                                    </View>

                                    {this.state.isOpenCodeDropDown &&

                                    <ScrollView nestedScrollEnabled = {true} style={{width: '100%',  height: 100, position: 'absolute', top: 70, left: 0, backgroundColor:'#ffffff', borderLeftWidth: 1, borderLeftColor: '#d9d9d9', borderRightWidth: 1, borderRightColor: '#d9d9d9', borderBottomWidth: 1, borderBottomColor: '#d9d9d9', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, paddingLeft: 15}}>


                                        {this.state.phoneCodesArray.map((code, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {this.setState({
                                                    selectedPhoneCode: code.value,
                                                    isOpenCodeDropDown: false,
                                                    error_phone_code: false,
                                                    valid_phone_code: true,
                                                })}}
                                                style={{
                                                    padding: 5,
                                                    // borderBottomColor: 'silver',
                                                    // borderBottomWidth: 1

                                                }}
                                            >
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "#55545F",
                                                    fontWeight: 'bold',}}>
                                                    {code.value}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}

                                    </ScrollView>

                                    }


                                </View>

                                {/*Custom DropDown END*/}


                                <View style={[styles.sign_up_input_wrapper, {flex: 1}]}>
                                    <Text style={styles.sign_up_input_title}>Тел. Номер</Text>
                                    <TextInput
                                        style={styles.sign_up_input_field}
                                        onChangeText={(val) => this.setState({phone: val})}
                                        value={this.state.phone}
                                        keyboardType="numeric"
                                    />
                                    {this.state.phone_error &&

                                    <Text style={styles.error_text}>
                                        {this.state.phone_error_text}
                                    </Text>

                                    }
                                </View>
                            </View>




                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Пароль</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
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

                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Повторите пароль</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
                                    onChangeText={(val) => this.setState({repeatPassword: val})}
                                    value={this.state.repeatPassword}
                                    secureTextEntry={true}
                                />
                                {this.state.password_confirmation_error &&

                                    <Text style={styles.error_text}>
                                        {this.state.password_confirmation_error_text}
                                    </Text>

                                }
                            </View>
                                <TouchableOpacity style={styles.sign_up_btn} onPress={() => {this.signUpHandler()}}>
                                    <Text style={styles.sign_up_btn_text}>Зарегистрироваться</Text>
                                </TouchableOpacity>


                        </KeyboardAwareScrollView>
                        :

                        <ScrollView
                            nestedScrollEnabled = {true}
                            style={styles.sign_up_inputs_main_box}>
                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Имя</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
                                    onChangeText={(val) => this.setState({name: val})}
                                    value={this.state.name}
                                />
                                {this.state.name_error &&

                                <Text style={styles.error_text}>
                                    {this.state.name_error_text}
                                </Text>

                                }
                            </View>
                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Электронная почта</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
                                    onChangeText={(val) => this.setState({email: val})}
                                    value={this.state.email}
                                />
                                {this.state.email_error &&

                                    <Text style={styles.error_text}>
                                        {this.state.email_error_text}
                                    </Text>

                                }
                            </View>
                            <View style={styles.phone_code_number_wrapper}>
                                {/*Custom DropDown START*/}

                                <View style={[styles.phone_code_dropdown_wrapper, {marginRight: 10,}]}>
                                    <Text style={styles.sign_up_input_title}>Тел. коды</Text>

                                    <View style={{height: 52, width: 95,    borderRadius: 5}}>

                                        <TouchableOpacity
                                            onPress={() => {this.setState({
                                                isOpenCodeDropDown: !this.state.isOpenCodeDropDown
                                            })}}
                                            style={[
                                                {height: 51, width: 95, justifyContent:'center', alignItems: 'center', borderRadius: 6, flexDirection: 'row',   backgroundColor: '#E4E4E4',},
                                                // {borderWidth:1,borderColor: this.state.error_phone_code ? '#A4223C' : this.state.valid_phone_code ? '#337363' :  '#d9d9d9'  },

                                            ]}
                                        >
                                            <Text style={{
                                                fontSize: 15,
                                                color: "#55545F",
                                                fontWeight: 'bold',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                marginRight: 5,
                                            }}>
                                                {this.state.selectedPhoneCode}
                                            </Text>


                                            {this.state.isOpenCodeDropDown &&
                                            <View style={{   transform: [{ rotate: '180deg' }],}}>
                                                <Svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={11}
                                                    viewBox="0 0 8 4"
                                                    fill="none"
                                                >
                                                    <Path d="M7 1L4 3 1 1" stroke="#333" strokeLinecap="round" />
                                                </Svg>
                                            </View>


                                            }


                                            {!this.state.isOpenCodeDropDown &&
                                            <View >
                                                <Svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={11}
                                                    viewBox="0 0 8 4"
                                                    fill="none"
                                                >
                                                    <Path d="M7 1L4 3 1 1" stroke="#333" strokeLinecap="round" />
                                                </Svg>
                                            </View>


                                            }


                                        </TouchableOpacity>


                                    </View>

                                    {this.state.isOpenCodeDropDown &&

                                    <ScrollView nestedScrollEnabled = {true} style={{width: '100%',  height: 100, position: 'absolute', top: 72, left: 0, backgroundColor: '#E4E4E4', borderLeftWidth: 1, borderLeftColor: '#d9d9d9', borderRightWidth: 1, borderRightColor: '#d9d9d9', borderBottomWidth: 1, borderBottomColor: '#d9d9d9', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, paddingLeft: 15}}>






                                        {this.state.phoneCodesArray.map((code, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {this.setState({
                                                    selectedPhoneCode: code.value,
                                                    isOpenCodeDropDown: false,
                                                    error_phone_code: false,
                                                    valid_phone_code: true,
                                                })}}
                                                style={{
                                                    padding: 5,
                                                    // borderBottomColor: 'silver',
                                                    // borderBottomWidth: 1

                                                }}
                                            >
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "#55545F",
                                                    fontWeight: 'bold',}}>
                                                    {code.value}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}

                                    </ScrollView>

                                    }


                                </View>

                                {/*Custom DropDown END*/}


                                <View style={[styles.sign_up_input_wrapper, {flex: 1}]}>
                                    <Text style={styles.sign_up_input_title}>Тел. Номер</Text>
                                    <TextInput
                                        style={styles.sign_up_input_field}
                                        onChangeText={(val) => this.setState({phone: val})}
                                        value={this.state.phone}
                                        keyboardType="numeric"
                                    />
                                    {this.state.phone_error &&

                                    <Text style={styles.error_text}>
                                        {this.state.phone_error_text}
                                    </Text>

                                    }
                                </View>
                            </View>
                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Пароль</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
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
                            <View style={styles.sign_up_input_wrapper}>
                                <Text style={styles.sign_up_input_title}>Повторите пароль</Text>
                                <TextInput
                                    style={styles.sign_up_input_field}
                                    onChangeText={(val) => this.setState({repeatPassword: val})}
                                    value={this.state.repeatPassword}
                                    secureTextEntry={true}
                                />
                                {this.state.password_confirmation_error &&

                                <Text style={styles.error_text}>
                                    {this.state.password_confirmation_error_text}
                                </Text>

                                }
                            </View>
                            <TouchableOpacity style={styles.sign_up_btn} onPress={() => {this.signUpHandler()}}>
                                <Text style={styles.sign_up_btn_text}>Зарегистрироваться</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    }







            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "flex-start",
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",
        paddingTop: 37,


    },

    sign_up_header: {
       height: 117,
        marginBottom: 25,
        paddingHorizontal: 26,
    },
    back_to_dashboard_btn_wrapper: {
        marginBottom: 25,
        // alignItems: "flex-end",
    },

    sing_up_inputs_title_wrapper: {
        width: "100%",
        // paddingHorizontal: 25,
    },
    sign_up_inputs_main_box: {
        width: '100%',
        marginBottom: 50,
        paddingHorizontal: 25,
        flex: 1,
    },

    sing_up_title: {
        color: '#333333',
        fontSize: 36,
        fontWeight: 'bold',
    },
    sign_up_input_title: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5,
        lineHeight: 24,
    },
    sign_up_input_wrapper: {
        marginBottom: 15,
    },
    sign_up_input_field: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: '#E4E4E4',
        height: 50,
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 15,
    },
    sign_up_btn: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        marginBottom: 18,
        Width: 265,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        paddingHorizontal: 35,
        marginTop: 50,
    },
    sign_up_btn_text: {
        color: '#ffffff',
        fontWeight:'bold',
        fontSize: 18,
        lineHeight: 29,
    },

    // sign_up_btn_parent: {
    //     paddingHorizontal: 25,
    //     marginTop: 50,
    //     // alignSelf: "center",
    //     width: '100%',
    // },


    error_text: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        marginTop: 5,
    },


    phone_code_number_wrapper: {
        flexDirection: 'row',
        alignItems: "flex-start",
        position: 'relative',
        zIndex: 9999,
    },
    phone_code_dropdown_wrapper: {
        position: 'relative',
        zIndex: 9999,
        elevation: 9
    }






});
