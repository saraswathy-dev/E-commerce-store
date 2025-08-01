import React from 'react'
import toast from 'react-hot-toast'
import { ShoppingCart } from 'lucide-react'
import { useUserStore } from '../stores/useUserStore';

const ProductCard = ({product}) => {
    const {user}=useUserStore();

    const handleAddCart=()=>{
        if(!user){
            toast.error("Please login to add items to cart",{id:"login"});
            return;
        }
        
        toast.success("Product added to cart")
    }
  return (
    <div className='flex  w-full realtive flex-col overflow-hidden rounded-lg  border border-gray-200  shadow-md hover:shadow-lg transition-shadow duration-300'>
        <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
            <img className='object-cover w-full'    src={product.image} alt='product image'></img>
            <div className='absolute inset-0 '></div>
        </div>
        <div className='mt-4 px-5 pb-5'>
            <h2 className='text-lg font-semibold text-gray-800 '>{product.name}</h2>
            
            <div className='mt-4 flex items-center justify-between'>
                <span className='text-xl font-bold text-blue-600 dark:text-blue-400'>${product.price}</span>
                <button 
                    onClick={() => handleAddCart()}
                    className='flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'>
                    <ShoppingCart className='mr-2 h-5 w-5' />
                    Add to Cart
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ProductCard
