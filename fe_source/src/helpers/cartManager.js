import AsyncStorage from '@react-native-async-storage/async-storage';

class CartManager {
  static async addToCart(product, quantity) {
    try {
      const cartItems = await AsyncStorage.getItem('cart');

      let updatedCart = [];

      if (cartItems) {
        updatedCart = JSON.parse(cartItems);
      }

      const existingItemIndex = updatedCart.findIndex(
        item => item.id === product.id,
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        updatedCart.push({
          id: product.id,
          productName: product.product_name,
          price: product.price,
          categoryName: product.category.category_name,
          image: product.product_image,
          quantity,
        });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

      const cartItemshrhr = await AsyncStorage.getItem('cart');
      console.log(JSON.parse(cartItemshrhr));
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
  }

  static async getCartItems() {
    try {
      const cartItems = await AsyncStorage.getItem('cart');

      if (cartItems) {
        return JSON.parse(cartItems);
      }

      return [];
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng:', error);
      return [];
    }
  }

  static async removeFromCart(productId) {
    try {
      const cartItems = await AsyncStorage.getItem('cart');

      if (cartItems) {
        let updatedCart = JSON.parse(cartItems);
        updatedCart = updatedCart.filter(item => item.id !== productId);

        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log('Sản phẩm đã được xóa khỏi giỏ hàng');
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    }
  }

  static async clearCart() {
    try {
      await AsyncStorage.removeItem('cart');
      console.log('Giỏ hàng đã được xóa');
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng:', error);
    }
  }
}

export default CartManager;
