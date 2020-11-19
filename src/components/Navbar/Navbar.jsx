import React, { Component } from 'react';
import './Navbar.scss';
import image from '../../asset/images/logo-KLK.png';
import image1 from '../../asset/images/halfhalf.png';
import SearchBox from '../SearchBox/SearchBox';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <div className="search-bar-and-logo">
                    <div className="logo-container">
                        <img src={image1} alt=""/>
                    </div>
                    <div className="search-box-container">
                        <SearchBox data={this.props.data} />
                    </div>
                </div>
                <div className="page-navigation">
                    <div className="page-navigation-container">
                        <a href="#">หน้าแรก</a>
                        <span>/</span>
                        <a href="#">ค้นหา</a>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Navbar;