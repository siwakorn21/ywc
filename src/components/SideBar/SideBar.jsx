import React, { Component } from 'react';
import uuid from 'react-uuid';
import './SideBar.scss';
import { connect } from 'react-redux';
import Action from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import icon from '../../asset/icons/placeholder2.png';

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            // currentCategory: '',
            // currentProvince: '',
            // priceRange: '',
            width: window.innerWidth,
            height: window.innerHeight

        }

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidMount() {
        // console.log(this.state.data)
        var defaultCheck = (this.state.data.categories)[0].name;
        // var defaultSub = ((this.state.data.categories)[0]).subcategories[0];
        // console.log(this.props.sidebarState)
        // console.log(defaultCheck)
        this.props.updateCurrentCategory( defaultCheck )
        this.props.updateCurrentSubcategory( 'ทั้งหมด' )
        // console.log((this.props.sidebarState).currentCategory)
        // console.log(this.props.sidebarState)
        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps.sidebarState)
        // console.log(this.props.sidebarState)
    }

    updateDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getIndexCategory(category) {
        var index = 0;
        const categories = this.state.data.categories;
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].name === category) {
                break;
            }
            index++;
        }
        return index;
    }

    handleChangeCurrentCategory(event) {
        
        this.props.updateCurrentCategory( event.target.value );
        this.props.updateCurrentSubcategory( 'ทั้งหมด' );
    }

    getCategories() {
        var rows = [];
        this.state.data.categories.forEach(element => {
            rows.push(
                <div className="categories-input" key={uuid()}>
                    <input type="radio" id={element.name} name="categories" value={element.name} checked={(this.props.sidebarState).currentCategory === element.name} onChange={(e) => this.handleChangeCurrentCategory(e)} />
                    <label for={element.name}>{element.name}</label><br/>
                </div>
            );
        });

        return rows;
    }

    getSubCategories() {
        // console.log(this.state.data.categories)
        var rows = [];
        const currentCategory = (this.props.sidebarState).currentCategory;
        const index = currentCategory === '' ? 0 : this.getIndexCategory(currentCategory);
            rows.push(
                <div className="sub-categories-input" key={uuid()}>
                        <input type="radio" id='ทั้งหมด' name="subcategories" value='ทั้งหมด' checked={(this.props.sidebarState).currentSubcategory === 'ทั้งหมด'} onChange={(e) => this.handleChangeSubcategory(e)}/>
                        <label for='ทั้งหมด'>ทั้งหมด</label><br/>
                </div>
            );
        const subCategories = (this.state.data.categories)[index].subcategories;
        subCategories.forEach(element => {
            rows.push(
                <div className="sub-categories-input" key={uuid()}>
                    <input type="radio" id={element} name="subcategories" value={element}  checked={(this.props.sidebarState).currentSubcategory === element} onChange={(e) => this.handleChangeSubcategory(e)} />
                    <label for={element}>{element}</label><br/>
                </div>
            )
        });
        return rows;
    }

    handleChangeSubcategory(event) {
        this.props.updateCurrentSubcategory(event.target.value);
    }

    handleChangeProvince(event) {
        this.props.updateCurrentProvince(event.target.value);
    }

    handleChangePriceRange(event) {
        this.props.updateCurrentPriceRange(event.target.value);
    }

    listProvince() {
        var rows = [];
        const provinces = this.state.data.provinces;
        provinces.forEach(element => {
            rows.push(
                <option value={element}>{element}</option>
            );
        })

        return (
            <select value={(this.props.sidebarState).currentProvince} onChange={(e) => this.handleChangeProvince(e)}>
                <option value='พื้นที่ใกล้ฉัน'>พื้นที่ใกล้ฉัน</option>
                {rows}
            </select>
        );
    }

    listPriceRange() {
        var rows = [];
        const priceRange = this.state.data.priceRange;
        priceRange.forEach(element => {
            rows.push(
                <option value={element}>{element}</option>
            );
        })

        return (
            <select value={(this.props.sidebarState).currentPriceRange} onChange={(e) => this.handleChangePriceRange(e)}>
                <option value="กรุณาเลือก">กรุณาเลือก</option>
                {rows}
            </select>
        );
    }

    handleChangeCloseBtn() {
        var x = document.querySelectorAll(".sidebar-container");

        if (x[0].style.width === "100%") {
            x[0].style.left = "0%";
        } else {
            x[0].style.left = "100%"
        }
    }

    render() {
        return (
            <div className="sidebar">
                <div className="shop-categories">
                    <span>ประเภทร้านค้า</span>
                    <form action="">
                        {this.getCategories()}
                    </form>
                </div>
                <div className="province">
                    <span>จังหวัด/ใกล้ฉัน</span>
                    <form action="">
                        {this.listProvince()}
                        <img src={icon} alt=""/>
                    </form>
                </div>
                <div className="price-range">
                    <span>ราคา</span>
                    <form action="">
                        {this.listPriceRange()}
                    </form>
                </div>
                <div className="sub-categories">
                    <span>ประเภท{(this.props.sidebarState).currentCategory}</span>
                    <form action="">
                        {this.getSubCategories()}
                    </form>
                </div>
                <div className="close-btn" onClick={this.handleChangeCloseBtn}>
                    <FontAwesomeIcon icon={faTimes} />
                </div> 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sidebarState: state.sidebarState
});

const mapDispatchToProps = dispatch => ({
    updateCurrentCategory: (payload) => dispatch({type: Action.UPDATE_CURRENT_CATEGORY, payload: payload}),
    updateCurrentSubcategory: (payload) => dispatch({type: Action.UPDATE_CURRENT_SUBCATEGORY, payload: payload}),
    updateCurrentProvince: (payload) => dispatch({type: Action.UPDATE_CURRENT_PROVINCE, payload: payload}),
    updateCurrentPriceRange: (payload) => dispatch({type: Action.UPDATE_CURRENT_PRICE_RANGE, payload: payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);