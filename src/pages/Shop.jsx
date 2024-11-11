// Base Imports
import ProductList from '../components/ProductList'
import Seo from '../components/Seo'

// Shop Page Component
const Shop = () => {

  // Page Header Component
  const PageHeader = ({ title, image_url }) => {
    return (
      <div className='page-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image_url})`}}>
        <h1> {title} </h1>
      </div>
    )
  };

  // Master Return
  return (
    <>
      {/* SEO */}
      <Seo title="Shop - Forest & Bird" description="Explore our products and make a purchase."/>

      {/* Shop Page */}
      <div className='shop-page'>
        <PageHeader title="Our Shop" image_url={'/shop-bg.jpg'}/>
        <div className='shop-page-content'>
          <h2> Our Shop </h2>
          {/* Products Container */}
          <div id="productCont">
            <ProductList/>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Shop