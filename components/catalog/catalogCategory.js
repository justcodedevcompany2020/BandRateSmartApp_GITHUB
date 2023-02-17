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
                'измерение кислорода в крови',
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



    componentDidMount() {
        const { navigation } = this.props;

        // AsyncStorage.clear();

        this.checkBasketCount();
        this.checkFavouritesProductsCount();

        this.focusListener = navigation.addListener("focus", () => {

            // AsyncStorage.removeItem('filterInfo')

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


    redirectToCardProduct = (item) => {
        this.props.navigation.navigate("CardProduct", {
            params: JSON.stringify(item)
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


        // LOW RATING POPUP

        // HIGH RATING POPUP


        // marketplacePopup


        // notYetProduct


        // successReviewMessage


        // reviewOnlineShopUrlPopup


        // reviewOnlineShopSuccess

        // makeReviewTypePopup



        // makeReviewInputPopup

        // makeReviewSuccessPopup


        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />


                <View style={styles.catalog_header}>
                    <Text style={styles.catalog_title}>Каталог</Text>
                </View>


                <ScrollView style={[styles.catalog_items_main_wrapper, {backgroundColor:'white'}]}>


                    <TouchableOpacity
                        style={{width: '100%', height: 150, borderRadius: 20, borderColor:'silver', borderWidth:1, marginBottom: 15, padding: 15, flexDirection:'row', justifyContent:'center', alignItems:'center'}}
                        onPress={() => {
                            this.props.navigation.navigate('Catalog')
                        }}
                    >

                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            Умные часы
                        </Text>

                        <View style={{flex:1, height: '100%', flexDirection:'row', justifyContent:'center'}}>
                            <Image style={{width: 100, height: '100%'}} source={require('../../assets/umnie.jpg')}/>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{width: '100%', height: 150, borderRadius: 20, borderColor:'silver', borderWidth:1, marginBottom: 15, padding: 15, flexDirection:'row', justifyContent:'center', alignItems:'center'}}
                        onPress={() => {
                            this.props.navigation.navigate('WristWatchCatalogComponent')
                        }}
                    >

                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            Наручные часы
                        </Text>

                        <View style={{flex:1, height: '100%', flexDirection:'row', justifyContent:'center'}}>
                            <Image style={{width: 80, height: '100%'}} source={require('../../assets/naruchniechasy.jpg')}/>
                        </View>

                    </TouchableOpacity>


                </ScrollView>


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
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={30}
                            viewBox="0 0 28 30"
                            fill="none"
                        >
                            <Path
                                d="M15.16 24.268h9.108a1.867 1.867 0 001.867-1.867V3.734a1.867 1.867 0 00-1.867-1.867H5.598a1.867 1.867 0 00-1.866 1.867v7.946a8.403 8.403 0 00-1.867.936V3.734A3.734 3.734 0 015.6 0h18.668A3.734 3.734 0 0128 3.734V22.4a3.734 3.734 0 01-3.733 3.734h-7.242l-1.866-1.867h.002zM8.869 9.334a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm4.198-.934a.933.933 0 01.933-.933h7.467a.934.934 0 010 1.867H14a.934.934 0 01-.933-.934zm0 5.6a.933.933 0 01.933-.933h7.467a.933.933 0 010 1.867H14a.934.934 0 01-.933-.933zm8.4 6.534H14.88c.07-.62.07-1.246 0-1.866h6.588a.933.933 0 110 1.866h-.002zM.717 16.624a6.533 6.533 0 009.736 8.204l4.747 4.775a.934.934 0 101.32-1.322l-4.76-4.76A6.533 6.533 0 10.715 16.623h.001zm9.696.384A4.667 4.667 0 112.7 22.265a4.667 4.667 0 017.714-5.257z"
                                fill="#333"
                            />
                        </Svg>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.footer_page_btn, {positon: "relative", bottom: 8}]}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={44}
                            height={42}
                            viewBox="0 0 44 42"
                            fill="none"
                        >
                            <Path
                                d="M22.495 2.638l17.884 17.884H38.1v19.1a.7.7 0 01-.7.7h-9.5v-15.4H16.1v15.4H6.6a.7.7 0 01-.7-.7v-19.1H3.621L21.505 2.638a.7.7 0 01.99 0z"
                                stroke="#D0251D"
                                strokeWidth={3}
                            />
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
