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

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            sort_by_gender: '',
            catalogItems: [
                {
                   image: require('../../assets/images/catalog_img1.png'),
                    name: 'BandRate Smart',
                    code: "Q1111BR",
                    discountedPrice: "",
                    price:"6000",

                },
                {
                    image: require('../../assets/images/catalog_img2.png'),
                    name: 'BandRate Smart',
                    code: "BRSMWONEBBWB",
                    discountedPrice: "2.990",
                    price:"9.850",

                },
                {
                    image: require('../../assets/images/catalog_img3.png'),
                    name: 'BandRate Smart',
                    code: "BRSSK7PROBBWB",
                    discountedPrice: "",
                    price:"9.000",

                },

                {
                    image: require('../../assets/images/catalog_img4.png'),
                    name: 'BandRate Smart',
                    code: "F11 Black",
                    discountedPrice: "2.990",
                    price:"2.691",

                },

                {
                    image: require('../../assets/images/catalog_img1.png'),
                    name: 'BandRate Smart',
                    code: "Q1111BR",
                    discountedPrice: "",
                    price:"6000",

                },
                {
                    image: require('../../assets/images/catalog_img2.png'),
                    name: 'BandRate Smart',
                    code: "BRSMWONEBBWB",
                    discountedPrice: "2.990",
                    price:"9.850",

                },
                {
                    image: require('../../assets/images/catalog_img3.png'),
                    name: 'BandRate Smart',
                    code: "BRSSK7PROBBWB",
                    discountedPrice: "",
                    price:"9.000",

                },

                {
                    image: require('../../assets/images/catalog_img4.png'),
                    name: 'BandRate Smart',
                    code: "F11 Black",
                    discountedPrice: "2.990",
                    price:"2.691",

                },


            ],

            showFilterModal: false,
            minPrice: '',
            maxPrice: '',

            sort_by_mechanism: '',


            sort_by_frame: [],
            loaded: false,
            current_paginate: 1,
            current_paginate_filter: 1,
            Default_Rating: 0,
            Max_Rating: 5,
            ratingPopup: false,
            lowRatingPopup: false,
            highRatingPopup: false,
            notYetProduct: false,
            marketplacePopup: false,

            review: "",
            reviewError: false,
            reviewErrorText: "",
            successReviewMessage: false,

            reviewOnlineShopUrlPopup: false,
            reviewOnlineShopUrlType: '',
            reviewOnlineShopUrl: "",
            reviewOnlineShopUrlError: false,
            reviewOnlineShopUrlErrorText: "",
            reviewOnlineShopUrlPlaceholder: "Введите ссылку на маркетплейс!",
            reviewOnlineShopSuccess: false,

            makeReviewTypePopup: false,
            makeReviewInputPopup: false,
            makeReviewTypePopupUrlType: '',
            makeReviewTypePopupUrl: '',
            makeReviewTypePopupUrlError: false,
            makeReviewTypePopupUrlErrorText: '',
            makeReviewTypePopupUrlPlaceholder: '',
            makeReviewSuccessPopup: false,

            pressed: false,
            pressed2: false,
            pressed3: false,
            pressed4: false,


            show_basket_count: false,
            basket_count: 0,

            show_favourites_products_count: false,
            favourites_products_count: 0,
            filter_used_or_not: false,

            hide_next_button: false,
            all_frames_array: [
                'Пластик',
                'Стальной',
                'Сталь +пластик',
                'нержавеющая сталь',
                // 'нержавеющая сталь с PVD  покрытием',
                // 'алюминиевый сплав/нержавеющая сталь',
                // 'нержавеющая сталь/силикон',
                // 'алюминиевый сплав',
                // 'нержавеющая сталь с IP покрытием',
                // 'алюминиевый сплав/пластик'
            ],

            all_bracelet_array: [
                'Каучуковый',
                'Стальной',
                // 'нержавеющая сталь/каучук',
                'натуральная кожа',
                'пластик',
                'силикон',
                // 'нержавеющая сталь с PVD  покрытием',
                // 'нержавеющая сталь с IP покрытием',
                // 'Силикон/нержавеющая сталь',
                // 'текстиль',
                // 'нейлон'
            ],
            sort_by_bracelet: [],
            sort_by_waterproof: [],
            sort_by_glass: [],
            sort_by_alarm: [],
            sort_by_calendar: [],
            sort_by_guarantee: [],
            sort_by_equipment: [],

            all_waterproof_array: [
                'IP67',
                'IP68',
                'IP69',
                // 'IP70',
                'IPX4',
                // '30 м',
                // '50 м',
                // '10 м',
            ],
            all_glass_array: [
                'Органическое',
                'пластиковое',
                'пластик',
                'минеральное',
                // 'сапфировое',
                // 'синтетическое стекло',
                // 'минеральное Hardlex',
            ],
            all_alarm_array: [
                // 'Будильник',
                // 'есть  будильник',
                // 'вибросигнал',
                'есть',
                // 'вибрация',
                'нет',
            ],
            all_calendar_array: [
                'Есть',
                'нет',
            ],
            all_guarantee_array: [
                '1 год',
            ],
            all_equipment_array: [
                'инструкция',
                'коробка',
                'гарантия',
                'кабель зарядки',
                'инструкция',
                'Часы',
                'упаковка',
                'руководство',
                'фирменная упаковка',
                'инструкция на русском языке',
                'гарантийный талон',
                'Смарт часы',
                'кабель зарядки',
                'упаковка',

            ],

            all_additional_functions_array: [
                'счетчик калорий',
                'шагомер',
                'мониторинг сна',
                'кислорода в крови',
                'измерение артериального давления',
                'частота сердечных сокращений (чсс)',
                'sim-карта',
            ],


            sort_by_additional_functions: [],




        };


        this.Star = require('../../assets/images/star_rating_image.png');
        this.Star_With_Border = require('../../assets/images/star_not_rating_img.png');
    }





    UpdateRating = async (key) =>  {

        console.log(key)
        this.setState({ Default_Rating: key });


        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;


        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/estimates',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade: key,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

                let test =
                {
                    data: {
                        'transaction_count': 3,
                        'transaction_success_sum': 510000,
                        'transaction_notsuccess_sum': 4730,
                        'succesfuly_payments': '99.7%',
                        'not_succesfuly_payments_count': 1,

                        transactions: [
                            {},
                            {},
                            {},
                        ],

                        charts: [
                            {},
                            {},
                            {},
                        ]

                    },

                }

            })
            .then((response) => {


                console.log(response, "rating")


                if (response.hasOwnProperty('status')) {
                    if (response.status === true) {
                        AsyncStorage.setItem('haveAlreadyShownStarPopup', "true");
                        if(key <= 3) {
                            this.setState({
                                lowRatingPopup: true,
                                ratingPopup: false,
                                showFilterModal: false,
                                highRatingPopup: false,
                                marketplacePopup: false,
                                notYetProduct: false,
                                successReviewMessage: false,
                                reviewOnlineShopUrlPopup: false,
                                reviewOnlineShopSuccess: false,
                                makeReviewTypePopup: false,
                                makeReviewInputPopup: false,
                                makeReviewSuccessPopup: false,
                            })
                        } else if(key > 3) {
                            this.setState({
                                highRatingPopup: true,
                                lowRatingPopup: false,
                                ratingPopup: false,
                                showFilterModal: false,
                                marketplacePopup: false,
                                notYetProduct: false,
                                successReviewMessage: false,
                                reviewOnlineShopUrlPopup: false,
                                reviewOnlineShopSuccess: false,
                                makeReviewTypePopup: false,
                                makeReviewInputPopup: false,
                                makeReviewSuccessPopup: false,
                            })
                        }

                    }
                }

            })
    }

    redirectToNotYetProduct = () => {
        this.setState({
            notYetProduct: true,
            ratingPopup: false,
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



    sendReview = () => {
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false});
    }



    getCatalogData = async () => {
        // AsyncStorage.removeItem('haveAlreadyShownStarPopup');

        let userToken = await AsyncStorage.getItem('userToken');
        let haveAlreadyShownStarPopup = await AsyncStorage.getItem('haveAlreadyShownStarPopup');
        let AuthStr = 'Bearer ' + userToken;

        // console.log(userToken, "token");
        let current_paginate = this.state.current_paginate;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/CatalogProduct?page='+current_paginate,
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

                //
                // console.log(response)
                //
                console.log(response, 'list');


                this.setState({
                    catalogItems: response.data.products.data,
                    loaded: true,
                    ratingPopup: haveAlreadyShownStarPopup ? false : true,
                })





            })

    }



    findInArray = (array, find) => {


        // Provided testing method (return element > 4).
        console.log(array.includes(find), 'dwdwdwdwdw')
        return array.includes(find)

    }

    removeFromArray = (array, find) => {

        const index = array.indexOf(find);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }

        return array;

    }


    checkSavedFilter = async () => {

       await AsyncStorage.getItem('filterInfo',(err,item) => {

            let filterInfo = item ? JSON.parse(item) : {}

            if (Object.keys(filterInfo).length === 0) {

                this.getCatalogData();
                console.log("no info", 'filter infos from storge')

            } else {

                console.log(filterInfo, 'filterInfofilterInfo')

                if (filterInfo.hasOwnProperty("min_price")) {
                    this.setState({
                        minPrice: filterInfo.min_price

                    })
                }


                if (filterInfo.hasOwnProperty("max_price")) {
                    this.setState({
                        maxPrice: filterInfo.max_price
                    })
                }
                if (filterInfo.hasOwnProperty("gender")) {
                    this.setState({
                        sort_by_gender: filterInfo.gender
                    })
                }
                if (filterInfo.hasOwnProperty("Mechanism")) {
                    this.setState({
                        sort_by_mechanism: filterInfo.Mechanism
                    })
                }
                if (filterInfo.hasOwnProperty("Frame")) {
                    this.setState({
                        sort_by_frame: filterInfo.Frame
                    })
                }
                if (filterInfo.hasOwnProperty("Bracelet")) {
                    this.setState({
                        sort_by_bracelet: filterInfo.Bracelet
                    })
                }
                if (filterInfo.hasOwnProperty("Waterproof")) {
                    this.setState({
                        sort_by_waterproof: filterInfo.Waterproof
                    })
                }
                if (filterInfo.hasOwnProperty("Glass")) {
                    this.setState({
                        sort_by_glass: filterInfo.Glass
                    })
                }
                if (filterInfo.hasOwnProperty("Alarm")) {
                    this.setState({
                        sort_by_alarm: filterInfo.Alarm
                    })
                }
                if (filterInfo.hasOwnProperty("Calendar")) {
                    this.setState({
                        sort_by_calendar: filterInfo.Calendar
                    })
                }
                if (filterInfo.hasOwnProperty("Guarantee")) {
                    this.setState({
                        sort_by_guarantee: filterInfo.Guarantee
                    })
                }
                if (filterInfo.hasOwnProperty("Set")) {
                    this.setState({
                        sort_by_equipment: filterInfo.Set
                    })
                }
                if (filterInfo.hasOwnProperty("current_paginate_filter")) {
                    this.setState({
                        current_paginate_filter: filterInfo.current_paginate_filter
                    })
                }


                setTimeout(() => {
                    this.useFilter()
                }, 2000)




                console.log(filterInfo, 'filter infos from storge')


            }
            //
            // this.setState({
            //     show_basket_count: true,
            //     basket_count: newCountsOfProductsInBasket
            // })


        })

    }




    componentDidMount() {
        const { navigation } = this.props;
        //
        // AsyncStorage.clear();

        // this.getCatalogData();

        this.checkSavedFilter()
        this.checkBasketCount();
        this.checkFavouritesProductsCount();


        this.focusListener = navigation.addListener("focus", () => {

            // AsyncStorage.removeItem('filterInfo')

            // this.getCatalogData();

            this.checkSavedFilter()
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



    useFilter = async () => {


        let filter_info = {};
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let current_paginate_filter = this.state.current_paginate_filter;
        let { minPrice, maxPrice, sort_by_gender, sort_by_mechanism, sort_by_frame, sort_by_bracelet, sort_by_additional_functions, sort_by_waterproof, sort_by_glass, sort_by_alarm, sort_by_calendar, sort_by_guarantee, sort_by_equipment} = this.state
        let filterData = {};

        if (minPrice != "") {
             filterData.min_price = minPrice;
            filter_info.min_price = minPrice
        }
        if (maxPrice != "") {
            filterData.max_price = maxPrice;
            filter_info.max_price = maxPrice
        }

        if (sort_by_gender != "" ){
            filterData.gender = sort_by_gender;
            filter_info.gender = sort_by_gender;
        }


        if (sort_by_mechanism != "" ){
            filterData.Mechanism = sort_by_mechanism;
            filter_info.Mechanism = sort_by_mechanism
        }

        if (sort_by_frame.length > 0 ) {
            let frame = "";
            filter_info.Frame = sort_by_frame;

            if (sort_by_frame.length == 1 ) {
                frame = sort_by_frame[0];
            } else {
                 frame = sort_by_frame.join("^");
            }

            filterData.Frame = frame;

        }


        if (sort_by_bracelet.length > 0) {

            let bracelet = "";
            filter_info.Bracelet = sort_by_bracelet;

            if (sort_by_bracelet.length == 1 ) {
                bracelet = sort_by_bracelet[0];
            } else {
                bracelet = sort_by_bracelet.join("^");
            }


            filterData.Bracelet = bracelet
        }

        if (sort_by_waterproof.length > 0) {

            let waterproof = "";

            filter_info.Waterproof = sort_by_waterproof;

            if (sort_by_waterproof.length == 1 ) {
                waterproof = sort_by_waterproof[0];
            } else {
                waterproof = sort_by_waterproof.join("^");
            }


            filterData.Waterproof = waterproof
        }

        if (sort_by_glass.length > 0) {

            let glass = "";
            filter_info.Glass = sort_by_glass;


            if (sort_by_glass.length == 1 ) {
                glass = sort_by_glass[0];
            } else {
                glass = sort_by_glass.join("^");
            }


            filterData.Glass = glass
        }

        if (sort_by_alarm.length > 0) {

            let alarm = "";

            filter_info.Alarm = sort_by_alarm;

            if (sort_by_alarm.length == 1 ) {
                alarm = sort_by_alarm[0];
            } else {
                alarm = sort_by_alarm.join("^");
            }


            filterData.Alarm = alarm
        }
        if (sort_by_additional_functions.length > 0) {

            let additional_functions = "";

            filter_info.Additional_functions = sort_by_additional_functions;

            if (sort_by_additional_functions.length == 1 ) {
                additional_functions = sort_by_additional_functions[0];
            } else {
                additional_functions = sort_by_additional_functions.join("^");
            }


            filterData.Additional_functions = additional_functions
        }

        if (sort_by_calendar.length > 0) {

            let calendar = "";

            filter_info.Calendar = sort_by_calendar;

            if (sort_by_calendar.length == 1 ) {
                calendar = sort_by_calendar[0];
            } else {
                calendar = sort_by_calendar.join("^");
            }


            filterData.Calendar = calendar
        }

        if (sort_by_guarantee.length > 0) {

            let guarantee = "";

            filter_info.Guarantee = sort_by_guarantee;

            if (sort_by_guarantee.length == 1 ) {
                guarantee = sort_by_guarantee[0];
            } else {
                guarantee = sort_by_guarantee.join("^");
            }


            filterData.Guarantee = guarantee
        }
        if (sort_by_equipment.length > 0) {

            let equipment = "";

            filter_info.Set = sort_by_equipment;

            if (sort_by_equipment.length == 1 ) {
                equipment = sort_by_equipment[0];
            } else {
                equipment = sort_by_equipment.join("^");
            }

            filterData.Set = equipment

        }


        console.log(filterData, "filter bbbbbbbbbbbbb");
        filter_info.current_paginate_filter = current_paginate_filter;
        console.log(filter_info, "filter Info")


        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/FilterProduct?pageNumber='+ current_paginate_filter,
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterData)
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((response) => {


                let filter_response = response.data.search_result;
                let filter_images = response.data.Product_Image;

                // console.log(filter_response, "filter_response");
                // console.log(filter_images, "filter_images");

                // return false

                // console.log(filter_images, 'filter_images')
                // return false;



                for (const product_item in filter_response) {

                    let product_id = filter_response[product_item].product_id;

                    for (const image_item in filter_images) {

                        // console.log(filter_images[image_item], 'filter_images[image_item]')

                        let image_product_id = filter_images[image_item][0].productid;
                        let image_product_picture = filter_images[image_item][0].picture;
                        if (product_id == image_product_id ) {
                            filter_response[product_item].product_image = [{picture: image_product_picture}]
                            break;
                        }
                    }
                }



                this.setState({

                    filter_used_or_not: true,
                    loaded: true,
                    showFilterModal: false
                })

                if (filter_response.length > 0) {
                    this.setState({
                        catalogItems: filter_response,
                        hide_next_button: false,
                    })
                } else  {

                    this.setState({
                        catalogItems: [],
                        hide_next_button: true,
                    })
                }


                  AsyncStorage.setItem('filterInfo', JSON.stringify(filter_info) );


            })

    }




    clearFilter = async () => {

        await AsyncStorage.removeItem('filterInfo');

        await this.setState({
            minPrice: "",
            maxPrice: "",
            sort_by_gender: "",
            sort_by_mechanism: "",
            sort_by_frame: [],
            sort_by_bracelet: [],
            sort_by_waterproof: [],
            sort_by_glass: [],
            sort_by_alarm: [],
            sort_by_calendar: [],
            sort_by_guarantee: [],
            sort_by_equipment: [],
            sort_by_additional_functions: [],
            current_paginate_filter: 1,
            current_paginate: 1,
            showFilterModal: false,
            filter_used_or_not: false,

        })

        await this.getCatalogData();
    }


    getNextCatalogData = async () => {
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

        if (new_current_page > 0) {

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





    getNextFilterData = async () => {
        await this.setState({
            loaded: false
        })
        let current_paginate_filter = this.state.current_paginate_filter;
        await this.setState({
            current_paginate_filter: current_paginate_filter + 1,
        })
        this.useFilter();

    }

    getPrevFilterData = async () => {

        let current_paginate_filter = this.state.current_paginate_filter;
        let new_current_page = current_paginate_filter - 1;

        if (new_current_page > 0) {

            await this.setState({
                current_paginate_filter: new_current_page,
                loaded: false
            })
            this.useFilter();
        } else  {
            await this.setState({
                loaded: true
            })
        }

    }

    redirectToCardProduct = (item) => {
        this.props.navigation.navigate("CardProduct", {
            params: JSON.stringify(item),
            params2: 'Catalog'
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


    redirectToAmbassador = () => {
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false, pressed5: false,});
        this.props.navigation.navigate("Ambassador", {
            params: 'from_catalog',
        });

    }



    redirectToChoosingMarketPlace (){
        // this.props.navigation.navigate("ChoosingMarketPlace");
        this.setState({ pressed: false, pressed2: true, pressed3: false, pressed4: false, pressed5: false,});
    }


    changeColor3  = () => {

        this.setState({
            pressed: false,
            pressed2: false,
            pressed3: true,
            pressed4: false,
            makeReviewTypePopup: true,
            reviewOnlineShopUrlPopup: false,
            marketplacePopup: false,
            highRatingPopup: false,
            lowRatingPopup: false,
            ratingPopup: false,
            showFilterModal: false,
            notYetProduct: false,
            successReviewMessage: false,
            makeReviewInputPopup: false,
            makeReviewSuccessPopup: false,
        });
    }

    redirectToJobs = () => {
        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: true, pressed5: false,});
        this.props.navigation.navigate("Jobs", {
            params: "from_catalog",
        });
    }


    redirectToInstruction = () => {
        this.props.navigation.navigate("InstructionComponent", {
            params: 'from_catalog',
        });
    }

    changeColor2 = () => {
        this.setState({
            pressed: false,
            pressed2: true,
            pressed3: false,
            pressed4: false,
            marketplacePopup: true,
            highRatingPopup: false,
            lowRatingPopup: false,
            ratingPopup: false,
            showFilterModal: false,
            notYetProduct: false,
            successReviewMessage: false,
            reviewOnlineShopUrlPopup: false,
            reviewOnlineShopSuccess: false,
            makeReviewTypePopup: false,
            makeReviewInputPopup: false,
            makeReviewSuccessPopup: false,


        });
    }

    sendReviewMessage = async () => {


        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let reviewText = this.state.review;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/estimatesMessage',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: reviewText
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {


                console.log(response, "rating")


                if (response.hasOwnProperty("status")) {
                     if (response.status === true) {
                         this.setState({
                             successReviewMessage: true,
                             lowRatingPopup: false,
                             ratingPopup: false,
                             showFilterModal: false,
                             highRatingPopup: false,
                             marketplacePopup: false,
                             notYetProduct: false,
                             reviewOnlineShopUrlPopup: false,
                             reviewOnlineShopSuccess: false,
                             makeReviewTypePopup: false,
                             makeReviewInputPopup: false,
                             makeReviewSuccessPopup: false,
                             reviewError: false,
                             reviewErrorText: '',

                         })

                     }  else {

                         this.setState({
                             reviewError: true,
                             reviewErrorText: 'Поле обязательно для заполнения!',
                         })
                     }
                }





            })
    }





    takeUrlType = (urlType) => {
         this.setState({
             reviewOnlineShopUrlType: urlType,
             reviewOnlineShopUrlPopup: true,

             marketplacePopup: false,
             highRatingPopup: false,
             lowRatingPopup: false,
             ratingPopup: false,
             showFilterModal: false,
             notYetProduct: false,
             successReviewMessage: false,
             reviewOnlineShopSuccess: false,
             makeReviewTypePopup: false,
             makeReviewInputPopup: false,
             makeReviewSuccessPopup: false,
         })
    }








    sendReviewOnlineShopUrl = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let url    = this.state.reviewOnlineShopUrl;
        let url_type = this.state.reviewOnlineShopUrlType;

         if (url == "") {
               this.setState({
                   reviewOnlineShopUrlError: true,
                   reviewOnlineShopUrlErrorText: "Поле обязательно!",
               })
         } else {
             this.setState({
                 reviewOnlineShopUrlError: false,
                 reviewOnlineShopUrlErrorText: "",
             })
             fetch(
                 'http://37.230.116.113/BandRate-Smart/public/api/createBonusComment',
                 {
                     method: "POST",
                     headers: {
                         'Authorization': AuthStr,
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                         url: url,
                         url_type: url_type,
                     })
                 }
             ).then((response) => response.json())
                 .catch((error) => {
                     console.log("ERROR " , error)

                 })
                 .then((response) => {
                     console.log(response, 'link')




                     if (response.hasOwnProperty("status")) {
                         if (response.status === true) {
                             if (response.data.message === true) {
                                 this.setState({
                                     reviewOnlineShopSuccess: true,
                                     reviewOnlineShopUrlPopup: false,
                                     marketplacePopup: false,
                                     highRatingPopup: false,
                                     lowRatingPopup: false,
                                     ratingPopup: false,
                                     showFilterModal: false,
                                     notYetProduct: false,
                                     successReviewMessage: false,
                                     makeReviewTypePopup: false,
                                     makeReviewInputPopup: false,
                                     makeReviewSuccessPopup: false,
                                 })
                             }

                             if (response.data.message == "Have you sent") {
                                 this.setState({
                                     reviewOnlineShopUrlError: true,
                                     reviewOnlineShopUrlErrorText: 'На данный момент у вас уже есть ссылка на модерации!'

                                 })
                             }
                         } else {
                             if (response.data.message === "url_type not url") {
                                 this.setState({
                                     reviewOnlineShopUrlError: true,
                                     reviewOnlineShopUrlErrorText: 'Не верный формат, ведите коректную ссылку!'
                                 })
                             }
                         }



                     }



                 })


         }




    }


    openReviewLinkTypePopup = (linkType) => {
        let placeholder = "";
        if (linkType == "vk") {
            placeholder = "https://vk.com/BrandRateSmart";
        }
        if (linkType == "instagram") {
            placeholder = "https://instagram.com/";
        }

        if (linkType == "youtube") {
            placeholder = "https://www.youtube.com/" ;
        }

        if (linkType == "other") {
            placeholder = "Other link" ;
        }

        this.setState({
            makeReviewInputPopup: true,
            makeReviewTypePopup: false,

            reviewOnlineShopSuccess: false,
            reviewOnlineShopUrlPopup: false,
            marketplacePopup: false,
            highRatingPopup: false,
            lowRatingPopup: false,
            ratingPopup: false,
            showFilterModal: false,
            notYetProduct: false,
            successReviewMessage: false,
            makeReviewSuccessPopup: false,
            makeReviewTypePopupUrlPlaceholder: placeholder,
            makeReviewTypePopupUrlType: linkType,
        })
    }




    createOverview = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let link = this.state.makeReviewTypePopupUrl;
        let url_type = this.state.makeReviewTypePopupUrlType;

        if (link == "") {
            this.setState({
                makeReviewTypePopupUrlError: true,
                makeReviewTypePopupUrlErrorText: 'Поле обязательно!'
            })
        } else {
            this.setState({
                makeReviewTypePopupUrlError: false,
                makeReviewTypePopupUrlErrorText: ''
            })
            fetch(
                'http://37.230.116.113/BandRate-Smart/public/api/createOverview',
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: link,
                        url_type: url_type,
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {
                    console.log(response, 'link')

                    if (response.hasOwnProperty("status")) {
                            if (response.status === true) {
                                if (response.data.message === true) {
                                    this.setState({
                                        makeReviewTypePopupUrlError: false,
                                        makeReviewTypePopupUrlErrorText: '',
                                        makeReviewSuccessPopup: true,

                                        makeReviewInputPopup: false,
                                        makeReviewTypePopup: false,
                                        reviewOnlineShopSuccess: false,
                                        reviewOnlineShopUrlPopup: false,
                                        marketplacePopup: false,
                                        highRatingPopup: false,
                                        lowRatingPopup: false,
                                        ratingPopup: false,
                                        showFilterModal: false,
                                        notYetProduct: false,
                                        successReviewMessage: false,
                                    })
                                }

                                if (response.data.message == "Have you sent") {
                                    this.setState({
                                        makeReviewTypePopupUrlError: true,
                                        makeReviewTypePopupUrlErrorText: 'На данный момент у вас уже есть ссылка на модерации!'
                                    })
                                }
                            } else {
                                if (response.data.message === "url_type not url") {
                                    this.setState({
                                        makeReviewTypePopupUrlError: true,
                                        makeReviewTypePopupUrlErrorText: 'Не верный формат, ведите коректную ссылку!'
                                    })
                                }
                            }



                    }


                })
        }



    }


    openCatalog = () => {
        this.setState({
            makeReviewInputPopup: false,
            makeReviewTypePopup: false,
            reviewOnlineShopSuccess: false,
            reviewOnlineShopUrlPopup: false,
            marketplacePopup: false,
            highRatingPopup: false,
            lowRatingPopup: false,
            ratingPopup: false,
            showFilterModal: false,
            notYetProduct: false,
            successReviewMessage: false,
            makeReviewSuccessPopup: false,
        })
    }



    redirectToThemes = () => {
        this.props.navigation.navigate("ThemesCatalogComponent");
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


       if (!this.state.loaded) {
           return (
               <View style={{width: '100%', height: '100%', backgroundColor: '#ffffff', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                   <Image style={{width: 300}} source={require('../../assets/images/band_rate_logo.png')} />
               </View>
           )
       }




       // RATING POPUP
       if (this.state.ratingPopup) {
            return (
                <View style={styles.rating_modal}>
                    <StatusBar style="dark" />
                    <View style={styles.rating_modal_wrapper}>
                        <Text style={styles.rating_main_title}>Оцените покупку</Text>

                        <ScrollView style={styles.rating_page_main}>
                            {/*<View style={styles.rating_product_img_info_main_wrapper}>*/}
                            {/*    <View style={styles.rating_product_image_wrapper}>*/}
                            {/*        <Image style={styles.rating_product_image} source={require('../../assets/images/rating_img.png')} />*/}
                            {/*    </View>*/}
                            {/*    <Text style={styles.rating_product_name}>BandRate Smart</Text>*/}
                            {/*    <Text style={styles.rating_product_code}>BRSMWONEBBWB</Text>*/}
                            {/*</View>*/}

                            <View style={styles.rating_stars_wrapper}>
                                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                            </View>

                            <TouchableOpacity style={styles.have_not_bought_yet_button} onPress={() => {this.redirectToNotYetProduct()}}>
                                <Text style={styles.have_not_bought_yet_button_text}>Ещё не покупал</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>


                </View>
            )
       }


       // FILTER POPUP
        if (this.state.showFilterModal) {
            return (
                <BlurView intensity={50} tint="dark" style={[styles.blurContainer,{width: '100%', height: windowHeight ,position:'absolute', top: 0, left: 0,}]}>
                    <TouchableOpacity style={{width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end',}}   onPress={() => {this.setState({showFilterModal: false})}}>

                        <TouchableHighlight style={styles.filter_modal_wrapper}>


                            <View style={styles.filter_modal_child_wrapper}>
                                <View style={styles.filter_modal_title_icon_wrapper}>
                                    <Text  style={styles.filter_modal_title}>Фильтр</Text>
                                    <TouchableOpacity style={styles.filter_modal_close_btn} onPress={()=>{this.setState({showFilterModal: false})}}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 19 19" fill="none">
                                            <Path d="M9.5 9.5L1.751 1.693m-.058 15.556L9.5 9.5l-7.807 7.749zM9.5 9.5l7.808-7.749L9.5 9.5zm0 0l7.749 7.808L9.5 9.5z" stroke="#000" strokeWidth={2} strokeLinecap="round"/>
                                        </Svg>
                                    </TouchableOpacity>

                                </View>
                                <ScrollView  style={styles.filter_modal_inputs_main_wrapper} nestedScrollEnabled = {true}>

                                    <TouchableWithoutFeedback>
                                        <View style={styles.sort_radio_input}>

                                            {/*<View style={styles.sort_radio_input}>*/}
                                            {/*    <Text style={styles.sort_radio_input_main_title}>Пол</Text>*/}

                                            {/*    <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true} nestedScrollEnabled = {true}>*/}
                                            {/*        <TouchableOpacity*/}
                                            {/*            style={[styles.inputRadio, this.state.sort_by_gender == 'мужские' ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}*/}
                                            {/*            onPress={()=> {*/}
                                            {/*                this.setState({*/}
                                            {/*                    sort_by_gender: 'мужские',*/}

                                            {/*                })*/}
                                            {/*            }}*/}

                                            {/*        >*/}
                                            {/*            <Text style={[styles.sort_radio_input_title, this.state.sort_by_gender == 'мужские' ? styles.activeInputRadioColor : {}]}>Мужские</Text>*/}
                                            {/*        </TouchableOpacity>*/}


                                            {/*        <TouchableOpacity*/}
                                            {/*            style={[styles.inputRadio, this.state.sort_by_gender == 'женские' ? styles.activeInputRadioBorder : {},{marginRight: 15}]}*/}
                                            {/*            onPress={()=> {*/}
                                            {/*                this.setState({*/}
                                            {/*                    sort_by_gender: 'женские',*/}

                                            {/*                })*/}
                                            {/*            }}*/}

                                            {/*        >*/}
                                            {/*            <Text style={[styles.sort_radio_input_title, this.state.sort_by_gender == 'женские' ? styles.activeInputRadioColor : {}]}>Женские</Text>*/}
                                            {/*        </TouchableOpacity>*/}


                                            {/*        <TouchableOpacity*/}
                                            {/*            style={[styles.inputRadio, this.state.sort_by_gender == 'Унисекс' ? styles.activeInputRadioBorder : {}]}*/}
                                            {/*            onPress={()=> {*/}
                                            {/*                this.setState({*/}
                                            {/*                    sort_by_gender: 'Унисекс',*/}

                                            {/*                })*/}
                                            {/*            }}*/}

                                            {/*        >*/}
                                            {/*            <Text style={[styles.sort_radio_input_title, this.state.sort_by_gender == 'Унисекс' ? styles.activeInputRadioColor : {}]}>Унисекс</Text>*/}
                                            {/*        </TouchableOpacity>*/}
                                            {/*    </ScrollView>*/}

                                            {/*</View>*/}


                                            <View style={styles.filter_modal_input_field_wrapper}>
                                                <Text style={styles.filter_modal_input_title}>Цена</Text>
                                                <View style={styles.filter_modal_input_field_child}>
                                                    <TextInput
                                                        style={styles.filter_modal_input_field}
                                                        onChangeText={(val) => this.setState({minPrice: val})}
                                                        value={this.state.minPrice}
                                                        placeholder="Мин."
                                                        keyboardType="numeric"
                                                        placeholderTextColor="#000000"
                                                    />
                                                    <View style={styles.filter_modal_input_icon}>
                                                        <Svg xmlns="http://www.w3.org/2000/svg" width={23} height={2} viewBox="0 0 23 2" fill="none">
                                                            <Path d="M1 1h21" stroke="#000" strokeWidth={2} strokeLinecap="round" />
                                                        </Svg>
                                                    </View>


                                                    <TextInput
                                                        style={styles.filter_modal_input_field}
                                                        onChangeText={(val) => this.setState({maxPrice: val})}
                                                        value={this.state.maxPrice}
                                                        keyboardType="numeric"
                                                        placeholder="Макс."
                                                        placeholderTextColor="#000000"
                                                    />
                                                </View>
                                            </View>
                                            {/*<View style={[styles.sort_radio_input, {paddingBottom: 0}]}>*/}
                                            {/*    <Text style={styles.sort_radio_input_main_title}>Механизм</Text>*/}

                                            {/*    <View style={styles.sort_radio_input_child}>*/}
                                            {/*        <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>*/}
                                            {/*            <TouchableOpacity*/}
                                            {/*                style={[styles.inputRadio, this.state.sort_by_mechanism == "Кварцевый" ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}*/}
                                            {/*                onPress={()=> {*/}
                                            {/*                    this.setState({*/}
                                            {/*                        sort_by_mechanism: 'Кварцевый',*/}
                                            {/*                    })*/}
                                            {/*                }}*/}

                                            {/*            >*/}
                                            {/*                <Text style={[styles.sort_radio_input_title, this.state.sort_by_mechanism == "Кварцевый" ? styles.activeInputRadioColor : {}]}>Кварцевый</Text>*/}
                                            {/*            </TouchableOpacity>*/}
                                            {/*            <TouchableOpacity*/}
                                            {/*                style={[styles.inputRadio, this.state.sort_by_mechanism == "Электронный" ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}*/}
                                            {/*                onPress={()=> {*/}
                                            {/*                    this.setState({*/}
                                            {/*                        sort_by_mechanism: 'Электронный',*/}

                                            {/*                    })*/}
                                            {/*                }}*/}

                                            {/*            >*/}
                                            {/*                <Text style={[styles.sort_radio_input_title, this.state.sort_by_mechanism == "Электронный" ? styles.activeInputRadioColor : {}]}>Электронный</Text>*/}
                                            {/*            </TouchableOpacity>*/}

                                            {/*        </ScrollView>*/}

                                            {/*    </View>*/}





                                            {/*</View>*/}
                                            <View style={styles.sort_radio_input}>
                                                <Text style={styles.sort_radio_input_main_title}>Корпус</Text>

                                                {/*<ScrollView style={styles.sort_radio_input_child}>*/}
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_frames_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_frame.includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_frame.includes( item)) {

                                                                        let sort_by_frame = this.removeFromArray(this.state.sort_by_frame, item);
                                                                        this.setState({
                                                                            sort_by_frame: sort_by_frame
                                                                        })
                                                                    } else {
                                                                        let sort_by_frame = this.state.sort_by_frame;

                                                                        sort_by_frame.push(item)
                                                                        this.setState({
                                                                            sort_by_frame: sort_by_frame
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_frame.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>





                                            </View>


                                            <View style={[styles.sort_radio_input, {paddingBottom: 0}]}>
                                                <Text style={styles.sort_radio_input_main_title}>Браслет</Text>
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_bracelet_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_bracelet .includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_bracelet.includes( item)) {

                                                                        let sort_by_bracelet = this.removeFromArray(this.state.sort_by_bracelet, item);
                                                                        this.setState({
                                                                            sort_by_bracelet: sort_by_bracelet
                                                                        })
                                                                    } else {
                                                                        let sort_by_bracelet = this.state.sort_by_bracelet;

                                                                        sort_by_bracelet.push(item)
                                                                        this.setState({
                                                                            sort_by_bracelet: sort_by_bracelet
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_bracelet.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>

                                            </View>



                                            <View style={[styles.sort_radio_input, {paddingBottom: 0}]}>
                                                <Text style={styles.sort_radio_input_main_title}>Водозащита</Text>
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_waterproof_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_waterproof .includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_waterproof.includes( item)) {

                                                                        let sort_by_waterproof = this.removeFromArray(this.state.sort_by_waterproof, item);
                                                                        this.setState({
                                                                            sort_by_waterproof: sort_by_waterproof
                                                                        })
                                                                    } else {
                                                                        let sort_by_waterproof = this.state.sort_by_waterproof;

                                                                        sort_by_waterproof.push(item)
                                                                        this.setState({
                                                                            sort_by_waterproof: sort_by_waterproof
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_waterproof.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>

                                            </View>


                                            <View style={[styles.sort_radio_input, {paddingBottom: 0}]}>
                                                <Text style={styles.sort_radio_input_main_title}>Стекло</Text>
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_glass_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_glass .includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_glass.includes( item)) {

                                                                        let sort_by_glass = this.removeFromArray(this.state.sort_by_glass, item);
                                                                        this.setState({
                                                                            sort_by_glass: sort_by_glass
                                                                        })
                                                                    } else {
                                                                        let sort_by_glass = this.state.sort_by_glass;

                                                                        sort_by_glass.push(item)
                                                                        this.setState({
                                                                            sort_by_glass: sort_by_glass
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_glass.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>

                                            </View>

                                            <View style={[styles.sort_radio_input, {paddingBottom: 0}]}>
                                                <Text style={styles.sort_radio_input_main_title}>Будильник</Text>
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_alarm_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_alarm.includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_alarm.includes( item)) {

                                                                        let sort_by_alarm = this.removeFromArray(this.state.sort_by_alarm, item);
                                                                        this.setState({
                                                                            sort_by_alarm: sort_by_alarm
                                                                        })
                                                                    } else {
                                                                        let sort_by_alarm = this.state.sort_by_alarm;

                                                                        sort_by_alarm.push(item)
                                                                        this.setState({
                                                                            sort_by_alarm: sort_by_alarm
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_alarm.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>

                                            </View>


                                            <View style={[styles.sort_radio_input, {paddingBottom: 0}]}>
                                                <Text style={styles.sort_radio_input_main_title}>Календарь</Text>
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_calendar_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_calendar.includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_calendar.includes( item)) {

                                                                        let sort_by_calendar = this.removeFromArray(this.state.sort_by_calendar, item);
                                                                        this.setState({
                                                                            sort_by_calendar: sort_by_calendar
                                                                        })
                                                                    } else {
                                                                        let sort_by_calendar = this.state.sort_by_calendar;

                                                                        sort_by_calendar.push(item)
                                                                        this.setState({
                                                                            sort_by_calendar: sort_by_calendar
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_calendar.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>

                                            </View>


                                            {/*<View style={[styles.sort_radio_input, {paddingBottom: 0}]}>*/}
                                            {/*    <Text style={styles.sort_radio_input_main_title}>Гарантия</Text>*/}
                                            {/*    <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>*/}


                                            {/*        {this.state.all_guarantee_array.map((item, index) => {*/}

                                            {/*            return (*/}
                                            {/*                <TouchableOpacity*/}
                                            {/*                    key={index}*/}
                                            {/*                    style={[styles.inputRadio, this.state.sort_by_guarantee.includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}*/}
                                            {/*                    onPress={()=> {*/}

                                            {/*                        if(this.state.sort_by_guarantee.includes( item)) {*/}

                                            {/*                            let sort_by_guarantee = this.removeFromArray(this.state.sort_by_guarantee, item);*/}
                                            {/*                            this.setState({*/}
                                            {/*                                sort_by_guarantee: sort_by_guarantee*/}
                                            {/*                            })*/}
                                            {/*                        } else {*/}
                                            {/*                            let sort_by_guarantee = this.state.sort_by_guarantee;*/}

                                            {/*                            sort_by_guarantee.push(item)*/}
                                            {/*                            this.setState({*/}
                                            {/*                                sort_by_guarantee: sort_by_guarantee*/}
                                            {/*                            })*/}
                                            {/*                        }*/}

                                            {/*                    }}*/}

                                            {/*                >*/}
                                            {/*                    <Text style={[styles.sort_radio_input_title, this.state.sort_by_guarantee.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>*/}
                                            {/*                </TouchableOpacity>*/}

                                            {/*            )*/}
                                            {/*        })}*/}






                                            {/*    </ScrollView>*/}

                                            {/*</View>*/}

                                            {/*<View style={[styles.sort_radio_input, {paddingBottom: 0}]}>*/}
                                            {/*    <Text style={styles.sort_radio_input_main_title}>Комплектация</Text>*/}
                                            {/*    <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>*/}


                                            {/*        {this.state.all_equipment_array.map((item, index) => {*/}

                                            {/*            return (*/}
                                            {/*                <TouchableOpacity*/}
                                            {/*                    key={index}*/}
                                            {/*                    style={[styles.inputRadio, this.state.sort_by_equipment.includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}*/}
                                            {/*                    onPress={()=> {*/}

                                            {/*                        if(this.state.sort_by_equipment.includes( item)) {*/}

                                            {/*                            let sort_by_equipment = this.removeFromArray(this.state.sort_by_equipment, item);*/}
                                            {/*                            this.setState({*/}
                                            {/*                                sort_by_equipment: sort_by_equipment*/}
                                            {/*                            })*/}
                                            {/*                        } else {*/}
                                            {/*                            let sort_by_equipment = this.state.sort_by_equipment;*/}

                                            {/*                            sort_by_equipment.push(item)*/}
                                            {/*                            this.setState({*/}
                                            {/*                                sort_by_equipment: sort_by_equipment*/}
                                            {/*                            })*/}
                                            {/*                        }*/}

                                            {/*                    }}*/}

                                            {/*                >*/}
                                            {/*                    <Text style={[styles.sort_radio_input_title, this.state.sort_by_equipment.includes( item) ? styles.activeInputRadioColor : {}]}>{item}</Text>*/}
                                            {/*                </TouchableOpacity>*/}

                                            {/*            )*/}
                                            {/*        })}*/}






                                            {/*    </ScrollView>*/}

                                            {/*</View>*/}

                                            <View style={[styles.sort_radio_input, {paddingBottom: 0}]}>
                                                <Text style={styles.sort_radio_input_main_title}>Дополнительные функции
                                                </Text>
                                                <ScrollView style={styles.sort_radio_input_child_scroll} horizontal={true}>


                                                    {this.state.all_additional_functions_array.map((item, index) => {

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={[styles.inputRadio, this.state.sort_by_additional_functions.includes( item) ? styles.activeInputRadioBorder : {}, {marginRight: 15}]}
                                                                onPress={()=> {

                                                                    if(this.state.sort_by_additional_functions.includes( item)) {

                                                                        let sort_by_additional_functions = this.removeFromArray(this.state.sort_by_additional_functions, item);
                                                                        this.setState({
                                                                            sort_by_additional_functions: sort_by_additional_functions
                                                                        })
                                                                    } else {
                                                                        let sort_by_additional_functions = this.state.sort_by_additional_functions;

                                                                        sort_by_additional_functions.push(item)
                                                                        this.setState({
                                                                            sort_by_additional_functions: sort_by_additional_functions
                                                                        })
                                                                    }

                                                                }}

                                                            >
                                                                <Text style={[styles.sort_radio_input_title, this.state.sort_by_additional_functions.includes( item) ? styles.activeInputRadioColor : {}]}>{item == 'кислорода в крови' ? 'Измерение кислорода в крови' : item }</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })}






                                                </ScrollView>

                                            </View>



                                            <View style={styles.filter_modal_buttons_wrapper}>
                                                <TouchableOpacity style={styles.filter_modal_reset_button} onPress={() => {this.clearFilter()}}>
                                                    <Text style={styles.filter_modal_reset_button_text}>Сбросить</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.filter_modal_apply_button} onPress={() => {this.useFilter()}}>
                                                    <Text style={styles.filter_modal_apply_button_text}>Применить</Text>
                                                </TouchableOpacity>
                                            </View>


                                        </View>

                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>


                        </TouchableHighlight>

                    </TouchableOpacity>
                </BlurView>
            )
        }


        // LOW RATING POPUP
        if (this.state.lowRatingPopup) {
           return (
               <View style={styles.low_rating_modal}>
                   <StatusBar style="dark" />
                   <View style={styles.low_rating_modal_wrapper}>
                       <View style={styles.low_rating_header}>
                           {/*<TouchableOpacity style={styles.high_rating_back_btn} onPress={() => {this.redirectToRatingProduct()}}>*/}
                           {/*    <Svg*/}
                           {/*        xmlns="http://www.w3.org/2000/svg"*/}
                           {/*        width={35}*/}
                           {/*        height={35}*/}
                           {/*        viewBox="0 0 35 35"*/}
                           {/*        fill="none"*/}

                           {/*    >*/}
                           {/*        <Path*/}
                           {/*            d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z"*/}
                           {/*            fill="#000"*/}
                           {/*        />*/}
                           {/*    </Svg>*/}
                           {/*</TouchableOpacity>*/}
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
                               {this.state.reviewError &&

                               <Text style={styles.error_text}>{this.state.reviewErrorText}</Text>

                               }
                           </View>

                           <TouchableOpacity style={styles.personal_area_button} onPress={() => {this.sendReviewMessage()}}>
                               <Text style={[styles.personal_area_button_text, {color: '#ffffff'}]}>
                                   Отправить
                               </Text>
                           </TouchableOpacity>
                           {/*<TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed2 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed2 ? 0 : 1}]}   onPress={()=>this.redirectToJobs()}>*/}
                           {/*    <Text style={[styles.personal_area_button_text, {color:this.state.pressed2 ? "#ffffff" : '#333333'}]}>Работа в Компании</Text>*/}
                           {/*</TouchableOpacity>*/}
                           {/*<TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed3 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed3 ? 0 : 1}]}   onPress={()=>this.changeColor3()} >*/}
                           {/*    <Text style={[styles.personal_area_button_text, {color:this.state.pressed3 ? "#ffffff" : '#333333'}]}>Сделать обзор</Text>*/}
                           {/*</TouchableOpacity>*/}
                           {/*<TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.changeColor4()}>*/}
                           {/*    <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}>Больше о Компании</Text>*/}
                           {/*</TouchableOpacity>*/}
                       </ScrollView>
                   </View>



               </View>
           )
        }


        // HIGH RATING POPUP
        if (this.state.highRatingPopup)  {
            return (
                <View style={styles.high_rating_popup}>
                    <StatusBar style="dark" />
                    <View style={styles.high_rating_popup_wrapper}>
                        <View style={styles.high_rating_header}>
                            <Text style={styles.high_rating_title}>
                                Спасибо за высокую
                                оценку
                            </Text>
                        </View>

                        <ScrollView style={styles.high_rating_page_main}>

                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.openCatalog()}>
                                <Text style={[styles.personal_area_button_text, {color: '#333333'}]}>Перейти в каталог</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.redirectToThemes()}>
                                <Text style={[styles.personal_area_button_text, {color: '#333333'}]}>Скачать темы</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.redirectToAmbassador()} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Стать Амбасадором
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth: 1}]}   onPress={()=> this.changeColor2()}>
                                <Text style={[styles.personal_area_button_text, {color: '#333333'}]}>Написать Отзыв за бонусы</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.changeColor3()} >
                                <Text style={[styles.personal_area_button_text, {color: '#333333'}]}>Сделать обзор</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.redirectToJobs()}>
                                <Text style={[styles.personal_area_button_text, {color: '#333333'}]}>Работа в Компании</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.redirectToInstruction()}>
                                <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}> Инструкции </Text>
                            </TouchableOpacity>

                            {/*<TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed5 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed5 ? 0 : 1}]}   onPress={()=>this.changeColor5()}>*/}
                            {/*    <Text style={[styles.personal_area_button_text, {color:this.state.pressed5 ? "#ffffff" : '#333333'}]}>Больше о Компании</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </ScrollView>

                    </View>
                </View>
            )
        }


        // marketplacePopup
        if (this.state.marketplacePopup) {
            return (
                <View style={styles.marketplace_popup}>
                    <StatusBar style="dark" />
                    <View style={styles.marketplace_popup_wrapper}>
                        <View style={styles.choosing_marketplace_header}>
                            <TouchableOpacity style={styles.high_rating_back_btn}
                              onPress={() => {this.setState({
                                  marketplacePopup: false,
                                  highRatingPopup: true,
                              })}}
                            >
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
                                Выберите пожалуйста {'\n'}
                                с какой площадки {'\n'}
                                приобрели товар
                            </Text>
                        </View>

                        <ScrollView style={styles.choosing_marketplace_page_main}>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>{this.takeUrlType("ozon")}} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Озон
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>{this.takeUrlType("wildBerries")}} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Вайлдберриз
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>{this.takeUrlType("sbermegamarket")}} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Сбермегамаркет
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>{this.takeUrlType("yandexMap")}} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Яндекс Маркет
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>{this.takeUrlType("mvideo")}} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Мвидео
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.takeUrlType("aliexpress")} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Алиэкспресс
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.takeUrlType("svstime")} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Svstime.ru
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.takeUrlType("Others")} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Другое
                                </Text>
                            </TouchableOpacity>

                        </ScrollView>

                    </View>
                </View>
            )
        }



        // notYetProduct
        if (this.state.notYetProduct ) {
            return (
                <View style={styles.not_yet_product_popup}>
                    <StatusBar style="dark" />
                    <View style={styles.not_yet_product_popup_wrapper}>
                        <View style={styles.not_yet_product_header}>
                            <TouchableOpacity style={styles.not_yet_product_back_btn} onPress={() => this.setState({
                                notYetProduct: false,
                                ratingPopup: true
                            })}>
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

                            <View style={styles.not_yet_product_img_wrapper}>
                                <Image style={styles.not_yet_product_img} source={require('../../assets/images/band_rate_logo.png')} />
                            </View>

                        </View>

                        <ScrollView style={styles.not_yet_product_page_main}>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.openCatalog()}>
                                <Text style={[styles.personal_area_button_text, {color: '#333333'}]}>Перейти в каталог</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.redirectToThemes()} >
                                <Text style={[styles.personal_area_button_text, {color:this.state.pressed ? "#ffffff" : '#333333'}]}>
                                    Скачать темы
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.redirectToAmbassador()} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>
                                    Стать Амбасадором
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.changeColor2()}>
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>Написать Отзыв за бонусы</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.changeColor3()} >
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>Сделать обзор</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:'#ffffff'}, {borderWidth:1}]}   onPress={()=>this.redirectToJobs()}>
                                <Text style={[styles.personal_area_button_text, {color:'#333333'}]}>Работа в Компании</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.redirectToInstruction()}>
                                <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}> Инструкции </Text>
                            </TouchableOpacity>
                            {/*<TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed5 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed5 ? 0 : 1}]}   onPress={()=>this.changeColor5()}>*/}
                            {/*    <Text style={[styles.personal_area_button_text, {color:this.state.pressed5 ? "#ffffff" : '#333333'}]}>Больше о Компании</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </ScrollView>

                    </View>
                </View>
            )
        }


        // successReviewMessage
        if (this.state.successReviewMessage) {
            return (
                <View style={styles.cash_payment_modal}>
                    <StatusBar style="dark" />
                    <View style={styles.cash_payment_modal_wrapper}>
                        <TouchableOpacity  style={styles.online_payment_modal_close_button}
                                           onPress={()=>{this.setState({
                                               successReviewMessage: false,
                                               lowRatingPopup: false,
                                               ratingPopup: false,
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
                            Спасибо за ваше мнение!
                        </Text>

                    </View>
                </View>
            )
        }


        // reviewOnlineShopUrlPopup
        if (this.state.reviewOnlineShopUrlPopup) {
            return (
                <SafeAreaView style={styles.reviewOnlineShopUrlPopup}>
                    <StatusBar style="dark" />

                    <View style={styles.reviewOnlineShopUrlPopup_wrapper}>

                        <View style={[styles.reviewOnlineShopUrlPopup_header, {marginBottom: 91}]}>
                            <TouchableOpacity style={styles.reviewOnlineShopUrlPopup_back_btn}
                                              onPress={() => {this.setState({
                                                  reviewOnlineShopUrlPopup: false,
                                                  marketplacePopup: true,
                                              })}}
                            >
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
                            <Text style={[styles.ambassador_link_main_title, {marginBottom: 0, marginTop: 96}]}>
                                Ставьте ссылку на ваш
                                аккаунт ниже
                            </Text>
                        </View>
                        <ScrollView style={styles.ambassador_link_main_wrapper}>


                            <View style={styles.ambassador_link_main_input}>
                                <TextInput
                                    style={styles.ambassador_link_input_field}
                                    onChangeText={(val) => this.setState({reviewOnlineShopUrl: val})}
                                    value={this.state.reviewOnlineShopUrl}
                                    // placeholder="Instagram.com/BrandRateSmart"
                                    placeholder={this.state.reviewOnlineShopUrlPlaceholder}
                                    placeholderTextColor='#848484'

                                />


                                {this.state.reviewOnlineShopUrlError &&
                                <Text style={styles.error_text}>{this.state.reviewOnlineShopUrlErrorText}</Text>
                                }

                            </View>
                            <TouchableOpacity style={styles.ambassador_link_send_button} onPress={() => {this.sendReviewOnlineShopUrl()}}>
                                <Text style={styles.ambassador_link_send_button_text}>Отправить</Text>
                            </TouchableOpacity>


                        </ScrollView>

                    </View>

                </SafeAreaView>
            )
        }


        // reviewOnlineShopSuccess
        if (this.state.reviewOnlineShopSuccess) {
            return (
                <View style={styles.cash_payment_modal}>
                    <StatusBar style="dark" />
                    <View style={styles.cash_payment_modal_wrapper}>
                        <TouchableOpacity  style={styles.online_payment_modal_close_button}
                                           onPress={()=>{this.setState({
                                               reviewOnlineShopSuccess: false,
                                               reviewOnlineShopUrlPopup: false,
                                               marketplacePopup: false,
                                               highRatingPopup: false,
                                               lowRatingPopup: false,
                                               ratingPopup: false,
                                               showFilterModal: false,
                                               notYetProduct: false,
                                               successReviewMessage: false,
                                               makeReviewTypePopup: false,
                                               makeReviewInputPopup: false,
                                               makeReviewSuccessPopup: false,
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
            )
        }

        // makeReviewTypePopup
        if (this.state.makeReviewTypePopup) {
            return (
                <SafeAreaView style={styles.makeReviewPopup}>
                    <StatusBar style="dark" />
                    <View style={styles.makeReviewPopup_wrapper}>


                        <View style={styles.makeReviewPopup_header}>
                            <TouchableOpacity style={styles.makeReviewPopup_back_btn}
                                              onPress={() => {this.setState({
                                                  marketplacePopup: false,
                                                  highRatingPopup: true,
                                              })}}
                            >
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
                            <View style={styles.ambassador_titles_wrapper}>
                                <Text style={styles.ambassador_main_title}>
                                    Выберите соц. сеть на котором вы хотите разместить информацию
                                    о купленном товаре
                                </Text>
                                <Text style={styles.ambassador_second_title}>
                                    Получи бонус от
                                    <View style={{paddingRight: 5}}></View>
                                    <Text style={styles.ambassador_second_title_red}>200 рублей</Text>
                                </Text>
                            </View>
                        </View>



                        <ScrollView style={styles.makeReviewPopup_main_wrapper}>

                            <View style={styles.ambassador_social_links_wrapper}>
                                <TouchableOpacity  style={[styles.ambassador_social_link, {backgroundColor: '#EFEFEF'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("vk")} >
                                    <Text style={[styles.ambassador_social_link_text , {color: '#333333'}]}>Вконтакте</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ambassador_social_link, {backgroundColor: '#EFEFEF'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("instagram")}>
                                    <Text style={[styles.ambassador_social_link_text, {color: '#333333'}]}>Instagram</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ambassador_social_link, {backgroundColor: '#EFEFEF'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("youtube")}>
                                    <Text style={[styles.ambassador_social_link_text , {color: '#333333'}]}>Youtube</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={[styles.ambassador_social_link, {backgroundColor: '#EFEFEF'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("other")}>
                                    <Text style={[styles.ambassador_social_link_text, {color: '#333333'}]}>Другое</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </SafeAreaView>
            )
        }



        // makeReviewInputPopup
        if (this.state.makeReviewInputPopup) {
            return (
                <SafeAreaView style={styles.makeReviewInputPopup}>
                    <StatusBar style="dark" />
                    <View style={styles.makeReviewInputPopup_wrapper}>
                        <View style={[styles.makeReviewInputPopup_header, {marginBottom: 91}]}>
                            <TouchableOpacity style={styles.makeReviewInputPopup_back_btn}
                                              onPress={() => {this.setState({
                                                  makeReviewInputPopup: false,
                                                  makeReviewTypePopup: true,
                                              })}}
                            >
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
                            <Text style={[styles.ambassador_link_main_title, {marginBottom: 0, marginTop: 96}]}>
                                Ставьте ссылку на ваш
                                аккаунт ниже
                            </Text>
                        </View>
                        <ScrollView style={[styles.ambassador_link_main_wrapper, {paddingHorizontal: 0}]}>
                            <View style={styles.ambassador_link_main_input}>
                                <TextInput
                                    style={styles.ambassador_link_input_field}
                                    onChangeText={(val) => this.setState({makeReviewTypePopupUrl: val})}
                                    value={this.state.makeReviewTypePopupUrl}
                                    // placeholder="Instagram.com/BrandRateSmart"
                                    placeholder={this.state.makeReviewTypePopupUrlPlaceholder}
                                    placeholderTextColor='#848484'

                                />


                                {this.state.makeReviewTypePopupUrlError &&

                                <Text style={styles.error_text}>{this.state.makeReviewTypePopupUrlErrorText}</Text>
                                }


                            </View>
                            <TouchableOpacity style={styles.ambassador_link_send_button} onPress={() => {this.createOverview()}}>
                                <Text style={styles.ambassador_link_send_button_text}>Отправить</Text>
                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                </SafeAreaView>
            )
        }


        // makeReviewSuccessPopup
        if (this.state.makeReviewSuccessPopup) {
            return (
                <View style={styles.cash_payment_modal}>
                    <StatusBar style="dark" />
                    <View style={styles.cash_payment_modal_wrapper}>
                        <TouchableOpacity  style={styles.online_payment_modal_close_button}
                                           onPress={()=>{this.setState({
                                               makeReviewSuccessPopup: false,
                                               reviewOnlineShopSuccess: false,
                                               ratingPopup: false,
                                               lowRatingPopup: false,
                                               highRatingPopup: false,
                                               notYetProduct: false,
                                               marketplacePopup: false,
                                               reviewOnlineShopUrlPopup: false
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
            )
        }


        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />



                <View style={styles.catalog_header}>
                    <Text style={styles.catalog_title}>
                        Умные часы
                    </Text>
                    {/*<TouchableOpacity*/}
                    {/*    style={{}}*/}
                    {/*    onPress={() => {*/}
                    {/*        this.props.navigation.navigate('WristWatchCatalogComponent');*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Text style={styles.catalog_menu_icon_btn_text}>Н.часы</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity
                        style={styles.catalog_menu_icon}
                        onPress={() => {
                            this.setState({
                                showFilterModal: true
                            })
                        }}
                    >
                        {/*<Svg*/}
                        {/*    xmlns="http://www.w3.org/2000/svg"*/}
                        {/*    width={30}*/}
                        {/*    height={18}*/}
                        {/*    viewBox="0 0 30 18"*/}
                        {/*    fill="none"*/}
                        {/*>*/}
                        {/*    <Path*/}
                        {/*        d="M30 16.25A1.25 1.25 0 0028.75 15h-7.5a1.25 1.25 0 000 2.5h7.5A1.25 1.25 0 0030 16.25zm0-7.5a1.25 1.25 0 00-1.25-1.25h-17.5a1.25 1.25 0 000 2.5h17.5A1.25 1.25 0 0030 8.75zm0-7.5A1.25 1.25 0 0028.75 0H1.25a1.25 1.25 0 100 2.5h27.5A1.25 1.25 0 0030 1.25z"*/}
                        {/*        fill="#000"*/}
                        {/*    />*/}
                        {/*</Svg>*/}
                        <Text style={styles.catalog_menu_icon_btn_text}>Фильтр</Text>
                    </TouchableOpacity>
                </View>


                {this.state.catalogItems.length == 0 &&

                        <Text style={{textAlign: 'center',alignSelf: 'center', color: '#000000', fontSize: 22, fontWeight: 'bold'}}>По данному запросу ничего не найденно!</Text>
                }

                {this.state.catalogItems.length > 0 &&

                    <FlatList
                        style={styles.catalog_items_main_wrapper}
                        data={this.state.catalogItems}
                        renderItem={({item}) => (

                            <View style={styles.catalog_item}>

                                {item.product_image && item.product_image.length > 0 ?

                                    <TouchableOpacity style={styles.catalog_item_img_wrapper}
                                                      onPress={() => this.redirectToCardProduct(item)}>
                                        <Image style={styles.catalog_item_img}
                                               source={{uri: item.product_image[0].picture}}/>
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity style={styles.catalog_item_img_wrapper}
                                                      onPress={() => this.redirectToCardProduct(item)}>
                                        <Image style={styles.catalog_item_img}
                                               source={require('../../assets/images/band_rate_logo.png')}/>
                                    </TouchableOpacity>


                                }


                                <View style={styles.catalog_item_info_wrapper}>
                                    <Text style={styles.catalog_item_info_name}>{item.model}</Text>
                                    {/*<Text style={styles.catalog_item_info_code}>{item.product_id}</Text>*/}
                                    <View style={styles.catalog_item_info_prices}>
                                        {/*{item.oldprice != 'null' &&*/}

                                        {/*    <Text style={styles.catalog_item_info_discounted_price}>{item.oldprice.slice(1, -1)}руб.</Text>*/}
                                        {/*}*/}

                                        <Text style={styles.catalog_item_info_price}>{item.price}руб.</Text>
                                    </View>


                                </View>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={2}
                        columnWrapperStyle={{flex: 1, justifyContent: "space-between"}}
                        keyExtractor={(item, index) => index.toString()}
                    />


                }
                <View style={{width: '100%', flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20}}>
                    {this.state.filter_used_or_not && this.state.catalogItems.length > 0 &&

                        <TouchableOpacity

                            style={ [ {height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center',},  this.state.current_paginate_filter == 1 ? {opacity: 0.5} : {}]}
                            onPress={() => {this.getPrevFilterData()}}
                        >

                            <Svg
                                style={{position: 'relative', left: -5}}
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 35 35"
                                fill="none"

                            >
                                <Path
                                    d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z"
                                    fill="red"
                                />
                            </Svg>
                            <Text style={{fontSize: 20, color: 'red'}}>Назад</Text>

                        </TouchableOpacity>
                    }


                    {!this.state.filter_used_or_not &&

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

                    }


                    {this.state.filter_used_or_not &&  this.state.hide_next_button === false && this.state.catalogItems.length > 0 &&

                        <TouchableOpacity
                            style={[{height: 50, width: '45%', backgroundColor:'#ffffff', borderWidth: 1, borderColor: 'red', borderRadius: 5, flexDirection: 'row',  justifyContent:'center', alignItems: 'center'},]}
                            onPress={() => {this.getNextFilterData()}}
                        >

                            <Text style={{fontSize: 20, color: 'red'}}>Далее</Text>

                            <Svg
                                style={{transform:[{rotate:'180deg'}], position: 'relative', right: -5}}
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 35 35"
                                fill="none"

                            >
                                <Path
                                    d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z"
                                    fill="red"
                                />
                            </Svg>

                        </TouchableOpacity>

                    }

                    {!this.state.filter_used_or_not &&

                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: '45%',
                                backgroundColor: '#ffffff',
                                borderWidth: 1,
                                borderColor: 'red',
                                borderRadius: 5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }

                            }
                            onPress={() => {
                                this.getNextCatalogData()
                            }}
                        >



                            <Text style={{fontSize: 20, color: 'red'}}>Далее</Text>

                            <Svg style={{transform: [{rotate: '180deg'}], position: 'relative', right: -5}} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 35 35" fill="none">
                                <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="red"/>
                            </Svg>

                        </TouchableOpacity>
                    }
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

    },
    catalog_item_img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
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

    }
});
