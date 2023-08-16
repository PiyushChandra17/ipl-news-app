import React from 'react'
import { View,Image } from 'react-native'

const CircleLogo = ({ children }) => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10, paddingBottom: 20 }}>
            <View style={{ backgroundColor: "#fff", height: 190, width: 190, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                { children ? children : (
                    <Image 
                        source={require("../../assets/ipl_logo_1.jpg")}
                        style={{ width: 200, height: 200, marginVertical: 20, borderRadius: 200 }}
                    />
                )}
            </View>
        </View>
    );
}

export default CircleLogo;