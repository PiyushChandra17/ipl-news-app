import { Platform } from 'react-native'

export const API = Platform.OS === "android" ? "http://10.200.158.240:8000/api" : "http://localhost:8000/api" 






