import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback
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

import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            sort_by_gender: '',
            image_items: [
                {
                    name: 'Тема 1',
                },
                {
                    name: 'Тема 2',
                },
                {
                    name: 'Тема 3',
                },

                {
                    name: 'Тема 4',
                },

                {
                    name: 'Тема 5',
                },
                {
                    name: 'Тема 6',
                },
                {
                    name: 'Тема 7',
                },

                {
                    name: 'Тема 8',
                },


            ],

            loaded: false,
            current_paginate: 1,
            current_paginate_filter: 1,

            review: "",
            show_basket_count: false,
            basket_count: 0,

            show_favourites_products_count: false,
            favourites_products_count: 0,
            hide_next_button: false,
            next_page_url: null,
            theme_info:JSON.parse(this.props.theme),

            theme_image_base_path:`http://37.230.116.113/BandRate-Smart/storage/app/uploads/themsPhoto/`,
            upload_loader: false,
            upload_success: false,


        };

        this.Star = require('../../assets/images/star_rating_image.png');
        this.Star_With_Border = require('../../assets/images/star_not_rating_img.png');
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

                // console.log(response, "favourites_product_count_ggggg");

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


    getCatalogData = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let current_paginate = this.state.current_paginate;

        let theme = JSON.parse(this.props.theme);
        let theme_id = theme.id;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/get_themes_photo?page='+current_paginate,
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    themes_id: theme_id
                })
            }
        ).then((response) => response.json())
        .catch((error) => {
            console.log("ERROR " , error)

        })
        .then((response) => {

            console.log(response.data.data, 'response.data.data');


            this.setState({
                image_items: response.data.data,
                next_page_url: response.data.next_page_url,
                loaded: true,
            })

        })
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.getCatalogData();
        this.checkBasketCount();
        this.checkFavouritesProductsCount();


        this.focusListener = navigation.addListener("focus", () => {
            this.getCatalogData();
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

    getNextCatalogData = async () =>
    {
        await this.setState({
            loaded: false
        })
        let current_paginate = this.state.current_paginate;
        await this.setState({
            current_paginate: current_paginate + 1,
        })
        this.getCatalogData();

    }

    getPrevCatalogData = async () => {

        let current_paginate = this.state.current_paginate;
        let new_current_page = current_paginate - 1;

        if (new_current_page > 0)
        {
            await this.setState({
                current_paginate: new_current_page,
                loaded: false
            })
            this.getCatalogData();
        } else  {
            await this.setState({
                loaded: true
            })
        }

    }

    redirectToCardProduct = (item) => {
        this.props.navigation.navigate("ThemeSingle", {
            theme_id: item.id,
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

    redirectToProductSearch = () => {
        this.props.navigation.navigate("ProductSearch");
    }

    handleDownload = async (uri,item) =>
    {
        await this.setState({
            upload_loader:true
        })

        console.log(uri);

        let date = moment().format('YYYYMMDDhhmmss')
        let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
        try {
            // let uri = `https://media.voguebusiness.com/photos/5ef6493adf1073db3375835d/master/pass/kanye-west-gap-news-voguebus-mert-alas-and-marcus-piggott-june-20-story.jpg`
            const res = await FileSystem.downloadAsync(uri, fileUri)

            await this.saveFile(res.uri, item)

        } catch (err) {
            await this.setState({
                upload_loader:false
            })
            console.log("FS Err: ", err)
        }
    }

     saveFile = async (fileUri, item) =>
     {
         let { status } = await MediaLibrary.requestPermissionsAsync()
         if (status === "granted") {
            try {
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }

                // Добавляем количество скачиваний для данной картинки;
                await this.addUploadCountOnForImage(item);

                await this.setState({
                    // upload_loader:false,
                    upload_success: true
                })

                setTimeout(async ()=>{
                    await this.setState({
                        upload_loader:false,
                        upload_success: false
                    })
                }, 1500)

            } catch (err) {
                console.log("Save err: ", err)
                await this.setState({
                    upload_loader:false,
                    upload_success: false
                })
            }



        } else if (status === "denied") {
            alert("please allow permissions to download")
             await this.setState({
                 upload_loader:false
             })
        }
    }


    addUploadCountOnForImage = async (item) =>
    {
        console.log(item, 'item')
        let photo_id = item.id
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/upload_photo',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    photo_id: photo_id
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((response) => {

                console.log(response, '')

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

                {this.state.upload_loader &&


                    <View style={styles.upload_loader_wrapper}>


                        {!this.state.upload_success ?

                            <View style={styles.upload_loader}>

                                <ActivityIndicator size="large" color="red"/>
                                <Text style={styles.upload_loader_text}>
                                    Скачивание темы
                                </Text>

                            </View>

                            :

                            <View style={styles.upload_loader}>

                                <Text style={styles.upload_loader_text}>
                                    Тема успешно загружена
                                </Text>

                            </View>

                        }

                    </View>


                }

                <View style={styles.catalog_header}>

                    <TouchableOpacity
                        style={{position:'absolute', left: 20}}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    >
                        <Svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                            <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="#000"/>
                        </Svg>
                    </TouchableOpacity>

                    <Text style={styles.catalog_title}>
                        {this.state.theme_info.title}
                    </Text>
                </View>


                {this.state.image_items.length > 0 &&

                    <FlatList
                        style={styles.catalog_items_main_wrapper}
                        data={this.state.image_items}
                        renderItem={({item}) => (
                            <View style={styles.catalog_item}>


                                <TouchableOpacity
                                    style={styles.catalog_item_img_wrapper}
                                    onPress={() => {
                                        this.handleDownload(`${this.state.theme_image_base_path}${item.photo}`, item)
                                    }}
                                >
                                    <Image
                                       style={styles.catalog_item_img}
                                       source={{uri: `${this.state.theme_image_base_path}${item.photo}`}}

                                    />
                                </TouchableOpacity>

                            </View>
                        )}
                        numColumns={2}
                        columnWrapperStyle={{flex: 1, justifyContent: "space-between"}}
                        keyExtractor={(item, index) => index.toString()}
                    />

                }

                <View style={{width: '100%', flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20}}>

                        <TouchableOpacity

                            style={ [ {height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center',},  this.state.current_paginate == 1 ? {opacity: 0.5} : {}]}
                            onPress={() => {this.getPrevCatalogData()}}
                        >

                            <Svg style={{position: 'relative', left: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                                <Path
                                    d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z"
                                    fill="red"
                                />
                            </Svg>
                            <Text style={{fontSize: 20, color: 'red'}}>Назад</Text>

                        </TouchableOpacity>



                        <TouchableOpacity
                            style={[styles.getNextCatalogData,this.state.next_page_url ? {} : {opacity: 0.5}]}
                            onPress={() => {
                                if (this.state.next_page_url) {
                                    this.getNextCatalogData()
                                }
                            }}
                        >

                            <Text style={{fontSize: 20, color: 'red'}}>Далее</Text>
                            <Svg style={{transform: [{rotate: '180deg'}], position: 'relative', right: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                                <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="red"/>
                            </Svg>

                        </TouchableOpacity>

                </View>

                <View style={styles.footer_wrapper}>

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
                            <Path
                                d="M15.16 24.268h9.108a1.867 1.867 0 001.867-1.867V3.734a1.867 1.867 0 00-1.867-1.867H5.598a1.867 1.867 0 00-1.866 1.867v7.946a8.403 8.403 0 00-1.867.936V3.734A3.734 3.734 0 015.6 0h18.668A3.734 3.734 0 0128 3.734V22.4a3.734 3.734 0 01-3.733 3.734h-7.242l-1.866-1.867h.002zM8.869 9.334a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm4.198-.934a.933.933 0 01.933-.933h7.467a.934.934 0 010 1.867H14a.934.934 0 01-.933-.934zm0 5.6a.933.933 0 01.933-.933h7.467a.933.933 0 010 1.867H14a.934.934 0 01-.933-.933zm8.4 6.534H14.88c.07-.62.07-1.246 0-1.866h6.588a.933.933 0 110 1.866h-.002zM.717 16.624a6.533 6.533 0 009.736 8.204l4.747 4.775a.934.934 0 101.32-1.322l-4.76-4.76A6.533 6.533 0 10.715 16.623h.001zm9.696.384A4.667 4.667 0 112.7 22.265a4.667 4.667 0 017.714-5.257z"
                                fill="#333"
                            />
                        </Svg>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.footer_page_btn, {positon: "relative", bottom: 8}]}
                        onPress={() => {
                            this.props.navigation.navigate('CatalogCategory')
                        }}
                    >
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
        // paddingTop: 20,


    },




    catalog_header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        width: "100%",
        height: 50,

    },
    catalog_title: {
        color: "#333333",
        fontSize: 30,
        fontWeight: 'bold',
    },

    catalog_menu_icon: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        position: 'absolute',
        right: 20,
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
        flex: 1,
    },

    catalog_item_img_wrapper: {
        // backgroundColor: '#E2E2E2',
        borderRadius: 10,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 3,
        width: '100%',
        overflow:'hidden'
    },
    catalog_item_img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
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
        position: 'relative',
    },



    filter_modal_title_icon_wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 20
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
        paddingBottom: 8,
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
        marginBottom: 20,
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

    rating_modal: {
        backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight,
        position: 'absolute',
        left: 0,
        top: 0,
    },

    rating_modal_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 150,
        // paddingBottom: 240,
        paddingHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    low_rating_modal: {
        backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    low_rating_modal_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 50,
        // paddingBottom: 240,
        // paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingTop: 25,
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
        // marginBottom: 25,
        position: 'absolute',
        left: 26,
        top: 32,
    },
    reviewOnlineShopUrlPopup_back_btn: {
        position: 'absolute',
        left: -5,
        top: 0,

    },
    personal_area_button: {
        // borderWidth: 1,
        // borderColor: '#000000',
        borderRadius: 8,
        marginBottom: 20,
        width: 285,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "#D0251D",
        color: '#ffffff',
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
    },
    high_rating_popup: {
        backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight,
        position: 'absolute',
        left: 0,
        top: 0,
    },

    high_rating_popup_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 50,
        // paddingBottom: 240,
        // paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingTop: 25,
    },
    high_rating_title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#000000',
        textAlign: 'center',
        alignSelf: "center",
        lineHeight: 41,
    },


    marketplace_popup: {
        // backgroundColor:  'rgba(255, 255, 255, 0.25)',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight + 40,
        position: 'absolute',
        left: 0,
        top: 0,
    },

    marketplace_popup_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 50,
        // paddingBottom: 240,
        // paddingHorizontal: 25,
        // alignItems: 'center',
        // justifyContent: 'center',
    },



    not_yet_product_popup: {
        backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight,
        position: 'absolute',
        left: 0,
        top: 0,
    },



    not_yet_product_popup_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 50,
        // paddingBottom: 240,
        // paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    not_yet_product_page_main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,

    },

    not_yet_product_header: {
        width: '100%',
        height: 159,
        marginBottom: 45,
        paddingHorizontal: 26,
    },

    not_yet_product_back_btn: {
        marginBottom: 40,
    },

    not_yet_product_img_wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    error_text: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 10,
        color: '#D0251D',
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
        // width: 258,
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
        marginBottom: 28,
        paddingTop: 30,
        paddingHorizontal: 26,
        flexDirection: 'row',
        alignItems: 'center',
        position:'relative',
        justifyContent: 'center',
        alignSelf: "center",
    },
    ambassador_link_header: {
        marginBottom: 96,
        paddingHorizontal: 25,
    },
    ambassador_link_main_title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 91,
        // marginTop: 50
    },
    makeReviewInputPopup_link_main_title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 91,
        paddingTop: 50,
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
    reviewOnlineShopUrlPopup: {
        // backgroundColor:  'rgba(255, 255, 255, 0.25)',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 999,
        zIndex: 999999,
        height: windowHeight + 40,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    reviewOnlineShopUrlPopup_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 30,
        paddingBottom: 240,
        paddingHorizontal: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ambassador_link_main_wrapper: {
        flex: 1,
        width: '100%',
        // paddingHorizontal: 26,
    },

    makeReviewPopup: {
        // backgroundColor:  'rgba(255, 255, 255, 0.25)',
        // backgroundColor:  'red',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 999,
        zIndex: 999999,
        height: windowHeight + 40,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    makeReviewPopup_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ambassador_main_wrapper: {
        width: "100%",
        flex: 1,
        paddingBottom: 220,
        paddingHorizontal: 26,
        paddingTop: 100,

    },
    makeReviewPopup_main_wrapper: {
        width: "100%",
        flex: 1,
        paddingBottom: 220,
        paddingHorizontal: 26,
    },

    ambassador_main_title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 5,
    },
    ambassador_second_title: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 82,
    },
    ambassador_second_title_red: {
        color: '#D0251D',
        fontWeight: 'bold',
    },

    ambassador_social_link: {
        width: 285,
        height: 50,
        marginBottom: 20,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',

    },
    ambassador_social_link_text: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 18,
    },
    makeReviewInputPopup: {
        // backgroundColor:  'rgba(255, 255, 255, 0.25)',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 999,
        zIndex: 999999,
        height: windowHeight + 40,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },

    makeReviewInputPopup_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 30,
        paddingBottom: 240,
        paddingHorizontal: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },


    choosing_marketplace_page_main: {
        flex: 1,
        width: "100%",
        // alignItems: 'center',
        // justifyContent: 'center'
    },




    reviewOnlineShopUrlPopup_header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        position: 'relative',
        // backgroundColor: 'red',
        width: '100%'
    },



    makeReviewPopup_header: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingHorizontal: 26,
    },
    makeReviewPopup_back_btn: {
        position: 'absolute',
        left: 0,
        top: 30,
        marginRight: 20,
    },
    ambassador_titles_wrapper: {
        paddingTop: 50,
    },
    makeReviewInputPopup_header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        position: 'relative',
        // backgroundColor: 'red',
        width: '100%'
    },
    makeReviewInputPopup_back_btn: {
        position: 'absolute',
        left: -5,
        top: 0,
    },
    filter_modal_inputs_main_wrapper: {
        // flex: 1,
        width: "100%",
        paddingHorizontal: 20,
    },

    getNextCatalogData:{
        height: 50,
        width: '45%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    upload_loader_wrapper: {
        width:'100%',
        height:windowHeight,
        position:'absolute',
        bottom:0,
        left:0,
        backgroundColor:'rgba(0,0,0,0.69)',
        zIndex:999,
        justifyContent:'center',
        alignItems:'center'
    },

    upload_loader: {
        width: '90%',
        height: 250,
        backgroundColor:'white',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    }
});
