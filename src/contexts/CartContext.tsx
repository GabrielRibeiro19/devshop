import { createContext, ReactNode, useState } from 'react'
import { ProductProps } from '../pages/home'
import toast from 'react-hot-toast'

interface CartProviderProps {
  children: ReactNode
}

interface CartProps {
  id: number
  title: string
  description: string
  price: number
  cover: string
  amount: number
  total: number
}

interface CartContextData {
  cart: CartProps[]
  cartAmount: number
  addItemCart: (newItem: ProductProps) => void
  removeItemCart: (product: CartProps) => void
  total: string
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState('')

  function addItemCart(newItem: ProductProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id)

    if (indexItem !== -1) {
      const cartList = cart

      cartList[indexItem].amount = cartList[indexItem].amount + 1

      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price

      setCart(cartList)
      totalResultCart(cartList)
      return
    }

    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    }

    setCart((products) => [...products, data])
    totalResultCart([...cart, data])
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id)

    if (cart[indexItem]?.amount > 1) {
      const cartList = cart

      cartList[indexItem].amount = cartList[indexItem].amount - 1
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price

      toast.success('Produto removido do carrinho', {
        style: {
          borderRadius: 10,
          background: '#121212',
          color: '#fff',
        },
      })

      setCart(cartList)
      totalResultCart(cartList)
      return
    }

    const removeItem = cart.filter((item) => item.id !== product.id)
    setCart(removeItem)
    totalResultCart(removeItem)
  }

  function totalResultCart(items: CartProps[]) {
    const myCart = items
    const result = myCart.reduce((acc, item) => {
      return acc + item.total
    }, 0)

    const resultFormated = result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    setTotal(resultFormated)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        total,
        addItemCart,
        removeItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
