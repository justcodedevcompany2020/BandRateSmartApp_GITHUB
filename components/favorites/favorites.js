import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
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


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            favorites_products: [],
            show_add_to_basket_notification: false,

            show_basket_count: false,
            basket_count: 0,


            show_favourites_products_count: false,
            favourites_products_count: 0,


        };


    }


    checkBasketCount = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/ProductBasketCount',
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
            'http://37.230.116.113/BandRate-Smart/public/api/allFavoritProductcount',
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

    getFavoritesProducts = () => {
        return this.state.favorites_products;
    }


    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
    }
    backToCatalog = () => {
        this.props.navigation.navigate("Catalog");
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


    getAllFavouritesProducts  = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        // console.log(userToken, "token")
        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/allFavoritProduct',
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
                // console.log(response, 'favoritProduct')

                let all_favourites_products = response.data.AllFavoritProduct;

                console.log(all_favourites_products, 'all_favourites_products')

                //
                // for (let i = 0; i < all_favourites_products.length ; i++) {
                //     all_favourites_products[i].favorit_product_image.picture = JSON.parse( all_favourites_products[i].favorit_product_image.picture);
                // }
                // console.log(all_favourites_products, 'favoritProduct')

                this.setState({
                    favorites_products: all_favourites_products,
                })


            })




    }

    componentDidMount() {
        const { navigation } = this.props;

        this.getAllFavouritesProducts();
        this.checkBasketCount();
        this.checkFavouritesProductsCount();
        this.focusListener = navigation.addListener("focus", () => {
            this.getAllFavouritesProducts();
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
            'http://37.230.116.113/BandRate-Smart/public/api/DeleteFavoritProduct',
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
                this.getAllFavouritesProducts();
                this.checkFavouritesProductsCount();

            })


    }

    redirectToCardProduct = (favorites_product) => {
        this.props.navigation.navigate("CardProduct", {
            params: JSON.stringify(favorites_product),
            params2: 'Favorites'
        });
    }

    addToBasket = async (favorites_product) => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = favorites_product.product_id;


        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/AddtoBasket',
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


    render() {

        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />

                <View style={styles.favorites_header}>
                    <View style={styles.back_to_catalog_btn_wrapper}>
                        <TouchableOpacity style={styles.back_to_catalog_btn}  onPress={() => this.backToCatalog()}>
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
                    <Text style={styles.favorites_title}>Избранное</Text>
                </View>



                {this.state.favorites_products.length == 0 &&

                    <View style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}} >

                        <Text style={{color: 'black', fontSize: 20, textAlign:'center', }}>Нет товаров!</Text>

                    </View>

                }


                <ScrollView style={styles.favorites_main_items_wrapper}>

                        {this.getFavoritesProducts().map((favorites_product, index) => {
                            return (


                                <View style={styles.favorites_products_item} key={favorites_product.id}>
                                    <View style={styles.favorites_products_item_img}>
                                        <TouchableOpacity
                                            style={styles.favorites_products_img_box}
                                            onPress={() => this.redirectToCardProduct(favorites_product)}
                                        >
                                            <Image style={styles.favorites_products_img} source={  favorites_product.favorit_product_image.length > 0 ?  {uri: favorites_product.favorit_product_image[0].picture } : require("../../assets/images/catalog_img1.png")} />

                                            {/*<Image style={styles.favorites_products_img} source={{uri:  "https://www.svstime.ru/image/catalog/umnye-chasy-i-fitnes-braslety/model/fitnes-braslet-bandrate-smart-brsdw3sswb_1281655b.jpg"}}/>*/}
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.favorites_products_item_img_info_wrapper}>
                                        <View style={styles.favorites_products_item_info}>
                                            <Text style={styles.favorites_products_item_info_title}>{favorites_product.products.model}</Text>
                                            <View style={styles.favorites_products_item_info_price_title_wrapper}>

                                                <Text style={styles.favorites_products_item_price_title}>Цена.</Text>
                                                <Text style={styles.favorites_products_item_info_price}>
                                                    {favorites_product.products.price}<Text style={styles.favorites_products_item_info_price_light}> руб.</Text>
                                                </Text>

                                                {favorites_product.products.oldprice != 'null' &&

                                                <Text style={styles.catalog_item_info_discounted_price}>{favorites_product.products.oldprice.slice(1, -1)}руб.</Text>
                                                }
                                            </View>

                                        </View>
                                        <View style={styles.favorites_products_delete_add_to_card_btns_wrapper}>
                                            <TouchableOpacity style={styles.favorites_products_delete_btn} onPress={() => {this.deleteFavouriteProduct(favorites_product)}}>
                                                <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <Path d="M10 10L1.077 1.01M1.01 18.923L10 10l-8.99 8.923zM10 10l8.99-8.923L10 10zm0 0l8.923 8.99L10 10z" stroke="#C4C4C4" strokeWidth={2} strokeLinecap="round"/>
                                                </Svg>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.favorites_products_add_to_card_btn}  onPress={() => {this.addToBasket(favorites_product)}}>
                                                <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={20} viewBox="0 0 22 20" fill="none">
                                                    <Path d="M4.75.946h0m0 0h0m0 0s0 0 0 0m0 0h0m.35 1.75l.161.804h15.724l-1.778 8H6.86l.24 1.196.25 1.25.16.804h10.974l-.111.5H7.156L4.566 2.304l-.16-.804H1V1h3.761l.34 1.696zm12.445 14.26l.578-.58-.003.015.701.348c.38.188.651.593.651 1.073 0 .678-.53 1.188-1.139 1.188-.608 0-1.139-.51-1.139-1.188 0-.339.136-.64.35-.856zm-10.156-.54l-.049-.243.782.784c.215.215.35.516.35.855 0 .678-.53 1.188-1.139 1.188-.608 0-1.139-.51-1.139-1.188 0-.45.239-.833.582-1.035l.613-.36z" stroke="#fff" strokeWidth={2}/>
                                                </Svg>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>



                            );
                        })}
                    </ScrollView>


                    <View style={styles.footer_wrapper}>
                        <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={26} viewBox="0 0 28 26" fill="none">
                                <Path d="M7.75 1.75c-3.451 0-6.25 2.77-6.25 6.188 0 2.758 1.094 9.306 11.86 15.925a1.232 1.232 0 001.28 0C25.406 17.242 26.5 10.696 26.5 7.938c0-3.418-2.799-6.188-6.25-6.188S14 5.5 14 5.5s-2.799-3.75-6.25-3.75z" stroke="#D0251D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                            </Svg>

                            {this.state.show_favourites_products_count &&
                            <View style={{position: "absolute", right: -20, top: -10, borderRadius: 100, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0251D'}}>
                                <Text style={{color: "#ffffff", fontWeight: 'bold', fontSize: 12}}>{this.state.favourites_products_count}</Text>
                            </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footer_page_btn} onPress={() => this.redirectToProductSearch()}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={30} viewBox="0 0 28 30" fill="none">
                                <Path d="M15.16 24.268h9.108a1.867 1.867 0 001.867-1.867V3.734a1.867 1.867 0 00-1.867-1.867H5.598a1.867 1.867 0 00-1.866 1.867v7.946a8.403 8.403 0 00-1.867.936V3.734A3.734 3.734 0 015.6 0h18.668A3.734 3.734 0 0128 3.734V22.4a3.734 3.734 0 01-3.733 3.734h-7.242l-1.866-1.867h.002zM8.869 9.334a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm4.198-.934a.933.933 0 01.933-.933h7.467a.934.934 0 010 1.867H14a.934.934 0 01-.933-.934zm0 5.6a.933.933 0 01.933-.933h7.467a.933.933 0 010 1.867H14a.934.934 0 01-.933-.933zm8.4 6.534H14.88c.07-.62.07-1.246 0-1.866h6.588a.933.933 0 110 1.866h-.002zM.717 16.624a6.533 6.533 0 009.736 8.204l4.747 4.775a.934.934 0 101.32-1.322l-4.76-4.76A6.533 6.533 0 10.715 16.623h.001zm9.696.384A4.667 4.667 0 112.7 22.265a4.667 4.667 0 017.714-5.257z" fill="#333"/>
                            </Svg>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.footer_page_btn, {positon: "relative", bottom: 8}]} onPress={() => this.redirectToCatalog()}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={42} viewBox="0 0 44 42" fill="none">
                                <Path d="M22.495 2.638l17.884 17.884H38.1v19.1a.7.7 0 01-.7.7h-9.5v-15.4H16.1v15.4H6.6a.7.7 0 01-.7-.7v-19.1H3.621L21.505 2.638a.7.7 0 01.99 0z" stroke="#333333" strokeWidth={3}/>
                            </Svg>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]} onPress={() => this.redirectToBasket()}>

                            <View style={styles.footer_basket_icon}>
                                <Svg xmlns="http://www.w3.org/2000/svg" width={33} height={29} viewBox="0 0 33 29" fill="none">
                                    <Path d="M29.282 16.843h0a.372.372 0 01-.366.282H10.893l.249 1.203.375 1.812.165.797h16.192c.255 0 .415.227.367.437l-.317 1.375-.179.78.721.346a2.17 2.17 0 011.242 1.953c0 1.189-.978 2.172-2.208 2.172-1.23 0-2.208-.983-2.208-2.172 0-.604.25-1.15.66-1.547l1.773-1.718h-16.95l1.774 1.718c.41.397.66.943.66 1.547C13.208 27.017 12.23 28 11 28s-2.208-.983-2.208-2.172c0-.798.439-1.502 1.106-1.881l.632-.36-.147-.712L6.358 3.422l-.165-.797H1.375A.367.367 0 011 2.265V1.36C1 1.172 1.157 1 1.375 1h5.874c.187 0 .335.129.368.29h0l.525 2.538.165.797h23.317c.255 0 .415.227.367.437l-2.709 11.78z" stroke="#333" strokeWidth={2}/>
                                </Svg>
                            </View>

                            {this.state.show_basket_count &&
                                <View style={{position: "absolute", right: -20, top: -10, borderRadius: 100, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0251D'}}>
                                    <Text style={{color: "#ffffff", fontWeight: 'bold', fontSize: 12}}>{this.state.basket_count}</Text>
                                </View>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.footer_page_btn} onPress={() => this.redirectToPersonalArea()}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 496 496" fill="none">
                                <Path d="M248 96c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 331.2 48 291.2 48 248c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z" fill="#333"/>
                            </Svg>
                        </TouchableOpacity>

                    </View>


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
        paddingTop: 37,


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
        alignItems: "flex-start",
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
    }




});
