import { useNavigate, useParams } from 'react-router-dom'
import { ProductProps } from '../home'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/CartContext'
import toast from 'react-hot-toast'

export function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductProps>()
  const { addItemCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
    }

    getProduct()
  }, [id])

  function handleAddItem(product: ProductProps) {
    toast.success('Produto adicionado ao carrinho', {
      style: {
        borderRadius: 10,
        background: '#121212',
        color: '#fff',
      },
    })
    addItemCart(product)
    navigate('/cart')
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        {product && (
          <section className="w-full">
            <div className="flex flex-col lg:flex-row">
              <img
                src={product?.cover}
                alt={product?.title}
                className="flex-1 w-full max-h-72 object-contain"
              />
              <div className="flex-1 text-center lg:text-left">
                <p className="font-bold text-2xl mt-4 mb-2">{product?.title}</p>
                <p className="my-4">{product?.description}</p>
                <strong className="text-zinc-700/90 text-xl">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>
                <button
                  className="bg-zinc-900 p-1 rounded ml-3 cursor-pointer"
                  onClick={() => handleAddItem(product)}
                >
                  <BsCartPlus size={20} color="#fff" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
