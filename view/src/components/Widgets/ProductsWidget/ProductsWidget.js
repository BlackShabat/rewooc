import './ProductsWidget.css';
import React from 'react';
import Carousel from '../../UI/Carousel/Carousel';
import ProductCard from '../../Shop/Product/ProductCard/ProductCard';

const ProductsWidget = (props) => {

    let result = null;

    if (props.widgetLayout === 'carousel') {
        result = (
            <Carousel>
                {props.data.products.map(product => (
                    <ProductCard
                        {...product}
                        key={product.id}
                        onAddToCart={props.onAddToCart}
                    />
                ))}
            </Carousel>
        );
    } else {
        result = (
            <div className="rw-products-widget">
                {props.data.products.map(product => (
                    <div className="rw-products-widget__item" key={product.id}>
                        <ProductCard
                            {...product}
                            onAddToCart={props.onAddToCart}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return result;
};

export default ProductsWidget;