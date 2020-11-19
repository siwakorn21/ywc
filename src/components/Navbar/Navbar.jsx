import React, { Component } from 'react';
import './Navbar.scss';
import image1 from '../../asset/images/halfhalf.png';
import image1mb from '../../asset/images/halfhalfmb.png';
import SearchBox from '../SearchBox/SearchBox';
import mobileMenuPic from '../../asset/images/mobileMenu.png';

const breakpoint = 1024;

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {
        // console.log(this.state.width)
    }

    updateDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div className="navbar">
                <div className="search-bar-and-logo">
                    <div className="logo-container">
                        <img src={this.state.width > breakpoint ? image1 : image1mb} alt=""/>
                    </div>
                    <div className="search-box-container">
                        <SearchBox data={this.props.data} />
                    </div>
                    <div className="mobile-menu">
                        <button className="mobile-menu-btn"><img src={mobileMenuPic} alt=""/></button>
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