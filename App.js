import React, { Component } from 'react';
 
import { StyleSheet, TextInput, View, Alert,Image, Button, Text, TouchableOpacity, Modal, WebView } from 'react-native';
 
// Importing Stack Navigator library to add multiple activities.
import { createStackNavigator,createAppContainer,SafeAreaView } from 'react-navigation';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
 
var SampleArray=[" "];
//export sum = {sum : -10};
 var sum=-10;
// Creating Login Activity.
class LoginActivity extends Component {
 
  // Setting up Login Activity title.
  /*static navigationOptions =
   {
      title: 'LoginActivity',
   };*/
 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: ''
 
    }
 
  }
 
UserLoginFunction = () =>{
 
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;
 
 
fetch(' Your Web URL/User_Login.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    email: UserEmail,
 
    password: UserPassword
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
 
        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {//alert("Success");
 
            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Second', { Email: "Welcome !" });
 
        }
        else{
 
          alert(responseJson);
        }
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }

 
  render() {
    return (
       
 
<View style={styles.MainContainer}>
 <Image source={{uri:'https://www.123freevectors.com/wp-content/original/131374-abstract-grey-and-white-polygon-background-graphic-design-image.jpg'}} style={styles.backgroundImage} />

        <Text style= {styles.TextComponentStyle}>User Login</Text>
  
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
 
          onChangeText={UserEmail => this.setState({UserEmail})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
        />
 
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
 
          onChangeText={UserPassword => this.setState({UserPassword})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
 
          secureTextEntry={true}
        />
 
        <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
      
  
  
</View>
 
            
    );
  }
}
 
/// Creating Profile activity.
class ProfileActivity extends Component
{
 
  // Setting up profile activity title.
   static navigationOptions =
   {
      title: 'ProfileActivity',
    
   };
    
   render()
   {
 
     const {goBack} = this.props.navigation;
 
      return(
         <View style = { styles.MainContainer }>
             <Image source={{uri:'https://www.123freevectors.com/wp-content/original/131374-abstract-grey-and-white-polygon-background-graphic-design-image.jpg'}} style={styles.backgroundImage} />

            <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.Email } </Text>
           
            <Button style={styles.button} title="Click to Scan !" onPress={ () => this.props.navigation.navigate('Fourth') } />
            <Button style={styles.button} title="Click here to Logout" onPress={ () => goBack(null) } />
 
         </View>
      );
   }
}
class BarcodeScanner extends React.Component {
  static navigationOptions =
   {
      title: 'BarcodeScanner',
   };
  state = {
    hasCameraPermission: null,
    scanned: false,
    Holder: '',
  };

    // AddItemsToArray=()=>{
 
    //   //Adding Items To Array.
    //   SampleArray.push( this.state.Holder.toString() );
    // }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
 
  render() {
    const { hasCameraPermission, scanned } = this.state;
    const {goBack} = this.props.navigation;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} > </Button>
         

        )}
        <Button title={'Done'} onPress={() => this.props.navigation.navigate('Fifth')} > </Button>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
   // this.setState({ scanned: true });
    
    if( data  === "1234567"){
     var data2= 'Parle - Rs 40';
       this.setState({scanned: true ,Holder: data2}); 
        SampleArray.push( this.state.Holder.toString() );
       sum+=40;
        alert("Item Added !");
    }
     else if( data  === "000000"){
     var data2= 'MilkyBar - Rs 20';
       this.setState({scanned: true ,Holder: data2}); 
        SampleArray.push( this.state.Holder.toString() );
       sum+=20;
        alert("Item Added !");
    }
     else if( data  === "987654"){
     var data2= 'Clinic Plus - Rs 10';
       this.setState({scanned: true ,Holder: data2}); 
        SampleArray.push( this.state.Holder.toString() );
        sum+=10;
        alert("Item Added !");
    }
     else if( data  === "111111"){
     var data2= 'Hamam Soap - Rs 35';
       this.setState({scanned: true ,Holder: data2}); 
        SampleArray.push( this.state.Holder.toString() );
         sum+=35;
        alert("Item Added !");
    }
else {
  alert("Invalid Code !");
}
    
  /// this.props.navigation.navigate('Second', { Email: `Scanned Item : ${data}` });
  };
}
///
class Checkout extends Component
{
 
  // Setting up profile activity title.
   static navigationOptions =
   {
      title: 'Checkout',
    
   };
    SampleFunction=(item)=>{
 
    alert(item);
 
  }
 
   render()
   {
 
     const {goBack} = this.props.navigation;
 
      return(
         <View style = { styles.MainContainer }>
             <Image source={{uri:'https://www.123freevectors.com/wp-content/original/131374-abstract-grey-and-white-polygon-background-graphic-design-image.jpg'}} style={styles.backgroundImage} />

           <Text style = {styles.TextComponentStyle}> { SampleArray.map((item, key)=>(
         <Text key={key} style={styles.TextStyle} onPress={ this.SampleFunction.bind(this, item) }> { item  } {"\n"}</Text> 
         )
         )} {`Total Payable Amount = ${sum}`}</Text>
            
            <Button style={styles.button} title="Click to Pay !" onPress={ () => this.props.navigation.navigate('Third') } />
          
 
         </View>
      );
   }
}///
 class Paypal extends Component {
  static navigationOptions =
   {
      title: 'Paypal',
   };

    state = {

        showModal: false,

        status: "Pending"

    };

    handleResponse = data => {

        if (data.title === "success") {

            this.setState({ showModal: false, status: "Complete" });

        } else if (data.title === "cancel") {

            this.setState({ showModal: false, status: "Cancelled" });

        } else {

            return;

        }

    };

    render() {
      const {goBack} = this.props.navigation;
 

        return (

            <View style={ styles.MainContainer }>

                <Modal

                    visible={this.state.showModal}

                    onRequestClose={() => this.setState({ showModal: false })}

                >

                    <WebView

                        source={{ uri: "http://192.168.43.22:3000" }}

                        onNavigationStateChange={data =>

                            this.handleResponse(data)

                        }

                        injectedJavaScript={`document.f1.submit()`}

                    />

                </Modal>

                <TouchableOpacity

                    style={{ width: 300, height: 100 }}

                    onPress={() => this.setState({ showModal: true })}

                >

                    <Text>Pay with Paypal</Text> 

                </TouchableOpacity>

                <Text>Payment Status: {this.state.status}</Text>

                 <Button style={styles.button} title="Click here to Logout" onPress={ () => goBack(null) } />

            </View>

        );

    }

}



const MainProject = createStackNavigator(
{
   First: { screen: LoginActivity ,navigationOptions: {
      header: null,
    } },
   
   Second: { screen: ProfileActivity },

   Third : { screen: Paypal },
   Fourth:{screen:BarcodeScanner ,navigationOptions: {
      header: null,
    }},
   Fifth :{screen : Checkout }
 
});
 export default createAppContainer(MainProject);
 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,


},
 
TextInputStyleClass: {
 
textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',
 
 // Set border Radius.
 borderRadius: 5 ,
 
},
 
 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 },
 button: {

    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 3,
    alignItems: 'center'
 },
    backgroundImage: {
     backgroundColor: '#ccc',

          flex: 1,

          resizeMode:'cover',

          position: 'absolute',

          width: '100%',

          height: '100%',

          justifyContent: 'center', // or 'stretch'
  }
});
