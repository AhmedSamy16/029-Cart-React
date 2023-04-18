import { useEffect, useReducer, useContext, createContext } from "react";
import reducer from "./reducer";
import { CLEAR_CART, REMOVE_ITEM, INCREASE_ITEM, DECREASE_ITEM, GET_TOTAL, LOADING, DISPLAY_ITEMS } from "./actions";

const URL = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = createContext(null)
const initialState = {
    loading: false,
    cart: [],
    total: 0,
    amount: 0
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const clearCart = () => {
        dispatch({ type: CLEAR_CART })
    }
    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } })
    }
    const increaseItem = (id) => {
        dispatch({ type: INCREASE_ITEM, payload: { id } })
    }
    const decreaseItem = (id) => {
        dispatch({ type: DECREASE_ITEM, payload: { id } })
    }

    useEffect(() => {
        dispatch({ type: GET_TOTAL })
    }, [state.cart])

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: LOADING })
            const res = await fetch(URL)
            const cart = await res.json()
            dispatch({ type: DISPLAY_ITEMS, payload: { cart } })
        }
        fetchData()
    }, [])
    return (
        <AppContext.Provider 
            value={{ ...state, clearCart, removeItem, increaseItem, decreaseItem }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}