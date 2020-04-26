import {covidAction } from '../constants/actionType'
const initialState = {
    totals: {},
    current: {},
    countrycases: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case covidAction.GET_COVID_TOTAL:
        return { ...state, totals: payload }

    case covidAction.GET_CURRENT:
        return {
            ...state,
            current: payload
        }
    case covidAction.GET_COUNTRY_CASES:
        return {
            ...state,
            countrycases: payload
        }

    case covidAction.UPDATE_COVID:

        const datas = state.current.data


        return {
            ...state,
            current : {
                ...state.current,
                data: datas.map(d => {

                    if(d.location == payload.location){
                        d.pin = payload.pin;
                        return d;
                    }
                    return d;
                })
            }
        }
    default:
        return state
    }
}
