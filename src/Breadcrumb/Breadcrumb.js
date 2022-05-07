import React from 'react';
import './Breadcrumb.scss';

export default function Breadcrumb(props){
    return <ul className={'breadcrumb-container'}>
        {props.categories ? props.categories.map((category, id_cat) =>
            <li className={"breadcrumb"} key={id_cat}>{category}
                {id_cat !== (props.categories.length - 1) ? <i/> : null}
            </li>)
            : null}
    </ul>
}