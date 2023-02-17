import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import {StatusBar} from "expo-status-bar";
import { BlurView } from 'expo-blur';



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
    ScrollView,
    FlatList,
    Modal,
    Dimensions, TouchableHighlight
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
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false,
            pressed2: false,
            pressed3: false,
            pressed4: false,
            link: "",
            link_error: false,
            link_error_text: "",
            placeholder: "",

            sendLinkSuccess: false,


        };


    }




    redirectToAmbassador = () => {
        this.props.navigation.navigate("Ambassador", {
            params: this.state.comeFrom,
        });
    }






    sendLink  = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let link = this.state.link;

        if (link == "") {
            this.setState({
                link_error: true,
                link_error_text: "Поле обязательно!",
            })
        }  else {
            this.setState({
                link_error: false,
                link_error_text: "",
            })
            fetch(
                'http://37.230.116.113/BandRate-Smart/public/api/createAmbasator',
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: link,
                        url_type: this.props.linkType,
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {
                    console.log(response, 'link')
                    // this.setState({
                    //     sendLinkSuccess: true,
                    // })


                    if (response.hasOwnProperty("status")) {
                        if (response.status === true) {

                            if (response.data.message === true) {
                                this.setState({
                                    sendLinkSuccess: true,

                                })
                            }


                        } else {
                            if (response.data.message == "Have you sent") {
                                this.setState({
                                    link_error: true,
                                    link_error_text: 'На данный момент у вас уже есть ссылка на модерации!'

                                })
                            }
                            if (response.data.message === "url_type not url") {
                                this.setState({
                                    link_error: true,
                                    link_error_text: 'Не верный формат, ведите коректную ссылку!'
                                })
                            }
                        }



                    }


                })
        }




    }


    checkPlaceholderName = () => {
        let linkType = this.props.linkType;
        let placeholder = "";
        if (linkType == "vk") {
            placeholder = "https://vk.com/BrandRateSmart";
        }
        if (linkType == "instagram") {
            placeholder = "https://instagram.com/BrandRateSmart";
        }

        if (linkType == "youtube") {
            placeholder = "https://www.youtube.com/BrandRateSmart" ;
        }

        if (linkType == "other") {
            placeholder = "Other link" ;
        }
        this.setState({
            placeholder: placeholder,
        })
    }

    componentDidMount() {
        const { navigation } = this.props;

        // this.getAllBasketProducts();
        this.focusListener = navigation.addListener("focus", () => {
            this.checkPlaceholderName();
            this.setState({
                comeFrom: this.props.comeFrom,
            })
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            // console.log('Bum END')
        }

    }







    render() {

        return (
            <SafeAreaView style={styles.container} >

                <StatusBar style="dark" />
                <View style={styles.ambassador_link_header}>
                    <TouchableOpacity style={styles.ambassador_link_back_button} onPress={() => this.redirectToAmbassador()}>

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

                <ScrollView style={styles.ambassador_link_main_wrapper}>

                    <Text style={styles.ambassador_link_main_title}>
                        Ставьте ссылку на ваш
                        аккаунт ниже
                    </Text>
                    <View style={styles.ambassador_link_main_input}>
                        <TextInput
                            style={styles.ambassador_link_input_field}
                            onChangeText={(val) => this.setState({link: val})}
                            value={this.state.link}
                            // placeholder="Instagram.com/BrandRateSmart"
                            placeholder={this.state.placeholder}
                            placeholderTextColor='#848484'

                        />

                        {this.state.link_error &&

                            <Text style={styles.error_text}>{this.state.link_error_text}</Text>
                        }


                    </View>
                    <TouchableOpacity style={styles.ambassador_link_send_button} onPress={() => {this.sendLink()}}>
                        <Text style={styles.ambassador_link_send_button_text}>Отправить</Text>
                    </TouchableOpacity>




                </ScrollView>


                {this.state.sendLinkSuccess &&
                   <View style={styles.cash_payment_modal}>
                    <View style={styles.cash_payment_modal_wrapper}>
                        <TouchableOpacity  style={styles.online_payment_modal_close_button}
                                           onPress={()=>{this.setState({
                                               sendLinkSuccess: false,

                                           })}}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={19}
                                height={19}
                                viewBox="0 0 19 19"
                                fill="none"
                            >
                                <Path
                                    d="M9.499 9.78L1.141 1.36m-.063 16.779L9.499 9.78 1.078 18.14zM9.499 9.78l8.421-8.358L9.5 9.78zm0 0l8.358 8.422L9.5 9.78z"
                                    stroke="#000"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            </Svg>
                        </TouchableOpacity>
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
                            Ваша ссылка на модерации!

                        </Text>

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
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: '#EFEFEF',
        width: "100%",
        height: "100%",
        paddingTop: 40,
    },
    ambassador_link_main_wrapper: {
        width: "100%",
        flex: 1,
        paddingBottom: 220,
        paddingHorizontal: 25,

    },
    ambassador_link_header: {
        marginBottom: 70,
        paddingHorizontal: 25,
    },
    ambassador_link_main_title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 91,
    },
    ambassador_link_input_field: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 4,
        width: '100%',
        padding: 12,
        fontSize: 16,
        fontWeight: '400',
        color: '#848484',
    },
    ambassador_link_send_button: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 265,
        height: 50,

    },
    ambassador_link_send_button_text: {
       fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
    },
    ambassador_link_main_input: {
        marginBottom: 40,
    },
    cash_payment_modal: {
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
    online_payment_modal_close_button: {
        position: 'absolute',
        right: 20,
        top:60,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choosing_marketplace_title: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#000000',
        textAlign: 'center',
        alignSelf: "center",
        lineHeight: 35,
        width: 258,
        alignItems: 'center',
    },
    // choosing_marketplace_back_btn: {
    //     marginRight: 22,
    //     position: 'absolute',
    //     left: 26,
    //     top: 0,
    //
    // },

    choosing_marketplace_header: {
        width: '100%',
        height: 105,
        marginBottom: 28,
        marginTop: 30,
        paddingHorizontal: 26,
        flexDirection: 'row',
        alignItems: 'center',
        position:'relative',
        justifyContent: 'center',
        alignSelf: "center",
    },

    error_text: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 10,
        color: '#D0251D',
    },


});
