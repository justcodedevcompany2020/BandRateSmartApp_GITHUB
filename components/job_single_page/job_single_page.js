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
import AsyncStorage from "@react-native-async-storage/async-storage";



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false,
            pressed2: false,
            pressed3: false,
            pressed4: false,
            link: null,
            getJobs: [
                {
                    title: 'Менеджер по продажам',
                    info: 'Поддержанием и развитием партнёрских отношений с существующими клиентами. Привлечением новых и "спящих" клиентов к сотрудничеству. Организацией и согласованием встреч с...',
                    wageTitle: 'Заработная плата',
                    wageNumber: '30.000 ',

                },
                {
                    title: 'Менеджер по продажам',
                    info: 'Поддержанием и развитием партнёрских отношений с существующими клиентами. Привлечением новых и "спящих" клиентов к сотрудничеству. Организацией и согласованием встреч с...',
                    wageTitle: 'Заработная плата',
                    wageNumber: '30.000 ',

                },
                {
                    title: 'Менеджер по продажам',
                    info: 'Поддержанием и развитием партнёрских отношений с существующими клиентами. Привлечением новых и "спящих" клиентов к сотрудничеству. Организацией и согласованием встреч с...',
                    wageTitle: 'Заработная плата',
                    wageNumber: '30.000 ',

                },

                {
                    title: 'Менеджер по продажам',
                    info: 'Поддержанием и развитием партнёрских отношений с существующими клиентами. Привлечением новых и "спящих" клиентов к сотрудничеству. Организацией и согласованием встреч с...',
                    wageTitle: 'Заработная плата',
                    wageNumber: '30.000 ',
                },

                {
                    title: 'Менеджер по продажам',
                    info: 'Поддержанием и развитием партнёрских отношений с существующими клиентами. Привлечением новых и "спящих" клиентов к сотрудничеству. Организацией и согласованием встреч с...',
                    wageTitle: 'Заработная плата',
                    wageNumber: '30.000 ',

                },
                {
                    title: 'Менеджер по продажам',
                    info: 'Поддержанием и развитием партнёрских отношений с существующими клиентами. Привлечением новых и "спящих" клиентов к сотрудничеству. Организацией и согласованием встреч с...',
                    wageTitle: 'Заработная плата',
                    wageNumber: '30.000 ',

                },



            ],
            single_job_info: [],
            loaded: false,
            success_create_job_request_popup: false,
            comeFrom: '',

            show_basket_count: false,
            basket_count: 0,

            show_favourites_products_count: false,
            favourites_products_count: 0,

        };


    }




    redirectToJobs = () => {
        this.props.navigation.navigate("Jobs", {
            params: this.state.comeFrom,
        });
    }



    getJobInfo = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let job_info = JSON.parse(this.props.info);
        let job_id = job_info.id;
        console.log(job_id, "id");
        // console.log(product_info, "product_info");

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/SinglePageJob/job_id='+job_id,
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

                console.log(response.data.single_jobs[0], "response");


                this.setState({
                    single_job_info: response.data.single_jobs[0],
                    loaded: true
                })
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

        // this.getProductInfo();
        this.checkBasketCount();
        this.checkFavouritesProductsCount();
        this.focusListener = navigation.addListener("focus", () => {
            this.getJobInfo();
            this.setState({
                comeFrom: this.props.comeFrom,
            })
            console.log(this.props.comeFrom, "jobSinglePageComeFrom")
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



    createJobRequest = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let job_id = this.state.single_job_info.id;

        console.log(job_id);
        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/createJobRequest',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_id: job_id,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((response) => {

                console.log(response);

                this.setState({
                    success_create_job_request_popup: true,
                })

            })

    }


    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }


    redirectToJobSinglePage = (item) => {
        this.props.navigation.navigate("JobSinglePage", {
            params: JSON.stringify(item)
        });
        // console.log(item)
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



    redirectToProductSearch = () => {
        this.props.navigation.navigate("ProductSearch");
    }



    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
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


    render() {

        if (!this.state.loaded) {
            return (
                <View style={{width: '100%', height: '100%', backgroundColor: '#ffffff', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 300}} source={require('../../assets/images/band_rate_logo.png')} />
                </View>
            )
        }


        if (this.state.success_create_job_request_popup) {

            return (
                 <View style={styles.cash_payment_modal}>
                <View style={styles.cash_payment_modal_wrapper}>
                    <TouchableOpacity  style={styles.online_payment_modal_close_button} onPress={()=>{this.setState({success_create_job_request_popup: false})}}>
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
                        Заявка на вакансию  успешна отправлена
                    </Text>

                </View>
            </View>
            )

        }


        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />

                    <View style={styles.jobs_title_icon_wrapper}>
                        <TouchableOpacity style={styles.jobs_button} onPress={() => this.redirectToJobs()}>

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
                        <Text style={styles.jobs_main_title}>Вакансии</Text>
                    </View>

                    <ScrollView style={styles.jobs_details_info_wrapper}>
                        <Text style={styles.jobs_details_title1}>{this.state.single_job_info.name}</Text>
                        <View style={styles.jobs_details_items_wrapper}>
                            <View style={styles.jobs_details_item}>
                                <Text style={styles.jobs_details_item_title}>Требуемый опыт работы</Text>
                                <Text style={styles.jobs_details_item_info}>{this.state.single_job_info.job_year}</Text>

                            </View>
                            <View style={styles.jobs_details_item}>
                                <Text style={styles.jobs_details_item_title}>График работы</Text>
                                <Text style={styles.jobs_details_item_info}>{this.state.single_job_info.job_grafik}</Text>
                            </View>
                            <View style={styles.jobs_details_item}>
                                <Text style={styles.jobs_details_item_title}>Зароботная плата</Text>
                                <Text style={[styles.jobs_details_item_info, {color: '#D0251D'}]}>{this.state.single_job_info.price} Рублей</Text>
                            </View>
                        </View>
                        <Text style={styles.jobs_details_title2}>Описание работы</Text>
                        <Text style={styles.jobs_details_info}>{this.state.single_job_info.description}</Text>

                        <TouchableOpacity style={styles.respond_to_job_button} onPress={() => this.createJobRequest()}>
                            <Text style={styles.respond_to_job_button_text}>
                                Откликнутся
                            </Text>
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
                    <TouchableOpacity style={styles.footer_page_btn}  onPress={() => this.redirectToProductSearch()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={30} viewBox="0 0 28 30" fill="none">
                            <Path d="M15.16 24.268h9.108a1.867 1.867 0 001.867-1.867V3.734a1.867 1.867 0 00-1.867-1.867H5.598a1.867 1.867 0 00-1.866 1.867v7.946a8.403 8.403 0 00-1.867.936V3.734A3.734 3.734 0 015.6 0h18.668A3.734 3.734 0 0128 3.734V22.4a3.734 3.734 0 01-3.733 3.734h-7.242l-1.866-1.867h.002zM8.869 9.334a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm4.198-.934a.933.933 0 01.933-.933h7.467a.934.934 0 010 1.867H14a.934.934 0 01-.933-.934zm0 5.6a.933.933 0 01.933-.933h7.467a.933.933 0 010 1.867H14a.934.934 0 01-.933-.933zm8.4 6.534H14.88c.07-.62.07-1.246 0-1.866h6.588a.933.933 0 110 1.866h-.002zM.717 16.624a6.533 6.533 0 009.736 8.204l4.747 4.775a.934.934 0 101.32-1.322l-4.76-4.76A6.533 6.533 0 10.715 16.623h.001zm9.696.384A4.667 4.667 0 112.7 22.265a4.667 4.667 0 017.714-5.257z" fill="#333"/>
                        </Svg>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.footer_page_btn, {positon: "relative", bottom: 8}]} onPress={() => this.redirectToCatalog()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={42} viewBox="0 0 44 42" fill="none">
                            <Path d="M22.495 2.638l17.884 17.884H38.1v19.1a.7.7 0 01-.7.7h-9.5v-15.4H16.1v15.4H6.6a.7.7 0 01-.7-.7v-19.1H3.621L21.505 2.638a.7.7 0 01.99 0z" stroke="#333" strokeWidth={3}/>
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
        paddingTop: 31,
    },

    jobs_title_icon_wrapper: {
        paddingHorizontal: 26,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        alignSelf: 'center',
        width: '100%',
        paddingBottom: 20,
    },

    jobs_button: {
        position: 'absolute',
        left: 26,
        top:0,
    },
    jobs_main_title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

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

    jobs_details_title1: {
        fontWeight: '700',
        fontSize: 20,
        color: '#D0251D',
        marginBottom: 5,
        textAlign: 'center',
    },
    jobs_details_info_wrapper: {
        paddingHorizontal: 20,
        flex: 1,
        width: "100%",
        marginBottom: 60,
    },
    jobs_details_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    jobs_details_item_title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },

    jobs_details_item_info: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    jobs_details_title2: {
       marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',

    },
    jobs_details_info: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000000',
    },
    respond_to_job_button: {
        borderRadius: 8,
        backgroundColor: '#D0251D',
        borderWidth: 1,
        borderColor: '#D0251D',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 285,
        height: 50,
        marginTop: 68,
    },
    respond_to_job_button_text: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
    },
    cash_payment_modal: {
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
    cash_payment_modal_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 37,
        paddingBottom: 240,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',

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

});
