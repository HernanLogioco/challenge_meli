import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import * as utilsMoney from '../utilities';

//Import ==> Components
import './ItemDetail.scss';
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

export default function ItemDetail() {
    let params = useParams();
    const id = params.id;

    const [productDescription, setProductDescription] = useState({});
    const [msgError, setErrorMsg] = useState({error: false, text: ''});

    useEffect(() => {
        fetch(`http://localhost:8080/api/items/${id}`)
            .then(response => response.json())
            .then(response => {
                if(response.error){
                    let text;
                    switch(response.status){
                        case 404: text = 'El producto ingresado no existe'; break;
                        case 500: text = 'No se encontro el producto'; break;
                        default: text = 'Ups! :( Algo salió mal. Intenta nuevamente mas tarde'; break;
                    }
                    setErrorMsg({error: true, text: text});
                } else {
                    setProductDescription(response.item);
                }
            })
            .catch(error => {
                console.error(error);
                setErrorMsg({error: true, text: 'Ups! Algo salió mal :( => Intenta más tarde'});
            });
    }, [id]);

    return  msgError.error ? <Message error={msgError.error} message={msgError.text} /> : productDescription.id ? <div className={'itemDetail-container'}>
        <div className={'itemDetail-row'}>
            <div className={'itemDetail-img-container'}>
                <img src={productDescription.picture} alt={productDescription.title}/>
            </div>
            <div className={'itemDetail-info'}>
                <p className={'itemDetail-conditionSold'}>
                    {`${productDescription.condition === 'new' ? 'Nuevo' : 'Usado'} - ${productDescription.sold_quantity} vendidos`}
                </p>
                <h5 className={'itemDetail-title'}>{productDescription.title}</h5>
                <h3 className={'itemDetail-price'}>
                    {utilsMoney.formatPrice(productDescription.price)}
                    {productDescription.price.decimals ?
                        <span className={'item-price-decimals'}>{productDescription.price.decimals}</span> : null}
                </h3>
                <button className={'itemDetail-buy'}>Comprar</button>
            </div>
        </div>
        <div className={'itemDetail-description'}>
            <p className={'itemDetail-description-title'}>Descripción del producto</p>
            <p className={'itemDetail-description-text'}>{productDescription.description}</p>
        </div>
    </div> : <Loader />
};