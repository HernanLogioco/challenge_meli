import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import './ItemDetail.scss';
import * as utilsMoney from '../utilities';
import Loader from "../Loader/Loader";

export default function ItemDetail() {
    let params = useParams();
    const id = params.id;

    const [itemInfo, setItemInfo] = useState({});
    const [errorMsg, showErrorMsg] = useState({error: false, text: ''});

    useEffect(() => {
        fetch(`http://localhost:8080/api/items/${id}`)
            .then(response => response.json())
            .then(response => {
                if(response.error){
                    let text;
                    switch(response.status){
                        case 404: text = 'El producto ingresado no existe'; break;
                        case 500: text = 'No se encontro el producto'; break;
                        default: text = 'Ups! Algo salió mal :( => Intenta mas tarde'; break;
                    }
                    showErrorMsg({error: true, text: text});
                } else {
                    setItemInfo(response.item);
                }
            })
            .catch(error => {
                console.error(error);
                showErrorMsg({error: true, text: 'Ups! Algo salió mal :( => Intenta más tarde'});
            });;
    }, [id]);

    return  itemInfo.id ? <div className={'itemDetail-container'}>
        <div className={'itemDetail-row'}>
            <div className={'itemDetail-img-container'}>
                <img src={itemInfo.picture} alt={itemInfo.title}/>
            </div>
            <div className={'itemDetail-info'}>
                <p className={'itemDetail-conditionSold'}>
                    {`${itemInfo.condition === 'new' ? 'Nuevo' : 'Usado'} - ${itemInfo.sold_quantity} vendidos`}
                </p>
                <h5 className={'itemDetail-title'}>{itemInfo.title}</h5>
                <h3 className={'itemDetail-price'}>
                    {utilsMoney.formatPrice(itemInfo.price)}
                    {itemInfo.price.decimals ?
                        <span className={'item-price-decimals'}>{itemInfo.price.decimals}</span> : null}
                </h3>
                <button className={'itemDetail-buy'}>Comprar</button>
            </div>
        </div>
        <div className={'itemDetail-description'}>
            <p className={'itemDetail-description-title'}>Descripción del producto</p>
            <p className={'itemDetail-description-text'}>{itemInfo.description}</p>
        </div>
    </div> : <Loader />
};