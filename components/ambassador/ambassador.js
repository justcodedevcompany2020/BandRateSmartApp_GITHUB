import React, { Component } from 'react';
import Svg, { Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { SliderBox } from "react-native-image-slider-box";
import { BlurView } from 'expo-blur';
import {StatusBar} from "expo-status-bar";



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
            comeFrom: "",



        };


    }


    componentDidMount() {
        const { navigation } = this.props;



        this.focusListener = navigation.addListener("focus", () => {
            console.log(this.props.comeFrom, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
            this.setState({
                comeFrom: this.props.comeFrom,
            })

        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            // console.log('Bum END')
        }

    }





    redirectToPersonalArea = () => {
        this.props.navigation.navigate("PersonalArea");
    }

    // redirectToAmbassadorLinkPage1 = (linkType) => {
    //     this.setState({ pressed: true, pressed2: false, pressed3: false, pressed4: false});
    //     this.props.navigation.navigate("AmbassadorLink", {
    //         params: linkType
    //     });
    //
    // }
    //
    //
    // redirectToAmbassadorLinkPage2(linkType){
    //
    //     this.setState({ pressed: false, pressed2: true, pressed3: false, pressed4: false});
    //     this.props.navigation.navigate("AmbassadorLink", {
    //         params: linkType
    //     });
    //
    // }
    //
    //
    // redirectToAmbassadorLinkPage3(linkType){
    //     this.setState({ pressed: false, pressed2: false, pressed3: true, pressed4: false});
    //     this.props.navigation.navigate("AmbassadorLink", {
    //         params: linkType
    //     });
    //
    // }


    redirectToAmbassadorLinkPage(linkType){
        // this.setState({ pressed: false, pressed2: false, pressed3: false, pressed4: true});
        this.props.navigation.navigate("AmbassadorLink", {
            params: linkType,
            params2: this.state.comeFrom,
        });

    }
    redirectToBack = () => {
        let {comeFrom} = this.state;
        console.log(comeFrom, "hhhhhhhhhhhhhhhhggggggggggggggggggggggg");
        if (comeFrom == "from_profile") {
            this.props.navigation.navigate("PersonalArea");
        } else if (comeFrom == "from_catalog") {
            this.props.navigation.navigate("Catalog");
        }
    }








    render() {

        return (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" />

                <View style={styles.ambassador_header}>
                    <TouchableOpacity style={styles.ambassador_back_button} onPress={() => this.redirectToBack()}>

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
                <ScrollView style={styles.ambassador_main_wrapper}>

                    <View style={styles.ambassador_titles_wrapper}>
                        <Text style={styles.ambassador_main_title}>
                            Выберите соц. сеть на котором вы хотите разместить информацию
                            о купленном товаре
                        </Text>
                        <Text style={styles.ambassador_second_title}>
                            Получи бонус от
                            <View style={{marginRight: 5}}></View>
                            <Text style={styles.ambassador_second_title_red}>200 рублей</Text>
                        </Text>
                    </View>
                    <View style={styles.ambassador_social_links_wrapper}>
                        <TouchableOpacity  style={[styles.ambassador_social_link, {backgroundColor:this.state.pressed ? "#D0251D" : '#EFEFEF'}, {borderWidth:this.state.pressed ? 0 : 1}]}   onPress={()=>this.redirectToAmbassadorLinkPage("vk")} >
                            <Text style={[styles.ambassador_social_link_text , {color:this.state.pressed ? "#ffffff" : '#333333'}]}>Вконтакте</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ambassador_social_link, {backgroundColor:this.state.pressed2 ? "#D0251D" : '#EFEFEF'}, {borderWidth:this.state.pressed2 ? 0 : 1}]}   onPress={()=>this.redirectToAmbassadorLinkPage("instagram")}>
                            <Text style={[styles.ambassador_social_link_text, {color:this.state.pressed2 ? "#ffffff" : '#333333'}]}>Instagram</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ambassador_social_link, {backgroundColor:this.state.pressed3 ? "#D0251D" : '#EFEFEF'}, {borderWidth:this.state.pressed3 ? 0 : 1}]}   onPress={()=>this.redirectToAmbassadorLinkPage("youtube")}>
                            <Text style={[styles.ambassador_social_link_text , {color:this.state.pressed3 ? "#ffffff" : '#333333'}]}>Youtube</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[styles.ambassador_social_link, {backgroundColor:this.state.pressed4 ? "#D0251D" : '#EFEFEF'}, {borderWidth:this.state.pressed4 ? 0 : 1}]}   onPress={()=>this.redirectToAmbassadorLinkPage("other")}>
                            <Text style={[styles.ambassador_social_link_text, {color:this.state.pressed4 ? "#ffffff" : '#333333'}]}>Другое</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>







            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: '#EFEFEF',
        width: "100%",
        height: "100%",
        paddingTop: 40,
    },

    ambassador_header: {
       paddingHorizontal: 26,
        marginBottom: 33,
    },
    ambassador_main_wrapper: {
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

});