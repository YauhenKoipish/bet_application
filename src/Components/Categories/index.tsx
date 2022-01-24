import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Table from "../Main/Components/Table";
import TableOutright from "../Main/Components/TableOutright";
import Sport from "../Main/Components/Sport";
import {
    getFilterArraySportByName,
    getFilterCategoryByName,
    getFilterTournamentByName
} from "../../Services/Shared";
import TableWithOutrights from "../Main/Components/MergeTables/TableWithOutrights";

import { routsName } from "../../Router/RouterList";
class categories extends Component {
    props: any;
    getPropsForTable(
        parentProps,
        status,
        isSport = false,
        isCategory = false,
        isTournament = false,
        time = Infinity
    ) {
        const props = { ...parentProps };
        props.filters = {};
        props.filters.status = [status];
        const sportVal = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );
        const sport = isSport ? sportVal : null;
        props.filters.sport = sport;

        const categoryVal = getFilterCategoryByName(
            props.match.params.category,
            sportVal,
            this.props.categories
        );
        const category =
            isCategory && props.match.params.category !== "vse"
                ? [categoryVal]
                : null;
        props.filters.category = category;

        const tournamentVal = getFilterTournamentByName(
            props.match.params.tournament,
            sportVal,
            categoryVal,
            this.props.tournaments,
            props.match.params.category,
            this.props.categories
        );
        const tournament = isTournament ? [tournamentVal] : null;
        props.filters.tournament = tournament;
        props.filters.time = time;
        return props;
    }

    getAllCategoriesInSport(props) {
        const sportVal: any = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );

        const categories: Array<any> = [];
        this.props.categories.forEach((category: any) => {
            if (sportVal.includes(category.sportId)) {
                categories.push(category.id);
            }
        });
        return categories;
    }

    getPropsForOutrightTable(props) {
        const sportVal = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );
        const categoryVal =
            props.match.params.category === "vse"
                ? this.getAllCategoriesInSport(props)
                : [
                      getFilterCategoryByName(
                          props.match.params.category,
                          sportVal,
                          this.props.categories
                      )
                  ];
        return {
            ...props,
            sportIds: sportVal,
            categoryIds: categoryVal
        };
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname)
            return true;
        return false;
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.categories,
                            ":sport/:category/:tournament",
                            routsName.dict.dolgosrochnye
                        )}
                        component={props => (
                            <TableWithOutrights
                                Table={propsT => (
                                    <Table
                                        {...this.getPropsForTable(
                                            props,
                                            0,
                                            true,
                                            true,
                                            true
                                        )}
                                        rootComponent="categories"
                                        {...propsT}
                                        infinityCountEvents={true}
                                    />
                                )}
                                TableOutright={propsT => (
                                    <TableOutright
                                        {...this.getPropsForOutrightTable(
                                            props
                                        )}
                                        rootComponent="categories"
                                        {...propsT}
                                    />
                                )}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.categories,
                            ":sport/:category/:tournament"
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    0,
                                    true,
                                    true,
                                    true
                                )}
                                rootComponent="categories"
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.categories,
                            ":sport/:category"
                        )}
                        component={props => (
                            <TableWithOutrights
                                Table={propsT => (
                                    <Table
                                        {...this.getPropsForTable(
                                            props,
                                            0,
                                            true,
                                            true
                                        )}
                                        rootComponent="categories"
                                        {...propsT}
                                        infinityCountEvents={true}
                                    />
                                )}
                                TableOutright={propsT => (
                                    <TableOutright
                                        {...this.getPropsForOutrightTable(
                                            props
                                        )}
                                        rootComponent="categories"
                                        {...propsT}
                                    />
                                )}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.categories,
                            ":sport"
                        )}
                        component={props => (
                            <Sport {...props} key={props.match.params.sport} />
                        )}
                    />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tournaments: state.server.entities.tournaments,
        categories: state.server.entities.categories,
        sports: state.server.entities.sports,
        timeFilter: state.filters.timeFilter
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(categories);
