import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style/dropdown.css";
// import "./style/filter.css";
import { filterVariants } from "../../../../../Services/Shared";
import { changeViewTableFilter } from "../../../../../Actions/Components/View/TableFilter";
import FilterLine from "./Components/FilterLine";
import FilterTournament from "./Components/FilterTournament";

class Filter extends Component {
  constructor(props) {
    super(props);
    const filters = this.getStateFilters(...props.view.filters);
    this.state = {
      isOpenTF: false,
      linesFilters: {
        count: props.view.cols,
        openedFilter: null,
        filters
      }
    };
  }

  get isUpdate() {
    if (this._isBeUpdated) {
      this._isBeUpdated = false;
      this.isBlockScroll = false;
      return true;
    }
    return false;
  }

  set isUpdate(val) {
    this._isBeUpdated = val;
    this.isBlockScroll = true;
  }

  getVariantsFilter(...activeFilters) {
    const variants = filterVariants.filter(f => !activeFilters.includes(f));
    return variants;
  }

  getStateFilters(...activeFilters) {
    if (activeFilters.length === 0) return filters;
    const filters = [];
    activeFilters.forEach(filter => {
      filters.push({
        active: filter,
        variants: this.getVariantsFilter(...activeFilters)
      });
    });
    return filters;
  }

  toggleTF() {
    this.setState({
      ...this.state,
      isOpenTF: !this.state.isOpenTF
    });
  }

  isFilterOpen(name) {
    return this.state.linesFilters.openedFilter === name;
  }

  toggleLineFilter(name) {
    if (this.isFilterOpen(name)) {
      this.setState({
        ...this.state,
        linesFilters: {
          ...this.state.linesFilters,
          openedFilter: null
        }
      });
    } else {
      this.setState({
        ...this.state,
        linesFilters: {
          ...this.state.linesFilters,
          openedFilter: name
        }
      });
    }
  }

  getCurrentActiveFilters() {
    const filters = [];
    this.state.linesFilters.filters.forEach(f => {
      filters.push(f.active);
    });
    return filters;
  }

  setFilterValue(oldVal) {
    return newVal => {
      const currentFilters = this.getCurrentActiveFilters();
      const indexOldVal = currentFilters.indexOf(oldVal);
      currentFilters[indexOldVal] = newVal;
      const filters = this.getStateFilters(...currentFilters);
      this.setState({
        ...this.state,
        linesFilters: {
          ...this.state.linesFilters,
          filters,
          openedFilter: null
        }
      });
      this.props.changeViewTableFilter(this.props.view.cols, currentFilters);
    };
  }

  getToggleFunc(filter) {
    return filter.variants.length !== 0
      ? this.toggleLineFilter.bind(this, filter.active)
      : f => f;
  }

  getLineFilterProps(filter) {
    const setFilterValue = this.setFilterValue(filter.active);
    return {
      isOpen: this.isFilterOpen(filter.active),
      toggle: this.getToggleFunc(filter),
      changeFilter: setFilterValue.bind(this),
      active: filter.active,
      variants: filter.variants
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.isUpdate) return true;
    if (nextProps.view.cols !== this.props.view.cols) {
      this.isUpdate = true;
      const filters = this.getStateFilters(...nextProps.view.filters);
      this.setState({
        ...this.state,
        linesFilters: {
          ...this.state.linesFilters,
          filters,
          count: nextProps.view.cols
        }
      });
    }
    return true;
  }

  getSportName() {
    return this.props.curSport ? this.props.curSport.name : "";
  }

  render() {
    const isLineFilter = this.props.isLineFilter || false;
    return (
      <div className="filter">
        <FilterTournament
          isOpen={this.state.isOpenTF}
          toggle={this.toggleTF.bind(this)}
          tournaments={this.props.tournaments}
          currentT={this.props.curT}
          onAllTournaments={this.props.onAllTournaments}
          sportName={this.getSportName()}
        />
        {!isLineFilter
          ? this.state.linesFilters.filters.map((f, i) => {
              return (
                <FilterLine
                  {...this.getLineFilterProps(f, i)}
                  lang={this.props.lang}
                  key={i}
                />
              );
            })
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view.tableFilter,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeViewTableFilter: (cols, filters) => {
      dispatch(changeViewTableFilter(cols, filters));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
