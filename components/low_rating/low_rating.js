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
            review: null,


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
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false});
    }



     redirectToJobs(){

        this.props.navigation.navigate("Jobs");
        this.setState({ pressed: false, pressed2: true, pressed3: false, pressed4: false});
    }


    changeColor3(){

        this.setState({ pressed: false, pressed2: false, pressed3: true, pressed4: false});
    }

    changeColor4 = () => {
        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: true});
    }



    render() {



        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />
                <View style={styles.low_rating_header}>
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
                    <Text style={styles.low_rating_title}>
                        Спасибо за вашу
                        оценку
                    </Text>
                </View>

                <ScrollView style={styles.low_rating_page_main}>
                    <Text style={styles.low_rating_title2}>
                        Ваше мнение ценно для нас.Напишите пожалуйста чем вам не понравился товар
                    </Text>
                    <View style={styles.low_rating_review_input_wrapper}>
                        <TextInput
                            style={styles.low_rating_review_input_field}
                            onChangeText={(val) => this.setState({review: val})}
                            value={this.state.review}
                            placeholder="Отзыв..."
                            placeholderTextColor="#000000"
                            multiline
                            numberOfLines={4}

                        />
                    </View>

                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.redirectToAmbassador()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed ? "#ffffff" : '#333333'}]}>
                            Стать Амбасадором
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed2 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed2 ? 0 : 1}]}   onPress={()=>this.redirectToJobs()}>
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed2 ? "#ffffff" : '#333333'}]}>Работа в Компании</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed3 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed3 ? 0 : 1}]}   onPress={()=>this.changeColor3()} >
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed3 ? "#ffffff" : '#333333'}]}>Сделать обзор</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.changeColor4()}>
                        <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}>Больше о Компании</Text>
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
        paddingTop: 31,
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

    low_rating_page_main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,

    },

    low_rating_header: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 26,
    },
    low_rating_title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#000000',
        textAlign: 'center',
        alignSelf: "center",
        lineHeight: 41,
        width: 237,
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
    low_rating_title2: {
        fontWeight: '400',
        fontSize: 15,
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 24,
    },
    low_rating_review_input_field: {
        width: '100%',
        backgroundColor: '#E5E5E5',
        borderRadius: 4,
        height: 125,
        paddingTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 91,
        fontWeight: '400',
        fontSize: 15,
        color: '#000000',
    },
    low_rating_review_input_wrapper: {
        marginBottom: 40,
    }


});