import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Route } from "react-router-dom";
import "./AdminStyle.css";

import ProductsTree from './ProductsTreeView';
import Add_Category from './Add_Category';
import Edit_Category from './Edit_Category';

import Edit_Product from './Edit_Product';
import Edit_ProdTemplate from './Edit_ProdTemplate';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            currentNode: {},
        };
        this.setCurrentNode = this.setCurrentNode.bind(this);
    }

    setCurrentNode(node) {
        this.setState({ currentNode: node });
    }
    render() {
        return (
            <div>
                <table width="100%">
                    <tr width="100%">
                        <td className="TreeContainer">

                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr className="trIndex_Products" width="100%">
                                        <td align="left" nowrap="true">
                                            <b><a href="">Expand</a></b><br />
                                            <b><a href="">Minimize</a></b>
                                                   
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                              <ProductsTree setCurrentNode={this.setCurrentNode} />
                        </td>
                        <td className="BodyContainer">
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0" >
                                <tbody>
                                     <tr width="100%">
                                        <td>

                                            {/*    <p>Data needs to display here </p>*/}
                                            {/*   {this.state.currentNode.description}<br />*/}
                                            {/*   {this.state.currentNode.id}<br />*/}
                                            {/*    {this.state.currentNode.key_id} <br />*/}
                                            {/*    {this.state.currentNode.linkpagename}*/}

                                            <Route path="/Add_Category" component={Add_Category} />
                                            <Route path="/Edit_Category" component={Edit_Category} />
                                            <Route path="/Edit_Product" component={Edit_Product} />
                                            <Route path="/Edit_ProdTemplate" component={Edit_ProdTemplate} />
                                            </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>




            </div>
        );
    }
}

export default Home;

