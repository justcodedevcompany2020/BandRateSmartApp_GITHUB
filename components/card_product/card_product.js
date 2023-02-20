import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from 'expo-status-bar';
// import { ImageSlider } from "react-native-image-slider-banner";

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
    Platform,

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
            email: null,
            password: null,
            sort_by_default: false,
            slider_images: [],
            current_image: 1,
            similar_products: [],
            single_product_info: {},
            loaded: false,
            product_params: {},
            minimum_product_params: {},
            open_more_product_params: false,
            favourite_product_heart: false,
            show_add_to_basket_notification: false,
            show_basket_count: false,
            basket_count: 0,

            show_favourites_products_count: false,
            favourites_products_count: 0,

            position: 1,
            active_slider_index: 0

        };



    }
    getSimilarProducts = () => {
        return this.state.similar_products;

    }
    //
    // redirectToCardProduct = (item) => {
    //     this.props.navigation.navigate("CardProduct", {
    //         params: JSON.stringify(item)
    //     });
    // }



    backToPrevPage = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate(this.props.prev_page);
    }

    sliderImages = () => {
        return this.state.slider_images;
    }

    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
    }

    redirectToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    }

    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }
    redirectToBasket = () => {
        this.props.navigation.navigate("Basket");
    }
    redirectToProductSearch = () => {
        this.props.navigation.navigate("ProductSearch");
    }



    openSimilarProduct = async (product_id) => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        await this.setState({
            loaded: false
        })
        // console.log(product_info, "product_info");

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/CatalogOneProduct/product_id='+product_id,
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

                console.log(response.data.oneproducts[0], "response");

                let pictures = response.data.oneproducts[0].product_image
                let slider_images = [];

                for (let i = 0; i < pictures.length ; i++) {
                    // if (Platform.OS === "ios") {
                        slider_images.push(pictures[i].picture)
                    // } else {
                    //     slider_images.push({img:pictures[i].picture})
                    // }

                }

                this.setState({
                    single_product_info: response.data.oneproducts[0],
                    similar_products: response.data.randomproducts,
                    slider_images: slider_images,
                    loaded: true,
                })

            })


    }




    getProductInfo = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_info = JSON.parse(this.props.info);
        let product_id = product_info.product_id;

        console.log(userToken)
        console.log('http://37.230.116.113/BandRate-Smart/public/api/CatalogOneProduct/product_id='+product_id)

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/CatalogOneProduct/product_id='+product_id,
            // 'http://37.230.116.113/BandRate-Smart/public/api/CatalogOneProduct/product_id=1196005',
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

                console.log(response, "response.data.oneproducts.product_image");
                console.log(response.data.oneproductsParams, "response.data.oneproductsParams");


                let pictures = response.data.oneproducts[0].product_image;
                let slider_images = [];


                for (let i = 0; i < pictures.length ; i++) {
                    // if (Platform.OS === "ios") {
                        slider_images.push(pictures[i].picture)
                    // } else {
                    //     slider_images.push({img:pictures[i].picture})
                    // }
                }

                let product_params = response.data.oneproductsParams;
                let new_product_params = {}
                let minimum_product_params = {}

                // console.log(product_params, "one_product_params")

                for (let i = 0; i < product_params.length ; i++) {
                    for (let prop in product_params[i]) {

                        if (prop == 'parentId' || prop == 'categoryId') {
                            break
                        }
                        if (prop == 'Пол' || prop == 'Механизм') {
                            minimum_product_params[prop] = product_params[i][prop]
                        } else {
                            new_product_params[prop] = product_params[i][prop]
                        }

                    }
                }

                // console.log(response.data.oneproducts, 'response.data.oneproducts')

                this.setState({
                    single_product_info: response.data.oneproducts[0],
                    similar_products: response.data.randomproducts,
                    slider_images: slider_images,
                    product_params: new_product_params,
                    minimum_product_params: minimum_product_params,
                    loaded: true,
                    favourite_product_heart: response.data.favorit_product,
                })


            })


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

    componentDidMount() {
        const { navigation } = this.props;


        this.getProductInfo();
        this.checkBasketCount();
        this.checkFavouritesProductsCount();
        console.log(this.props.prev_page, 'this.props.prev_page')

        this.focusListener = navigation.addListener("focus", () => {
            this.getProductInfo();
            this.checkBasketCount();
            this.checkFavouritesProductsCount();

            console.log(this.props.prev_page, 'this.props.prev_page')

        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            // console.log('Bum END')
        }

        clearInterval(this.state.interval);
    }


    addToFavouritesList = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = this.state.single_product_info.product_id;
        let Original_Product_id = this.state.single_product_info.id;

        // console .log(this.state.single_product_info, "this.state.single_product_info");
        // console .log(product_id, Original_Product_id, "idiner");


        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/FavoritProduct',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: product_id,
                    Original_Product_id: Original_Product_id,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {

                // console.log(response, "idiner_success")

                this.setState({
                    favourite_product_heart: true,
                })

                this.checkFavouritesProductsCount();

            })
    }


    removeFromFavouritesList = async  () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = this.state.single_product_info.product_id;
        let Original_Product_id = this.state.single_product_info.id;

        // console .log(product_id, Original_Product_id, "idiner");

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
                    Original_Product_id: Original_Product_id,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {

                console.log(response, "idiner_success")

                this.setState({
                    favourite_product_heart: false,
                })

                this.checkFavouritesProductsCount();
            })

    }



    addToBasket = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = this.state.single_product_info.product_id;



        // console .log(product_id, "idiner");


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

                // console.log(response, "idiner_success")
                if (response.hasOwnProperty("status")) {
                     if (response.status === true) {

                         this.setState({
                             show_add_to_basket_notification: true,

                         })

                         this.checkBasketCount();
                         //
                         // AsyncStorage.getItem('countsOfProductsInBasket',(err,item) => {
                         //
                         //     let countsOfProductsInBasket = item ? JSON.parse(item) : '0'
                         //
                         //     let newCountsOfProductsInBasket = '';
                         //     if (countsOfProductsInBasket != '0') {
                         //
                         //         newCountsOfProductsInBasket = countsOfProductsInBasket + 1
                         //         newCountsOfProductsInBasket = JSON.stringify(newCountsOfProductsInBasket)
                         //
                         //     } else {
                         //         newCountsOfProductsInBasket = '1';
                         //     }
                         //
                         //     this.setState({
                         //         show_basket_count: true,
                         //         basket_count: newCountsOfProductsInBasket
                         //     })
                         //
                         //     AsyncStorage.setItem('countsOfProductsInBasket', newCountsOfProductsInBasket);
                         //
                         // })


                         setTimeout(() => {
                             this.setState({
                                 show_add_to_basket_notification: false,
                             })
                         }, 2000)

                     }
                }



            })
    }


    addToSimiliarProduct = async (product) => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = product.prooduct_id;


        //
        // console .log(product_id, "idiner");
        //
        // let value = await AsyncStorage.getItem('countsOfProductsInBasket');
        // if (value != null){
        //     alert('la')
        // }
        // else {
        //     alert('chkaa')
        //
        // }


        await  fetch(
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
            .then ((response) => {

                console.log(response, "idiner_success")
                if (response.hasOwnProperty("status")) {
                    if (response.status === true) {

                        this.setState({
                            show_add_to_basket_notification: true,
                        })

                        this.checkBasketCount();

                        // let countsOfProductsInBasket    =  AsyncStorage.getItem('countsOfProductsInBasket');


                        // AsyncStorage.getItem('countsOfProductsInBasket',(err,item) => {
                        //
                        //     let countsOfProductsInBasket = item ? JSON.parse(item) : '0'
                        //
                        //     let newCountsOfProductsInBasket = '';
                        //     if (countsOfProductsInBasket != '0') {
                        //
                        //         newCountsOfProductsInBasket = countsOfProductsInBasket + 1
                        //         newCountsOfProductsInBasket = JSON.stringify(newCountsOfProductsInBasket)
                        //
                        //     } else {
                        //         newCountsOfProductsInBasket = '1';
                        //     }
                        //
                        //     this.setState({
                        //         show_basket_count: true,
                        //         basket_count: newCountsOfProductsInBasket
                        //     })
                        //
                        //     AsyncStorage.setItem('countsOfProductsInBasket', newCountsOfProductsInBasket);
                        //
                        // })




                        setTimeout(() => {
                            this.setState({
                                show_add_to_basket_notification: false,
                            })
                        }, 2000)

                    }
                }



            })
    }


    getActiveSliderImage = () =>
    {
        let {slider_images, active_slider_index} = this.state;
        let url = slider_images[0];

        if (active_slider_index > slider_images.length -1 )
        {
            url = slider_images[0];
        } else {
            url = slider_images[active_slider_index];
        }

        return url;
    }


    prevSlide = () =>
    {
        let {slider_images, active_slider_index} = this.state;
        let new_active_slider_index;

        if (active_slider_index == 0)
        {
            new_active_slider_index = slider_images.length -1
        } else {
            new_active_slider_index = active_slider_index - 1;
        }

        this.setState({
            active_slider_index: new_active_slider_index
        })
    }

    nextSlide = () =>
    {
        let {slider_images, active_slider_index} = this.state;
        let new_active_slider_index;

        if (active_slider_index > slider_images.length -1 )
        {
            new_active_slider_index = 0
        } else {
            new_active_slider_index = active_slider_index + 1;
        }

        this.setState({
            active_slider_index: new_active_slider_index
        })
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

                <View style={styles.card_product_header}>

                    <View style={styles.back_to_catalog_btn_wrapper}>
                        <TouchableOpacity style={styles.back_to_catalog_btn}  onPress={() => this.backToPrevPage()}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="#000"/>
                            </Svg>
                        </TouchableOpacity>
                    </View>



                    {this.state.favourite_product_heart &&

                        <TouchableOpacity
                            style={styles.card_product_favorites_btn}
                            onPress={() => {
                                this.removeFromFavouritesList()
                            }}
                        >

                            <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                <Path d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987a1.314 1.314 0 001.366 0c11.483-7.06 12.65-14.044 12.65-16.987 0-3.645-2.985-6.6-6.666-6.6C18.985 4 16 8 16 8s-2.986-4-6.667-4z" fill="#D0251D" stroke="#D0251D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                            </Svg>

                        </TouchableOpacity>

                    }

                    {!this.state.favourite_product_heart &&

                    <TouchableOpacity style={styles.card_product_favorites_btn} onPress={() => {this.addToFavouritesList()}}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={26}
                            viewBox="0 0 30 26"
                            fill="none"
                        >
                            <Path
                                d="M8.333 1C4.652 1 1.666 3.955 1.666 7.6c0 2.943 1.167 9.927 12.651 16.987a1.314 1.314 0 001.365 0C27.166 17.527 28.334 10.543 28.334 7.6c0-3.645-2.985-6.6-6.666-6.6C17.985 1 15 5 15 5s-2.986-4-6.667-4z"
                                stroke="#D0251D"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>

                    </TouchableOpacity>


                    }


                </View>

                <ScrollView style={styles.card_product_main_wrapper}>
                    <View style={styles.card_product_header_slider_box}>


                        {Platform.OS === "ios" &&
                           <View style={[styles.slider_box]}>
                            {/*<SliderBox*/}
                            {/*    dotStyle={{*/}
                            {/*        width:20,*/}
                            {/*        height:20,*/}
                            {/*        borderRadius:100,*/}
                            {/*        backgroundColor:'#A5A5A5',*/}
                            {/*        marginHorizontal:0,*/}
                            {/*        padding: 0,*/}
                            {/*        margin: 0,*/}
                            {/*        position: "absolute",*/}
                            {/*        bottom: -30,*/}
                            {/*    }}*/}
                            {/*    style={styles.slider_images}*/}
                            {/*    inactiveDotColor="#A5A5A5"*/}
                            {/*    dotColor="#D0251D"*/}
                            {/*    sliderBoxHeight={200}*/}
                            {/*    circleLoop={true}*/}
                            {/*    resizeMode={"contain"}*/}
                            {/*    resizeMethod={'resize'}*/}
                            {/*    ImageComponentStyle={{height: '50%', width: '30%', justifyContent: 'center', alignSelf: 'center'}}*/}


                            {/*    // paginationBoxStyle={{*/}
                            {/*    //     alignItems: "center",*/}
                            {/*    //     alignSelf: "center",*/}
                            {/*    //     justifyContent: "center",*/}
                            {/*    //     paddingVertical: 10,*/}
                            {/*    //     backgroundColor:"#00000099",*/}
                            {/*    //     display: "block",*/}
                            {/*    // }}*/}
                            {/*    images={this.sliderImages()}*/}
                            {/*    onCurrentImagePressed={index => console.log(index)}*/}
                            {/*    currentImageEmitter={index => this.setState({current_image: index+1})}*/}
                            {/*/>*/}
                        </View>

                        }

                        <View style={[styles.slider_box, {height: 250}]}>

                            {this.state.slider_images.length > 0 &&

                                   <View style={{width:'100%', backgroundColor:'black'}}>
                                       <TouchableOpacity
                                           style={{width: 50, height:50, position:'absolute', top:100, left:10, zIndex:9999}}
                                           onPress={() => {
                                               this.prevSlide()
                                           }}
                                       >
                                           <Svg fill="#fff" width={50} height={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="icon">
                                               <Path d="M768 903.232L717.568 960 256 512 717.568 64 768 120.768 364.928 512z" />
                                           </Svg>
                                       </TouchableOpacity>

                                       <Image style={{width:'100%', height:'100%', resizeMode:'contain'}} source={{uri: this.getActiveSliderImage()}} />


                                       <TouchableOpacity
                                           style={{width: 50, height:50, position:'absolute', top:100, right: 10, zIndex:9999}}
                                           onPress={() => {
                                               this.nextSlide()
                                           }}
                                       >
                                           <Svg fill="#fff" width={50} height={50} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1024 1024" className="icon">
                                               <Path d="M256 120.768L306.432 64 768 512 306.432 960 256 903.232 659.072 512z" />
                                           </Svg>
                                       </TouchableOpacity>


                                   </View>
                            }
                        </View>

                    </View>

                    <View style={styles.card_product_info_wrapper}>
                        <Text style={styles.card_product_info_name}>{this.state.single_product_info.model}</Text>
                        <Text style={styles.card_product_info_code}>Код товара: {this.state.single_product_info.product_id}</Text>
                        <View style={styles.catalog_item_info_prices}>
                            <Text style={styles.card_product_info_price}>Цена:
                                {/*<View style={styles.card_product_info_price_line}></View>*/}
                                <Text style={styles.card_product_info_price_bold}>
                                    {this.state.single_product_info.price} Руб.
                                </Text>

                            </Text>
                            {this.state.single_product_info.oldprice != 'null' &&

                                <Text style={styles.catalog_item_info_discounted_price}>{this.state.single_product_info.oldprice.slice(1, -1)}руб.</Text>
                            }
                        </View>
                        <View style={styles.card_product_info_description}>
                            <Text style={styles.card_product_info_description_title}>Описание</Text>
                            <View style={styles.card_product_info_description_line}></View>
                            <View style={styles.card_product_info_description_items}>


                                <View style={styles.card_product_info_description_item}>
                                    <Text style={styles.card_product_info_description_item_title}>Модель</Text>
                                    <Text style={styles.card_product_info_description_item_info}>{this.state.single_product_info.model}</Text>
                                </View>

                                <View style={styles.card_product_info_description_item}>
                                    <Text style={styles.card_product_info_description_item_title}>Пол</Text>
                                    <Text style={styles.card_product_info_description_item_info}>
                                        {this.state.minimum_product_params.hasOwnProperty('Пол') ? this.state.minimum_product_params["Пол"] : "Не указан" }
                                    </Text>
                                </View>
                                <View style={styles.card_product_info_description_item}>
                                    <Text style={styles.card_product_info_description_item_title}>Механизм</Text>
                                    <Text style={styles.card_product_info_description_item_info}>
                                        {this.state.minimum_product_params.hasOwnProperty('Механизм') ? this.state.minimum_product_params["Механизм"] : "Не указан" }
                                    </Text>
                                </View>
                            </View>

                            <View style={{}}>
                                {Object.entries(this.state.product_params).map((key, index) => {
                                    console.log(key, 'ddwedw')
                                    if(key[0] == 'Особенности'  || key[0] == 'Дополнительные функции' ) {
                                        return null
                                    } else {
                                        return (
                                            <View key={index} style={styles.card_product_info_description_item}>
                                                <Text style={styles.card_product_info_description_item_title}>{key[0]}</Text>
                                                <Text style={styles.card_product_info_description_item_info}>
                                                    {key[1]}
                                                </Text>
                                            </View>
                                        )
                                    }

                                })}



                                {this.state.single_product_info.Size &&
                                    <View  style={styles.card_product_info_description_item}>
                                        <Text style={styles.card_product_info_description_item_title}>Размер</Text>
                                        <Text style={styles.card_product_info_description_item_info}>
                                            {this.state.single_product_info.Size}
                                        </Text>
                                    </View>
                                }


                                {this.state.single_product_info.Peculiarities &&

                                    <View  style={styles.card_product_info_description_item}>
                                        <Text style={styles.card_product_info_description_item_title}>Особенности</Text>
                                        <Text style={styles.card_product_info_description_item_info}>
                                            {this.state.single_product_info.Peculiarities}
                                        </Text>
                                    </View>

                                }


                                {this.state.single_product_info.Additional_functions &&

                                    <View  style={styles.card_product_info_description_item}>
                                        <Text style={styles.card_product_info_description_item_title}>Дополнительные функции</Text>
                                        <Text style={styles.card_product_info_description_item_info}>
                                            {this.state.single_product_info.Additional_functions}
                                        </Text>
                                    </View>

                                }

                                {/*single_product_info*/}


                            </View>


                            {/*<TouchableOpacity style={styles.card_product_info_description_footer_line_icon} onPress={() => {this.setState({open_more_product_params: !this.state.open_more_product_params})}}>*/}
                            {/*    <View style={styles.card_product_info_description_footer_line}></View>*/}
                            {/*    <View style={styles.card_product_info_description_footer_icon}>*/}
                            {/*        <Svg*/}
                            {/*            style={this.state.open_more_product_params ? {   transform:[{rotate:'180deg'}] } : {}}*/}
                            {/*            xmlns="http://www.w3.org/2000/svg"*/}
                            {/*            width={18}*/}
                            {/*            height={10}*/}
                            {/*            viewBox="0 0 18 10"*/}
                            {/*            fill="none"*/}
                            {/*        >*/}


                            {/*            <Path*/}
                            {/*                d="M17.75 1.712a1.251 1.251 0 01-.462.975l-7.5 6.038a1.25 1.25 0 01-1.588 0L.7 2.475A1.252 1.252 0 112.3.55L9 6.137l6.7-5.4a1.25 1.25 0 012.05.975z"*/}
                            {/*                fill="#D9D9D9"*/}
                            {/*            />*/}
                            {/*        </Svg>*/}
                            {/*    </View>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={styles.similar_products_items_title_wrapper}>
                            <Text style={styles.similar_products_items_title}>Похожые товары</Text>
                            <ScrollView style={styles.similar_products_items_wrapper} horizontal={true}>

                                {this.getSimilarProducts().map((product, index) => {
                                    return (


                                    <View style={styles.similar_products_item} key={index}>
                                        {/*<TouchableOpacity style={styles.similar_products_img_box}>*/}

                                        {/*    <Image style={styles.similar_products_img} source={product.image} />*/}
                                        {/*</TouchableOpacity>*/}

                                        {product.picture.length > 0 ?

                                            <TouchableOpacity style={styles.similar_products_img_box} onPress={() => this.openSimilarProduct(product.prooduct_id)}>
                                                <Image style={styles.similar_products_img} source={{uri: product.picture[0].picture}} />
                                            </TouchableOpacity>

                                            :

                                            <TouchableOpacity style={styles.similar_products_img_box} onPress={() => this.openSimilarProduct(product.prooduct_id)}>
                                                <Image style={styles.similar_products_img} source={require('../../assets/images/band_rate_logo.png')} />
                                            </TouchableOpacity>


                                        }
                                        <View style={styles.similar_products_item_info}>
                                            <Text style={styles.similar_products_item_info_title}>{product.model}</Text>
                                            <Text style={styles.similar_products_item_info_code}>{product.prooduct_id}</Text>
                                            <View style={styles.similar_products_item_info_price_card_icon_wrapper}>

                                                <Text style={styles.similar_products_item_info_price}>
                                                    {product.price}<Text style={styles.similar_products_item_info_price_light}>руб.</Text>
                                                </Text>
                                                <TouchableOpacity style={styles.card_icon} onPress={() => {this.addToSimiliarProduct(product)}}>
                                                    <Svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={22}
                                                        height={20}
                                                        viewBox="0 0 22 20"
                                                        fill="none"
                                                    >
                                                        <Path
                                                            d="M19.683 11.662h0a.421.421 0 01-.406.338H7.471l.12.598.25 1.25.08.402h10.662c.254 0 .47.248.406.537l-.211.948-.085.382.35.174c.547.272.93.848.93 1.521 0 .943-.745 1.688-1.64 1.688-.894 0-1.639-.745-1.639-1.688 0-.475.191-.903.497-1.209l.852-.853H7.624l.852.853c.305.306.496.734.496 1.21 0 .942-.744 1.687-1.639 1.687-.894 0-1.639-.745-1.639-1.688 0-.63.336-1.176.828-1.466l.307-.18-.07-.349L4.076 2.402 3.996 2H.916A.427.427 0 01.5 1.562V.938C.5.685.697.5.917.5h3.916c.19 0 .365.138.407.348h0l.35 1.75.081.402h15.412c.254 0 .47.248.406.537l-1.806 8.125z"
                                                            stroke="#fff"
                                                        />
                                                    </Svg>

                                                </TouchableOpacity>
                                            </View>

                                        </View>


                                    </View>



                                    );
                                })}


                            </ScrollView>





                        </View>
                    </View>

                </ScrollView>

                <View style={styles.footer_wrapper}>

                    <TouchableOpacity style={[styles.add_to_card_button, {position:'absolute',  left: 20, right: 0, top: -60}]} onPress={() =>{this.addToBasket()}}>
                        <Text style={styles.add_to_card_button_text}>В корзину</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]} onPress={() => this.redirectToFavorites()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={26} viewBox="0 0 28 26" fill="none">
                            <Path d="M7.75 1.75c-3.451 0-6.25 2.77-6.25 6.188 0 2.758 1.094 9.306 11.86 15.925a1.232 1.232 0 001.28 0C25.406 17.242 26.5 10.696 26.5 7.938c0-3.418-2.799-6.188-6.25-6.188S14 5.5 14 5.5s-2.799-3.75-6.25-3.75z" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
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
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={33}
                                height={29}
                                viewBox="0 0 33 29"
                                fill="none"
                            >
                                <Path
                                    d="M29.282 16.843h0a.372.372 0 01-.366.282H10.893l.249 1.203.375 1.812.165.797h16.192c.255 0 .415.227.367.437l-.317 1.375-.179.78.721.346a2.17 2.17 0 011.242 1.953c0 1.189-.978 2.172-2.208 2.172-1.23 0-2.208-.983-2.208-2.172 0-.604.25-1.15.66-1.547l1.773-1.718h-16.95l1.774 1.718c.41.397.66.943.66 1.547C13.208 27.017 12.23 28 11 28s-2.208-.983-2.208-2.172c0-.798.439-1.502 1.106-1.881l.632-.36-.147-.712L6.358 3.422l-.165-.797H1.375A.367.367 0 011 2.265V1.36C1 1.172 1.157 1 1.375 1h5.874c.187 0 .335.129.368.29h0l.525 2.538.165.797h23.317c.255 0 .415.227.367.437l-2.709 11.78z"
                                    stroke="#333"
                                    strokeWidth={2}
                                />
                            </Svg>
                        </View>
                        {this.state.show_basket_count &&
                            <View style={{position: "absolute", right: -20, top: -10, borderRadius: 100, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0251D'}}>
                               <Text style={{color: "#ffffff", fontWeight: 'bold', fontSize: 12}}>{this.state.basket_count}</Text>
                            </View>
                        }


                    </TouchableOpacity>


                    <TouchableOpacity style={styles.footer_page_btn}   onPress={() => this.redirectToPersonalArea()}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={30}
                            viewBox="0 0 496 496"
                            fill="none"

                        >
                            <Path
                                d="M248 96c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 331.2 48 291.2 48 248c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"
                                fill="#333"
                            />
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
        // paddingTop: 25,
    },

    card_product_main_wrapper: {
        width: "100%",
        // justifyContent: "space-between",
        paddingBottom: 25,
        // position: "relative",
        flex: 1,


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
        // bottom: 0,

    },
    slider_images: {
        width: 254,
        height: 254,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    card_product_header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        // position: "absolute",
        width: "100%",
        paddingVertical:5
        // top: 10,
        // zIndex: 99,
        // height: 70,
    },


    card_product_info_name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000000",
        lineHeight: 35,
    },

    card_product_info_code: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
        lineHeight: 25,
        marginBottom: 15,
    },

    card_product_info_price: {
        fontSize: 22,
        fontWeight: "400",
        color: "#000000",
        lineHeight: 35,
        marginBottom: 10,

    },

    card_product_info_price_bold: {
        fontWeight: "bold",
    },
    card_product_info_price_line: {
        marginRight: 5,
    },
    card_product_info_wrapper: {
        width: "100%",
        paddingHorizontal: 17,
        paddingTop: 30,
    },
    card_product_info_description_title: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
        lineHeight: 25,
        marginBottom: 5,
    },
    card_product_info_description_line: {
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        marginBottom: 10,
        height: 1,
    },
    card_product_info_description_item: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },

    // card_product_info_description_items: {
    //     marginBottom: 17,
    // },
    card_product_info_description_item_title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
         lineHeight: 24,
        marginBottom: 5,
    },
    card_product_info_description_footer_line_icon: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,

    },
    card_product_info_description_footer_line: {
        width: "88%",
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
        marginRight: 14,
        height: 1,
    },
    card_product_info_description: {
        width: "100%",
        marginBottom: 30,
    },
    similar_products_items_title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000000",
        marginBottom: 10,
        lineHeight: 32,

    },

    similar_products_items_wrapper: {
        marginBottom: 40,
        width: "100%",

    },

    similar_products_item: {
        width: 151,
        borderRadius: 5,
        marginRight: 15,
    },

    similar_products_item_info_title: {
        fontSize: 14,
        fontWeight: '500',
        color: "#000000",
        lineHeight: 16,
    },

    similar_products_item_info_code: {
        fontSize: 14,
        fontWeight: '400',
        color: "#000000",
        lineHeight: 16,
        marginBottom: 6,
    },
    similar_products_img_box: {
        // backgroundColor: "#E2E2E2",
        borderRadius: 5,
        justifyContent:"center",
        alignItems: "center",
        width: "100%",
        height: 150,
        paddingHorizontal: 25,
        paddingVertical: 10,

    },
    similar_products_img: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },

    similar_products_item_info: {
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    similar_products_item_info_price: {
        fontSize: 14,
        fontWeight: '700',
        color: "#000000",
        lineHeight: 22,
    },
    similar_products_item_info_price_light: {
        fontSize: 14,
        fontWeight: '400',
        color: "#000000",
        lineHeight: 22,
    },
    similar_products_item_info_price_card_icon_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    card_icon: {
        backgroundColor: "#E96761",
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buy_add_to_card_buttons_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 50,
    },

    buy_button: {
        backgroundColor: "#D0251D",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width:"100%",
        maxWidth: 180,


    },

    buy_button_text: {
       fontWeight: "bold",
       fontSize: 18,
       color: "#FFFFFF",
    },

    add_to_card_button: {
        backgroundColor: "#D0251D",
        borderRadius: 8,
        // borderColor: "#000000",
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 120,
        // maxWidth: 180,
        marginBottom: 50,


    },
    add_to_card_button_text: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#ffffff",
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
        marginLeft: 5,
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
