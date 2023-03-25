import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import {StatusBar} from "expo-status-bar"
import { BlurView } from 'expo-blur';
import {APP_URL} from "../../env"



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
import Footer from "../includes/footer";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            Default_Rating: 0,
            Max_Rating: 5,

            show_basket_count: false,
            basket_count: 0,


            show_favourites_products_count: false,
            favourites_products_count: 0,

        };
        this.Star = require('../../assets/images/star_rating_image.png');
        this.Star_With_Border = require('../../assets/images/star_not_rating_img.png');





    }




    checkBasketCount = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        fetch(
            `${APP_URL}/ProductBasketCount`,
            {
                method: "GET",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((response) => {

                console.log(response, "product_count_ggggg");

                if (response.hasOwnProperty("status")) {
                    if (response.status === true) {
                        if (response.data.hasOwnProperty('ProductBasketCount')) {
                            let count_number = response.data.ProductBasketCount;

                            this.setState({
                                show_basket_count: count_number > 0 ? true : false,
                                basket_count: count_number,

                            })
                        }
                    }
                }







            })



    }

    checkFavouritesProductsCount = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        fetch(
            `${APP_URL}/allFavoritProductcount`,
            {
                method: "GET",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((response) => {

                console.log(response, "favourites_product_count_ggggg");

                if (response.hasOwnProperty("status")) {
                    if (response.status === true) {
                        if (response.data.hasOwnProperty('allFavoritProductCount')) {
                            let favourite_product_count_number = response.data.allFavoritProductCount;

                            this.setState({
                                show_favourites_products_count: favourite_product_count_number > 0 ? true : false,
                                favourites_products_count: favourite_product_count_number,

                            })
                        }
                    }
                }







            })
    }


    componentDidMount() {
        const { navigation } = this.props;
        this.checkBasketCount();
        this.checkFavouritesProductsCount();
        this.focusListener = navigation.addListener("focus", () => {
            this.checkBasketCount();
            this.checkFavouritesProductsCount();
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            // console.log('Bum END')
        }

    }


    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }




    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
    }



    redirectToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    }



    redirectToBasket = () => {
        this.props.navigation.navigate("Basket");
    }


    redirectToNotYetProduct = () => {
        this.props.navigation.navigate("NotYetProduct");
    }


    UpdateRating(key) {

        console.log(key)
        this.setState({ Default_Rating: key });
        //Keeping the Rating Selected in state
        if (key == 4 || key == 5) {
            this.props.navigation.navigate("HighRating");
        }
        else{
            if (key == 2 || key == 3) {
                this.props.navigation.navigate("LowRating");
            }
        }


    }



    render() {

        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (let i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => {
                        this.UpdateRating(i)
                    }}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ?  this.Star
                                :  this.Star_With_Border
                        }
                    />
                </TouchableOpacity>
            );
        }

        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />
                <View style={styles.rating_header}>
                    <Text style={styles.rating_main_title}>Оцените покупку</Text>
                </View>

                <ScrollView style={styles.rating_page_main}>
                    <View style={styles.rating_product_img_info_main_wrapper}>
                        <View style={styles.rating_product_image_wrapper}>
                            <Image style={styles.rating_product_image} source={require('../../assets/images/rating_img.png')} />
                        </View>
                        <Text style={styles.rating_product_name}>BandRate Smart</Text>
                        <Text style={styles.rating_product_code}>BRSMWONEBBWB</Text>
                    </View>

                    <View style={styles.rating_stars_wrapper}>
                        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                    </View>

                    <TouchableOpacity style={styles.have_not_bought_yet_button} onPress={() => {this.redirectToNotYetProduct()}}>
                        <Text style={styles.have_not_bought_yet_button_text}>Ещё не покупал</Text>
                    </TouchableOpacity>
                </ScrollView>





                {/*<View style={styles.footer_wrapper}>*/}


                {/*    <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]} onPress={() => this.redirectToFavorites()}>*/}
                {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={26} viewBox="0 0 28 26" fill="none">*/}
                {/*            <Path d="M7.75 1.75c-3.451 0-6.25 2.77-6.25 6.188 0 2.758 1.094 9.306 11.86 15.925a1.232 1.232 0 001.28 0C25.406 17.242 26.5 10.696 26.5 7.938c0-3.418-2.799-6.188-6.25-6.188S14 5.5 14 5.5s-2.799-3.75-6.25-3.75z" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>*/}
                {/*        </Svg>*/}

                {/*        {this.state.show_favourites_products_count &&*/}
                {/*        <View style={{position: "absolute", right: -20, top: -10, borderRadius: 100, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0251D'}}>*/}
                {/*            <Text style={{color: "#ffffff", fontWeight: 'bold', fontSize: 12}}>{this.state.favourites_products_count}</Text>*/}
                {/*        </View>*/}
                {/*        }*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.footer_page_btn}>*/}
                {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={30} viewBox="0 0 28 30" fill="none">*/}
                {/*            <Path d="M15.16 24.268h9.108a1.867 1.867 0 001.867-1.867V3.734a1.867 1.867 0 00-1.867-1.867H5.598a1.867 1.867 0 00-1.866 1.867v7.946a8.403 8.403 0 00-1.867.936V3.734A3.734 3.734 0 015.6 0h18.668A3.734 3.734 0 0128 3.734V22.4a3.734 3.734 0 01-3.733 3.734h-7.242l-1.866-1.867h.002zM8.869 9.334a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm4.198-.934a.933.933 0 01.933-.933h7.467a.934.934 0 010 1.867H14a.934.934 0 01-.933-.934zm0 5.6a.933.933 0 01.933-.933h7.467a.933.933 0 010 1.867H14a.934.934 0 01-.933-.933zm8.4 6.534H14.88c.07-.62.07-1.246 0-1.866h6.588a.933.933 0 110 1.866h-.002zM.717 16.624a6.533 6.533 0 009.736 8.204l4.747 4.775a.934.934 0 101.32-1.322l-4.76-4.76A6.533 6.533 0 10.715 16.623h.001zm9.696.384A4.667 4.667 0 112.7 22.265a4.667 4.667 0 017.714-5.257z" fill="#333"/>*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}

                {/*    <TouchableOpacity style={[styles.footer_page_btn, {positon: "relative", bottom: 8}]} onPress={() => this.redirectToCatalog()}>*/}
                {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={42} viewBox="0 0 44 42" fill="none">*/}
                {/*            <Path d="M22.495 2.638l17.884 17.884H38.1v19.1a.7.7 0 01-.7.7h-9.5v-15.4H16.1v15.4H6.6a.7.7 0 01-.7-.7v-19.1H3.621L21.505 2.638a.7.7 0 01.99 0z" stroke="#333333" strokeWidth={3}/>*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]} onPress={() => this.redirectToBasket()}>*/}
                {/*        <View style={styles.footer_basket_icon}>*/}
                {/*            <Svg xmlns="http://www.w3.org/2000/svg" width={33} height={29} viewBox="0 0 33 29" fill="none">*/}
                {/*                <Path d="M29.282 16.843h0a.372.372 0 01-.366.282H10.893l.249 1.203.375 1.812.165.797h16.192c.255 0 .415.227.367.437l-.317 1.375-.179.78.721.346a2.17 2.17 0 011.242 1.953c0 1.189-.978 2.172-2.208 2.172-1.23 0-2.208-.983-2.208-2.172 0-.604.25-1.15.66-1.547l1.773-1.718h-16.95l1.774 1.718c.41.397.66.943.66 1.547C13.208 27.017 12.23 28 11 28s-2.208-.983-2.208-2.172c0-.798.439-1.502 1.106-1.881l.632-.36-.147-.712L6.358 3.422l-.165-.797H1.375A.367.367 0 011 2.265V1.36C1 1.172 1.157 1 1.375 1h5.874c.187 0 .335.129.368.29h0l.525 2.538.165.797h23.317c.255 0 .415.227.367.437l-2.709 11.78z" stroke="#333" strokeWidth={2}/>*/}
                {/*            </Svg>*/}
                {/*        </View>*/}
                {/*        {this.state.show_basket_count &&*/}
                {/*        <View style={{position: "absolute", right: -20, top: -10, borderRadius: 100, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0251D'}}>*/}
                {/*            <Text style={{color: "#ffffff", fontWeight: 'bold', fontSize: 12}}>{this.state.basket_count}</Text>*/}
                {/*        </View>*/}
                {/*        }*/}


                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.footer_page_btn} onPress={() => this.redirectToPersonalArea()}>*/}
                {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 496 496" fill="none">*/}
                {/*            <Path d="M248 96c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 331.2 48 291.2 48 248c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z" fill="#333"/>*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}

                {/*</View>*/}


                <Footer navigation={this.props.navigation} page={null}/>





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

    rating_page_main: {
       flex: 1,
       width: '100%',
        paddingHorizontal: 20,
    },

    rating_header: {
        width: '100%',
        height: 60,
    },
    rating_main_title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#333333',
        textAlign: 'center',
        alignSelf: "center",
    },
    rating_product_img_info_main_wrapper: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 32,
    },
    rating_product_image_wrapper: {
        width: '100%',
        backgroundColor: '#E2E2E2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 15,
        marginBottom: 10,

    },
    rating_product_name: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 22,
    },
    rating_product_code: {
        fontWeight: '400',
        fontSize: 18,
        color: '#545454',
    },
    rating_stars_wrapper: {
        marginBottom: 50,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    have_not_bought_yet_button: {
        borderRadius: 8,
        backgroundColor: '#D0251D',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 11,
        width: 265,
        alignSelf: 'center',
        height: 50,
    },
    have_not_bought_yet_button_text: {
       fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
    },


});
