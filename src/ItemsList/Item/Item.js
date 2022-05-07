import React from 'react';
import {Link} from 'react-router-dom';
import './Item.scss';
import * as utilsMoney from '../../utilities';

export default function Item({info, categories}) {


    return <div className={'item-container'}>
        <div className={'item-info'} id={info.id}>
            <Link to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
                <img src={info.picture} alt={info.title} />
            </Link>
            <div className={'item-general-info'}>
                <p className={'itemPrice'}>{utilsMoney.formatPrice(info.price)}{info.price.decimals ? <span className={'itemPrice-decimals'}>{info.price.decimals}</span> : null}</p>
                {info.free_shipping ? <i className={'itemPrice-free-shipping'} /> : null}
                <Link className={'item-title'} to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
                    <p>{info.title}</p>
                </Link>
            </div>
            <div className={'item-location'}>
                <p>{info.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
            </div>
        </div>

    </div>;
}