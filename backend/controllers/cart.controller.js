export const addToCart = async (req, res) => {
  try{
    const { productId} = req.body;
    const userId = req.user;
    const existingItem = user.cartItems.find(item => item.id === productId);
    if (existingItem) {
      // If the item already exists in the cart, increment the quantity
      existingItem.quantity += 1;
    } else {
      // If the item does not exist, add it to the cart
      user.cartItems.push({ id: productId, quantity: 1 });
    }
    await user.save();
    res.status(200).json({ message: "Item added to cart successfully"},user.cartItems);
  }
  catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
}}

export const getCartProducts = async (req, res) => {
  try {
    const products= await products.find({ _id: { $in: req.user.cartItems.map(item => item.id) } });
    const cartItems = products.map(product => {
      const cartItem = req.user.cartItems.find(item => item.id === product._id.toString());
      return { ...product.toJSON(), quantity: cartItem ? cartItem.quantity : 1 };
    });
   res.json(products);
}
  catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}
export const removeAllFromCart = async (req, res) => {
  try{
    const {productId} = req.body;
    const user=req.user;
    if(!productId){
      user.cartItems = [];}
    else{
      user.cartItems = user.cartItems.filter(item => item.id !== productId);
    }
    await user.save();
    res.status(200).json({ message: "Cart cleared successfully" }, user.cartItems);
  }catch (error) {
    console.error("Error removing items from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const updateQuantity = async (req, res) => {
  try{
    const {id: productId} = req.params;
    const {quantity} = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(item => item.id === productId);
    if (existingItem) {
      if (quantity === 0) {
        // If quantity is 0 or less, remove the item from the cart
        user.cartItems = user.cartItems.filter(item => item.id !== productId);
        await user.save();
        res.status(200).json({ message: "Item removed from cart successfully" }, user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json({ message: "Item quantity updated successfully" }, user.cartItems);
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } catch (error) {
      await user.save();
      res.status(200).json({ message: "Cart updated successfully" }, user.cartItems);
    }
  
}
