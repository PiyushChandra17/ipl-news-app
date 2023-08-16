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

const ForgotPassword = ({ navigation }) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [visible,setVisible] = useState(false)
    const [resetCode,setResetCode] = useState("")

    //context
    const [state,setState] = useContext(AuthContext)

    const handleSubmit = async () => {
        setLoading(true)
        if (!email) {
            alert("Email is required")
            setLoading(false)
            return 
        }

        try {
            const { data } = await axios.post(`${API}/forgot-password`, { 
                email
            })
            if (data.error) {
                alert(data.error)
                setLoading(false)
            } else {
                setLoading(false)
                setVisible(true)
                console.log("RESET PASSWORD CODE => ",data)
                alert("Enter the password reset code we sent in your email")
            }
        } catch (err) {
            alert("Error sending email. Try again.")
            console.log(err)
        }
    }

    const handleResetPassword = async () => {
        // console.log("RESET PASSWORD => ", email,password,resetCode)
        try {
            const { data } = await axios.post(`${API}/reset-password`, {
                email,
                password,
                resetCode
            })
            console.log("RESET PASSWORD => ",data)
            if (data.error) {
                alert(data.error)
                setLoading(false)

            } else {
                alert("Now you can login with your new password")
                navigation.navigate("Signin")
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
            alert("Password reset failed. Try again")
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
            <View style={{ marginVertical: 100 }}>
                <View style={{ marginTop: -100 }}>
                    <CircleLogo />
                </View>
                <Text title center style={{ marginBottom: 50 }}>Forgot Password</Text>

                <UserInput name="EMAIL" value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address"/>
                {visible && (
                    <>
                         <UserInput name="NEW PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" keyboardType='default'/>
                         <UserInput name="PASSWORD RESET CODE" value={resetCode} setValue={setResetCode} secureTextEntry={true} autoCompleteType="password" keyboardType='default'/>
                    </>
                )}

                <SubmitButton title={visible ? "Reset Password" : "Request Reset Code"} handleSubmit={visible ? handleResetPassword : handleSubmit} loading={loading}/>  

                <Text small center color="orange" style={{ marginTop: 10 }} onPress={() => navigation.navigate("Signin")}>Sign in</Text>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ForgotPassword;