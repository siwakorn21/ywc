import ShopList from './components/ShopList/ShopList';
import SideBar from './components/SideBar/SideBar';
import './App.scss';
import { Component } from 'react';
import store from './store';
import { connect } from 'react-redux';
import Navbar from './components/Navbar/Navbar';


class App extends Component {
    constructor(props) {
        super();
        this.state = {
            data: require('./data/api.json'),
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <Navbar data={this.state.data} />


                <p className="search-result">ผลการค้นหาทั้งหมด {store.getState().sidebarState.currentCategory} {store.getState().sidebarState.currentSubcategory}</p>
                <div className="sidebar-shoplist-container">
                    <div className="sidebar-container">
                        <SideBar data={this.state.data} />
                    </div>
                    <div className="shop-list-container">
                        <ShopList merchants={this.state.data.merchants}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sidebarState: state.sidebarState
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);