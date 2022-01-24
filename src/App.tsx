import { connect } from "react-redux";
import React, { Component } from "react";
import C from "./Constants";
import { showRegistrationModal } from "./Actions/Components/Registraion/";

import { saveSetting } from "./Actions/Components/Settings";
import { Router, Route, Switch } from "react-router-dom";

import ModalSuccess from "./Components/AuthorizeForm/Components/Template/Registration/ModalSuccess";

import { resetState } from "./Actions/Components/Server";

import { countdownTimer } from "./Services/CountdownTimer";

import { paintingDictionary } from "./Actions/Components/Painting";
import { getInfoXhrReqire } from "./Server";
import { getDictionary } from "./Server/require";
import { route } from "./Actions/Components/Navigation";
import {
  getInitialValuesFilter,
  getCountColsForLineFilter,
  getValTopNavView,
  getDefaultOpenValue,
  getDateInFormat,
  TIME_ZONE_OFFSET
} from "./Services/Shared";

import { dictionaryPaintingActive } from "./Actions/Components/View/DictionaryPaintingActive";
import {
  changeCouponDefaultOpen,
  closeCoupon
} from "./Actions/Components/Coupon";
import {
  changeViewTableFilter,
  changeViewTopNav
} from "./Actions/Components/View/TableFilter";

import { setLanguage } from "./Actions/Components/User";
import { saveStateTimer } from "./Actions/Components/Timer/";
import { openMenu, closeMenu } from "./Actions/Components/Menu";
import history from "./Router/History";
import MainContainer from "./Components/Main/MainContainer";
import Preloader from "./Components/Preloader";
import FooterContainer from "./Components/Footer/FooterContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import MenuRouteContainer from "./Components/Menu/MenuRouteContainer";
import TopNavContainer from "./Components/TopNav/TopNavContainer";
import ScrollMenuContainer from "./Components/ScrollMenu/ScrollMenuContainer";
import Coupon from "./Components/Coupon";
import CouponButton from "./Components/Coupon/CouponButton";
import Modal from "./Components/Modal";
import ButtonTest from "./Test/Components/Button";
import Test from "./Test";
import { authorizeByToken } from "./Server";
import { getLocalStorageData, setLocalStorage } from "./Services/LocalStorage";
import Version from "./Components/Version";
import { getViewHistoryOperations } from "./Components/Main/Components/Cabinet/MyScore/Components/HistoryOperation";
import { changeViewHistoryOperation } from "./Actions/Components/View/HistoryOperation";
import { changeViewOutrightsTable } from "./Actions/Components/View/OutrightsTable";
import {
  getViewColsOutrightsTable,
  getWidth
} from "./Components/Main/Components/TableOutright";
import { fetchMatchStatuses } from "./Actions/Components/MatchStatuses";
import { isDevelop, isOnServer } from "./Constants";

import { DictEn } from "./Services/DictEn";

import { createSocket } from "./Components/Socket";

import { getLanguage } from "./Services/SettingLanguage";

import { changeParamScreen } from "./Actions/Components/Width/";
import { changeTheme } from "./Services/ThemeSetting";

import PlugPage from "./screen/PlugPage";
import Main from "./Components/Main";
import CouponContainer from "./Components/Coupon/CouponContainer";

class App extends Component<any, any> {
  props: any;
  userInfo: any;
  initStart: boolean;
  initialTime: any;
  timerGo: any;

  socket: any;
  isSocketConnect: any;
  isLoadedData: any;
  view: any;
  responseAuthorize: any;
  dictionaryPaintingActive: any;
  coupon: any;
  server: any;
  user: any;
  registration: any;

  languageUser: string;
  url: string;
  constructor(props: any) {
    super(props);
    this.languageUser = getLocalStorageData("Language")
      ? getLocalStorageData("Language")
      : getLanguage();

    this.props = props;
    this.redirect();
    this.userInfo = this.props.user.responseAuthorize;
    this.initStart = false;
    this.initialTime = performance.now();
    this.timerGo = this.props.registration.close_window_registration;
    this.url = window.location.href;
    this.state = {
      skipPageFlg: false
    };
  }

