import React, { useState, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import Text from '@kaloraat/react-native-text'
import { WebView } from 'react-native-webview';

const LinkView = ({ route }) => {
    const [weblink,setWebLink] = useState("")

    useEffect(() => {
        if(route.params?.link) {
            if(route.params.link.link.includes("http" || "https")) {
                setWebLink(route.params.link.link)
            } else {
                setWebLink(`http://${route.params.link.link}`)
            }
        }
    },[route.params?.link])

    return (
        <WebView startInLoadingState source={{ uri: weblink }}/>
    );
}

export default LinkView;