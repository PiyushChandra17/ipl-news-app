import React, { useState,useContext } from 'react'
import { SafeAreaView, ScrollView, TextInput,View  } from 'react-native';
import FooterTabs from '../components/nav/FooterTabs';
import Text from '@kaloraat/react-native-text'
import SubmitButton from '../components/auth/SubmitButton';
import ogs from '@uehreka/open-graph-scraper-react-native'
import urlRegex from 'url-regex'
import PreviewCard from '../components/links/PreviewCard';
import axios from 'axios'
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';
import { API } from '../config';

const PostLink = ({ navigation }) => {
    const [link,setLink] = useState("")
    const [title,setTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const [urlPreview,setUrlPreview] = useState({})

    const [state,setState] = useContext(AuthContext)
    const [links,setLinks] = useContext(LinkContext)

    const handleChange = async (text) => {

        try {
            setLoading(true)
            setLink(text)

            if (urlRegex({ strict: false }).test(text)) {
                ogs({ url: text }, (error,results,response) => {
                    console.log(results)
                    if(results.success) {
                        setUrlPreview(results)
                    }
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    
    const handleSubmit = async () => {
        // console.log("title and link and urlPreview => ", title,link,urlPreview)
        if (!link || !title) {
            alert("Please paste url and give a title")
            return
        }
        try {
            const { data } = await axios.post(`${API}/post-link`, { link,title,urlPreview }, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })

            console.log(data)

            setLinks([data, ...links])
            setTimeout(() => {
                alert("Links posted")
                navigation.navigate("Home", {
                    reloadScreen: true
                })
            },500)
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text light center style={{ paddingTop: 30 }}>Paste your favourite IPL team URL</Text>

                <TextInput 
                    value={link} 
                    onChangeText={(text) => handleChange(text)}
                    placeholder='Please paste the url'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={{
                        borderWidth: 1,
                        borderColor: "grey",
                        height: 50,
                        marginVertical: 30,
                        marginHorizontal: 10,
                        borderRadius: 30,
                        padding: 15
                    }}
                />
                <TextInput 
                    value={title} 
                    onChangeText={(text) => setTitle(text)}
                    placeholder='Please provide a title'
                    autoCapitalize='sentences'
                    style={{
                        borderWidth: 1,
                        borderColor: "grey",
                        height: 50,
                        marginVertical: 10,
                        marginHorizontal: 15,
                        borderRadius: 30,
                        padding: 10
                    }}
                />

                {urlPreview.success && (
                    <View style={{
                        marginTop: 30,
                        alignItems: 'center'
                    }}>
                        <PreviewCard { ...urlPreview }/>
                    </View>
                )}

                <View style={{ paddingTop: 25 }}>
                    <SubmitButton 
                        title="Submit"
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </View>
                {/* <Text>{JSON.stringify(urlPreview, null, 4)}</Text> */}

            </ScrollView>
            <FooterTabs />
        </SafeAreaView>
    );
}

export default PostLink;