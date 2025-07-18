import CategoryItem from "../components/CategoryItem"

const categories=[
  {
    href:"/jeans",name:"jeans",imageUrl:"/assets/jeans.avif"
  },
  {
    href:"/tshirts",name:"tshirt",imageUrl:"/assets/tshirt.avif"
  },
  {
    href:"/sunglass",name:"Sunglass",imageUrl:"/assets/sunglass.avif"
  },
  {
    href:"/shoes",name:"Shoes",imageUrl:"/assets/shoes.avif"
  },
  {
    href:"/coat",name:"Coat",imageUrl:"/assets/coat.avif"
  },
  {
    href:"/watch",name:"Watch",imageUrl:"/assets/watch.avif"
  },
   {
    href:"/pullover",name:"Pullover",imageUrl:"/assets/pullover.avif"
  },
  {
    href:"/moisturizer",name:"moisturizer",imageUrl:"/assets/moisturizer.avif"
  },
 
]

const Home = () => {
  return (
    <div className="relative min-h-screen text-black overflow-hidden bg-gray-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl text-center text-blue-800 font-bold sm:text-4xl mb-4">Explore our categories</h1>
        <p className="text-center text-2xl text-gray-600 mb-12">Discover the latest trends in eco-friendly fashion</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map(category=>( <CategoryItem category={category} key={category.name}/>))}
        
        </div>
      </div>
   
    </div>
  )
}

export default Home
