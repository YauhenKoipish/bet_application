import React from "react";
import { connect } from "react-redux";

import NavigationTitle from "./Components/NavigationTitle";
import { MakeReport } from "./Components/MakeReport";
import OpenBets from "./Components/OpenBets";

import PlayerInformation from "./Components/Modal/Components/Player_Information";
import PlayerTopBets from "./Components/Modal/Components/Player_TopBets";
import PlayerReport from "./Components/Modal/Components/Player_Report";
import NewGroup from "./Components/Modal/Components/NewGroup";
import { RospisModal } from "./Components/Modal/Components/Rospis";
import { ModalBookmaker } from "../Modal";

const BookmakerMenu: React.FunctionComponent<any> = props => {
  const [isShowModal, setShowModal] = React.useState(false);
  const [componentModal, setcomponentModal] = React.useState("name");

  const setStates = name => {
    setcomponentModal(name);
    setShowModal(!isShowModal);
  };

  const getComponent = () => {
    switch (props.match.params.component) {
      case "client":
        return <MakeReport />;
      case "marketing":
        return <OpenBets />;
      default:
        return (
          <>
            <MakeReport />
          </>
        );
    }
  };

  const getComponentModal = () => {
    switch (componentModal) {
      case "newGroup":
        return <NewGroup setShowModal={setShowModal} />;
      case "topBets":
        return <PlayerTopBets setShowModal={setShowModal} />;
      case "information":
        return <PlayerInformation setShowModal={setShowModal} />;
      case "makeReport":
        return <PlayerReport setShowModal={setShowModal} />;

      default:
        return <> </>;
    }
  };

  const dataTitle = [
    {
      name: "Составить отчет",
      icon: "makeReport",
      onPressFunc: setStates,
      callback: "makeReport"
    },
    {
      name: "Открыть ставки",
      icon: "openBets",
      onPressFunc: props.history.push,
      callback: "/currentRates/marketing"
    },
    {
      name: "Новая группа",
      icon: "newGroup",
      onPressFunc: setStates,
      callback: "newGroup"
    },
    {
      name: "Топ ставок",
      icon: "topBets",
      onPressFunc: setStates,
      callback: "topBets"
    },
    {
      name: "Информация",
      icon: "information",
      onPressFunc: setStates,
      callback: "information"
    }
  ];

  return (
    <>
      <NavigationTitle listMenu={dataTitle} />

      {getComponent()}

      {isShowModal && (
        <ModalBookmaker
          setShowModal={setShowModal}
          component={getComponentModal()}
        />
      )}
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BookmakerMenu);
