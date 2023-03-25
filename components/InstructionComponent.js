import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from 'expo-status-bar';
import {APP_URL} from "../env"

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

} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,

} from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as WebBrowser from 'expo-web-browser';
import Footer from "./includes/footer";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            favorites_products: [],
            instructions_data: [],
            show_add_to_basket_notification: false,

            show_basket_count: false,
            basket_count: 0,

            show_favourites_products_count: false,
            favourites_products_count: 0,
            loaded: false,
            current_paginate: 1,
            searchValue: '',
            show_next_button1: false

        };


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

                // console.log(response, "product_count_ggggg");

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

    // getInstructions = () => {
    //     return ;
    // }


    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
    }

    backToCatalog = () => {

        if (this.props.comeFrom == 'from_profile') {
            this.props.navigation.navigate("PersonalArea");
        }
    }


    redirectToBasket = () => {
        this.props.navigation.navigate("Basket");
    }
    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }

    redirectToProductSearch = () => {
        this.props.navigation.navigate("ProductSearch");
    }



    getSearchResult = async () => {

        let {searchValue} = this.state;

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        await this.setState({
            current_paginate: 1
        });

        let {current_paginate} = this.state;

        fetch(
            `${APP_URL}/getModal?page=${current_paginate}&search=${searchValue}`,
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
                console.log(response, 'all_instructions_data')

                let all_instructions_data = response.data.data;

                console.log(all_instructions_data, 'all_instructions_data');

                let show_next_button1 = response.data.next_page_url ? true : false;
                this.setState({
                    instructions_data: all_instructions_data,
                    loaded: true,
                    show_next_button1: show_next_button1
                })

            })

    }


    getAllInstructions  = async () => {

        let {searchValue} = this.state;
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let {current_paginate} = this.state;

        fetch(
            `${APP_URL}/getModal?page=${current_paginate}&search=${searchValue}`,
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
                console.log(response, 'all_instructions_data')

                let all_instructions_data = response.data.data;
                let show_next_button1 = response.data.next_page_url ? true : false

                console.log(all_instructions_data, 'all_instructions_data')

                this.setState({
                    instructions_data: all_instructions_data,
                    loaded: true,
                    show_next_button1: show_next_button1
                })

            })

    }

    componentDidMount() {
        const { navigation } = this.props;

        // this.getAllInstructions();
        // this.checkBasketCount();
        // this.checkFavouritesProductsCount();

        this.focusListener = navigation.addListener("focus", () => {
            this.getAllInstructions();
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

    deleteFavouriteProduct = async (favorites_product) => {
        let  product_id = favorites_product.product_id;
        let  OriginalProductId = favorites_product.Original_Product_id;
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        console.log(favorites_product, 'favorites_product')
        console.log(product_id, OriginalProductId, "delete")
        fetch(
            `${APP_URL}/DeleteFavoritProduct`,
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: product_id,
                    Original_Product_id: OriginalProductId,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {
                console.log(response);
                this.getAllInstructions();
                this.checkFavouritesProductsCount();

            })


    }

    redirectToCardProduct = (favorites_product) => {
        this.props.navigation.navigate("CardProduct", {
            params: JSON.stringify(favorites_product)
        });
    }

    addToBasket = async (favorites_product) => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = favorites_product.product_id;


        fetch(
            `${APP_URL}/AddtoBasket`,
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: product_id,

                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {

                if (response.hasOwnProperty("status")) {
                    if (response.status === true) {

                        this.setState({
                            show_add_to_basket_notification: true,
                        })

                        setTimeout(() => {
                            this.setState({
                                show_add_to_basket_notification: false,
                            })
                        }, 2000)

                    }
                }



            })
    }


    openInstrUrl = async  (item) =>{
        await this.setState({
            loaded: false
        })
        WebBrowser.openBrowserAsync(item.url)
        await this.setState({
            loaded: true
        })
    }

    getPrevInstData = async () =>
    {
        let {current_paginate} = this.state;

        if (current_paginate > 1)
        {
            await this.setState({
                loaded: false
            })
            let new_current_page = current_paginate == 1 ? 1 :  current_paginate - 1;
            await this.setState({
                current_paginate: new_current_page,
            })
            this.getAllInstructions();
        }

    }

    getNextInstData = async () =>
    {
        let {show_next_button1} = this.state;

        if(!show_next_button1)
        {
            return false
        }

        await this.setState({
            loaded: false
        })
        let current_paginate = this.state.current_paginate;
        await this.setState({
            current_paginate: current_paginate + 1,
        })
        this.getAllInstructions();
    }


    redirectToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    }


    render() {


        if (!this.state.loaded) {
            return (
                <View style={{width: '100%', height: '100%', backgroundColor: '#ffffff', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 300, marginBottom: 30}} source={require('../assets/images/band_rate_logo.png')} />
                    <ActivityIndicator size="large" color="red"/>

                </View>
            )
        }

        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />

                <View style={styles.favorites_header}>
                    <View style={styles.back_to_catalog_btn_wrapper}>
                        <TouchableOpacity style={styles.back_to_catalog_btn}
                          onPress={() => {
                              this.backToCatalog()
                          }}
                        >
                            <Svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="#000"/>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.favorites_title}>Инструкции</Text>
                </View>


               <View style={{width: '100%', paddingHorizontal:18, marginBottom:10}}>
                   <View style={[styles.product_search_input_button_wrapper, { borderWidth: 2, borderColor: '#E4E4E4'}]}>
                       <TextInput
                           style={[styles.product_search_input_field]}
                           onChangeText={(val) => {
                               this.setState({
                                   searchValue: val,
                               })

                               if(val.length == 0) {
                                   this.getAllInstructions();
                               }
                           }}
                           value={this.state.searchValue}
                           placeholder="Поиск товаров"
                           placeholderTextColor="#333333"
                       />
                       <TouchableOpacity style={styles.product_search_button} onPress={() => {this.getSearchResult()}}>
                           <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 25 25" fill="none">
                               <Path d="M22.207 20.862l-6.34-6.34a7.259 7.259 0 001.516-4.463 7.28 7.28 0 00-2.146-5.179 7.27 7.27 0 00-5.178-2.146A7.28 7.28 0 004.88 4.88a7.266 7.266 0 00-2.146 5.179 7.28 7.28 0 002.146 5.178 7.266 7.266 0 005.179 2.146 7.264 7.264 0 004.46-1.514l6.34 6.338a.2.2 0 00.284 0l1.064-1.062a.2.2 0 000-.283zm-8.281-6.936a5.44 5.44 0 01-3.867 1.601 5.44 5.44 0 01-3.868-1.601 5.44 5.44 0 01-1.601-3.867c0-1.46.569-2.835 1.601-3.868A5.44 5.44 0 0110.06 4.59c1.46 0 2.834.566 3.867 1.601a5.44 5.44 0 011.601 3.868c0 1.46-.568 2.834-1.601 3.867z" fill="#000"/>
                           </Svg>
                       </TouchableOpacity>
                   </View>
               </View>



                <ScrollView style={styles.favorites_main_items_wrapper}>

                    {this.state.instructions_data.length == 0 &&
                        <Text>Наденно 0 инструкций</Text>
                    }

                    {this.state.instructions_data.map((item, index) => {

                        return (

                            <View style={styles.favorites_products_item} key={index}>

                                <Text style={{fontWeight:'bold', fontSize: 20, width: '45%'}}>{item.name}</Text>

                                <TouchableOpacity onPress={() => {
                                    this.openInstrUrl(item)
                                }}>
                                    <Text style={{color: 'blue'}}>Скачать инструкцию</Text>
                                </TouchableOpacity>

                            </View>

                        );
                    })}
                </ScrollView>

                {this.state.instructions_data.length > 0 &&

                    <View style={{width: '100%', flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20}}>

                        <TouchableOpacity
                            style={ [ {height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center',},  this.state.current_paginate == 1 ? {opacity: 0.5} : {}]}
                            onPress={() => {this.getPrevInstData()}}
                        >

                            <Svg style={{position: 'relative', left: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                                <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="red"/>
                            </Svg>
                            <Text style={{fontSize: 20, color: 'red'}}>Назад</Text>

                        </TouchableOpacity>

                        {this.state.show_next_button1 &&
                            <TouchableOpacity
                                style={[{height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center'}, ]}
                                onPress={() => {this.getNextInstData()}}
                            >

                                <Text style={{fontSize: 20, color: 'red'}}>Далее</Text>

                                <Svg style={{transform:[{rotate:'180deg'}], position: 'relative', right: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                                    <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="red"/>
                                </Svg>

                            </TouchableOpacity>
                        }

                    </View>

                }

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
                {/*    <TouchableOpacity style={styles.footer_page_btn} onPress={() => this.redirectToProductSearch()}>*/}
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

                {this.state.show_add_to_basket_notification &&

                <View style={styles.add_to_basket_notification_box}>
                    <Text style={styles.add_to_basket_notification_box_info}>Товар добавлен</Text>
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
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",
        position: "relative",
        // paddingTop: 37,
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

    favorites_header: {
        width: '100%',
        marginBottom: 25,
        paddingHorizontal: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center",
        position: "relative",


    },
    back_to_catalog_btn_wrapper: {
        position: 'absolute',
        left: 25,
    },
    favorites_title: {
        color: "#333333",
        fontSize: 32,
        fontWeight: "bold",
        alignItems: 'center',
        alignSelf: "center",
    },
    favorites_main_items_wrapper: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    favorites_products_item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
        width: '100%',
        position: 'relative',
    },
    favorites_products_img_box: {
        // backgroundColor: "#E2E2E2",
        borderRadius: 8,
        marginRight: 10,
        width: 115,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    favorites_products_img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    favorites_products_item_img_info_wrapper: {
        flexDirection: "row",
        alignItems: "flex-start",
        position: 'relative',
        flex:1
    },
    favorites_products_item_info_title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        width: '60%',
        marginBottom: 16,
    },
    favorites_products_item_info_code: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
        marginBottom: 16,
    },
    favorites_products_item_info: {
        width: '100%'
    },
    favorites_products_item_price_title: {
        fontSize: 17,
        fontWeight: "400",
        color: "#000000",
    },
    favorites_products_item_info_price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
    },
    favorites_products_add_to_card_btn: {
        backgroundColor: "#EE827D",
        borderRadius: 8,
        width: 42,
        height: 34,
        alignItems: "center",
        justifyContent: "center",

    },


    favorites_products_delete_btn: {
        marginBottom: 77,



    },

    favorites_products_delete_add_to_card_btns_wrapper: {
        position: 'absolute',
        zIndex: 9,
        // backgroundColor:'red',
        right: 0,
        alignItems: "center",
        // justifyContent: "center",
    },

    catalog_item_info_discounted_price: {
        color: "#E6524B",
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: "line-through",
        // marginTop: 2,
    },


    add_to_basket_notification_box: {
        backgroundColor: "#E6524B",
        // paddingHorizontal: 81,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 8,
        position: 'absolute',
        top: 50,
        padding: 15
    },


    add_to_basket_notification_box_info: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
    },
    product_search_input_button_wrapper: {
        width: '100%',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    product_search_input_field: {
        width: '90%',
        height: '100%',
    },



});
