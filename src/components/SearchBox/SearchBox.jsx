import React, { Component } from 'react';
import './SearchBox.scss';
import { connect } from 'react-redux';
import Action from '../actions';
import icon from '../../asset/icons/placeholder2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const breakpoint = 1024;

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            searchValue: '',
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

    handleChangeProvince(event) {
        this.props.updateCurrentProvince(event.target.value);
    }

    listprovince() {
        // console.log(this.props.sidebarState)
        var rows = [];
        const provinces = this.state.data.provinces;
        provinces.forEach(element => {
            rows.push(
                <option value={element}>{element}</option>
            );
        })

        return (
            <select value={(this.props.sidebarState).currentProvince} onChange={(e) => this.handleChangeProvince(e)} >
                <option value='พื้นที่ใกล้ฉัน'>พื้นที่ใกล้ฉัน</option>
                {rows}
            </select>
        );
    }

    handleChangeText(event) {
        this.setState({searchValue: event.target.value});
    } 


    render() {
        return (
            <div className="search-box">
                <div className="area-near-me">
                    {this.listprovince()}
                    <img src={icon} alt=""/>
                </div>
                <div className="text-search">
                    {/* <textarea name="search-area" id="" placeholder="ค้นหาชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านุค้า OTOP และสินค้าทั่วไป"></textarea> */}
                    <form>
                        {/* <label for="gsearch">ค้นหาชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านุค้า OTOP และสินค้าทั่วไป</label> */}
                        <div className="shop-search-container">
                            <input type="search" id="shop-search" name="shop-search" 
                            placeholder={this.state.width > 1024 ? "ค้นหาชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านุค้า OTOP และสินค้าทั่วไป" : "ค้นหาชื่อ ร้านอาหาร และเครื่องดื่ม ..."} />
                        </div>

                        {/* <input type="submit" id="shop-submit"/> */}
                        <button type="submit" id="shop-submit"><FontAwesomeIcon icon={faSearch} fontWeight="100"/></button>
                        

                    </form>
                </div>
                {/* <div className="submit-search-box">
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sidebarState: state.sidebarState
});

const mapDispatchToProps = dispatch => ({
    updateCurrentProvince: (payload) => dispatch({type: Action.UPDATE_CURRENT_PROVINCE, payload: payload}),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);