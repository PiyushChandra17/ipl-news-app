import React, { useState,useEffect,useContext } from 'react'
import { View,ScrollView,Image, TouchableOpacity,Button,StyleSheet } from 'react-native' 
import Text from "@kaloraat/react-native-text"
import UserInput from '../components/auth/UserInput'
import SubmitButton from '../components/auth/SubmitButton'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { API } from '../config'

const Account = ({ navigation }) => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("")
    const [loading,setLoading] = useState(false)
    const [uploadImage,setUploadImage] = useState("")
    const [image,setImage] = useState({
        url: "",
        public_id: ""
    })

    //context
    const [state,setState] = useContext(AuthContext)

    useEffect(() => {
        if (state) {
            const { name, email, image, role } = state.user
            setName(name)
            setEmail(email)
            setRole(role)
        }
    },[state])

    const handleSubmit = async () => {
        setLoading(true)
        // api call
        try {
            const { data } = await axios.put(`${API}/update-password`, { password } , {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            if (data.error) {
                alert(data.error)
                setLoading(false)
            } else {
                alert("Password updated")
                setPassword("")
                setLoading(false)
            }
        } catch (err) {
            alert("Password update failed. Try again")
            console.log(err)
            setLoading(false)
        }
    }

    const handleUpload = async () => {
        console.log("Image Upload")
    }

    const onLogout = async () => {
        setState({
            token: "",
            user: null
        })

        await AsyncStorage.removeItem("@auth")
        navigation.navigate("Signin")
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
            <View style={{ marginVertical: 100 }}>
                <CircleLogo>
                    {image && image.url ? (
                        <Image 
                            source={{ uri: image.url }}
                            style={{ width: 190, height: 190, marginVertical: 20, borderRadius: 100 }}
                        />
                    ) : (
                        <TouchableOpacity onPress={() => handleUpload()}>
                            <FontAwesome5 name="camera" size={25} color="orange"/>
                        </TouchableOpacity>
                    )}
                </CircleLogo>

                {image && image.url ? (
                    <TouchableOpacity onPress={() => handleUpload()}>
                        <FontAwesome5 name="camera" size={25} color="orange" style={{marginTop: -5, marginBottom: 10, alignSelf: "center"}}/>
                    </TouchableOpacity>

                ) : <></>}

                <Text title center style={{ paddingBottom: 10}}>{name}</Text>
                <Text medium center style={{ paddingBottom: 10}}>{email}</Text>
                <Text small center light style={{ paddingBottom: 50}}>{role}</Text>

                <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" keyboardType='default'/>

                <SubmitButton title="Update Password" handleSubmit={handleSubmit} loading={loading}/>  
                <SubmitButton title="Logout" handleSubmit={onLogout} />  
            </View>
        </KeyboardAwareScrollView>
    );
}


export default Account;