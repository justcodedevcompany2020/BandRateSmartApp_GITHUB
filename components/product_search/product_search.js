import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
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
import {StatusBar} from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {APP_URL} from "../../env";
import Footer from "../includes/footer";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            search: "",
            catalogItems: [],

            search_input_error: false,
            show_not_found_product_error: false,
            loaded: true,
            current_paginate: 1,

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

        // this.checkBasketCount();
        // this.checkFavouritesProductsCount();
        this.focusListener = navigation.addListener("focus", () => {
            // this.checkBasketCount();
            // this.checkFavouritesProductsCount();
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            // console.log('Bum END')
        }

    }

    redirectToCardProduct = (item) => {
        this.props.navigation.navigate("CardProduct", {
            params: JSON.stringify(item),
            params2: 'ProductSearch'
        });
    }


    redirectToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    }

    redirectToBasket = () => {
        this.props.navigation.navigate("Basket");
    }

    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }

    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
    }

    getSearchResult = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let search = this.state.search;

        await this.setState({
            loaded: false,
        })
        if (search.length < 1) {
             this.setState({
                 search_input_error: true,
                 loaded: true,
             })
        } else  {
            await this.setState({
                search_input_error: false,
            })

            let current_paginate = this.state.current_paginate;
            fetch(
                `${APP_URL}/SearchProduct?page=${current_paginate}`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        product_name: search,
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {

                    console.log(response);

                    this.setState({
                        loaded: true
                    })


                    if (response.hasOwnProperty('status')) {
                        if (response.status === false) {
                            this.setState({
                                search_input_error: true,
                                show_not_found_product_error: true,
                            })
                        } else {
                            let search_product = response.data.search_data.data;

                            this.setState({
                                catalogItems: search_product,
                            })
                        }
                    }

                })



        }




    }


    getNextCatalogData = async () => {
        await this.setState({
            loaded: false
        })
        let current_paginate = this.state.current_paginate;
        await this.setState({
            current_paginate: current_paginate + 1,
        })
        this.getSearchResult();
    }


    getPrevCatalogData = async () => {

        let current_paginate = this.state.current_paginate;
        let new_current_page = current_paginate - 1;

        if (new_current_page > 0) {

            await this.setState({
                current_paginate: new_current_page,
                loaded: false
            })
            this.getSearchResult()
        } else  {
            await this.setState({
                loaded: true
            })
        }

    }

    render() {



        if (!this.state.loaded) {
            return (
                <View style={{width: '100%', height: '100%', backgroundColor: '#ffffff', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 300}} source={require('../../assets/images/band_rate_logo.png')} />
                </View>
            )
        }



        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />
                <View style={styles.product_search_header}>
                    <View style={styles.product_search_title_btn_wrapper}>
                        <TouchableOpacity style={styles.product_search_back_btn} onPress={() => {this.redirectToCatalog()}}>
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
                        <Text style={styles.product_search_title}>Поиск товаров</Text>
                    </View>


                    <View style={[styles.product_search_input_button_wrapper, this.state.search_input_error  ? { borderWidth: 2, borderColor: '#E6524B'} : { borderWidth: 2, borderColor: '#E4E4E4'}]}>
                        <TextInput
                            style={[styles.product_search_input_field]}
                            onChangeText={(val) => this.setState({
                                search: val,
                                search_input_error: false,
                                show_not_found_product_error: false,
                            })}
                            value={this.state.search}
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

                    {this.state.show_not_found_product_error &&

                    <View style={styles.not_found_product_wrapper}>
                        <Text style={styles.not_found_product_text}>По запросу '{this.state.search}' найдено 0 товаров </Text>
                    </View>

                    }


                {this.state.catalogItems.length > 0 &&

                    <Text style={{textAlign: 'center', alignSelf: "center", fontWeight: '500', fontSize: 20,marginBottom: 10 }}>Найдено {this.state.catalogItems.length} товаров!</Text>

                }

                <FlatList
                        style={styles.catalog_items_main_wrapper}
                        data={this.state.catalogItems}
                        renderItem={({item}) => (
                            // <TouchableOpacity
                            //     style={{width: '20%', flexDirection: 'column', alignItems: 'flex-start'}}
                            //     onPress={() => {
                            //         this.openBigImage(item)
                            //     }}
                            // >
                            //     <Image
                            //         source={{uri: item.image}}
                            //         style={{
                            //             width: 74,
                            //             height: 74,
                            //             borderWidth: 2,
                            //             borderColor: '#17171F',
                            //             borderBottomWidth: 0,
                            //         }}
                            //     />
                            //
                            //
                            // </TouchableOpacity>



                            <View style={styles.catalog_item}  >

                                {item.product_image.length > 0 ?

                                    <TouchableOpacity style={styles.catalog_item_img_wrapper} onPress={() => this.redirectToCardProduct(item)}>
                                        <Image style={styles.catalog_item_img} source={{uri: item.product_image[0].picture}} />
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity style={styles.catalog_item_img_wrapper} onPress={() => this.redirectToCardProduct(item)}>
                                        <Image style={styles.catalog_item_img} source={require('../../assets/images/band_rate_logo.png')} />
                                    </TouchableOpacity>

                                }

                                <View style={styles.catalog_item_info_wrapper}>
                                    <Text style={styles.catalog_item_info_name}>{item.model}</Text>
                                    <View style={styles.catalog_item_info_prices}>
                                        {item.oldprice != "null" && item.oldprice !== null &&
                                            <Text style={styles.catalog_item_info_discounted_price}>{item.oldprice.slice(1, -1)} руб.</Text>
                                        }

                                        <Text style={styles.catalog_item_info_price}>{item.price} руб.</Text>
                                    </View>


                                </View>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={2}
                        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
                        keyExtractor={(item, index) => index.toString()}
                    />



                {this.state.catalogItems.length > 0 &&

                   <View style={{width: '100%', flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20}}>

                    <TouchableOpacity
                        style={ [ {height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center',},  this.state.current_paginate == 1 ? {opacity: 0.5} : {}]}
                        onPress={() => {this.getPrevCatalogData()}}
                    >

                        <Svg style={{position: 'relative', left: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                            <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="red"/>
                        </Svg>
                        <Text style={{fontSize: 20, color: 'red'}}>Назад</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center'}}
                        onPress={() => {this.getNextCatalogData()}}
                    >

                        <Text style={{fontSize: 20, color: 'red'}}>Далее</Text>

                        <Svg style={{transform:[{rotate:'180deg'}], position: 'relative', right: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                            <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="red"/>
                        </Svg>

                    </TouchableOpacity>
                </View>


                }


                <Footer navigation={this.props.navigation} page={'product_search'}/>



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
                {/*            <Path d="M15.16 24.268h9.108a1.867 1.867 0 001.867-1.867V3.734a1.867 1.867 0 00-1.867-1.867H5.598a1.867 1.867 0 00-1.866 1.867v7.946a8.403 8.403 0 00-1.867.936V3.734A3.734 3.734 0 015.6 0h18.668A3.734 3.734 0 0128 3.734V22.4a3.734 3.734 0 01-3.733 3.734h-7.242l-1.866-1.867h.002zM8.869 9.334a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm4.198-.934a.933.933 0 01.933-.933h7.467a.934.934 0 010 1.867H14a.934.934 0 01-.933-.934zm0 5.6a.933.933 0 01.933-.933h7.467a.933.933 0 010 1.867H14a.934.934 0 01-.933-.933zm8.4 6.534H14.88c.07-.62.07-1.246 0-1.866h6.588a.933.933 0 110 1.866h-.002zM.717 16.624a6.533 6.533 0 009.736 8.204l4.747 4.775a.934.934 0 101.32-1.322l-4.76-4.76A6.533 6.533 0 10.715 16.623h.001zm9.696.384A4.667 4.667 0 112.7 22.265a4.667 4.667 0 017.714-5.257z" fill="#D0251D"/>*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}

                {/*    <TouchableOpacity style={[styles.footer_page_btn, {positon: "relative", bottom: 8}]} onPress={() => this.redirectToCatalog()}>*/}
                {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={42} viewBox="0 0 44 42" fill="none">*/}
                {/*            <Path d="M22.495 2.638l17.884 17.884H38.1v19.1a.7.7 0 01-.7.7h-9.5v-15.4H16.1v15.4H6.6a.7.7 0 01-.7-.7v-19.1H3.621L21.505 2.638a.7.7 0 01.99 0z" stroke="#333" strokeWidth={3}/>*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]} onPress={() => this.redirectToBasket()}>*/}
                {/*        <View style={styles.footer_basket_icon}>*/}
                {/*            <Svg*/}
                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                {/*                width={33}*/}
                {/*                height={29}*/}
                {/*                viewBox="0 0 33 29"*/}
                {/*                fill="none"*/}
                {/*            >*/}
                {/*                <Path*/}
                {/*                    d="M29.282 16.843h0a.372.372 0 01-.366.282H10.893l.249 1.203.375 1.812.165.797h16.192c.255 0 .415.227.367.437l-.317 1.375-.179.78.721.346a2.17 2.17 0 011.242 1.953c0 1.189-.978 2.172-2.208 2.172-1.23 0-2.208-.983-2.208-2.172 0-.604.25-1.15.66-1.547l1.773-1.718h-16.95l1.774 1.718c.41.397.66.943.66 1.547C13.208 27.017 12.23 28 11 28s-2.208-.983-2.208-2.172c0-.798.439-1.502 1.106-1.881l.632-.36-.147-.712L6.358 3.422l-.165-.797H1.375A.367.367 0 011 2.265V1.36C1 1.172 1.157 1 1.375 1h5.874c.187 0 .335.129.368.29h0l.525 2.538.165.797h23.317c.255 0 .415.227.367.437l-2.709 11.78z"*/}
                {/*                    stroke="#333"*/}
                {/*                    strokeWidth={2}*/}
                {/*                />*/}
                {/*            </Svg>*/}
                {/*        </View>*/}
                {/*        {this.state.show_basket_count &&*/}
                {/*        <View style={{position: "absolute", right: -20, top: -10, borderRadius: 100, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0251D'}}>*/}
                {/*            <Text style={{color: "#ffffff", fontWeight: 'bold', fontSize: 12}}>{this.state.basket_count}</Text>*/}
                {/*        </View>*/}
                {/*        }*/}


                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.footer_page_btn} onPress={() => this.redirectToPersonalArea()}>*/}
                {/*        <Svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            width={30}*/}
                {/*            height={30}*/}
                {/*            viewBox="0 0 496 496"*/}
                {/*            fill="none"*/}

                {/*        >*/}
                {/*            <Path*/}
                {/*                d="M248 96c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 331.2 48 291.2 48 248c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"*/}
                {/*                fill="#333"*/}
                {/*            />*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}

                {/*</View>*/}

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
        // paddingTop: 31,
    },

    catalog_item: {
        width: '48%',
        alignSelf: "center",
        marginBottom: 20,


    },
    catalog_items_main_wrapper: {
        width: "100%",
        paddingHorizontal: 20,
        alignSelf: 'center',
        paddingTop: 18,
        paddingBottom: 18,
    },

    catalog_item_img_wrapper: {
        // backgroundColor: '#E2E2E2',
        borderRadius: 10,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 3,
        width: '100%',
    },
    catalog_item_info_name: {
        fontSize: 17,
        color: "#000000",
        fontWeight: '400',
    },
    catalog_item_info_code: {
        color: "#545454",
        fontWeight: '400',
        fontSize: 13,
        marginBottom: 5,
    },
    catalog_item_info_price: {
        fontSize: 16,
        color: "#000000",
        fontWeight: 'bold',
    },

    catalog_item_info_prices: {
        flexDirection: "row",
        alignItems: "center",
    },

    catalog_item_info_discounted_price: {
        color: "#E6524B",
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: "line-through",
        marginRight: 3,
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
        paddingBottom: 12,
        paddingHorizontal: 32,
        // position: "absolute",
        // bottom: -180,

    },




    filter_modal_wrapper: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        height: '100%',
        paddingTop: 51,
        paddingBottom: 60,
        paddingHorizontal: 20,
        position: 'relative',
    },



    filter_modal_title_icon_wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    filter_modal_title: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
    },

    filter_modal_close_btn: {
        position: 'absolute',
        right: 10,

    },

    inputRadio: {
        backgroundColor: "#E4E4E4",
        paddingHorizontal: 20,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },


    activeInputRadioBorder: {
        backgroundColor: '#E6524B',
    },


    activeInputRadioColor: {
        color: '#ffffff',
    },

    sort_radio_input_title: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
    },

    sort_radio_input_main_title: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sort_radio_input_child: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    sort_radio_input: {
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        paddingBottom: 15,
        marginBottom: 15,
    },

    filter_modal_input_title: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filter_modal_input_field_child: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    filter_modal_input_field: {
        borderColor: '#E6524B',
        borderWidth: 2,
        borderRadius: 5,
        width: 110,
        height: 40,
        padding: 10,
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',

    },
    filter_modal_input_icon: {
        marginHorizontal: 15,

    },
    filter_modal_input_field_wrapper: {
        marginBottom: 15,
    },
    sort_radio_input_child_scroll: {
        paddingBottom: 15,
    },
    filter_modal_buttons_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 49,
    },
    filter_modal_reset_button: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginRight: 13,
    },
    filter_modal_reset_button_text: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filter_modal_apply_button: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#D0251D',
        borderRadius: 8,
        marginRight: 13,
    },
    filter_modal_apply_button_text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    catalog_menu_icon_btn_text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
    },


    product_search_header: {
        height: 114,
        marginBottom: 10,
        paddingHorizontal: 26,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
    },

    product_search_title_btn_wrapper: {
         flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        position: 'relative',
        width: '100%',
    },
    product_search_title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#333333',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    product_search_back_btn: {
        position: 'absolute',
        left: 0,
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
    not_found_product_wrapper: {
       alignSelf: 'center',
    },
    not_found_product_text: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000000',
    },
    catalog_item_img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

});
