import { CLEAR_CART, DECREASE_ITEM, DISPLAY_ITEMS, GET_TOTAL, INCREASE_ITEM, LOADING, REMOVE_ITEM } from "./actions"

const reducer = (state, action) => {
    switch(action.type) {
        case CLEAR_CART :
            return { ...state, cart: [] }
        case REMOVE_ITEM :
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) }
        case INCREASE_ITEM :
            const res = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, amount: item.amount + 1 }
                }
                return item
            })
            return { ...state, cart: res }
        case DECREASE_ITEM :
            let newRes = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, amount: item.amount - 1 }
                }
                return item
            }).filter(item => item.amount !== 0)
            return { ...state, cart: newRes }
        case GET_TOTAL :
            const { total, amount } = state.cart.reduce((cartTotals, curr) => {
                const { price, amount } = curr
                cartTotals.amount += amount
                cartTotals.total += Math.round(price * amount)
                return cartTotals
            }, { total: 0, amount: 0 })
            return { ...state, total, amount }
        case LOADING :
            return { ...state, loading: true }
        case DISPLAY_ITEMS :
            return { ...state, loading: false, cart: action.payload.cart }
        default :
        return state
    }
}

export default reducer