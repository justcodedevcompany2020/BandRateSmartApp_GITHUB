import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import * as Linking from 'expo-linking';
// const prefix = Linking.createURL('/');

import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer,StackActions,createNavigationContainerRef, LinkingOptions, useLinkTo } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const navigationRef = createNavigationContainerRef()

function navigate_custom(name) {
    if (navigationRef.isReady())
    {
        navigationRef.navigate(name);
    }
}


import {AuthContext} from "./components/AuthContext/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();



import DashboardComponent from './components/auth/dashboard';
import SignInComponent from './components/sign_in/sign_in';
import SignUpComponent from './components/sign_up/sign_up';
import RecoveryAccountEmailComponent from './components/recovery_account_email/recovery_account_email';
import RecoveryAccountCodeComponent from './components/recovery_account_code/recovery_account_code';
import NewPasswordComponent from './components/new_password/new_password';
import CatalogComponent from './components/catalog/catalog';
import CardProductComponent from './components/card_product/card_product';
import FavoritesComponent from './components/favorites/favorites';
import BasketComponent from './components/basket/basket';
import PersonalAreaComponent from './components/personal_area/personal_area';
import AmbassadorComponent from './components/ambassador/ambassador';
import AmbassadorLinkComponent from './components/ambassador_link/ambassador_link';
import JobsComponent from './components/jobs/jobs';
import JobSinglePageComponent from './components/job_single_page/job_single_page';
import RatingProductComponent from './components/rating_product/rating_product';
import HighRatingComponent from './components/high_rating/high_rating';
import LowRatingComponent from './components/low_rating/low_rating';
import NotYetProductComponent from './components/not_yet_product/not_yet_product';
import ChoosingMarketPlaceComponent from './components/choosing_marketplace/choosing_marketplace';
import ProductSearchComponent from './components/product_search/product_search';
import InstructionComponent from './components/InstructionComponent';
import WristWatchCatalogComponent from './components/catalog/WristWatchCatalogComponent';

import CatalogCategory from './components/catalog/catalogCategory';
import CatalogWithoutFilter from './components/catalog/catalogWithoutFilter';

import ThemesCatalogComponent from './components/Themes/ThemesCatalogComponent';
import ThemeSingleComponent from './components/Themes/ThemeSingleComponent';
import CheckUserLoginOrNot from './components/Themes/CheckUserLoginOrNot';
import {openURL} from "expo-linking";


function DashboardScreen({ navigation }) {
  return (
      <DashboardComponent navigation={navigation}  />
  );
}

function SignInScreen({ navigation }) {
    return (
        <SignInComponent navigation={navigation}  />
    );
}

function SignUpScreen({ navigation }) {
    return (
        <SignUpComponent navigation={navigation}  />
    );
}
function RecoveryAccountEmailScreen({ navigation }) {
    return (
        <RecoveryAccountEmailComponent navigation={navigation}  />
    );
}


function RecoveryAccountCodeScreen({route, navigation }) {
    const {params} = route.params;
    return (
        <RecoveryAccountCodeComponent  email={params} navigation={navigation}  />
    );
}

function NewPasswordScreen({route, navigation }) {
    const {params} = route.params;
    return (
        <NewPasswordComponent email={params} navigation={navigation}  />
    );
}

function CatalogScreen({ navigation }) {
    return (
        <CatalogComponent   navigation={navigation}  />
    );
}

function CardProductScreen({ route, navigation }) {
    const {params, params2} = route.params ;

    return (
        <CardProductComponent info={params} prev_page={params2} navigation={navigation}  />
    );
}

function FavoritesScreen({ navigation }) {
    return (
        <FavoritesComponent navigation={navigation}  />
    );
}

function BasketScreen({ navigation }) {
    return (
        <BasketComponent navigation={navigation}  />
    );
}


function PersonalAreaScreen({ navigation }) {
    return (
        <PersonalAreaComponent navigation={navigation}  />
    );
}

function AmbassadorScreen({ route, navigation }) {
    const {params} = route.params
    return (
        <AmbassadorComponent comeFrom={params} navigation={navigation}  />
    );
}

function AmbassadorLinkScreen({route, navigation }) {
    const {params, params2} = route.params
    return (
        <AmbassadorLinkComponent linkType={params} comeFrom={params2} navigation={navigation}  />
    );
}


function JobsScreen({route, navigation }) {
    const {params} = route.params
    return (
        <JobsComponent comeFrom={params} navigation={navigation}  />
    );
}

