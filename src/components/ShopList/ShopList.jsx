import React, { Component } from 'react';
import Shop from '../Shop/Shop';
import './ShopList.scss';
import uuid from 'react-uuid'

class ShopList extends Component {

    constructor(props) {
        super(props);
    }
        
    renderShop() {
        var merchants = this.props.merchants;
        var rows = [];
        merchants.forEach(element => {
            rows.push(
                <Shop merchantDetail={element} key={uuid()}/>
            );
        });
        return rows;
    }

    render() {
        return (
            <div className="shop-list">
                {this.renderShop()}
                <div className="more-shop">
                    <button className="more-shop-btn">
                        <p>ดูเพิ่มเติม</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default ShopList;