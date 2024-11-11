// Base Imports
import { useEffect, useState, useContext } from "react";
import wooCommerceApi from "../woocommerceApi";
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa6";
import Seo from '../components/Seo'

// ProductList Component
const ProductList = () => {

    // Variables & States
      const [products, setProducts] = useState([]);
      const [selectedProduct, setSelectedProduct] = useState(null);
      const {addToCart} = useContext(CartContext);
      const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
      const [modalMessage, setModalMessage] = useState(""); 

    // UseEffect Function
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await wooCommerceApi.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error Fetching Products', error);
            }
        };

        fetchProducts();
    }, []);

    // Handle Add To Cart Function
    const handleAddToCart = (product) => {
        addToCart(product);
        setModalMessage(`${product.name} has been added to your cart!`); // Set modal message
        setModalVisible(true); // Show modal

        // Auto-hide the modal after 3 seconds
        setTimeout(() => {
            setModalVisible(false);
        }, 3000);
    };

    // Handle Card Click Function
    const handleCardClick = (product) => {
        setSelectedProduct(product);
    };
    
    // Close Modal Function
    const closeModal = () => {
        setSelectedProduct(null);
    };

    // Product Modal Function
    const ProductModal = ({ product, onClose }) => {
      if (!product) return null;
      
      // Master Return
      return (
        <div className="product-modal-overlay">
          <div className="product-modal-content">
            <button className="modal-close" onClick={onClose}>X</button>
              {product.images && product.images.length > 0 && (
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                />  
              )}
              <div className="product-modal-details">
                <h2> {product.name} </h2>
                {/* display the price */}
                <h3> ${(product.prices.price / 100).toFixed(2)} </h3>
                {/* display categories */}
                {product.categories && product.categories.length > 0 && (
                  <h4> {product.categories.map(category => category.name).join(', ')} </h4> 
                )}  
                <button onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleAddToCart(product);
                }}>
                  Add to Cart
                </button>     
              </div>
            </div>
          </div>
        );
    };

    // Master Return
    return (
      <>
        {/* SEO */}
        <Seo title="Shop - Forest and Bird" description="Explore the shop" />

        {/* Products Grid */}
        <div>
          <ul className="products-grid">
            {products.map((product) => (
              <li key={product.id} className="product-card"  onClick={() => handleCardClick(product)}>

                {/* display the image */}
                {product.images && product.images.length > 0 && (
                    <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                    />  
                )}

                  <div className="product-details">
                      <h2> {product.name} </h2>
                      {/* display the price */}
                      <h3> ${(product.prices.price / 100).toFixed(2)} </h3>
                      {/* display categories */}
                      {product.categories && product.categories.length > 0 && (
                          <h4> {product.categories.map(category => category.name).join(', ')} </h4> 
                      )}  
                  <button onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleAddToCart(product);
                  }}>
                      Add to Cart
                  </button>                        
                </div>
              </li>
          ))}
      </ul>

             {/* Confirmation Modal */}
             {modalVisible && (
                <div className="add-modal">
                    <FaCheck  className="modal-cart-icon"/>
                    <h2>{modalMessage}</h2>
                </div>
            )}

            {/* Render ProductModal if a product is selected */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} className="product-modal"/>
      )}
        </div>
      </>
       
    );
};

export default ProductList;