import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import {StatusBar} from "expo-status-bar"
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



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            pressed: false,
            pressed2: false,
            pressed3: false,
            pressed4: false,
            pressed5: false,
            pressed6: false,
            pressed7: false,
            pressed8: false,



        };




    }




    redirectToNotYetProduct = () => {
        this.props.navigation.navigate("NotYetProduct");
    }




    changeColor1 = () => {
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false, pressed5: false, pressed6: false, pressed7: false, pressed8: false,});
    }



    changeColor2(){

        this.setState({ pressed: false, pressed2: true, pressed3: false, pressed4: false, pressed5: false, pressed6: false, pressed7: false, pressed8: false,});
    }


    changeColor3(){

        this.setState({ pressed: false, pressed2: false, pressed3: true, pressed4: false, pressed5: false, pressed6: false, pressed7: false, pressed8: false,});
    }

    changeColor4  = () => {
        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: true, pressed5: false, pressed6: false, pressed7: false, pressed8: false,});
    }

    changeColor5(){

        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: false, pressed5: true, pressed6: false, pressed7: false, pressed8: false,});
    }
    changeColor6(){

        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: false, pressed5: false, pressed6: true, pressed7: false, pressed8: false,});
    }

    changeColor7(){

        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: false, pressed5: false, pressed6: false, pressed7: true, pressed8: false,});
    }
    changeColor8(){

        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: false, pressed5: false, pressed6: false, pressed7: false, pressed8: true,});
    }





    render() {



        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />
                <View style={styles.choosing_marketplace_header}>
                    <TouchableOpacity style={styles.choosing_marketplace_back_btn} onPress={() => {this.redirectToNotYetProduct()}}>
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

                   <Text style={styles.choosing_marketplace_title}>
                       Выберите пожалуйста
                       с какой площадки приобрели товар
                   </Text>
                </View>

                <ScrollView style={styles.choosing_marketplace_page_main}>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.changeColor1()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed ? "#ffffff" : '#333333'}]}>
                            Озон
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed2 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed2 ? 0 : 1}]}   onPress={()=>this.changeColor2()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed2 ? "#ffffff" : '#333333'}]}>
                            Вайлдберриз
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed3 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed3 ? 0 : 1}]}   onPress={()=>this.changeColor3()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed3 ? "#ffffff" : '#333333'}]}>
                            Сбермегамаркет
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.changeColor4()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}>
                            Яндекс Маркет
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed5 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed5 ? 0 : 1}]}   onPress={()=>this.changeColor5()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed5 ? "#ffffff" : '#333333'}]}>
                            Мвидео
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed6 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed6 ? 0 : 1}]}   onPress={()=>this.changeColor6()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed6 ? "#ffffff" : '#333333'}]}>
                            Алиэкспресс
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed7 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed7 ? 0 : 1}]}   onPress={()=>this.changeColor7()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed7 ? "#ffffff" : '#333333'}]}>
                            Svstime.ru
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed8 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed8 ? 0 : 1}]}   onPress={()=>this.changeColor8()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed8 ? "#ffffff" : '#333333'}]}>
                            Другое
                        </Text>
                    </TouchableOpacity>

                </ScrollView>













            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",
        paddingTop: 28,
    },



    choosing_marketplace_page_main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,

    },

    choosing_marketplace_header: {
        width: '100%',
        height: 105,
        marginBottom: 28,
        paddingHorizontal: 26,
        flexDirection: 'row',
        alignItems: 'center',
        position:'relative',
        justifyContent: 'center',
        alignSelf: "center",
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
    choosing_marketplace_back_btn: {
       marginRight: 22,
        position: 'absolute',
        left: 26,
        top: 0,

    },
    personal_area_button: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginBottom: 20,
        width: 285,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    personal_area_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',

    },
    not_yet_product_img_wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }


});