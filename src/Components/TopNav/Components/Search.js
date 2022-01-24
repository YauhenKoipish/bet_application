import React, { Component } from "react";
import { connect } from "react-redux";
import {
    openSearch,
    closeSearch,
    changeSearchResults
} from "../../../Actions/Components/Search/";

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchResult = [];
        this.inputElem = React.createRef();
        this.timeout = null;
        this.state = {
            result: true
        };
        this.handleCloseSearch = ev =>
            this.bindHandleCloseSearch.call(this, ev);
    }

    closeSearch() {
        window.removeEventListener("click", this.handleCloseSearch);

        this.inputElem.current.value = "";
        this.props.closeSearch();
    }

    bindHandleCloseSearch(event) {
        if (
            event.target.closest(".line-live__teams") ||
            (!event.target.closest(".top-nav__search") &&
                !event.target.closest("#search_container"))
        )
            this.closeSearch();
    }

    openSearch() {
        this.inputElem.current.focus();
        // window.addEventListener("click", this.handleCloseSearch);
        this.props.openSearch();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.search !== this.props.search) return true;
        if (nextState !== this.state) return true;
        return false;
    }

    render() {
        return (
            <div
                className={
                    "top-nav__search " +
                    (this.props.search.isOpen ? "open" : "")
                }
            >
                <div
                    className="top-nav__magnifier"
                    onClick={this.openSearch.bind(this)}
                >
                    {searchImg()}
                    {this.props.name ? (
                        <span className="search_left_menu">
                            {this.props.name}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div className="top-nav__input">
                    <input type="text" ref={this.inputElem} />
                </div>
                <div
                    className="top-nav__close"
                    onClick={this.closeSearch.bind(this)}
                >
                    {closeImg("white")}
                </div>

                {/* Создать переменную в state которая отвечает за показ NotFound  изменять ее в методеgetSearchResult если sport === null  */}
                {!this.state.result && this.props.search.isOpen ? (
                    <div className="notFound">
                        {this.props.lang.NoEventsFound}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }

    joinHomeAwayName(event) {
        return (event.homeName + " " + event.awayName)
            .toLowerCase()
            .replace(/\.|\,/, "")
            .trim();
    }

    joinAwayHomeName(event) {
        return (event.awayName + " " + event.homeName)
            .toLowerCase()
            .replace(/\.|\,/, "")
            .trim();
    }

    getValidEvents(value) {
        const today = new Date();
        const todayTimestamp = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).getTime();
        return [...this.props.events.values()].filter(ev => {
            if (value === "") return false;
            const regular = value
                .toLowerCase()
                .trim()
                .replace(/\\/g, "")
                .replace(/\(/g, "\\(")
                .replace(/\)/g, "\\)")
                .replace(/\[/g, "\\[")
                .replace(/\]/g, "\\]");
            if (
                ((ev.status === 0 && ev.timeSpanStart >= todayTimestamp) ||
                    ev.status === 1) &&
                (this.joinHomeAwayName(ev).match(new RegExp(regular, "g")) ||
                    this.joinAwayHomeName(ev).match(new RegExp(regular, "g")))
            ) {
                return true;
            }
            return false;
        });
    }

    getGroupSportsByEvents(events) {
        // debugger;
        return events.reduce((accum, curVal) => {
            if (!accum.has(curVal.sportId)) {
                accum.set(curVal.sportId, [curVal.id]);
            } else {
                if (!accum.get(curVal.sportId).includes(curVal.id)) {
                    accum.get(curVal.sportId).push(curVal.id);
                }
            }
            return accum;
        }, new Map());
    }

    getSearchResult() {
        const input = this.inputElem.current.value;
        if (input.length > 2) {
            const events = this.getValidEvents(input);
            const sports = this.getGroupSportsByEvents(events);
            this.timeout = null;
            if (sports.size === 0 && this.state.result) {
                this.setState({ result: false });
            }

            this.props.changeSearchResults(sports.size !== 0 ? sports : null);
        } else {
            if (!this.state.result) this.setState({ result: true });
            if (this.props.search.data) {
                this.props.changeSearchResults(null);
            }
        }
    }

    componentDidMount() {
        this.inputElem.current.onkeyup = () => {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(this.getSearchResult.bind(this), 200);
        };
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleCloseSearch);
        if (this.props.search) this.props.closeSearch();
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        newEvents: state.server.eventsAndLines.newEvents,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        sports: state.server.entities.sports,
        search: state.search,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openSearch: () => dispatch(openSearch()),
        closeSearch: () => dispatch(closeSearch()),
        changeSearchResults: sports => dispatch(changeSearchResults(sports))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

const searchImg = () => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.6902 11.5949C13.0012 11.5949 13.2995 11.7186 13.5192 11.9388L17.6514 16.0792C18.0848 16.5135 18.0844 17.2167 17.6506 17.6506C17.2167 18.0844 16.5135 18.0848 16.0792 17.6514L11.9388 13.5192C11.7186 13.2995 11.5949 13.0012 11.5949 12.6902V12.3433L11.3103 12.0481C10.1086 13.0811 8.54859 13.703 6.85152 13.703C3.06737 13.703 0 10.6357 0 6.85152C0 3.06737 3.06737 0 6.85152 0C10.6357 0 13.703 3.06737 13.703 6.85152C13.703 8.54859 13.0811 10.1086 12.0481 11.3103L12.3433 11.5949H12.6902ZM1.18635 6.85079C1.18635 9.9851 3.71646 12.5152 6.85077 12.5152C9.98508 12.5152 12.5152 9.9851 12.5152 6.85079C12.5152 3.71648 9.98508 1.18637 6.85077 1.18637C3.71646 1.18637 1.18635 3.71648 1.18635 6.85079Z"
            />
        </svg>
    );
};

const closeImg = () => {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.06641 7L0 13.0667L0.707031 13.7737L6.77344 7.70703L13.0664 14L13.7734 13.293L7.48047 7L13.7734 0.707031L13.0664 0L6.77344 6.29297L0.707031 0.226318L0 0.93335L6.06641 7Z"
                transform="translate(0 14) rotate(-90)"
            />
        </svg>
    );
};
