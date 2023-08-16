import React, { useState,useEffect,useContext } from 'react'
import { SafeAreaView,View,ScrollView,TouchableOpacity } from 'react-native'
import Text from "@kaloraat/react-native-text"
import { AuthContext } from '../context/auth'
import { LinkContext } from '../context/link'
import FooterTabs from '../components/nav/FooterTabs'
import axios from 'axios'
import PreviewCard from '../components/links/PreviewCard'
import SubmitButton from '../components/auth/SubmitButton'
import Search from '../components/links/Search'
import { API } from '../config'

const Home = ({ navigation }) => {
    const [state,setState] = useContext(AuthContext)
    const [links,setLinks] = useContext(LinkContext)
    const [page,setPage] = useState(1)
    const [count,setLinksCount] = useState(0)
    const [keyword,setKeyword] = useState('')

    useEffect(() => {
        fetchLinks()
    },[page])

    const fetchLinks = async () => {
        const { data } = await axios.get(`${API}/links/${page}`)
        setLinks([...links, ...data])
    }

    useEffect(() => {
        const linksCount = async () => {
            const { data } = await axios.get(`${API}/links-count`)
            setLinksCount(data)
        }
        linksCount()
    },[])



    const handlePress = async (link) => {
        await axios.put(`${API}/view-count/${link._id}`)
        navigation.navigate("LinkView", { link })
        setLinks(() => {
            const index = links.findIndex((l) => l._id === link._id)
            links[index] = { ...link, views: link.views + 1}
            return [...links]
        })
    }

    const loadMore = () => {
        setPage((page+1))
    }

    const searched = (keyword) => (item) => {
        return item.urlPreview.ogTitle
            .toLowerCase()
            .includes(keyword.toLowerCase())
    }

    return (
        <>
            <Search value={keyword} setValue={setKeyword}/>
            <SafeAreaView style={{ flex: 1 }}>
                <Text title center light style={{ paddingTop: 10, paddingBottom: 10}}>Recent Ipl News</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {links && links.filter(searched(keyword)).map((link) => (
                        
                            <View key={link._id} style={{ alignItems: "center" }}>
                                <PreviewCard { ...link.urlPreview } handlePress={handlePress} link={link} showIcons={true} />
                            </View>
                        
                    ))}

                    {count > links?.length && <SubmitButton title="Load more" handleSubmit={loadMore}/>}
                </ScrollView>
                <FooterTabs />
            </SafeAreaView>
        </>
    );
}

export default Home;