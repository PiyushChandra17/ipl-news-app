import React, { useState,useContext } from 'react'
import { View,ScrollView } from 'react-native' 
import Text from "@kaloraat/react-native-text"
import UserInput from '../components/auth/UserInput'
import SubmitButton from '../components/auth/SubmitButton'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'
import { API } from '../config'

const Signup = ({ navigation }) => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)

    const [state,setState] = useContext(AuthContext)

    const handleSubmit = async () => {

        setLoading(true)
        if (!name || !email || !password) {
            alert("All fields are required")
            setLoading(false)
            return
        }

        console.log("SIGNUP REQUEST => ", name,email,password)

        try {
            const { data } = await axios.post(`${API}/signup`, {
                name,
                email,
                password
            })
            
            if(data.error) {
                alert(data.error)
            } else {
                setState(data)
                await AsyncStorage.setItem("@auth", JSON.stringify(data))
                setLoading(false)
                console.log("SIGN IN SUCCESS => ",data)
                alert("Sign up successful")

                //redirect
                navigation.navigate("Home")
            }
            
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
            <View style={{ marginVertical: 100 }}>
                <CircleLogo />
                <Text title center>Sign Up</Text>

                <UserInput name="NAME" value={name} setValue={setName} autoCapitalize="words" autoCorrect={false} keyboardType='default'/>
                <UserInput name="EMAIL" value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address"/>
                <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" keyboardType='default'/>

                <SubmitButton title="Sign Up" handleSubmit={handleSubmit} loading={loading}/>  

                <Text small center>
                    Already Joined? <Text color="#ff2222" onPress={() => navigation.navigate("Signin")}>Sign In</Text>
                </Text>  
            </View>          

        </KeyboardAwareScrollView>
    );
}

export default Signup;