function CatalogCategoryScreen({ navigation }) {
    // navigation.navigate('ThemesCatalogComponent')
    // return false
    return (
        <CatalogCategory navigation={navigation}  />
    );
}

function CatalogWithoutFilterScreen({ route, navigation }) {
    const {item} = route.params

    // navigation.navigate('ThemesCatalogComponent')
    // return false
    return (
        <CatalogWithoutFilter navigation={navigation} item={item}  />
    );
}


function JobSinglePageScreen({route, navigation }) {
    const {params, params2} = route.params;
    console.log(route, "params2");
    return (
        <JobSinglePageComponent
            info={params}
            comeFrom={params2}
            navigation={navigation}
        />
    );
}



function RatingProductScreen({ navigation }) {
    return (
        <RatingProductComponent navigation={navigation}  />
    );
}


function HighRatingScreen({ navigation }) {
    return (
        <HighRatingComponent navigation={navigation}  />
    );
}

function LowRatingScreen({ navigation }) {
    return (
        <LowRatingComponent navigation={navigation}  />
    );
}

function NotYetProductScreen({ navigation }) {
    return (
        <NotYetProductComponent navigation={navigation}  />
    );
}
function ChoosingMarketPlaceScreen ({ navigation }) {
    return (
        <ChoosingMarketPlaceComponent navigation={navigation}  />
    );
}

function ProductSearchScreen ({ navigation }) {
    return (
        <ProductSearchComponent navigation={navigation}  />
    );
}

function InstructionComponentScreen ({route, navigation }) {


    const {params} = route.params;
    return (
        <InstructionComponent navigation={navigation}  comeFrom={params} />
    );
}


function WristWatchCatalogComponentScreen ({ navigation }) {
    return (
        <WristWatchCatalogComponent navigation={navigation}  />
    );
}

function ThemesCatalogComponentScreen ({ navigation }) {
    return (
        <ThemesCatalogComponent navigation={navigation}  />
    );
}

function ThemeSingleComponentScreen ({ route, navigation })
{
    const {theme} = route.params;
    return (
        <ThemeSingleComponent navigation={navigation} theme={theme}  />
    );
}

function CheckUserLoginOrNotScreen ({ navigation })
{
    return (
        <CheckUserLoginOrNot navigation={navigation} />
    );
}



