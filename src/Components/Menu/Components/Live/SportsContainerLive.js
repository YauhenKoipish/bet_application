import React, { Component } from "react";
import { getMenuContainerHeight } from "../../../../Services/Shared";

class SportsContainer extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.handleSetContainerHeight = this.setContainerHeight.bind(this);
    }

    render() {
        return (
            <div className="left-menu__main" ref={this.container}>
                {this.props.children}
            </div>
        );
    }

    setContainerHeight() {
        this.container.current.style.height = getMenuContainerHeight() + "px";
    }

    componentDidMount() {
        this.setContainerHeight();
        window.addEventListener("resize", this.handleSetContainerHeight);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleSetContainerHeight);
    }

    componentDidUpdate() {
        this.setContainerHeight();
    }
}

export default SportsContainer;
