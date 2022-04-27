import React, { Component } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { Link } from "react-router-dom";
import tree from "./tree.xml";

class ProductsTreeView extends Component {
    render() {
        return (
            <div id="TreeView">
                <TreeView setCurrentNode={this.props.setCurrentNode} />
            </div>
        );
    }
}

class Node {
    description = 'n/a';
    id = -1;
    key_id = -1;
    linkpagename = '';
    isActive = false;
    nodes = [];

    constructor(description, id, key_id, linkpagename) {
        this.description = description;
        this.id = id;
        this.key_id = key_id;
        this.linkpagename = linkpagename;
    }

    static nodesFromXml(xml) {
        const map = (entity, nodes) => {
            const id = entity.attributes['id'];
            const key_id = entity.attributes['key-id'];
            const descriptionText =
                entity.children[
                    entity.children.findIndex((child) => child.name === 'description')
                ].value;
            const entities = entity.children.filter(
                (child) => child.name === 'entity'
            );
            var linkPageName = entity.attributes['link-page-name'];
            linkPageName = linkPageName.replace(".aspx", "");
            const node = new Node(descriptionText, id, key_id, linkPageName);
            nodes.push(node);
            entities.forEach((entity) => map(entity, node.nodes));
        };

        const parsedData = new XMLParser().parseFromString(xml);

        const entities = parsedData.children.filter(
            (child) => child.name === 'entity'
        );

        const nodes = [];
        entities.forEach((entity) => map(entity, nodes));
        return nodes;
    }
}

class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nodes: [] };
        this.toggleNode = this.toggleNode.bind(this);
    }

    componentDidMount() {
        axios
            .get(tree, { 'Content-Type': 'application/xml; charset=utf-8' })
            .then((response) =>
                this.setState({ nodes: Node.nodesFromXml(response.data) })
            );
    }

    render() {
        const nodes = this.state.nodes;

        return (
            <ul>
                {nodes.map((node) => (
                    <TreeNode
                        id={node.id}
                        key={node.key_id}
                        node={node}
                        onToggle={this.toggleNode}
                        setCurrentNode={this.props.setCurrentNode}
                    />
                ))}
            </ul>
        );
    }

    toggleNode(node) {
        if (node.nodes.length === 0) return;
        this.props.setCurrentNode(node);

        function _toggleNode(currentNode, node) {
            if (currentNode.id === node.id) {
                currentNode.isActive = !currentNode.isActive;
            } else {
                currentNode.nodes.forEach((childNode) => _toggleNode(childNode, node));
            }
        }

        const nodes = this.state.nodes;
        nodes.forEach((currentNode) => _toggleNode(currentNode, node));
        this.setState((state) => (state.nodes = nodes));
    }
}

class TreeNode extends React.Component {
    render() {
        const node = this.props.node;
        const onToggle = this.props.onToggle;
        let activeChildren = null;
        if (node.isActive && node.nodes.length > 0) {
            activeChildren = (
                <ul>
                    {node.nodes.map((node) => (
                        <TreeNode
                            id={node.id}
                            key={node.key_id}
                            node={node}
                            onToggle={onToggle}
                        />
                    ))}
                </ul>
            );
        }

        return (
            <li
                id={node.id} linkpagename={node.linkpagename}
                key={node.key_id}
                onClick={(event) => {
                    event.stopPropagation();
                    onToggle(node);
                }}
            >
                <Link to={node.linkpagename}>{node.description}</Link> - {node.key_id} - {node.linkpagename}
                {activeChildren}
            </li>
        );
    }
}

export default ProductsTreeView;


