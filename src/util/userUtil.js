import jwt from 'jsonwebtoken'
import axios from 'axios'
export const isLoggenIn = () => {
    if (decodeToken()) {
        return true
    } else {
        return false
    }
}

export const getToken = () => {
    // return decodeToken()
    return localStorage.getItem('beauty-app-token')
}

// export const decodeToken = ()=>{
//     const token = localStorage.getItem('beauty-app-token')
//     let decodedToken
//     try {
//         if (token){
//             decodedToken = jwt.decode(token)
//         }
//     } catch (error) {
//         console.log(error)
//     }
//     return decodeToken
// }

const decodeToken = () => {
    const token = localStorage.getItem('beauty-app-token')
    let decodedToken;
    try {
        if (token) {
            decodedToken = jwt.decode(token)
        }
    } catch (e) {
        console.log(e.message)
    }
    return decodedToken
}