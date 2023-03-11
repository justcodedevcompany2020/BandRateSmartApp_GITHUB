import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import { BlurView } from 'expo-blur';
import {AuthContext} from "../AuthContext/context";
import * as ImagePicker from 'expo-image-picker';

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
    Dimensions,
    TouchableHighlight,

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


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false,
            pressed2: false,
            pressed3: false,
            pressed4: false,
            showSettingsModal: false,

             editName: "",
             editName_error: false,
             editName_error_text: "",
             editPhone: "",
             editPhone_error: false,
             editPhone_error_text: "",
             editEmail: "",
             editPassword: null,
             showEditPasswordModal: false,
            oldPassword: "",
            oldPassword_error: false,
            oldPassword_error_text: "",
            newPassword: "",
            newPassword_error: false,
            newPassword_error_text: "",
            showEditEmailModal: false,
            changeEmail: "",
            changeEmail_error: false,
            changeEmail_error_text: "",
            showConfirmEmailCodeModal: false,
            code1: "",
            code1_field_error: false,
            code1_field_valid: false,

            code2: "",
            code2_field_error: false,
            code2_field_valid: false,

            code3: "",
            code3_field_error: false,
            code3_field_valid: false,

            code4: "",
            code4_field_error: false,
            code4_field_valid: false,


            code5: "",
            code5_field_error: false,
            code5_field_valid: false,

            code6: "",
            code6_field_error: false,
            code6_field_valid: false,
            user_info: [],


            codes_fields_error_text: "",
            codes_fields_error: false,

            showEditPasswordSuccesModal: false,
            user_image: null,
            image_path: 'http://37.230.116.113/BandRate-Smart/storage/app/uploads/userphoto/',

            showEditEmailSuccessModal: false,

            name_input_disabled: false,
            phone_input_disabled: false,
            email_input_disabled: false,
            password_input_disabled: false,

            isOpenCodeDropDown: false,
            selectedPhoneCode: "+7",
            error_phone_code: false,
            valid_phone_code: true,
            phoneCodesArray: [
                {
                    "label": "Russian",
                    "value": "+7",
                },
                {
                    "label": "Belarusia",
                    "value": "+375",
                },

            ],

            marketplacePopup: false,


            reviewOnlineShopUrlPopup: false,
            reviewOnlineShopUrlType: '',
            reviewOnlineShopUrl: "",
            reviewOnlineShopUrlError: false,
            reviewOnlineShopUrlErrorText: "",
            reviewOnlineShopUrlPlaceholder: "Введите ссылку на маркетплейс!",
            reviewOnlineShopSuccess: false,


            makeReviewTypePopupUrlPlaceholder: "",
            makeReviewTypePopupUrlType: "",
            makeReviewTypePopupUrl: '',
            makeReviewTypePopupUrlError: false,
            makeReviewTypePopupUrlErrorText: '',

            loaded: false,

            show_basket_count: false,
            basket_count: 0,

            show_favourites_products_count: false,
            favourites_products_count: 0,

            remove_account_popup: false

        };


    }




    openRemoveAccountPopup = async () =>
    {
        this.setState({
            remove_account_popup: true
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

    static contextType = AuthContext


    getUserInfo = async () => {


        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;


        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/mycabinet',
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
                console.log(response, "picture")
              if (response.hasOwnProperty('success')) {
                  if (response.success ===  true) {
                        this.setState({
                            user_info: response.data.user,
                            user_image:  this.state.image_path + response.data.user.photo,

                            editName: response.data.user.name,
                            editPhone: response.data.user.phone,
                            selectedPhoneCode: response.data.user.phoneCode,
                            editEmail: response.data.user.email,

                            loaded: true,

                        })
                  }
              }

                console.log(this.state.image_path + response.data.user.photo,)


            })

    }

    componentDidMount() {
        const { navigation } = this.props;
        this.getUserInfo();

        // AsyncStorage.clear();
        // this.getUserInfo();
        // this.checkBasketCount();
        // this.checkFavouritesProductsCount();

        this.focusListener = navigation.addListener("focus", () => {
            this.getUserInfo();
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




    redirectToAmbassador = () => {
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false});
        this.props.navigation.navigate("Ambassador", {
            params: 'from_profile',
        });
    }


    redirectToThemes = () => {
        this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false});
        this.props.navigation.navigate("ThemesCatalogComponent");
    }



    writeReviewForBonus = () => {

        this.setState({
            marketplacePopup: true,

        });
    }


    changeColor3(){

        this.setState({ pressed: false, pressed2: false, pressed3: true, pressed4: false});
    }

    redirectToJobs = () => {
        this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: true});
        this.props.navigation.navigate("Jobs", {
            params: 'from_profile',
        });
    }

    redirectToInstruction = () => {
        this.props.navigation.navigate("InstructionComponent", {
            params: 'from_profile',
        });
    }


    changeFirstCodeInput =  (value) => {
        if (value.length < 2) {

            this.setState({
                code1:  value
            })

            if (value.length == 1) {
                this.setState({
                    code1_field_error: false,
                    code1_field_valid: true,
                })
                this.refs.secondInput.focus();
            } else {
                this.setState({
                    code1_field_error: false,
                    code1_field_valid: false,
                })
            }
        }
    }

    changeSecondCodeInput =  (value) => {
        if (value.length < 2) {

            this.setState({
                code2:  value
            })

            if (value.length == 1) {
                this.setState({
                    code2_field_error: false,
                    code2_field_valid: true,
                })
                this.refs.thirdInput.focus();
            }

            if (value.length == 0) {
                this.setState({
                    code2_field_error: false,
                    code2_field_valid: false,
                })
                this.refs.firstInput.focus();
            }
        }
    }

    changeThirdCodeInput =  (value) => {
        if (value.length < 2) {

            this.setState({
                code3:  value
            })

            if (value.length == 1) {
                this.setState({
                    code3_field_error: false,
                    code3_field_valid: true,
                })
                this.refs.fourthInput.focus();
            }

            if (value.length == 0) {
                this.setState({
                    code3_field_error: false,
                    code3_field_valid: false,
                })
                this.refs.secondInput.focus();
            }
        }
    }

    changeFourthCodeInput =  (value) => {
        if (value.length < 2) {

            this.setState({
                code4:  value
            })

            if (value.length == 1) {
                this.setState({
                    code4_field_error: false,
                    code4_field_valid: true,
                })
                this.refs.fifthInput.focus();
            }

            if (value.length == 0) {
                this.setState({
                    code4_field_error: false,
                    code4_field_valid: false,
                })
                this.refs.thirdInput.focus();
            }
        }
    }

    changeFifthCodeInput =  (value) => {
        if (value.length < 2) {

            this.setState({
                code5:  value
            })

            if (value.length == 1) {
                this.setState({
                    code5_field_error: false,
                    code5_field_valid: true,
                })
                this.refs.sixthInput.focus();
            }

            if (value.length == 0) {
                this.setState({
                    code5_field_error: false,
                    code5_field_valid: false,
                })
                this.refs.fourthInput.focus();
            }
        }
    }

    changeSixthCodeInput =  (value) => {
        if (value.length < 2) {

            this.setState({
                code6:  value
            })

            if (value.length == 1) {
                this.setState({
                    code6_field_error: false,
                    code6_field_valid: true,
                })
            }

            if (value.length == 0) {
                this.setState({
                    code6_field_error: false,
                    code6_field_valid: false,
                })
                this.refs.fifthInput.focus();
            }
        }
    }

    logOut = () => {
        this.context.signOut(() => {
            this.props.navigation.navigate('SignIn')

        }).then(r => console.log("logOut"));
    }

    redirectToProductSearch = () => {
        this.props.navigation.navigate("ProductSearch");
    }

    editPasswordSave  = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let old_password = this.state.oldPassword;
        let new_password = this.state.newPassword;
        console.log(old_password, new_password, "passwords")

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/setingspassword',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldpassword: old_password,
                    newpassword: new_password,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)

            })
            .then((response) => {



                // Подтверждение пароля не совпадает
                console.log(response, "api answer");

                if (response.status) {

                    this.setState({
                        showEditPasswordModal: false,
                        showEditPasswordSuccesModal: true,
                    })

                } else {

                    let old_password_error_text = "";
                    let new_password_error_text = "";

                    if (response.data.hasOwnProperty("oldpassword")) {
                        if(response.data.oldpassword[0] == "The oldpassword field is required."){
                            old_password_error_text = "Поле пароля обязательно!"
                            this.setState({
                                oldPassword_error: true,
                                oldPassword_error_text: old_password_error_text,
                            })
                        }
                    } else {

                        this.setState({
                            oldPassword_error: false,
                            oldPassword_error_text: '',
                        })
                    }

                    if (response.data.hasOwnProperty("newpassword")) {

                        if(response.data.newpassword[0] == "The newpassword field is required."){
                            new_password_error_text = "Поле пароля обязательно!"
                        }

                        if(response.data.newpassword[0] == "The newpassword must be at least 6 characters."){
                            new_password_error_text = "Пароль должен содержать минимум 6 символов!"
                        }

                        this.setState({
                            newPassword_error: true,
                            newPassword_error_text: new_password_error_text,
                        })

                    } else {
                        this.setState({
                            newPassword_error: false,
                            newPassword_error_text: '',
                        })
                    }



                    if (response.data.hasOwnProperty("error")) {

                        let old_password_error_text = "";
                        if(response.data.error == "password mismatch") {
                            old_password_error_text = "Не верный старый пароль!";
                        }
                        this.setState({
                            oldPassword_error: true,
                            oldPassword_error_text: old_password_error_text,
                        })

                    }


                }

            })
    }




    selectImage = async () => {
        // No permissions request is necessary for launching the image library
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {

            this.setState({
                user_image:result.uri
            })

            let res = result.uri.split('.');
            let type = res[res.length - 1];


            let form = new FormData();
            form.append("photo", {
                uri: result.uri,
                type: 'image/jpg',
                name: 'photo.jpg',
            });

            console.log(form, 'form')



            if (type == 'jpg' ||  type == 'png' ||  type == 'jpeg') {


                fetch(
                    'http://37.230.116.113/BandRate-Smart/public/api/updatephoto',
                    {
                        body: form,
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            "Content-Type": "multipart/form-data",
                            'Authorization': AuthStr,
                        }
                    }
                ).then((response) => response.json())
                    .catch((error) => {
                        console.log("ERROR " , error)

                    })
                    .then((responseData) => {

                        console.log(responseData, 'photo user')

                    })
            } else {

                alert('Please use correct image format ')
            }



        }
    }



    sendCode = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let changeEmail = this.state.changeEmail;
        let changeEmail_error = this.state.changeEmail_error;
        let changeEmail_error_text = this.state.changeEmail_error_text;


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let is_error_email = reg.test(changeEmail);

        if (changeEmail == "" ||  is_error_email === false ) {

              if (changeEmail == "") {
                   this.setState({
                        changeEmail_error: true,
                        changeEmail_error_text: "Поле E-mail обязательно!"
                   })
              }  else if (is_error_email === false) {
                  this.setState({
                      changeEmail_error: true,
                      changeEmail_error_text: "Не верный формат!"
                  })
              }

        } else  {


           await this.setState({
                changeEmail_error: false,
                changeEmail_error_text: ""
            })


            fetch(
                'http://37.230.116.113/BandRate-Smart/public/api/updateemailCode',
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: changeEmail,
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR " , error)

                })
                .then((response) => {
                    console.log(response, "email")


                    if (response.status === true) {
                        this.setState({
                            showConfirmEmailCodeModal: true,
                            showEditEmailModal: false,
                            changeEmail: '',
                        })

                    } else  {
                        if(response.data.hasOwnProperty("message")) {
                            if (response.data.message ==  "email already exists") {
                                this.setState({
                                    changeEmail_error: true,
                                    changeEmail_error_text: "Данный E-mail уже существует!"
                                })
                            }

                        }
                    }

                })

        }





    }


    fullCode = () => {
        let code1 = this.state.code1;
        let code2 = this.state.code2;
        let code3 = this.state.code3;
        let code4 = this.state.code4;
        let code5 = this.state.code5;
        let code6 = this.state.code6;


        return code1 + code2 + code3 + code4 + code5 + code6;
    };


    confirmEmailCode = async () =>
    {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let code1 = this.state.code1;
        let code2 = this.state.code2;
        let code3 = this.state.code3;
        let code4 = this.state.code4;
        let code5 = this.state.code5;
        let code6 = this.state.code6;

        if (code1 == "" ||code2 == "" ||code3 == "" ||code4 == "" ||code5 == "" ||code6 == "") {

            await this.setState({
                code1_field_error: code1 == '' ? true : false,
                code2_field_error: code2 == '' ? true : false,
                code3_field_error: code3 == '' ? true : false,
                code4_field_error: code4 == '' ? true : false,
                code5_field_error: code5 == '' ? true : false,
                code6_field_error: code6 == '' ? true : false,
                codes_fields_error: true,
                codes_fields_error_text: "Введите коректные код!",
            })

        } else {


            await this.setState({
                code1_field_error: false,
                code2_field_error: false,
                code3_field_error: false,
                code4_field_error: false,
                code5_field_error: false,
                code6_field_error: false,
                codes_fields_error: false,
                codes_fields_error_text: "",
            })


            fetch(
                'http://37.230.116.113/BandRate-Smart/public/api/updateemail',
                {
                    method: "POST",
                    headers: {
                        'Authorization': AuthStr,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        update_email_code: this.fullCode(),
                    })
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR ", error)

                })
                .then((response) => {
                    console.log(response, "email")


                    if (response.status === true) {

                        this.setState({
                            codes_fields_error:  false,
                            codes_fields_error_text: "",
                            showEditEmailSuccessModal: true,
                            showConfirmEmailCodeModal: false,
                            code1: '',
                            code2: '',
                            code3: '',
                            code4: '',
                            code5: '',
                            code6: '',
                            code1_field_valid: false,
                            code2_field_valid: false,
                            code3_field_valid: false,
                            code4_field_valid: false,
                            code5_field_valid: false,
                            code6_field_valid: false,
                        })


                        this.getUserInfo()
                    } else {
                        if (response.data.hasOwnProperty("message")) {
                            if (response.data.message =  "code mismatch") {
                                 this.setState({
                                     codes_fields_error: true,
                                     codes_fields_error_text: "Не верный код!",
                                 })
                            }
                        }
                    }

                })

        }
    }

    makeAbleToWrite = () => {
        this.setState({
            name_input_disabled: true,
        })

    }

    editNameFunction = async () => {




        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let edit_name = this.state.editName;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/updatename',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: edit_name,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR ", error)

            })
            .then((response) => {
                console.log(response, "name")


                if (response.status === true) {
                    this.setState({
                        editName_error: false,
                        editName_error_text: "",
                        name_input_disabled: false,
                    })

                    this.getUserInfo()
                } else {
                    if (response.data.hasOwnProperty("message")) {
                        if (response.data.message == "name required") {
                            this.setState({
                                editName_error: true,
                                editName_error_text: "Необходимо ввести имя в поле!",
                            })
                        }
                    }
                }



            })

    }





    makeAbleToWritePhone = () => {
        this.setState({
            phone_input_disabled: true,
        })

    }

    editPhoneFunction = async () => {




        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let edit_phone = this.state.editPhone;
        let phoneCode = this.state.selectedPhoneCode;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/updatephone',
            {
                method: "POST",
                headers: {
                    'Authorization': AuthStr,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: edit_phone,
                    phoneCode: phoneCode,
                })
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR ", error)

            })
            .then((response) => {
                console.log(response, "phone")


                if (response.status === true) {
                    this.setState({
                        editPhone_error: false,
                        editPhone_error_text: "",
                        phone_input_disabled: false,
                    })

                    this.getUserInfo()
                } else {
                    if (response.data.hasOwnProperty("message")) {
                        if (response.data.message == "phone required") {
                            this.setState({
                                editPhone_error: true,
                                editPhone_error_text: "Поле телефон обязательно.!",
                            })
                        }
                    }
                }



            })

    }


    takeUrlType = (urlType) => {
        this.setState({
            reviewOnlineShopUrlType: urlType,
            reviewOnlineShopUrlPopup: true,

            marketplacePopup: false,

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



    openReviewOnlineShopUrlPopup  = () => {

        this.setState({

            makeReviewTypePopup: true,
            reviewOnlineShopUrlPopup: false,
            marketplacePopup: false,

        });
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

                                    marketplacePopup: false,
                                    reviewOnlineShopUrlPopup: false,
                                    reviewOnlineShopSuccess: false,
                                    makeReviewTypePopup: false,
                                    makeReviewInputPopup: false,


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


    removeAccountHandler = async ()=>
    {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        fetch(
            'http://37.230.116.113/BandRate-Smart/public/api/DeleteMyAccount',
            {
                method: "POST",
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

                this.setState({showSettingsModal: false})

                this.context.signOut(() => {
                    this.props.navigation.navigate('SignIn')
                }).then(r => console.log("logOut"));


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



           //marketplacePopup
            if (this.state.marketplacePopup ) {
                return (
                    <SafeAreaView style={styles.marketplace_popup}>

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
                    </SafeAreaView>
                )
            }




        // reviewOnlineShopUrlPopup
        if (this.state.reviewOnlineShopUrlPopup) {
            return (
                <SafeAreaView style={styles.reviewOnlineShopUrlPopup}>

                    <View style={styles.reviewOnlineShopUrlPopup_wrapper}>

                        <View style={styles.reviewOnlineShopUrlPopup_header}>
                            <TouchableOpacity style={styles.reviewOnlineShopUrlPopup_back_btn}
                                              onPress={() => {this.setState({
                                                  reviewOnlineShopUrlPopup: false,
                                                  marketplacePopup: true,
                                                  reviewOnlineShopUrlError: false,
                                                  reviewOnlineShopUrlErrorText: "",
                                                  reviewOnlineShopUrl: ""
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
                            <Text style={styles.ambassador_link_main_title}>
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
                <SafeAreaView style={styles.cash_payment_modal}>
                    <View style={styles.cash_payment_modal_wrapper}>
                        <TouchableOpacity  style={styles.online_payment_modal_close_button}
                                           onPress={()=>{this.setState({
                                               reviewOnlineShopSuccess: false,
                                               reviewOnlineShopUrlPopup: false,
                                               marketplacePopup: false,

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
                </SafeAreaView>
            )
        }



        // makeReviewTypePopup
        if (this.state.makeReviewTypePopup) {
            return (
                <SafeAreaView style={styles.makeReviewPopup}>
                    <View style={styles.makeReviewPopup_wrapper}>

                        <View style={styles.makeReviewPopup_header}>
                            <TouchableOpacity style={styles.makeReviewPopup_back_btn}
                                              onPress={() => {this.setState({
                                                  makeReviewTypePopup: false,
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
                                <TouchableOpacity  style={[styles.ambassador_social_link, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("vk")} >
                                    <Text style={[styles.ambassador_social_link_text , {color: '#333333'}]}>Вконтакте</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ambassador_social_link, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("instagram")}>
                                    <Text style={[styles.ambassador_social_link_text, {color: '#333333'}]}>Instagram</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ambassador_social_link, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("youtube")}>
                                    <Text style={[styles.ambassador_social_link_text , {color: '#333333'}]}>Youtube</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={[styles.ambassador_social_link, {backgroundColor: '#ffffff'}, {borderWidth: 1}]}   onPress={()=>this.openReviewLinkTypePopup("other")}>
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

                    <View style={styles.makeReviewInputPopup_wrapper}>
                        <View style={styles.makeReviewInputPopup_header}>
                            <TouchableOpacity style={styles.makeReviewInputPopup_back_btn}
                                              onPress={() => {this.setState({
                                                  makeReviewInputPopup: false,
                                                  makeReviewTypePopup: true,
                                                  makeReviewTypePopupUrl: '',
                                                  makeReviewTypePopupUrlError: false,
                                                  makeReviewTypePopupUrlErrorText: ''

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
                            <Text style={styles.makeReviewInputPopup_link_main_title}>
                                Ставьте ссылку на ваш
                                аккаунт ниже
                            </Text>
                        </View>
                        <ScrollView style={styles.ambassador_link_main_wrapper}>
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
                <SafeAreaView style={styles.cash_payment_modal}>
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
                </SafeAreaView>
            )
        }


        // settingsPopup
        if (this.state.showSettingsModal) {
            return (
                <BlurView intensity={50} tint="dark" style={[styles.blurContainer,{width: '100%', height: windowHeight + 40 ,position:'absolute', top: 0, left: 0,}]}>
                    <View style={{width: '100%', height: '100%',flexDirection: 'row', }} >


                        {this.state.remove_account_popup &&


                          <View style={{width: '100%', height: '100%',flexDirection: 'row', backgroundColor:'rgba(0,0,0,0.54)',  position:'absolute', left:0,bottom:0, zIndex: 9999999 }}>
                              <View style={{maxWidth:250, width:'100%', backgroundColor:'white', minHeight: 100, position:'absolute', alignSelf:'center', left:(Dimensions.get('window').width / 2) - 125, zIndex: 999999, borderRadius: 20, padding: 15}}>

                                  <Text>Вы действительно хотите удалить свой аккаунт?</Text>

                                  <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                                      <TouchableOpacity
                                          style={{flex:1, padding:5, alignItems: 'center', justifyContent: 'center', height: 50}}
                                          onPress={() => {
                                              this.setState({remove_account_popup: false})
                                          }}
                                      >
                                            <Text>Отменить</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                          style={{flex:1, padding:5, alignItems: 'center', justifyContent: 'center', height: 50}}
                                          onPress={() => {

                                             this.removeAccountHandler()

                                          }
                                      }>
                                            <Text>Удалить</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>
                          </View>


                        }


                        <TouchableOpacity  style={{width: "18%", alignItems: 'flex-end', justifyContent: 'flex-end',}} onPress={() => {this.setState({showSettingsModal: false, name_input_disabled: false, phone_input_disabled: false})}}>
                        </TouchableOpacity>
                        <View style={[styles.settings_modal_wrapper, {flex: 1}]}>



                            <View style={styles.settings_modal_child_wrapper}>
                                <View style={styles.settings_modal_title_icon_wrapper}>
                                    <Text style={styles.settings_modal_title}>Настройки Аккаунта</Text>
                                    <TouchableOpacity style={styles.settings_modal_close_btn}
                                          onPress={() => {
                                            this.setState({
                                                showSettingsModal: false,
                                                name_input_disabled:false,
                                                phone_input_disabled: false
                                            })
                                         }}
                                    >
                                        <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 19 19" fill="none">
                                            <Path d="M9.5 9.5L1.751 1.693m-.058 15.556L9.5 9.5l-7.807 7.749zM9.5 9.5l7.808-7.749L9.5 9.5zm0 0l7.749 7.808L9.5 9.5z" stroke="#000" strokeWidth={2} strokeLinecap="round"/>
                                        </Svg>
                                    </TouchableOpacity>

                                </View>

                                <KeyboardAwareScrollView style={{flex: 1, width: "100%", paddingHorizontal: 20,}} enableOnAndroid={true}>
                                    <View style={styles.avatar_img_info_wrapper}>
                                        <Text style={styles.avatar_name}>Аватар</Text>
                                        <View style={styles.avatar_img_edit_btn_wrapper}>
                                            <View style={styles.avatar_img_wrapper}>
                                                <Image style={styles.avatar_img} source={this.state.user_image ? {uri: this.state.user_image} : require('../../assets/images/avatar_img.png')}/>

                                            </View>
                                            <TouchableOpacity style={styles.personal_area_edit_button} onPress={() => {
                                                this.selectImage()
                                            }}>
                                                <View style={styles.personal_area_edit_button_icon}>
                                                    <Svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={22}
                                                        height={22}
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                    >
                                                        <Path
                                                            d="M17.875 11a.687.687 0 111.375 0v7.563a.687.687 0 01-.688.687H3.438a.687.687 0 01-.687-.688V3.438a.688.688 0 01.688-.687H11a.687.687 0 010 1.375H4.125v13.75h13.75V11z"
                                                            fill="#333"
                                                        />
                                                        <Path
                                                            d="M10.097 11.908l1.134-.163L18.2 4.778a.688.688 0 10-.973-.972l-6.97 6.967-.162 1.135h.002zm9.075-9.076a2.061 2.061 0 010 2.918l-7.13 7.13a.688.688 0 01-.389.195l-2.269.324a.688.688 0 01-.778-.778l.325-2.269a.687.687 0 01.193-.389l7.131-7.13a2.063 2.063 0 012.917 0z"
                                                            fill="#333"
                                                        />
                                                    </Svg>
                                                </View>
                                                <Text style={styles.personal_area_edit_button_text}>Изменить</Text>
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                    <View style={styles.avatar_info_input_fields_edit_buttons_wrapper}>

                                        <View style={styles.avatar_input_field_edit_btn_input_title_box}>
                                            <Text style={styles.avatar_input_field_name}>Имя</Text>
                                            <View style={styles.avatar_input_field_edit_btn_box}>
                                                <TextInput
                                                    style={styles.avatar_input_field}
                                                    onChangeText={(val) => this.setState({editName: val})}
                                                    value={this.state.editName}
                                                    // placeholder="Александр"
                                                    editable={this.state.name_input_disabled}
                                                />


                                                {this.state.name_input_disabled
                                                    ?


                                                    <TouchableOpacity
                                                        style={styles.save_btn}
                                                        onPress={() => {
                                                            this.editNameFunction()
                                                        }}>

                                                        <Text style={{fontWeight: 'bold', fontSize: 10, color: 'green'}}>
                                                            Сохранить
                                                        </Text>
                                                    </TouchableOpacity>

                                                    :


                                                    <TouchableOpacity onPress={() => {
                                                        this.makeAbleToWrite()
                                                    }}>
                                                        <Svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={22}
                                                            height={22}
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                        >
                                                            <Path
                                                                d="M17.875 11a.687.687 0 111.375 0v7.563a.687.687 0 01-.688.687H3.438a.687.687 0 01-.687-.688V3.438a.688.688 0 01.688-.687H11a.687.687 0 010 1.375H4.125v13.75h13.75V11z"
                                                                fill="#D0251D"
                                                            />
                                                            <Path
                                                                d="M10.097 11.908l1.134-.163L18.2 4.778a.688.688 0 10-.973-.972l-6.97 6.967-.162 1.135h.002zm9.075-9.076a2.061 2.061 0 010 2.918l-7.13 7.13a.688.688 0 01-.389.195l-2.269.324a.688.688 0 01-.778-.778l.325-2.269a.687.687 0 01.193-.389l7.131-7.13a2.063 2.063 0 012.917 0z"
                                                                fill="#D0251D"
                                                            />
                                                        </Svg>
                                                    </TouchableOpacity>
                                                }


                                            </View>

                                            {this.state.editName_error &&
                                            <Text style={styles.error_text}>{this.state.editName_error_text}</Text>
                                            }

                                        </View>


                                        <View style={styles.phone_code_number_main_wrapper}>
                                            {/*Custom DropDown START*/}

                                            <View style={[styles.phone_code_dropdown_wrapper, {marginRight: 10,}]}>

                                                <Text style={styles.avatar_input_field_name}>Тел. коды</Text>

                                                <View style={{width: 95, borderRadius: 5, }}>

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({
                                                                isOpenCodeDropDown: !this.state.isOpenCodeDropDown
                                                            })
                                                        }}
                                                        style={[
                                                            {
                                                                height: 50,
                                                                width: 95,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                borderRadius: 6,
                                                                flexDirection: 'row',
                                                                backgroundColor: '#ffffff',
                                                                borderWidth: 1,
                                                                borderColor: '#333333',
                                                            },
                                                            // {borderWidth:1,borderColor: this.state.error_phone_code ? '#A4223C' : this.state.valid_phone_code ? '#337363' :  '#d9d9d9'  },

                                                        ]}
                                                    >
                                                        <Text style={{
                                                            fontSize: 15,
                                                            color: "#848484",
                                                            fontWeight: 'bold',
                                                            justifyContent: 'center',
                                                            alignSelf: 'center',
                                                            marginRight: 5,
                                                        }}>
                                                            {this.state.selectedPhoneCode}
                                                        </Text>


                                                        {this.state.isOpenCodeDropDown &&

                                                        <View style={{transform: [{rotate: '180deg'}],}}>
                                                            <Svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={12}
                                                                height={11}
                                                                viewBox="0 0 8 4"
                                                                fill="none"
                                                            >
                                                                <Path d="M7 1L4 3 1 1" stroke="#333"
                                                                      strokeLinecap="round"/>
                                                            </Svg>
                                                        </View>


                                                        }


                                                        {!this.state.isOpenCodeDropDown &&
                                                        <View>
                                                            <Svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={12}
                                                                height={11}
                                                                viewBox="0 0 8 4"
                                                                fill="none"
                                                            >
                                                                <Path d="M7 1L4 3 1 1" stroke="#333"
                                                                      strokeLinecap="round"/>
                                                            </Svg>
                                                        </View>


                                                        }


                                                    </TouchableOpacity>


                                                </View>

                                                {this.state.isOpenCodeDropDown &&

                                                <ScrollView nestedScrollEnabled={true} style={{
                                                    width: '100%',
                                                    height: 100,
                                                    position: 'absolute',
                                                    top: 70,
                                                    left: 0,
                                                    backgroundColor: '#ffffff',
                                                    borderLeftWidth: 1,
                                                    borderLeftColor: '#333333',
                                                    borderRightWidth: 1,
                                                    borderRightColor: '#333333',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#333333',
                                                    borderBottomLeftRadius: 5,
                                                    borderBottomRightRadius: 5,
                                                    paddingLeft: 15
                                                }}>


                                                    {this.state.phoneCodesArray.map((code, index) => (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => {

                                                                this.setState({
                                                                    selectedPhoneCode: code.value,
                                                                    isOpenCodeDropDown: false,
                                                                    error_phone_code: false,
                                                                    valid_phone_code: true,
                                                                })
                                                            }}
                                                            style={{
                                                                padding: 5,
                                                                // borderBottomColor: 'silver',
                                                                // borderBottomWidth: 1

                                                            }}
                                                        >
                                                            <Text style={{
                                                                fontSize: 15,
                                                                color: "#848484",
                                                                fontWeight: 'bold',
                                                            }}>
                                                                {code.value}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}

                                                </ScrollView>

                                                }


                                            </View>

                                            {/*Custom DropDown END*/}


                                            <View style={[styles.avatar_input_field_edit_btn_input_title_box, {flex: 1}]}>

                                                <Text style={styles.avatar_input_field_name}>Номер телефона</Text>
                                                <View style={styles.avatar_input_field_edit_btn_box}>
                                                    <TextInput
                                                        style={styles.avatar_input_field}
                                                        onChangeText={(val) => this.setState({editPhone: val})}
                                                        value={this.state.editPhone}
                                                        placeholder="+7 909 999 99 99"
                                                        keyboardType='numeric'
                                                        editable={this.state.phone_input_disabled}
                                                    />
                                                    {this.state.phone_input_disabled
                                                        ?


                                                        <TouchableOpacity
                                                            style={styles.save_btn}
                                                            onPress={() => {
                                                                this.editPhoneFunction()
                                                            }}>
                                                            {/*<Svg*/}
                                                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                                            {/*    width={22}*/}
                                                            {/*    height={22}*/}
                                                            {/*    viewBox="0 0 22 22"*/}
                                                            {/*    fill="none"*/}
                                                            {/*>*/}
                                                            {/*    <Path*/}
                                                            {/*        d="M2 13.23L7 19 19 4"*/}
                                                            {/*        stroke="green"*/}
                                                            {/*        strokeWidth={2}*/}
                                                            {/*        strokeLinecap="round"*/}
                                                            {/*        strokeLinejoin="round"*/}
                                                            {/*    />*/}
                                                            {/*</Svg>*/}

                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                color: 'green'
                                                            }}>Сохранить</Text>
                                                        </TouchableOpacity>

                                                        :


                                                        <TouchableOpacity onPress={() => {
                                                            this.makeAbleToWritePhone()
                                                        }}>
                                                            <Svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={22}
                                                                height={22}
                                                                viewBox="0 0 22 22"
                                                                fill="none"
                                                            >
                                                                <Path
                                                                    d="M17.875 11a.687.687 0 111.375 0v7.563a.687.687 0 01-.688.687H3.438a.687.687 0 01-.687-.688V3.438a.688.688 0 01.688-.687H11a.687.687 0 010 1.375H4.125v13.75h13.75V11z"
                                                                    fill="#D0251D"
                                                                />
                                                                <Path
                                                                    d="M10.097 11.908l1.134-.163L18.2 4.778a.688.688 0 10-.973-.972l-6.97 6.967-.162 1.135h.002zm9.075-9.076a2.061 2.061 0 010 2.918l-7.13 7.13a.688.688 0 01-.389.195l-2.269.324a.688.688 0 01-.778-.778l.325-2.269a.687.687 0 01.193-.389l7.131-7.13a2.063 2.063 0 012.917 0z"
                                                                    fill="#D0251D"
                                                                />
                                                            </Svg>
                                                        </TouchableOpacity>
                                                    }


                                                </View>

                                                {this.state.editPhone_error &&
                                                <Text style={styles.error_text}>{this.state.editPhone_error_text}</Text>
                                                }

                                            </View>

                                        </View>


                                        <View style={styles.avatar_input_field_edit_btn_input_title_box}>
                                            <Text style={styles.avatar_input_field_name}>Эл. Почта</Text>
                                            <View style={styles.avatar_input_field_edit_btn_box}>
                                                <TextInput
                                                    style={styles.avatar_input_field}
                                                    onChangeText={(val) => this.setState({editEmail: val})}
                                                    value={this.state.editEmail}
                                                    placeholder="UserBandrate@mailcom"
                                                    editable={this.state.email_input_disabled}

                                                />
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({showEditEmailModal: true, showSettingsModal: false})
                                                }}>
                                                    <Svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={22}
                                                        height={22}
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                    >
                                                        <Path
                                                            d="M17.875 11a.687.687 0 111.375 0v7.563a.687.687 0 01-.688.687H3.438a.687.687 0 01-.687-.688V3.438a.688.688 0 01.688-.687H11a.687.687 0 010 1.375H4.125v13.75h13.75V11z"
                                                            fill="#D0251D"
                                                        />
                                                        <Path
                                                            d="M10.097 11.908l1.134-.163L18.2 4.778a.688.688 0 10-.973-.972l-6.97 6.967-.162 1.135h.002zm9.075-9.076a2.061 2.061 0 010 2.918l-7.13 7.13a.688.688 0 01-.389.195l-2.269.324a.688.688 0 01-.778-.778l.325-2.269a.687.687 0 01.193-.389l7.131-7.13a2.063 2.063 0 012.917 0z"
                                                            fill="#D0251D"
                                                        />
                                                    </Svg>
                                                </TouchableOpacity>
                                            </View>


                                        </View>
                                        <View style={styles.avatar_input_field_edit_btn_input_title_box}>
                                            <Text style={styles.avatar_input_field_name}>Пароль</Text>
                                            <View style={styles.avatar_input_field_edit_btn_box}>
                                                <TextInput
                                                    style={styles.avatar_input_field}
                                                    onChangeText={(val) => this.setState({editPassword: val})}
                                                    value={this.state.editPassword}
                                                    placeholder="• • • • • • •"
                                                    secureTextEntry={true}
                                                    editable={this.state.password_input_disabled}

                                                />
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        showEditPasswordModal: true,
                                                        showSettingsModal: false
                                                    })
                                                }}>
                                                    <Svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={22}
                                                        height={22}
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                    >
                                                        <Path
                                                            d="M17.875 11a.687.687 0 111.375 0v7.563a.687.687 0 01-.688.687H3.438a.687.687 0 01-.687-.688V3.438a.688.688 0 01.688-.687H11a.687.687 0 010 1.375H4.125v13.75h13.75V11z"
                                                            fill="#D0251D"
                                                        />
                                                        <Path
                                                            d="M10.097 11.908l1.134-.163L18.2 4.778a.688.688 0 10-.973-.972l-6.97 6.967-.162 1.135h.002zm9.075-9.076a2.061 2.061 0 010 2.918l-7.13 7.13a.688.688 0 01-.389.195l-2.269.324a.688.688 0 01-.778-.778l.325-2.269a.687.687 0 01.193-.389l7.131-7.13a2.063 2.063 0 012.917 0z"
                                                            fill="#D0251D"
                                                        />
                                                    </Svg>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <TouchableOpacity style={[{marginBottom: 0}]} onPress={() => {
                                            this.openRemoveAccountPopup()
                                        }}>

                                            <Text style={[styles.log_out_button_text, {color:'red', textAlign:'center'}]}>Удалить аккаунт</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.log_out_button} onPress={() => {
                                            this.logOut()
                                        }}>
                                            <View style={styles.log_out_button_icon}>
                                                <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <G clipPath="url(#clip0_24_792)">
                                                        <Path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4 1.333a1.333 1.333 0 00-1.333 1.334v14.666A1.333 1.333 0 004 18.667h10a.667.667 0 100-1.334H4V2.667h10a.667.667 0 000-1.334H4zm12.805 5.195a.668.668 0 00-.944.944l1.863 1.861H8.667a.667.667 0 100 1.334h9.057l-1.863 1.861a.668.668 0 00.944.944l3-3a.666.666 0 000-.944l-3-3z"
                                                            fill="#D0251D"
                                                        />
                                                    </G>
                                                    <Defs>
                                                        <ClipPath id="clip0_24_792">
                                                            <Path fill="#fff" d="M0 0H20V20H0z"/>
                                                        </ClipPath>
                                                    </Defs>
                                                </Svg>
                                            </View>
                                            <Text style={styles.log_out_button_text}>Выйти из аккаунта</Text>
                                        </TouchableOpacity>



                                    </View>
                                </KeyboardAwareScrollView>


                            </View>


                        </View>

                    </View>




                </BlurView>
            )
        }



        // showEditPasswordModal
        if (this.state.showEditPasswordModal) {
            return (
                <BlurView intensity={50} tint="dark" style={[styles.blurContainer,{width: '100%', height: windowHeight + 40 ,position:'absolute', top: 0, left: 0,}]}>
                    <View style={styles.edit_password_modal_wrapper}>
                        <View style={styles.edit_password_modal_title_btn_wrapper}>
                            <Text  style={styles.edit_password_modal_title}>Изменение пароля</Text>
                            <TouchableOpacity style={styles.edit_password_modal_close_btn} onPress={()=>{this.setState({showEditPasswordModal: false})}}>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={21}
                                    height={21}
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
                        <View style={styles.edit_password_modal_inputs_main_wrapper}>
                            <View style={styles.edit_password_modal_input_wrapper}>
                                <Text style={styles.edit_password_modal_input_title}>Старый пароль</Text>
                                <TextInput
                                    style={styles.edit_password_modal_input_field}
                                    onChangeText={(val) => this.setState({oldPassword: val})}
                                    value={this.state.oldPassword}
                                    secureTextEntry={true}

                                />
                                {this.state.oldPassword_error &&

                                <Text style={styles.error_text}>
                                    {this.state.oldPassword_error_text}
                                </Text>

                                }
                            </View>
                            <View style={styles.edit_password_modal_input_wrapper}>
                                <Text style={styles.edit_password_modal_input_title}>Новый пароль</Text>
                                <TextInput
                                    style={styles.edit_password_modal_input_field}
                                    onChangeText={(val) => this.setState({newPassword: val})}
                                    value={this.state.newPassword}
                                    secureTextEntry={true}

                                />
                                {this.state.newPassword_error &&

                                <Text style={styles.error_text}>
                                    {this.state.newPassword_error_text}
                                </Text>

                                }
                            </View>
                        </View>

                        <TouchableOpacity style={styles.edit_password_modal_change_button} onPress={() => {this.editPasswordSave()}}>
                            <Text style={styles.edit_password_modal_change_button_text}>Изменить</Text>
                        </TouchableOpacity>

                    </View>
                </BlurView>
            )
        }

        // showEditEmailModal
      if (this.state.showEditEmailModal)  {

          return (
              <BlurView intensity={50} tint="dark" style={[styles.blurContainer,{width: '100%', height: windowHeight + 40 ,position:'absolute', top: 0, left: 0,}]}>
                  <View style={styles.edit_email_modal_wrapper}>
                      <View style={styles.edit_email_modal_title_btn_wrapper}>
                          <Text  style={styles.edit_email_modal_title}>Изменение
                              адреса Эл. почты</Text>
                          <TouchableOpacity style={styles.edit_email_modal_close_btn} onPress={()=>{this.setState({showEditEmailModal: false})}}>
                              <Svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={21}
                                  height={21}
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
                      <Text style={styles.edit_email_modal_title2}>Укажите ваш новый адрес эл. почты</Text>
                      <View style={styles.edit_email_modal_input_wrapper}>
                          <Text style={styles.edit_email_modal_input_title}>Электронная почта</Text>
                          <TextInput
                              style={styles.edit_email_modal_input_field}
                              onChangeText={(val) => this.setState({changeEmail: val})}
                              value={this.state.changeEmail}


                          />

                          {this.state.changeEmail_error &&

                          <Text style={styles.error_text}>{this.state.changeEmail_error_text}</Text>

                          }
                      </View>


                      <TouchableOpacity style={styles.edit_email_modal_send_code_button} onPress={()=>{this.sendCode()}}>
                          <Text style={styles.edit_email_modal_send_code_button_text}>Отправить код</Text>
                      </TouchableOpacity>

                  </View>
              </BlurView>
          )

        }


      // showConfirmEmailCodeModal
        if (this.state.showConfirmEmailCodeModal ) {

            return (
                  <BlurView intensity={50} tint="dark" style={[styles.blurContainer,{width: '100%', height: windowHeight + 40 ,position:'absolute', top: 0, left: 0,}]}>
                <View style={styles.confirmation_code_email_modal_wrapper}>
                    <View style={styles.confirmation_code_email_modal_title_btn_wrapper}>
                        <Text  style={styles.confirmation_code_email_modal_title}>
                            Подтверждение
                            новой эл. почты
                        </Text>
                        <TouchableOpacity style={styles.confirmation_code_email_modal_close_btn} onPress={()=>{this.setState({showConfirmEmailCodeModal: false})}}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={21}
                                height={21}
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
                    <Text style={styles.confirmation_code_email_modal_title2}>Мы отправили 6-х значный код на вашу эл.
                        почту для подтверждения.</Text>
                    <View style={styles.confirmation_code_email_modal_input_wrapper}>

                        {this.state.codes_fields_error &&
                        <Text style={[styles.error_text, {marginTop: 0, marginBottom: 10, paddingLeft: 18}]}>
                            {this.state.codes_fields_error_text}
                        </Text>
                        }

                        <View style={styles.recovery_account_code_inputs_wrapper}>
                            <TextInput
                                ref='firstInput'
                                style={[styles.code_input_field,  {borderWidth: 1, borderColor:this.state.code1_field_error ? "#A4223C" : this.state.code1_field_valid ? "#337363" : "#d9d9d9"} ]}
                                onChangeText={(value) => {this.changeFirstCodeInput(value)}}
                                value={this.state.code1}
                                placeholderTextColor="#000000"
                                keyboardType="numeric"

                            />
                            <TextInput
                                ref='secondInput'
                                style={[styles.code_input_field,  {borderWidth: 1, borderColor:this.state.code2_field_error ? "#A4223C" : this.state.code2_field_valid ? "#337363" : "#d9d9d9"} ]}
                                onChangeText={(value) => {this.changeSecondCodeInput(value)}}

                                value={this.state.code2}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref='thirdInput'
                                style={[styles.code_input_field,  {borderWidth: 1, borderColor:this.state.code3_field_error ? "#A4223C" : this.state.code3_field_valid ? "#337363" : "#d9d9d9"} ]}
                                onChangeText={(value) => {this.changeThirdCodeInput(value)}}
                                value={this.state.code3}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref='fourthInput'
                                style={[styles.code_input_field,  {borderWidth: 1, borderColor:this.state.code4_field_error ? "#A4223C" : this.state.code4_field_valid ? "#337363" : "#d9d9d9"} ]}
                                onChangeText={(value) => {this.changeFourthCodeInput(value)}}
                                value={this.state.code4}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref='fifthInput'
                                style={[styles.code_input_field,  {borderWidth: 1, borderColor:this.state.code4_field_error ? "#A4223C" : this.state.code4_field_valid ? "#337363" : "#d9d9d9"} ]}
                                onChangeText={(value) => {this.changeFifthCodeInput(value)}}
                                value={this.state.code5}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref='sixthInput'
                                style={[styles.code_input_field,  {borderWidth: 1, borderColor:this.state.code4_field_error ? "#A4223C" : this.state.code4_field_valid ? "#337363" : "#d9d9d9"} ]}
                                onChangeText={(value) => {this.changeSixthCodeInput(value)}}
                                value={this.state.code6}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.send_code_again_btn_wrapper}>
                            <TouchableOpacity style={styles.send_code_again_btn}>
                                <Text style={styles.send_code_again_btn_text}>Отправить код повторно</Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                    <TouchableOpacity style={styles.confirm_code_email_modal_send_code_button} onPress={() => {this.confirmEmailCode()}}>
                        <Text style={styles.confirm_code_email_modal_send_code_button_text}>Подтвердить</Text>
                    </TouchableOpacity>

                </View>
            </BlurView>
            )
        }


        if (this.state.showEditPasswordSuccesModal) {

            return (
                <View style={styles.cash_payment_modal}>
                    <View style={styles.cash_payment_modal_wrapper}>
                        <TouchableOpacity  style={styles.online_payment_modal_close_button} onPress={()=>{this.setState({showEditPasswordSuccesModal: false})}}>
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
                            Пароль успешно
                            изменен!
                        </Text>

                    </View>
                </View>
            )

        }



        if (this.state.showEditEmailSuccessModal ) {

            return (
                 <View style={styles.cash_payment_modal}>
                <View style={styles.cash_payment_modal_wrapper}>
                    <TouchableOpacity  style={styles.online_payment_modal_close_button} onPress={()=>{this.setState({showEditEmailSuccessModal: false})}}>
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
                        E-mail успешно
                        изменен!
                    </Text>

                </View>
            </View>
            )

        }


        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />
                    <View style={styles.personal_area_header}>
                        <TouchableOpacity style={styles.personal_area_back_btn} onPress={() => {this.redirectToCatalog()}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                <Path d="M20.169 27.708a1.458 1.458 0 01-1.138-.54l-7.043-8.75a1.458 1.458 0 010-1.851l7.291-8.75a1.46 1.46 0 112.246 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.137 2.391z" fill="#000"/>
                            </Svg>
                        </TouchableOpacity>


                        <View style={styles.personal_area_info_wrapper}>
                            <Text style={styles.personal_area_user_name}>{this.state.user_info.name}</Text>
                            <Text style={styles.personal_area_user_phone_number}>{this.state.user_info.phoneCode} {this.state.user_info.phone}</Text>
                            <View style={styles.personal_area_img_wrapper}>
                                <Image style={styles.personal_area_img} source={this.state.user_image ? {uri: this.state.user_image} : require('../../assets/images/avatar_img.png')}/>

                            </View>
                            <Text style={styles.personal_area_user_email}>{this.state.user_info.email}</Text>

                        </View>
                        <TouchableOpacity style={styles.personal_area_settings_button}  onPress={() => this.setState({showSettingsModal: true})}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                <Path d="M28.605 18.958c.064-.483.098-.97.102-1.458a12.056 12.056 0 00-.102-1.458l3.157-2.472a.729.729 0 00.183-.955l-2.99-5.185a.73.73 0 00-.911-.32L24.318 8.61a11.434 11.434 0 00-2.523-1.458l-.562-3.96a.73.73 0 00-.729-.626H14.51a.729.729 0 00-.729.627l-.561 3.96c-.901.373-1.75.864-2.523 1.457L6.957 7.11a.73.73 0 00-.912.321l-2.99 5.185a.729.729 0 00.182.955l3.15 2.472c-.063.483-.097.97-.102 1.458.005.488.039.975.102 1.458l-3.15 2.472a.729.729 0 00-.182.955l2.99 5.185a.729.729 0 00.911.32l3.726-1.502a11.43 11.43 0 002.523 1.459l.562 3.96a.728.728 0 00.729.626h5.979a.729.729 0 00.73-.627l.56-3.96a11.2 11.2 0 002.523-1.457l3.727 1.502a.729.729 0 00.911-.321l2.99-5.185a.729.729 0 00-.183-.955l-3.128-2.472zM17.5 22.735a5.236 5.236 0 114.832-3.232 5.226 5.226 0 01-4.832 3.232v0z" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                            </Svg>
                        </TouchableOpacity>

                    </View>
                <ScrollView style={styles.personal_area_main}>
                    <View style={styles.user_balance_info}>
                        <View style={styles.user_balance_info_text_wrapper}>
                            <Text style={styles.user_balance_info_text1}>Ваш Баланс.</Text>

                              <Text style={styles.user_balance_info_text2}> {this.state.user_info.bonus  !== null ? this.state.user_info.bonus : 0} Бонусов</Text>


                        </View>
                        {/*<TouchableOpacity style={styles.user_balance_button}>*/}
                        {/*    <Svg*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*        width={29}*/}
                        {/*        height={28}*/}
                        {/*        viewBox="0 0 29 28"*/}
                        {/*        fill="none"*/}
                        {/*    >*/}
                        {/*        <Path*/}
                        {/*            d="M15 14H1.667M15 27.333V14v13.333zM15 14V.667 14zm0 0h13.333H15z"*/}
                        {/*            stroke="#fff"*/}
                        {/*            strokeWidth={3}*/}
                        {/*            strokeLinecap="round"*/}
                        {/*        />*/}
                        {/*    </Svg>*/}
                        {/*</TouchableOpacity>*/}
                    </View>

                    <View style={styles.personal_area_buttons_main_wrapper}>

                        <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.redirectToThemes()} >
                            <Text style={[styles.personal_area_button_text, {color:this.state.pressed ? "#ffffff" : '#333333'}]}>
                                Скачать темы
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.redirectToAmbassador()} >
                            <Text style={[styles.personal_area_button_text, {color:this.state.pressed ? "#ffffff" : '#333333'}]}>
                                Стать Амбасадором
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed2 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed2 ? 0 : 1}]}   onPress={()=>this.writeReviewForBonus()}>
                            <Text style={[styles.personal_area_button_text, {color:this.state.pressed2 ? "#ffffff" : '#333333'}]}>Написать Отзыв за бонусы</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed3 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed3 ? 0 : 1}]}   onPress={()=>this.openReviewOnlineShopUrlPopup()} >
                            <Text style={[styles.personal_area_button_text, {color:this.state.pressed3 ? "#ffffff" : '#333333'}]}>Сделать обзор</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.redirectToJobs()}>
                            <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}>Работа в Компании</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.personal_area_button, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#ffffff'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.redirectToInstruction()}>
                            <Text style={[styles.personal_area_button_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}> Инструкции </Text>
                        </TouchableOpacity>

                    </View>
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
                        <TouchableOpacity style={styles.footer_page_btn}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={30}
                                height={30}
                                viewBox="0 0 496 496"
                                fill="none"

                            >
                                <Path
                                    d="M248 96c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 0 0 111 0 248s111 248 248 248 248-111 248-248S385 0 248 0zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 331.2 48 291.2 48 248c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"
                                    fill="#D0251D"
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
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",
        paddingTop: 31,
    },

    personal_area_main: {
       flex: 1,
       paddingHorizontal: 20,
       width: '100%',
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

    personal_area_header: {
        paddingHorizontal: 20,
        marginBottom: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    personal_area_user_name: {
        color: '#333333',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    personal_area_user_phone_number: {
        color: '#D0251D',
        fontWeight: "500",
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },

    personal_area_img_wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        width: 110,
        height: 110,
    },
    personal_area_img: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        width: '100%',
        height: '100%',

    },
    personal_area_user_email: {
        color: '#545454',
        fontSize: 15,
        fontWeight: '500',
    },
    user_balance_info: {
        backgroundColor: '#F3F3F3',
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 40,
        width: '100%',

    },
    user_balance_info_text1: {
        color: '#333333',
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 10,
    },
    user_balance_info_text2: {
        color: '#D0251D',
        fontSize: 25,
        fontWeight: '700',
    },
    user_balance_button: {
        backgroundColor: '#E6524B',
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    personal_area_buttons_main_wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    personal_area_button: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginBottom: 20,
        width: 285,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    personal_area_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',

    },
    settings_modal_wrapper: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        height: '100%',
        paddingTop: 100,
        paddingBottom: 40,
        position: 'relative',
        elevation: 9999,
    },



    settings_modal_title_icon_wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    settings_modal_title: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 18,
    },
    settings_modal_close_btn: {
        position: 'absolute',
        right: 12,
        top: -15,
    },
    avatar_name: {
        color: '#333333',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 25,
    },
    avatar_img_edit_btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    avatar_img_wrapper: {
        marginRight: 8,
        width: 70,
        height: 70,

    },
    avatar_img: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        width: "100%",
        height: "100%",
    },
    personal_area_edit_button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    personal_area_edit_button_text: {
        color: '#333333',
        fontWeight: '400',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    personal_area_edit_button_icon: {
        marginRight: 5,
    },
    avatar_img_info_wrapper: {
        marginBottom: 15,
    },
    avatar_input_field_edit_btn_input_title_box: {
        marginBottom: 15,
    },

    avatar_input_field_name: {
        color: '#333333',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 25,
        marginBottom: 3,
    },
    avatar_input_field_edit_btn_box: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50
    },
    avatar_input_field: {
       width: "80%",
        // backgroundColor: 'red',
       paddingVertical: 15,
    },
    log_out_button: {
       borderWidth: 1,
       borderColor: '#000000',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 230,
        marginTop: 25,

    },
    log_out_button_icon: {
        marginRight: 7,
    },
    log_out_button_text: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 25,
    },
    edit_password_modal_wrapper: {
        paddingTop: 40,
        paddingBottom: 76,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 10,
        width: "95%",
        alignSelf: "center",
        marginVertical: 130,
        position: 'relative',
    },

    edit_email_modal_wrapper: {
        paddingTop: 40,
        paddingBottom: 76,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 10,
        width: "95%",
        alignSelf: "center",
        marginVertical: 130,
        position: 'relative',
    },
    edit_password_modal_change_button: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        width: 265,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    edit_email_modal_send_code_button: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        width: 265,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    edit_password_modal_change_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    edit_email_modal_send_code_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    edit_password_modal_title_btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    edit_password_modal_title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10,
    },
    edit_password_modal_close_btn: {
        position: 'absolute',
        right: 8,
        top: -12,
    },


    edit_email_modal_title_btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    edit_email_modal_title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 15,
    },
    edit_email_modal_title2: {
        fontSize: 14,
        fontWeight: '400',
        color: '#545454',
        marginBottom: 40,
    },
    edit_email_modal_close_btn: {
        position: 'absolute',
        right: 8,
        top: -12,
    },

    edit_password_modal_input_title: {
        fontWeight: '500',
        fontSize: 15,
        color: '#000000',
        lineHeight: 24,
        marginBottom: 3,
    },
    edit_email_modal_input_title: {
        fontWeight: '500',
        fontSize: 15,
        color: '#000000',
        lineHeight: 24,
        marginBottom: 3,
    },

    edit_password_modal_input_field: {
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 6,
        height: 50,
        fontWeight: '400',
        fontSize: 14,
        color: '#000000',
        paddingHorizontal: 15,
    },
    edit_email_modal_input_field: {
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 6,
        height: 50,
        fontWeight: '400',
        fontSize: 14,
        color: '#000000',
        paddingHorizontal: 15,
    },
    edit_password_modal_input_wrapper: {
        marginBottom: 17,
    },
    edit_password_modal_inputs_main_wrapper: {
        marginBottom: 45,
    },
    edit_email_modal_input_wrapper: {
        marginBottom: 65,
    },



    code_input_field: {
        width: 45,
        height: 60,
        backgroundColor: '#DFDFDF',
        fontSize:15,
        color:'#000000',
        borderRadius:8,
        paddingHorizontal:14,
        borderColor: "#DFDFDF",
        borderWidth: 1,
        fontWeight: "bold",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

    },

    confirmation_code_email_modal_wrapper: {
        paddingTop: 40,
        paddingBottom: 76,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 10,
        width: "95%",
        alignSelf: "center",
        marginVertical: 130,
        position: 'relative',
    },

    confirmation_code_email_modal_title_btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },

    confirmation_code_email_modal_title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 15,
    },
    confirmation_code_email_modal_title2: {
        fontSize: 14,
        fontWeight: '400',
        color: '#545454',
        marginBottom: 40,
    },
    confirmation_code_email_modal_close_btn: {
        position: 'absolute',
        right: 8,
        top: -12,
    },

    recovery_account_code_inputs_wrapper: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 10,
    },
    send_code_again_btn: {
        alignSelf: "center",
    },
    send_code_again_btn_text: {
        color: "#D0251D",
        fontSize: 14,
        fontWeight: '500',
    },
    send_code_again_btn_wrapper: {
        marginBottom: 28,
    },
    confirm_code_email_modal_send_code_button: {
        backgroundColor: '#D0251D',
        borderRadius: 8,
        width: 265,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    confirm_code_email_modal_send_code_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    error_text: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        marginTop: 5,
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
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        paddingTop: 37,
        paddingBottom: 240,
        paddingHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',

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

    phone_code_number_main_wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: "relative",
        zIndex: 9,
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
        backgroundColor: '#ffffff',
        width: '100%',
        height: "100%",
        paddingTop: 30,
        // paddingBottom: 240,
        // paddingHorizontal: 25,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

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
    high_rating_back_btn: {
        // marginBottom: 25,
        position: 'absolute',
        left: 26,
        top: 32,
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

    choosing_marketplace_page_main: {
        flex: 1,
        width: "100%",

    },

    reviewOnlineShopUrlPopup: {
        // backgroundColor:  'rgba(255, 255, 255, 0.25)',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 999,
        zIndex: 999999,
        height: windowHeight+40,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    reviewOnlineShopUrlPopup_wrapper: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        paddingTop: 30,
        paddingBottom: 240,
        paddingHorizontal: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewOnlineShopUrlPopup_header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        position: 'relative',
    },
    reviewOnlineShopUrlPopup_back_btn: {
        position: 'absolute',
        left: -40,
        top: 0,
    },

    ambassador_link_main_title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 91,
        marginTop: 50
    },
    ambassador_link_main_wrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 26,
    },
    ambassador_link_main_input: {
        marginBottom: 40,
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
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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

    makeReviewPopup_main_wrapper: {
        width: "100%",
        flex: 1,
        paddingBottom: 220,
        paddingHorizontal: 26,
    },
    ambassador_social_link: {
        width: 285,
        height: 50,
        marginBottom: 20,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: '#ffffff'

    },
    ambassador_social_link_text: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 18,
    },

    ambassador_second_title_red: {
        color: '#D0251D',
        fontWeight: 'bold',
        paddingLeft: 10,
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
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        paddingTop: 30,
        paddingBottom: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },


    makeReviewInputPopup_header: {
        paddingHorizontal: 26,
    },

    makeReviewInputPopup_back_btn: {
        position: 'absolute',
        left: 0,
        top: 0,

    },
    makeReviewInputPopup_link_main_title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 91,
        paddingTop: 50,
    },

    settings_modal_child_wrapper: {
        flex: 1,
        width: "100%",

    },
    save_btn: {
        position: "absolute",
        right: 7,

    }

});
