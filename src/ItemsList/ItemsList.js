import React from 'react';

//Import ==> Components
import './ItemsList.scss';
import Item from "./Item/Item";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


export default function ItemsList(props){
    return <div className={"itemsList-container"}>
        <Breadcrumb categories={props.categories}/>
        {props.products.slice(0,4).map((products, id_prod) => <Item key={id_prod} info={products} categories={props.categories}/>)}
    </div>
}