export default function App() {

     // AsyncStorage.clear()
    const popAction = StackActions.pop(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userEmail: null,
        userToken: null,
        url:null
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userEmail: action.email,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser, callback) => {
            // setIsLoading(true);
            const userToken = String(foundUser.token);
            const userEmail = foundUser.email;
            // setUserToken(userToken);

            //  console.log('AuthUser', foundUser);

            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGIN', email: userEmail, token: userToken});
            callback();
        },
        signOut: async (callback) => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
            callback();
        },
        signUp: () => {
            // setIsLoading(false);
        }
    }), []);

    // Проверка при входе в приложение.
    // const prefix = Linking.createURL('/ThemesCatalogComponent');
    // const linking = {
    //     prefixes: [prefix],
    // };







    //



    //
    // if (Platform.OS === 'android') {
    //     Linking.getInitialURL().then(url => {
    //         console.log(url, 'android url')
    //         navigate(url);
    //     });
    // } else {
    //     Linking.addEventListener('url', handleOpenURL);
    // }

  //   const handleOpenURL = (event) => { // D
  //       navigate(event.url);
  //   }
  //   const navigate = (url) => { // E
  //
  //       console.log(url, 'navigatenavigate')
  //
  //       // const { navigate } = this.props.navigation;
  //       // const route = url.replace(/.*?:\/\//g, '');
  //       // const id = route.match(/\/([^\/]+)\/?$/)[1];
  //       // const routeName = route.split('/')[0];
  //       // console.log(routeName, 'routeName')
  //
  //       url = url.split('//');
  //       const routeName = url.length == 2 ? url[1] : null;
  //
  //       console.log(routeName, 'routeName')
  //
  //       if (routeName == 'records')
  //       {
  //           // navigation.navigate('ThemesCatalogComponent')
  //           // Linking.openURL('ThemesCatalogComponent')
  //           navigate_custom('ThemesCatalogComponent');
  //       };
  //   }
  //

    React.useEffect(() => {
        setTimeout(async () => {
            // await AsyncStorage.removeItem('userToken', userToken);

            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
        }, 1000);
    }, []);

    const linking = {
        prefixes: ['bandratesmart://'],
        config: {
            screens: {
                CatalogCategory:"CatalogCategory",
                ThemesCatalogComponent:"ThemesCatalogComponent",
                CheckUserLoginOrNot:"CheckUserLoginOrNot",
            },
        },
    };


  return (
      // <AuthContext.Provider value={authContext}>
      //     <NavigationContainer
      //         ref={navigationRef}
      //        // linking={url}
      //        // linking={linking}
      //     >
      //
      //
      //         { loginState.userToken !== null &&
      //
      //             <Stack.Navigator
      //                 initialRouteName='CatalogCategory'
      //                 screenOptions={{
      //                     headerShown: false
      //                 }}
      //
      //             >
      //                 <Stack.Screen name="CatalogCategory" component={CatalogCategoryScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //                 <Stack.Screen name="Catalog" component={CatalogScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //                 <Stack.Screen name="CardProduct" component={CardProductScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //                 <Stack.Screen name="Favorites" component={FavoritesScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //                 <Stack.Screen name="Basket" component={BasketScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //
      //                 <Stack.Screen name="PersonalArea" component={PersonalAreaScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="Ambassador" component={AmbassadorScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="AmbassadorLink" component={AmbassadorLinkScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //
      //
      //                 <Stack.Screen name="Jobs" component={JobsScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="JobSinglePage" component={JobSinglePageScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="RatingProduct" component={RatingProductScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="HighRating" component={HighRatingScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="LowRating" component={LowRatingScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="NotYetProduct" component={NotYetProductScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="ChoosingMarketPlace" component={ChoosingMarketPlaceScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //                 <Stack.Screen name="ProductSearch" component={ProductSearchScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //                 <Stack.Screen name="InstructionComponent" component={InstructionComponentScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                 />
      //
      //                   <Stack.Screen name="WristWatchCatalogComponent" component={WristWatchCatalogComponentScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                   />
      //                   <Stack.Screen name="ThemesCatalogComponent" component={ThemesCatalogComponentScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                   />
      //
      //                   <Stack.Screen name="ThemeSingleComponent" component={ThemeSingleComponentScreen}
      //                       options={({route}) => ({
      //                           tabBarButton: () => null,
      //                           tabBarStyle: {display: 'none'},
      //                       })}
      //                   />
      //
      //
      //
      //             </Stack.Navigator>
      //         }
      //
      //
      //
      //         { loginState.userToken === null &&
      //
      //             <Stack.Navigator
      //                 initialRouteName='Dashboard'
      //                 screenOptions={{
      //                     headerShown: false
      //                 }}
      //
      //             >
      //
      //
      //                 <Stack.Screen name="Dashboard" component={DashboardScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="SignIn" component={SignInScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="SignUp" component={SignUpScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="RecoveryAccountEmail" component={RecoveryAccountEmailScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="RecoveryAccountCode" component={RecoveryAccountCodeScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //                 <Stack.Screen name="NewPassword" component={NewPasswordScreen}
      //                               options={({route}) => ({
      //                                   tabBarButton: () => null,
      //                                   tabBarStyle: {display: 'none'},
      //                               })}
      //                 />
      //
      //
      //             </Stack.Navigator>
      //         }
      //     </NavigationContainer>
      // </AuthContext.Provider>
      //

      <AuthContext.Provider value={authContext}>
          <NavigationContainer linking={linking}>

              { loginState.userToken !== null ?

                 (
                     <Stack.Navigator
                      initialRouteName='CatalogCategory'
                      screenOptions={{
                          headerShown: false
                      }}

                  >
                      <Stack.Screen name="CatalogCategory" component={CatalogCategoryScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="Catalog" component={CatalogScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="CardProduct" component={CardProductScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="Favorites" component={FavoritesScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="Basket" component={BasketScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />


                      <Stack.Screen name="PersonalArea" component={PersonalAreaScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="Ambassador" component={AmbassadorScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="AmbassadorLink" component={AmbassadorLinkScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />



                      <Stack.Screen name="Jobs" component={JobsScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="JobSinglePage" component={JobSinglePageScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="RatingProduct" component={RatingProductScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="HighRating" component={HighRatingScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="LowRating" component={LowRatingScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="NotYetProduct" component={NotYetProductScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="ChoosingMarketPlace" component={ChoosingMarketPlaceScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="ProductSearch" component={ProductSearchScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />
                      <Stack.Screen name="InstructionComponent" component={InstructionComponentScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="WristWatchCatalogComponent" component={WristWatchCatalogComponentScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="CatalogWithoutFilter" component={CatalogWithoutFilterScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />
                      <Stack.Screen name="ThemesCatalogComponent" component={ThemesCatalogComponentScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="ThemeSingleComponent" component={ThemeSingleComponentScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="CheckUserLoginOrNot" component={CheckUserLoginOrNotScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />



                  </Stack.Navigator>)

                  :

                  <Stack.Navigator
                      initialRouteName='Dashboard'
                      screenOptions={{
                          headerShown: false
                      }}

                  >

                      <Stack.Screen name="Dashboard" component={DashboardScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="SignIn" component={SignInScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="SignUp" component={SignUpScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="RecoveryAccountEmail" component={RecoveryAccountEmailScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="RecoveryAccountCode" component={RecoveryAccountCodeScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="NewPassword" component={NewPasswordScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="CheckUserLoginOrNot" component={CheckUserLoginOrNotScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />


                    {/*  Общие страницы    */}

                      <Stack.Screen name="CatalogCategory" component={CatalogCategoryScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                      />

                      <Stack.Screen name="ProductSearch" component={ProductSearchScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="Catalog" component={CatalogScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="CardProduct" component={CardProductScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                      <Stack.Screen name="WristWatchCatalogComponent" component={WristWatchCatalogComponentScreen}
                                options={({route}) => ({
                                    tabBarButton: () => null,
                                    tabBarStyle: {display: 'none'},
                                })}
                      />

                      <Stack.Screen name="CatalogWithoutFilter" component={CatalogWithoutFilterScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'},
                                    })}
                      />

                  </Stack.Navigator>
              }

          </NavigationContainer>
      </AuthContext.Provider>

  );


}





// export default function App() {
//     return (
//         <AuthContext.Provider value={authContext}>
//             <NavigationContainer linking={linking}>
//                 { loginState.userToken !== null &&
//
//                     <Stack.Navigator
//                         initialRouteName='CatalogCategory'
//                         screenOptions={{
//                             headerShown: false
//                         }}
//
//                     >
//                         <Stack.Screen name="CatalogCategory" component={CatalogCategoryScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="Catalog" component={CatalogScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="CardProduct" component={CardProductScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="Favorites" component={FavoritesScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="Basket" component={BasketScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//
//                         <Stack.Screen name="PersonalArea" component={PersonalAreaScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="Ambassador" component={AmbassadorScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="AmbassadorLink" component={AmbassadorLinkScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//
//
//                         <Stack.Screen name="Jobs" component={JobsScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="JobSinglePage" component={JobSinglePageScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="RatingProduct" component={RatingProductScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="HighRating" component={HighRatingScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="LowRating" component={LowRatingScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="NotYetProduct" component={NotYetProductScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="ChoosingMarketPlace" component={ChoosingMarketPlaceScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="ProductSearch" component={ProductSearchScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//                         <Stack.Screen name="InstructionComponent" component={InstructionComponentScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="WristWatchCatalogComponent" component={WristWatchCatalogComponentScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//                         <Stack.Screen name="ThemesCatalogComponent" component={ThemesCatalogComponentScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="ThemeSingleComponent" component={ThemeSingleComponentScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//
//
//                     </Stack.Navigator>
//                 }
//
//
//
//                 { loginState.userToken === null &&
//
//                     <Stack.Navigator
//                         initialRouteName='Dashboard'
//                         screenOptions={{
//                             headerShown: false
//                         }}
//
//                     >
//
//
//                         <Stack.Screen name="Dashboard" component={DashboardScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="SignIn" component={SignInScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="SignUp" component={SignUpScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="RecoveryAccountEmail" component={RecoveryAccountEmailScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="RecoveryAccountCode" component={RecoveryAccountCodeScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//                         <Stack.Screen name="NewPassword" component={NewPasswordScreen}
//                                       options={({route}) => ({
//                                           tabBarButton: () => null,
//                                           tabBarStyle: {display: 'none'},
//                                       })}
//                         />
//
//
//                     </Stack.Navigator>
//                 }
//
//             </NavigationContainer>
//         </AuthContext.Provider>
//     );
// }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
