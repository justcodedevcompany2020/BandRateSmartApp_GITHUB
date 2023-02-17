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



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            pressed: false,
            pressed2: false,
            pressed3: false,
            pressed4: false,
            pressed5: false,


        };




    }




    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }




    redirectToCatalog = () => {
        this.props.navigation.navigate("Catalog");
    }



    redirectToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    }



    redirectToBasket = () => {
        this.props.navigation.navigate("Basket");
    }


    redirectToRatingProduct = () => {
        this.props.navigation.navigate("RatingProduct");
    }




    redirectToAmbassador = () => {
        this.props.navigation.navigate("Ambassador");
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false, pressed5: false,});
    }



    redirectToChoosingMarketPlace (){
        this.props.navigation.navigate("ChoosingMarketPlace");
        this.setState({ pressed: false, pressed2: true, pressed3: false, pressed4: false, pressed5: false,});
    }


    changeColor3(){

        this.setState({ pressed: false, pressed2: false, pressed3: true, pressed4: false, pressed5: false,});
    }

    redirectToJobs = () => {
        this.props.navigation.navigate("Jobs");
        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: true, pressed5: false,});
    }

    changeColor5(){

        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: false, pressed5: true});
    }




    render() {



        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />
                <View style={styles.high_rating_header}>
                    <TouchableOpacity style={styles.high_rating_back_btn} onPress={() => {this.redirectToRatingProduct()}}>
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
                    <Text style={styles.high_rating_title}>
                        Спасибо за высокую
                        оценку
                    </Text>
                </View>

                <ScrollView style={styles.high_rating_page_main}>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.redirectToAmbassador()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed ? "#ffffff" : '#333333'}]}>
                            Стать Амбасадором
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed2 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed2 ? 0 : 1}]}   onPress={()=>this.redirectToChoosingMarketPlace()}>
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed2 ? "#ffffff" : '#333333'}]}>Написать Отзыв за бонусы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed3 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed3 ? 0 : 1}]}   onPress={()=>this.changeColor3()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed3 ? "#ffffff" : '#333333'}]}>Сделать обзор</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.redirectToJobs()}>
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}>Работа в Компании</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed5 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed5 ? 0 : 1}]}   onPress={()=>this.changeColor5()}>
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed5 ? "#ffffff" : '#333333'}]}>Больше о Компании</Text>
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

    footer_wrapper: {
        shadowColor: "#00000040",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 24,
        shadowRadius: 1,

        elevation: 10,
        backgroundColor: "#ECECEC",
        width: "100%",
        height: 90,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingBottom: 27,
        paddingHorizontal: 32,
        // position: "absolute",
        // bottom: -180,

    },

    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
    },

    StarImage: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        marginRight: 6,
    },

    high_rating_page_main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,

    },

    high_rating_header: {
        width: '100%',
        // height: 102,
        marginBottom: 70,
        paddingHorizontal: 26,
    },
    high_rating_title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#000000',
        textAlign: 'center',
        alignSelf: "center",
        lineHeight: 41,
    },
    high_rating_back_btn: {
        marginBottom: 25,

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


});