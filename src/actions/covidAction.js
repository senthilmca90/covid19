import Axios from "axios"
import { covidAction } from "../constants/actionType"

export const getCovidTotal = () => dispatch => {
    console.log(`actions`)
    return Axios.get(`https://covid2019-api.herokuapp.com/v2/total`).then(res => {
        console.log(res.data)
        dispatch({type: covidAction.GET_COVID_TOTAL, payload: res.data})
    })
}

export const getCurrent = () => dispatch => {
    return Axios.get(`https://covid2019-api.herokuapp.com/v2/current`).then(res => {
        dispatch({type: covidAction.GET_CURRENT, payload: res.data})
    })
}

export const getCountryCases = (name) => dispatch => {
    return Axios.get(`https://covid2019-api.herokuapp.com/v2/country/${name}`).then(res => {
        dispatch({type: covidAction.GET_COUNTRY_CASES, payload: res.data})
    })
}

export const updateCovid = (data) => dispatch => {
    dispatch({type: covidAction.UPDATE_COVID, payload: data})
}