  redirect() {
    const hash = window.location.hash;
    if (hash) this.props.redirect(hash.replace(/^#/, ""));
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    // if (this.url !== window.location.href) {
    //   // if (
    //   //   this.url.includes("currentRates") &&
    //   //   window.location.href.includes("currentRates")
    //   // )
    //   //   return false;
    //   // else if (
    //   //   !this.url.includes("currentRates") &&
    //   //   !window.location.href.includes("currentRates")
    //   // )
    //   //   return false;
    //   console.log("u here");
    //   this.url = window.location.href;
    //   return true;
    // }

    if (
      this.props.isSocketConnect !== nextProps.isSocketConnect ||
      this.props.isLoadedData !== nextProps.isLoadedData
    ) {
      if (this.props.isSocketConnect && !nextProps.isSocketConnect) {
        // setTimeout(this.props.resetState, 0);
      }
      return true;
    }
    if (this.userInfo !== nextProps.user.responseAuthorize) {
      this.userInfo = nextProps.user.responseAuthorize;
      return true;
    }
    if (this.timerGo !== nextProps.registration.close_window_registration) {
      this.timerGo = nextProps.registration.close_window_registration;
      this.initStart = false;
      return false;
    }
    // if (this.props.modalRegistration !== nextProps.modalRegistration)
    //   return true;

    if (this.props.user !== nextProps.user) return true;
    if (this.props.isBookmaker !== nextProps.isBookmaker) return true;

    if (nextState !== this.state) return true;
    return false;
  }

  getStatusLoad() {
    const form: any = {};
    if (C.APP_FLG) {
      if (this.props.user.responseAuthorize == 4) {
        form.Login = getLocalStorageData("Login");
        // form.Password = getLocalStorageData("Password"); // раскоменить
        if (form.Login && form.Password) {
          authorizeByToken(form);
          return false;
        } else {
          C.APP_FLG = false;
          return true;
        }
      }
    }
    return true;
  }

  getTime() {
    const date = new Date(performance.now() - this.initialTime).getTime();
    return getDateInFormat("seconds", date + TIME_ZONE_OFFSET);
  }

  startTimerLocal() {
    this.initStart = true;

    const timeCur = getLocalStorageData("Timer");
    let timerActual: number = 1;
    // if (getLocalStorageData("TimerDate")) {
    //     timerActual = Date.now() - getLocalStorageData("TimerDate");
    //     // timerActual = timerActual >= 90000 ? 0 : timerActual;
    // } else {
    //     timerActual = 0;
    // }

    if (timeCur > 0 && timerActual) {
      countdownTimer.setTimer(timeCur, this.props.saveStateTimer);
    } else {
      setLocalStorage("Timer", 0);
    }
  }

  testObject(dictRu, dictEn = this.props.lang) {
    const objRu = dictEn instanceof Array ? [] : {};
    for (let key in dictEn) {
      if (dictEn[key] instanceof Object) {
        objRu[key] = this.testObject(dictRu[key], dictEn[key]);
      } else {
        objRu[key] = dictRu[key] || "null";
      }
    }
    return objRu;
  }

  saveObjectNew(e) {
    getInfoXhrReqire("/ru.json", "GET").then(
      response => {
        const objectRu = this.testObject(JSON.parse(response));
      },
      error => console.log(`Rejected: ${error}`)
    );
  }

  callbackRedirect(url) {
    this.props.showRegistrationModal(false);
    this.props.navigate(url);
  }

  testChangeStateModal(boolean) {
    this.props.showModalTest(boolean);
  }

  render() {
    const { isBookmaker, isSocketConnect, isLoadedData, user } = this.props;
    if (!this.initStart) this.startTimerLocal();
    if (
      isSocketConnect &&
      isLoadedData &&
      this.getStatusLoad() &&
      (user.isAuthorize || this.state.skipPageFlg || isBookmaker)
    ) {
      return (
        <>
          <Router history={history}>
            <React.Fragment>
              <HeaderContainer route={this.props.route} />

              {/* <TopNavContainer toggleMenu={this.props.toggleMenu} /> */}

              <main>
                <>
                  <div className="left_slide_deskt">
                    <MenuRouteContainer isBookmaker={isBookmaker} />
                  </div>
                  <div className="right_slide_deskt">
                    <Route
                      path="/"
                      component={() => (
                        <TopNavContainer toggleMenu={this.props.toggleMenu} />
                      )}
                    />

                    <ScrollMenuContainer />
                    <Route path="/" component={MainContainer} />
                    <Route path="/" component={CouponContainer} />
                    {/* <Coupon />
                    <CouponButton /> */}

                    <Modal />
                  </div>
                </>
              </main>

              <Modal />

              <FooterContainer route={this.props.route} />
              {isDevelop ? (
                <>
                  <Version />
                  <ButtonTest />
                  <Test />
                </>
              ) : (
                ""
              )}
            </React.Fragment>
          </Router>
        </>
      );
    } else if (!this.state.skipPageFlg || !this.props.user.isAuthorize) {
      return <PlugPage skipPage={this.skipPage.bind(this)} />;
    } else return <Preloader />;
  }

  // render() {
  //     return <Keyboard {...{ device: "mobile" }} />;
  // }

  skipPage() {
    this.setState({ skipPageFlg: true });
  }

  getActiveValueDictPainting(cols: any) {
    if (cols >= 2) {
      return "tablet";
    } else {
      return "mobile";
    }
  }

  changeView() {
    const cols = getCountColsForLineFilter();
    if (this.props.view.tableFilter.cols !== cols)
      this.props.changeViewTableFilter(cols);

    const topNavRospis = getValTopNavView();
    if (this.props.view.topNav.rospis !== topNavRospis)
      this.props.changeViewTopNav(topNavRospis);

    const activeDictPainting = this.getActiveValueDictPainting(cols);
    if (this.props.dictionaryPaintingActive !== activeDictPainting)
      this.props.dictionaryPaintingActive(activeDictPainting);

    const couponDefaultOpen = getDefaultOpenValue();
    if (this.props.coupon.defaultOpen !== couponDefaultOpen) {
      if (couponDefaultOpen) this.props.closeCoupon();
      this.props.changeCouponDefaultOpen(couponDefaultOpen);
    }

    const historyOperation = getViewHistoryOperations();
    if (this.props.view.historyOperation !== historyOperation) {
      this.props.changeViewHistoryOperation(historyOperation);
    }

    const colsOutrightsTable = getViewColsOutrightsTable();
    if (this.props.view.outrightsTable.cols !== colsOutrightsTable) {
      this.props.changeViewOutrightsTable(colsOutrightsTable);
    }

    const w = getWidth();
    if (w > 1100 && this.props.width_screen < 1100) {
      this.props.changeParamScreen(w);
      if (!this.props.menu.isOpen) {
        this.props.openMenu();
      }
    } else if (w < 1100 && this.props.width_screen > 1100) {
      this.props.changeParamScreen(w);
    }
  }

  setLanguage() {
    switch (this.languageUser) {
      case "en":
        this.getReqInfo("en");
        break;
      case "ru":
        this.getReqInfo("ru");
        break;

      default:
        this.getReqInfo("en");
        break;
    }
  }

  statusGet(lang, func) {
    if (!func) {
      this.props.setLanguage(lang, DictEn);
    }
  }

  getReqInfo(string) {
    getDictionary(string, this.props.setLanguage);
  }

  componentDidMount() {
    window.onresize = this.changeView.bind(this);

    getInfoXhrReqire("/settings.json", "GET").then(
      response => {
        this.setLanguage();
        createSocket.waitSocekt();

        const setting = JSON.parse(response);
        this.props.saveSetting(setting);
        C.SOCKET_ADDRESS = setting.socketURL;
        createSocket.socketOpen(setting.socketURL, this.languageUser);

        if (!getLocalStorageData("Theme")) {
          setLocalStorage("Theme", "gray");
        } else {
          changeTheme(getLocalStorageData("Theme"), setting);
        }
      },
      error => console.log(`Rejected: ${error}`)
    );

    getInfoXhrReqire(
      !isOnServer
        ? "/mobileDict/mobile.json"
        : "/marketsdisplay/readView/mobile",
      !isOnServer ? "GET" : "POST"
    ).then(
      response => {
        this.props.paintingDictionary(JSON.parse(response), "mobile");
      },
      error => console.log(`Rejected: ${error}`)
    );

    getInfoXhrReqire(
      !isOnServer
        ? "/mobileDict/tablet.json"
        : "/marketsdisplay/readView/tablet",
      !isOnServer ? "GET" : "POST"
    ).then(
      response => {
        this.props.paintingDictionary(JSON.parse(response), "tablet");
      },
      error => console.log(`Rejected: ${error}`)
    );

    this.props.fetchMatchStatuses();
    this.changeView();
  }

  componentDidUpdate() {
    // if (this.props.isSocketConnect && !prevProps.isSocketConnect) {
    if (this.isLoadedData && !this.props.isSocketConnect) {
      this.props.setStateLoadData(false);
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    socket: state.socket,
    isSocketConnect: state.socket.socketState === "open" ? true : false,
    isLoadedData: state.isLoadedData,
    view: state.view,
    responseAuthorize: state.user.responseAuthorize,
    dictionaryPaintingActive: state.dictionaryPaintingActive,
    coupon: state.coupon,
    server: state.server,
    user: state.user,
    registration: state.registration,
    lang: state.user.language_user.dict,
    modalRegistration: state.showModal,
    width_screen: state.width_screen,
    menu: state.menu,
    isBookmaker: state.isBookmaker,
    searchData: state.search.data,
    historyRoute: state.history,
    sattingApp: state.mainSetting
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // connectServer: () => {
    //   dispatch(connectServer());
    // },
    // setStateLoadData: val => {
    //   dispatch(setStateLoadData(val));
    // },
    resetState: () => {
      dispatch(resetState());
    },
    redirect: (url: string) => {
      dispatch(route("replace", url));
    },
    navigate: (url: string) => {
      dispatch(route("push", url));
    },
    route: (method: any, url: string) => {
      dispatch(route(method, url));
    },
    toggleMenu: (isOpen: boolean) => {
      isOpen ? dispatch(openMenu()) : dispatch(closeMenu());
    },
    changeViewTableFilter: (cols: any) => {
      const filters = getInitialValuesFilter(cols);
      dispatch(changeViewTableFilter(cols, filters));
    },
    changeViewTopNav: (val: any) => {
      dispatch(changeViewTopNav(val));
    },
    dictionaryPaintingActive: (val: any) => {
      dispatch(dictionaryPaintingActive(val));
    },
    changeCouponDefaultOpen: (val: any) => {
      dispatch(changeCouponDefaultOpen(val));
    },
    closeCoupon: () => {
      dispatch(closeCoupon());
    },
    paintingDictionary: (data: any, view: any) => {
      dispatch(paintingDictionary(data, view));
    },
    changeViewHistoryOperation: (val: any) => {
      dispatch(changeViewHistoryOperation(val));
    },
    changeViewOutrightsTable: (val: any) => {
      dispatch(changeViewOutrightsTable(val));
    },
    setLanguage: (name: string, dict: any) => {
      dispatch(setLanguage(name, dict));
    },
    fetchMatchStatuses: () => dispatch(fetchMatchStatuses()),
    saveSetting: (val: any) => dispatch(saveSetting(val)),
    showRegistrationModal: boolean => dispatch(showRegistrationModal(boolean)),
    saveStateTimer: number => dispatch(saveStateTimer(number)),
    changeParamScreen: number => dispatch(changeParamScreen(number)),
    openMenu: () => dispatch(openMenu())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
