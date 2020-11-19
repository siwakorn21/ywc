import { findByText } from '@testing-library/react';
import React, { Component } from 'react';
import './Shop.scss';

class Shop extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            merchantDetail: this.props.merchantDetail
        }
    }

    componentDidMount() {
        // console.log(this.state.merchantDetail)
    }

    fixHighlightTxt() {
        var fix_txt = (this.state.merchantDetail.highlightText).replace('<strong>', '');
        fix_txt = fix_txt.replace('</strong>', '')
        return fix_txt;
    }

    showIsOpen() {
        var isOpen = this.state.merchantDetail.isOpen;
        switch (isOpen) {
            case 'N/A':
                return;
            case 'Y':
                return 'เปิดอยู่'
            case 'N':
                return 'ปิดแล้ว'
        }
    }

    setClassIsOpen() {
        var isOpen = this.state.merchantDetail.isOpen;
        switch (isOpen) {
            case 'N/A':
                return;
            case 'Y':
                return 'open'
            case 'N':
                return 'close'
        }
    }

    getAddress() {
        return  `${this.state.merchantDetail.addressDistrictName} ${this.state.merchantDetail.addressProvinceName}`;
    }

    getPriceLevel() {
        var priceLevel = this.state.merchantDetail.priceLevel;
        var priceLevelShow = [];
        for (var i = 0; i < priceLevel; i++) {
            priceLevelShow.push(
                <span style={{color: "black"}}>฿</span>
            );
        }

        for (var i = 0; i < 4 - priceLevel; i++) {
            priceLevelShow.push(
                <span>฿</span>
            );
        }

        return priceLevelShow;
    }

    getRecommendItems() {
        var recItems = this.state.merchantDetail.recommendedItems;
        if (recItems.length === 0) return;

        var showItems = '';
        recItems.forEach(element => {
            showItems += element + ' ';
        });
        return <span><b style={{color: "black"}}>เมนูแนะนำ:</b> {showItems}</span>;
    }

    render() {
        return (
            <div className="merchant">
                <div className="merchant-pic">
                    <img src={this.state.merchantDetail.coverImageId} alt=""/>
                </div>
                <div className="merchant-detail">
                    <div className="merchant-detail-grid-1">
                        <div className="name-and-status">
                            <div className="shop-name">
                                <h3>{this.state.merchantDetail.shopNameTH}</h3>
                            </div>
                            <div className={this.setClassIsOpen()}>
                                <p>{this.showIsOpen()}</p>
                            </div>
                        </div>
                        <p>{this.state.merchantDetail.subcategoryName} | {this.getPriceLevel()} | {this.getAddress()}</p>
                    </div>
                    <div className="merchant-detail-grid-2">
                        <p>{this.fixHighlightTxt()}</p>
                        <p>{this.getRecommendItems()}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;