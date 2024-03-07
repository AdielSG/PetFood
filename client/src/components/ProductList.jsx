import ProductCard from "./ProductCard"

function ProductList({products}){
    return(
        <div className="grid grid-cols-11 gap-4">
            {
            products.map(product => (
                <ProductCard product={product}
                key={product.id}
                />
            ))
        }
        </div>
    )
}

export default ProductList