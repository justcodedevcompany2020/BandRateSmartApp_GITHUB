import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {APP_URL} from "../../env";


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
    Dimensions
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
import Footer from "../includes/footer";



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            basket_products: [],

            subtotal_amount: 25700,
            total_amount: 25700,
            showModalPayment: false,
            showModalOrder: false,
            ordersBalance: 12000,
            userBalance: 19000,

            onlinePaymentModal: false,
            cashPaymentModal: false,
            all_shopping_origin_sum: 0,
            user_bonus: 0,
            count_request: true,
            user_bonus_check: false,



            name: "",
            city: "",
            street:"",
            phone: "",
            sort_by_default: true,
            sort_by_default_error: false,
            sort_by_default_error_text: false,
            flat: "",
            house: "",

            name_error: false,
            name_error_text: false,
            city_error: false,
            city_error_text: false,
            street_error: false,
            street_error_text: false,
            phone_error: false,
            phone_error_text: false,

            show_basket_count: false,
            basket_count: 0,


            show_favourites_products_count: false,
            favourites_products_count: 0,
        };


    }

    showModalPaymentPopup = () => {

        if (this.state.user_bonus == 0) {
            this.setState({
                showModalPayment: true,
            })
        } else {

            let user_bonus_check;
            let discounted_price;

            if(this.state.user_bonus_check === false) {
                 user_bonus_check = true;
                 discounted_price = this.state.all_shopping_origin_sum - this.state.user_bonus;
            } else {

                 user_bonus_check = false;
                 discounted_price = parseInt(this.state.all_shopping_origin_sum) + parseInt(this.state.user_bonus);
            }


            this.setState({
                user_bonus_check: user_bonus_check,
                all_shopping_origin_sum: discounted_price,
            })

        }
    }


    getBasketProducts = () => {
        return this.state.basket_products;
    }


    redirectToCatalog = () => {
        // this.props.navigation.navigate("Catalog");
        this.props.navigation.navigate("CatalogCategory");
    }
    backToCatalog = () => {
        this.props.navigation.navigate("Catalog");
    }


    redirectToFavorites = () => {
        this.props.navigation.navigate("Favorites");
    }

    makeOrder = () => {

        let ordersBalance = this.state.ordersBalance;
        let usersBalance = this.state.userBalance;
        if (usersBalance < ordersBalance) {
            this.setState({
                showModalPayment: true,
                showModalOrder: false,
            })
        } else {
            this.setState({
                showModalPayment: false,
                showModalOrder: true,
            })
        }


    }

    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }

    redirectToRatingProduct = () => {
        this.props.navigation.navigate("RatingProduct");
    }
    redirectToProductSearch = () => {
        this.props.navigation.navigate("ProductSearch");
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


    getAllBasketProducts  = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        // console.log(userToken, "token")
        fetch(
            `${APP_URL}/AllShoppingBasket`,
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


                // if (response.hasOwnProperty('exception') && response.hasOwnProperty('line') && response.hasOwnProperty('message')) {
                //
                //     // alert('error')
                //
                //     setTimeout(() => {
                //         this.getAllBasketProducts()
                //     }, 1000)
                //
                //     return false
                // }

                console.log(response, 'favoritProduct')

                let all_basket_products = response.data.all_shopping_basket;

                let all_shopping_origin_sum = response.data.all_shopping_origin_sum;
                let user_bonus = response.data.user_bonus;
                // console.log(all_basket_products, 'all_basket_products')

                let all_shopping_origin_sum_new;
                if (this.state.user_bonus_check === true && this.state.user_bonus > 0) {
                    all_shopping_origin_sum_new = all_shopping_origin_sum - this.state.user_bonus;
                } else {
                    all_shopping_origin_sum_new = all_shopping_origin_sum;
                }

                // if (all_basket_products.length == 0) {
                //     AsyncStorage.removeItem('countsOfProductsInBasket');
                // }
                //

                this.setState({
                    basket_products: all_basket_products,
                    all_shopping_origin_sum: all_shopping_origin_sum_new,
                    user_bonus: user_bonus,
                    count_request: true
                })





            })




    }

    componentDidMount() {
        const { navigation } = this.props;

        //
        // this.getAllBasketProducts();
        // this.checkBasketCount();
        // this.checkFavouritesProductsCount();

        this.focusListener = navigation.addListener("focus", () => {
            this.getAllBasketProducts();
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

    addProductCount = async (basket_product) => {

        if (this.state.count_request === true ) {

            await this.setState({
                count_request: false
            })

            let userToken = await AsyncStorage.getItem('userToken');
            let AuthStr = 'Bearer ' + userToken;
            let product_id = basket_product.product_id;

            // console.log(userToken, "token")
            fetch(
                `${APP_URL}/CreateShoppingBasket`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "product_id": product_id,
                        "product_count": "1"
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {
                    console.log(response, 'favoritProduct')
                    this.getAllBasketProducts();
                    this.checkBasketCount();
                })

        }

    }

    deleteProductCount = async (basket_product) => {

        if (this.state.count_request === true ) {

            await this.setState({
                count_request: false
            })

            let userToken = await AsyncStorage.getItem('userToken');
            let AuthStr = 'Bearer ' + userToken;
            let product_id = basket_product.product_id;

            // console.log(userToken, "token")
            fetch(
                `${APP_URL}/DeleteShoppingBasket`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "product_id": product_id,
                        "product_count": "1"
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {
                    console.log(response, 'favoritProduct')
                    // this.setState({
                    //     count_request: true
                    // })
                    this.getAllBasketProducts();
                    this.checkBasketCount();
                })
        }

    }

    deleteBasketProduct = async (basket_product) => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = basket_product.product_id;

        // console.log(userToken, "token")
        fetch(
            `${APP_URL}/DeleteProductBasket`,
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "product_id": product_id,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {
                console.log(response, 'BasketProduct')
                this.getAllBasketProducts();
                this.checkBasketCount();
            })
    }


    // this.setState({ showModalOrder: false, cashPaymentModal: true
    payInCashMethod = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let {name, city, street, house, flat, phone, user_bonus_check, all_shopping_origin_sum, sort_by_default} = this.state


        if (name == ""  || city == "" || street == "" || house == "" || phone == ""  || sort_by_default === false) {
             if (name == "") {
                 this.setState({
                     name_error: true,
                     name_error_text: "Необходимо ввести имя в поле",
                 })
             } else {
                 this.setState({
                     name_error: false,
                     name_error_text: "",
                 })
             }
            if (city == "") {
                this.setState({
                    city_error: true,
                    city_error_text: "Поле города обязательно",
                })
            }   else {
                this.setState({
                    city_error: false,
                    city_error_text: "",
                })
            }

            if (street == "") {
                this.setState({
                    street_error: true,
                    street_error_text: "Поле улицы обязательно",
                })
            }   else {
                this.setState({
                    street_error: false,
                    street_error_text: "",
                })
            }

            if (house == "") {
                this.setState({
                    house_error: true,
                    flat_error: true,
                    house_error_text: "Поле дома обязательно",
                })
            }   else {
                this.setState({
                    flat_error: false,
                    house_error: false,
                    house_error_text: "",
                })
            }

            if (phone == "") {
                this.setState({
                    phone_error: true,
                    phone_error_text: "Поле телефон обязательно",
                })
            }
            else {
                this.setState({
                    phone_error: false,
                    phone_error_text: "",
                })
            }
            if (sort_by_default === false) {
                this.setState({
                    sort_by_default_error: true,
                    sort_by_default_error_text: "Согласитесь с обработкой данных!",
                })
            } else {
                this.setState({
                    sort_by_default_error: false,
                    sort_by_default_error_text: "",
                })
            }

        }  else  {

            await this.setState({
                name_error: false,
                name_error_text: "",
                city_error: false,
                city_error_text: '',
                street_error: false,
                street_error_text: "",
                house_error: false,
                house_error_text: "",
                flat_error: false,
                flat_error_text: "",
                phone_error: false,
                phone_error_text: "",
                sort_by_default_error: false,
                sort_by_default_error_text: "",
            })

            // console.log(userToken, "token")
            fetch(
                `${APP_URL}/CreateOrder`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        city: city,
                        street: street,
                        house: house,
                        flat: flat,
                        phone: phone,
                        price: all_shopping_origin_sum,
                        bonus_used: user_bonus_check,
                        paymentMethod: "Cash",
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {
                    console.log(response, 'BasketProduct')

                    if(response.status)  {

                        this.setState({
                            showModalOrder:false,
                            cashPaymentModal: true,
                            flat: '',
                            name: '',
                            city: '',
                            street: '',
                            house: '',
                            phone: '',
                            sort_by_default: false
                        })
                        this.checkBasketCount();
                    }

                    if (response.data.hasOwnProperty("name")) {
                        let name_error_text;
                        if (response.data.name ==  "The name field is required.") {
                            name_error_text = "Необходимо ввести имя в поле";
                        }

                        this.setState({
                            name_error: true,
                            name_error_text: name_error_text,
                        })
                    }  else {

                        this.setState({
                            name_error: false,
                            name_error_text: "",
                        })
                    }

                    if (response.data.hasOwnProperty("city")) {
                        let city_error_text;
                        if (response.data.name ==  "The city field is required.") {
                            city_error_text = "Поле города обязательно";
                        }

                        this.setState({
                            city_error: true,
                            city_error_text: city_error_text,
                        })
                    }  else {

                        this.setState({
                            city_error: false,
                            city_error_text: "",
                        })
                    }


                    if (response.data.hasOwnProperty("street")) {
                        let street_error_text;
                        if (response.data.city ==  "The city field is required.") {
                            street_error_text = "Поле города обязательно";
                        }

                        this.setState({
                            street_error: true,
                            street_error_text: street_error_text,
                        })
                    }  else {

                        this.setState({
                            street_error: false,
                            street_error_text: "",
                        })
                    }

                    if (response.data.hasOwnProperty("street")) {
                        let street_error_text;
                        if (response.data.street ==  "The street field is required.") {
                            street_error_text = "Поле улицы обязательно";
                        }

                        this.setState({
                            street_error: true,
                            street_error_text: street_error_text,
                        })
                    }  else {

                        this.setState({
                            street_error: false,
                            street_error_text: "",
                        })
                    }

                    if (response.data.hasOwnProperty("house")) {
                        let house_error_text;
                        if (response.data.street ==  "The street field is required.") {
                            house_error_text = "Поле улицы обязательно";
                        }

                        this.setState({
                            street_error: true,
                            street_error_text: house_error_text,
                        })
                    }  else {

                        this.setState({
                            street_error: false,
                            street_error_text: "",
                        })
                    }


                })


        }


    }


    render() {



        if( this.state.showModalOrder ){



           return (
               <View style={{width: '100%', height: '100%', paddingVertical: 45}}>

                   <Image source={require('../../assets/images/811.png')} style={{width: '100%', height: '100%', position:'absolute', top: 0, left: 0}}/>


                   <KeyboardAwareScrollView style={styles.order_modal_parent_wrapper}>

                       <View style={{width: '100%', flex:1, paddingBottom: 30}}>
                           <View style={styles.order_modal_title_close_btn_wrapper}>
                               <Text style={styles.order_modal_title}>Оформление заказа</Text>
                               <TouchableOpacity style={styles.order_modal_close_btn} onPress={()=>{this.setState({showModalOrder: false})}}>
                                   <Svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width={19}
                                       height={19}
                                       viewBox="0 0 19 19"
                                       fill="none"
                                   >
                                       <Path
                                           d="M9.5 9.5L1.751 1.693m-.058 15.556L9.5 9.5l-7.807 7.749zM9.5 9.5l7.808-7.749L9.5 9.5zm0 0l7.749 7.808L9.5 9.5z"
                                           stroke="#000"
                                           strokeWidth={2}
                                           strokeLinecap="round"
                                       />
                                   </Svg>
                               </TouchableOpacity>
                           </View>
                           <View style={styles.order_modal_input_wrapper}>
                               <Text style={styles.order_modal_input_title}>Имя <Text style={{color: 'red'}}>*</Text></Text>
                               <TextInput
                                   style={styles.order_modal_input_field}
                                   onChangeText={(val) => this.setState({name: val})}
                                   value={this.state.name}
                               />
                               {this.state.name_error &&
                               <Text style={styles.error_text}>{this.state.name_error_text}</Text>
                               }
                           </View>
                           <View style={styles.order_modal_input_wrapper}>
                               <Text style={styles.order_modal_input_title}>Город <Text style={{color: 'red'}}>*</Text></Text>
                               <TextInput
                                   style={styles.order_modal_input_field}
                                   onChangeText={(val) => this.setState({city: val})}
                                   value={this.state.city}
                               />
                               {this.state.city_error &&
                               <Text style={styles.error_text}>{this.state.city_error_text}</Text>
                               }
                           </View>
                           <View style={styles.order_modal_input_wrapper}>
                               <Text style={styles.order_modal_input_title}>Улица <Text style={{color: 'red'}}>*</Text></Text>
                               <TextInput
                                   style={styles.order_modal_input_field}
                                   onChangeText={(val) => this.setState({street: val})}
                                   value={this.state.street}
                               />
                               {this.state.street_error &&
                               <Text style={styles.error_text}>{this.state.street_error_text}</Text>
                               }
                           </View>
                           <View style={[styles.order_modal_input_wrapper, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>

                               <View style={[styles.order_modal_house_input, {width:'48%', marginRight: 16}]}>
                                   <Text style={styles.order_modal_input_title}>Дом <Text style={{color: 'red'}}>*</Text></Text>
                                   <TextInput
                                       style={styles.order_modal_input_field}
                                       onChangeText={(val) => this.setState({house: val})}
                                       value={this.state.house}
                                       keyboardType='numeric'
                                   />
                                   {this.state.house_error &&
                                   <Text style={styles.error_text}>{this.state.house_error_text}</Text>
                                   }
                               </View>
                               <View style={[styles.order_modal_house_input, {width:'48%'}]}>
                                   <Text style={styles.order_modal_input_title}>Квартира</Text>
                                   <TextInput
                                       style={styles.order_modal_input_field}
                                       onChangeText={(val) => this.setState({flat: val})}
                                       value={this.state.flat}
                                       keyboardType='numeric'
                                   />
                                   {this.state.flat_error &&
                                   <Text style={styles.error_text}>{this.state.flat_error_text}</Text>
                                   }
                               </View>
                           </View>

                           <View style={styles.order_modal_input_wrapper}>
                               <Text style={styles.order_modal_input_title}>Телефон <Text style={{color: 'red'}}>*</Text></Text>
                               <TextInput
                                   style={styles.order_modal_input_field}
                                   onChangeText={(val) => this.setState({phone: val})}
                                   value={this.state.phone}
                                   keyboardType='numeric'
                               />

                               {this.state.phone_error &&
                                    <Text style={styles.error_text}>{this.state.phone_error_text}</Text>
                               }

                           </View>

                           <View style={styles.privacy_policy_checkbox_input}>
                               <TouchableOpacity
                                   style={[styles.inputRadio, this.state.sort_by_default ? styles.activeInputRadioBorder : {}]}
                                   onPress={()=> {
                                       this.setState({
                                           sort_by_default: !this.state.sort_by_default,
                                       })
                                   }}>
                                   {this.state.sort_by_default &&
                                       <View style={styles.activeRadioRound}>

                                           <Svg  xmlns="http://www.w3.org/2000/svg"  width={16}  height={16}  viewBox="0 0 83 65"  fill="none">
                                               <Path
                                                   d="M73.333.667L28 46 9.333 27.333 0 36.667l28 28L82.667 10 73.333.667z"
                                                   fill="#EFEFEF"
                                               />
                                           </Svg>

                                       </View>
                                   }
                               </TouchableOpacity>


                               <Text style={[styles.privacy_policy_text]}>
                                   Согласен с

                                   <View style={{paddingRight:5}}></View>
                                   <Text style={[styles.privacy_policy_text_bold]}>
                                       обработкой персональных
                                       данных

                                   </Text>
                               </Text>

                           </View>

                           {this.state.sort_by_default_error &&
                             <Text style={styles.error_text}>
                                 {this.state.sort_by_default_error_text}
                             </Text>
                           }
                           {/*<TouchableOpacity style={styles.pay_online_button} onPress={()=>{this.setState({ showModalOrder: false, onlinePaymentModal: true})}}>*/}
                           {/*    <Text style={styles.pay_online_button_text}>Оплатить онлайн</Text>*/}
                           {/*</TouchableOpacity>*/}

                           <TouchableOpacity style={styles.pay_in_cash_button}  onPress={() => {this.payInCashMethod()}}>
                               <Text style={styles.pay_in_cash_button_text}> Оформить заказ</Text>
                           </TouchableOpacity>
                       </View>
                   </KeyboardAwareScrollView>


               </View>
               // <ImageBackground resizeMode="cover"  source={require('../../assets/images/811.png')} style={[styles.blurContainer,{width: '100%', height: windowHeight, paddingVertical: 45,   zIndex: 99, }]}>
               //
               //
               //
               // </ImageBackground>

           )

        }



        if(this.state.cashPaymentModal) {


           return (
               <View style={styles.cash_payment_modal}>
                   <View style={styles.cash_payment_modal_wrapper}>
                       <TouchableOpacity  style={styles.online_payment_modal_close_button}
                                          onPress={()=>{
                                              this.setState({
                                                  cashPaymentModal: false
                                              })
                                              this.props.navigation.navigate('Catalog')
                                          }}
                       >
                           <Svg  xmlns="http://www.w3.org/2000/svg"  width={19}  height={19}  viewBox="0 0 19 19"  fill="none">
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
                           Ваш заказ
                           Оформлен!
                       </Text>
                       <TouchableOpacity style={styles.online_payment_modal_go_to_catalog_button}
                           onPress={() => {
                               // this.redirectToRatingProduct()
                               this.setState({
                                   cashPaymentModal: false
                               })
                               this.props.navigation.navigate('Catalog')
                           }}
                       >
                           <Text style={styles.online_payment_modal_go_to_catalog_button_text}>В Каталог</Text>
                       </TouchableOpacity>
                   </View>
               </View>
           )


        }

        if (this.state.showModalPayment ) {

            return (
                <View style={{width: '100%', height: '100%'}}>

                    <Image source={require('../../assets/images/811.png')} style={{width: '100%', height: '100%', position:'absolute', top: 0, left: 0}}/>

                    <View style={styles.payment_modal_parent}>
                        <View style={styles.payment_modal_parent_wrapper}>
                            <View style={styles.payment_modal_title_close_btn_wrapper}>
                                <Text style={styles.payment_modal_title}>Внимание!</Text>

                                <TouchableOpacity style={styles.payment_modal_close_btn} onPress={()=>{this.setState({showModalPayment: false})}}>
                                    <Svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={19}
                                        height={19}
                                        viewBox="0 0 19 19"
                                        fill="none"
                                    >
                                        <Path
                                            d="M9.5 9.5L1.751 1.693m-.058 15.556L9.5 9.5l-7.807 7.749zM9.5 9.5l7.808-7.749L9.5 9.5zm0 0l7.749 7.808L9.5 9.5z"
                                            stroke="#000"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </Svg>
                                </TouchableOpacity>
                                <Text style={styles.payment_modal_info}>
                                    На вашем счету недастаточно бонусов!
                                </Text>
                                {/*<TouchableOpacity style={styles.top_up_account_button}>*/}
                                {/*    <Text style={styles.top_up_account_button_text}>Пополнить счёт</Text>*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                        </View>

                    </View>
                </View>
            )
        }


        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />

                    <View style={styles.basket_header}>
                        <View style={styles.back_to_btn_wrapper}>
                            <TouchableOpacity style={styles.back_to_btn} onPress={() => {this.redirectToCatalog()}}>
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
                        <Text style={styles.basket_title}>Корзина</Text>

                    </View>

                    <ScrollView style={styles.basket_main_items_wrapper}>

                        {this.state.basket_products.map((basket_product, index) => {
                            return (


                                <View style={styles.basket_products_item} key={basket_product.id}>

                                        {basket_product.productpicture.length > 0 ?
                                            <TouchableOpacity style={styles.basket_products_img_box}>

                                                <Image style={styles.basket_products_img} source={{uri:basket_product.productpicture[0].picture}} />

                                            </TouchableOpacity>

                                            :

                                            <TouchableOpacity style={styles.basket_products_img_box}>

                                                <Image style={styles.basket_products_img} source={require('../../assets/images/band_rate_logo.png')} />

                                            </TouchableOpacity>

                                        }

                                      <View style={styles.basket_products_item_img_info_wrapper}>

                                          <View style={styles.basket_products_item_info}>
                                                <Text style={styles.basket_products_item_info_title}>{basket_product.products.model}</Text>
                                              <TouchableOpacity style={styles.basket_products_delete_btn} onPress={() => {this.deleteBasketProduct(basket_product)}}>
                                                  <Svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width={20}
                                                      height={20}
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                  >
                                                      <Path
                                                          d="M10 10L1.077 1.01M1.01 18.923L10 10l-8.99 8.923zM10 10l8.99-8.923L10 10zm0 0l8.923 8.99L10 10z"
                                                          stroke="#C4C4C4"
                                                          strokeWidth={2}
                                                          strokeLinecap="round"
                                                      />
                                                  </Svg>
                                              </TouchableOpacity>


                                            </View>


                                            <View style={styles.basket_products_delete_add_to_card_btns_wrapper}>
                                                <View style={styles.basket_products_item_info_price_title_wrapper}>


                                                    <Text style={styles.basket_products_item_info_price}>
                                                        {basket_product.product_price}<Text style={styles.basket_products_item_info_price_light}> руб.</Text>
                                                    </Text>

                                                    <View style={styles.basket_product_count_buttons_inputs_wrapper}>


                                                        {basket_product.product_count > 1 &&
                                                            <TouchableOpacity  style={styles.basket_product_count_minus_btn} onPress={() => {this.deleteProductCount(basket_product)}}>
                                                                <Svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={18}
                                                                    height={2}
                                                                    viewBox="0 0 18 2"
                                                                    fill="none"
                                                                >
                                                                    <Path
                                                                        d="M16.333 1H1.667"
                                                                        stroke="#000"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                    />
                                                                </Svg>
                                                            </TouchableOpacity>

                                                        }



                                                        {basket_product.product_count == 1 &&
                                                            <TouchableOpacity  style={[styles.basket_product_count_minus_btn, {opacity: 0.5}]}>
                                                                <Svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={18}
                                                                    height={2}
                                                                    viewBox="0 0 18 2"
                                                                    fill="none"
                                                                >
                                                                    <Path
                                                                        d="M16.333 1H1.667"
                                                                        stroke="#000"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                    />
                                                                </Svg>
                                                            </TouchableOpacity>

                                                        }

                                                        <Text style={styles.basket_product_count_input_field}>{basket_product.product_count}</Text>
                                                        <TouchableOpacity  style={styles.basket_product_count_plus_btn} onPress={() => {this.addProductCount(basket_product)}}>

                                                            <Svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={17}
                                                                height={16}
                                                                viewBox="0 0 17 16"
                                                                fill="none"
                                                            >
                                                                <Path
                                                                    d="M9 8H1.667M9 15.333V8v7.333zM9 8V.667 8zm0 0h7.333H9z"
                                                                    stroke="#000"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                />
                                                            </Svg>

                                                        </TouchableOpacity>

                                                    </View>

                                                </View>
                                               <View  style={styles.basket_products_total_amount_title_number_wrapper}>
                                                   <Text style={styles.basket_products_total_amount_title}>Итого:</Text>
                                                   <Text style={styles.basket_products_total_amount_number}>{basket_product.all_product_price} руб.</Text>
                                               </View>
                                            </View>
                                      </View>
                                </View>



                            );
                        })}

                        {this.state.basket_products.length > 0 ?


                           <View>
                               <View style={styles.total_amount_items_check_order_btn_wrapper}>
                                   <View style={styles.total_amount_wrapper}>
                                       <View style={styles.user_bonus_checkbox_input}>
                                           <TouchableOpacity
                                               style={[styles.inputRadio2, this.state.user_bonus_check ? styles.activeInputRadioBorder : {}]}
                                               onPress={()=> {

                                                   this.showModalPaymentPopup()

                                               }}>

                                               {this.state.user_bonus_check &&
                                                   <View style={styles.activeRadioRound2}>

                                                       <Svg
                                                           xmlns="http://www.w3.org/2000/svg"
                                                           width={16}
                                                           height={16}
                                                           viewBox="0 0 83 65"
                                                           fill="none"
                                                       >
                                                           <Path
                                                               d="M73.333.667L28 46 9.333 27.333 0 36.667l28 28L82.667 10 73.333.667z"
                                                               fill="#D0251D"
                                                           />
                                                       </Svg>

                                                   </View>
                                               }
                                           </TouchableOpacity>
                                           <Text style={styles.user_bonus_text}>
                                               Использовать бонусы
                                           </Text>

                                       </View>
                                       <View style={styles.total_amount_item}>
                                           <Text style={styles.subtotal_amount_info_title}>Бонусы.</Text>
                                           <Text style={styles.subtotal_amount_info_number}> {this.state.user_bonus} Руб.</Text>
                                       </View>
                                       <View style={styles.total_amount_item}>
                                           <Text style={styles.subtotal_amount_info_title}>Подитог.</Text>
                                           <Text style={styles.subtotal_amount_info_number}> {this.state.all_shopping_origin_sum} Руб.</Text>
                                       </View>
                                       <View style={styles.total_amount_item}>
                                           <Text style={styles.total_amount_info_title}>Итоговая сумма.</Text>
                                           <Text style={styles.total_amount_info_number}> {this.state.all_shopping_origin_sum} Руб.</Text>
                                       </View>
                                   </View>


                               </View>

                               <TouchableOpacity style={styles.make_order_btn}    onPress={() => {this.makeOrder()}}>
                                   <Text style={styles.make_order_btn_text}>Оформить заказ</Text>
                               </TouchableOpacity>
                           </View>



                            :


                            <View style={{}}>

                                <Text style={{color: 'black', fontSize: 20, textAlign:'center'}}>Нет товаров!</Text>

                            </View>

                        }


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
                    {/*    <TouchableOpacity style={[styles.footer_page_btn, {flexDirection: 'row', position: "relative",}]}>*/}
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

                    <Footer navigation={this.props.navigation} page={'basket'}/>








                {this.state.onlinePaymentModal &&



                    <View style={styles.online_payment_modal}>
                        <View style={styles.online_payment_modal_wrapper}>
                            <TouchableOpacity  style={styles.online_payment_modal_close_button} onPress={()=>{this.setState({onlinePaymentModal: false})}}>
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
                                Платёж
                                Подтверждён
                            </Text>
                            <TouchableOpacity style={styles.online_payment_modal_go_to_catalog_button} onPress={() => {this.redirectToRatingProduct()}}>
                                <Text style={styles.online_payment_modal_go_to_catalog_button_text}>В Каталог</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: 31,
     },


    basket_header: {
        marginBottom: 25,
        paddingHorizontal: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        position: "relative",
    },
    back_to_btn_wrapper: {
        position: "absolute",
        left: 25,

    },
    basket_title: {
        color: "#333333",
        fontSize: 32,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
    },
    basket_main_items_wrapper: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 50,
        marginBottom: 20,
    },

    basket_products_item: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 30,
    },

    basket_products_img_box: {
        // backgroundColor: "#E2E2E2",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: 115,
        height: 150,
        marginRight: 10,

    },
    basket_products_img: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain'
    },
    basket_products_item_info_title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        flex: 1,
    },

    basket_products_item_info_code: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
        marginBottom: 34,
    },

    footer_wrapper: {
        shadowColor: "#00000040",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 24,
        shadowRadius: 1,

        elevation: 4,
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

    basket_products_item_info_price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 5,
    },
    basket_product_count_buttons_inputs_wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    basket_product_count_minus_btn:{
          backgroundColor: "#E6524B",
          width: 30,
          height: 30,
          borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    basket_product_count_plus_btn:{
        backgroundColor: "#E6524B",
        width: 30,
        height: 30,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    basket_product_count_input_field: {
        backgroundColor: "#F6C0BD",
        width: 30,
        // height: 24,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingVertical: 3
    },
    basket_products_delete_btn: {
        marginBottom: 70,
        // alignItems: "flex-end",
        // justifyContent: "center",
    },
    basket_products_total_amount_title: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#000000",

    },
    basket_products_total_amount_number: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
    },
    basket_products_total_amount_title_number_wrapper: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    total_amount_wrapper: {
        width: "100%",
        marginBottom: 25,

    },
    total_amount_items_check_order_btn_wrapper: {
        paddingHorizontal: 20,
    },
    total_amount_item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    subtotal_amount_info_title: {
        color: "#000000",
        fontWeight: "400",
        fontSize: 18,
    },
    subtotal_amount_info_number: {
        color: "#000000",
        fontWeight: "400",
        fontSize: 20,
    },
    total_amount_info_title: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 18,
    },
    total_amount_info_number: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 20,
    },
    make_order_btn: {
        backgroundColor: "#D0251D",
        width: 265,
        alignSelf:"center",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 11,
        borderRadius: 8,
        height: 50,
        marginBottom: 30,
    },
    make_order_btn_text: {
       color: "#ffffff",
        fontWeight: "bold",
        fontSize: 18,

    },
    payment_modal_parent: {
       backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
        height: '100%',
        width: '100%',


    },

    order_modal_parent: {
        // backgroundColor:  'rgba(255, 255, 255, 0.25)',
        backgroundColor:'red',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 1,
        // height: windowHeight,
        height: '100%',
        width: '100%',
        // paddingVertical: 50,
        flex: 1,
    },

    payment_modal_parent_wrapper: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 10,
        position: "relative",
        zIndex: 999,
        marginTop: 278,
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 35,
    },

    order_modal_parent_wrapper: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 10,
        position: "relative",
        zIndex: 999,
        paddingTop: 25,
        paddingBottom: 30,
        paddingHorizontal: 15,
        marginVertical: 20,
        // height: '100%',
        // flex: 1,
    },
    payment_modal_close_btn: {
        position: 'absolute',
        right: -10,
        top: 0,
    },
    payment_modal_title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center",
        alignSelf: 'center',
    },
    payment_modal_info: {
        color: '#333333',
        fontWeight: "400",
        fontSize: 18,
        marginBottom: 25,
        textAlign: "center",
        alignSelf: 'center',
        lineHeight: 29,
    },
    payment_modal_info_bold: {
        fontWeight: "700",
    },
    top_up_account_button: {
        width: 265,
        borderRadius: 8,
        backgroundColor: '#D0251D',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    top_up_account_button_text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    inputRadio: {
        backgroundColor: "#E4E4E4",
        width: 28,
        height: 28,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    inputRadio2: {
        backgroundColor: "#ffffff",
        width: 28,
        height: 28,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#D0251D",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    activeRadioRound:{
        width: 28,
        height: 28,
        backgroundColor: "#D0251D",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    activeRadioRound2: {
        alignItems: "center",
        justifyContent: "center",
    },
    privacy_policy_checkbox_input: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    privacy_policy_text: {
        color: '#000000',
        fontSize: 12,
        fontWeight: '400',
        paddingRight: 5,

    },

    privacy_policy_text_bold: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000000',
        paddingLeft: 5,

    },



    order_modal_title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",
        alignSelf: 'center',
    },

    order_modal_close_btn: {
        position: 'absolute',
        right: 10,
        top: 5,
    },

    order_modal_input_title: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5,
        lineHeight: 24,
    },
    order_modal_input_wrapper: {
        marginBottom: 15,
    },
    order_modal_input_field: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: '#E4E4E4',
        height: 50,
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 15,
    },
    pay_online_button:{
       backgroundColor: '#D0251D',
       borderRadius: 8,
        marginBottom: 15,
        width: 265,
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 35
    },


    pay_online_button_text: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 27,
    },

    pay_in_cash_button:{
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginBottom: 15,
        width: 265,
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 35,
    },


    pay_in_cash_button_text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 27,
    },
    online_payment_modal: {
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
    online_payment_modal_wrapper: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%',
        paddingTop: 37,
        paddingBottom: 240,
        paddingHorizontal: 55,
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
    online_payment_modal_go_to_catalog_button: {
        backgroundColor:'#D0251D',
        borderRadius: 8,
        height: 50,
        width: 265,
        justifyContent: 'center',
        alignItems: 'center',

    },
    online_payment_modal_go_to_catalog_button_text: {
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
        paddingHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',


    },
    basket_products_item_img_info_wrapper: {
        // flexDirection: "row",
        alignItems: "flex-start",
        // backgroundColor: 'red',
        flex: 1,
    },
    basket_products_item_info: {
        width: "100%",
        // height: '100%',
        // backgroundColor: 'yellow',
        flexDirection: 'row',

    },
    basket_products_delete_add_to_card_btns_wrapper: {
        width: "100%",
        // justifyContent: "flex-end",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',

    },

    user_bonus_checkbox_input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    user_bonus_text: {
       fontWeight: 'bold',
       fontSize: 16,
       color: '#D0251D',
    },

    error_text: {
        color: '#D0251D',
        fontWeight: 'bold',
        fontSize: 11,
        marginTop: 5,
    }

});
