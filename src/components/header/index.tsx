import { useContext } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'

export function Header() {
  const { cartAmount } = useContext(CartContext)

  return (
    <header className="w-full px-1 bg-slate-200">
      <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
        <Link to="/" className="font-bold text-2xl">
          DevShop
        </Link>
        <Link to="/cart" className="relative">
          <FiShoppingCart size={24} color="#121212" />
          {cartAmount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-medium rounded-full w-5 h-5 flex items-center justify-center">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}
