import React, { Component } from "react";
// import "./style/faq.css";

import { connect } from "react-redux";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
  }

  changeActive(num) {
    if (num === this.state.active) {
      this.setState({ active: null });
    } else {
      this.setState({ active: num });
    }
  }

  render() {
    return <h1>TBD</h1>;
  }
  // render() {
  //   return (
  //     <div className="faq">
  //       <div className="faq__header">
  //         <span>{this.props.lang.FAQ.title}</span>
  //       </div>
  //       <div className="faq__list">
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 1 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 1)}
  //           >
  //             {this.props.lang.FAQ.question1.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question1.answer.map(text => (
  //               <p key={text}>{text}</p>
  //             ))}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 2 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 2)}
  //           >
  //             {this.props.lang.FAQ.question2.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question1.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 3 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 3)}
  //           >
  //             {this.props.lang.FAQ.question3.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question3.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 4 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 4)}
  //           >
  //             {this.props.lang.FAQ.question4.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question4.answer.map(text => (
  //               <p key={text}>{text}</p>
  //             ))}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 5 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 5)}
  //           >
  //             {this.props.lang.FAQ.question5.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question5.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 6 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 6)}
  //           >
  //             {this.props.lang.FAQ.question6.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question6.answer.map(text => (
  //               <p key={text}>{text}</p>
  //             ))}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 7 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 7)}
  //           >
  //             {this.props.lang.FAQ.question7.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question7.answer.map(text => (
  //               <p key={text}>{text}</p>
  //             ))}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 8 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 8)}
  //           >
  //             {this.props.lang.FAQ.question8.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question8.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 9 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 9)}
  //           >
  //             {this.props.lang.FAQ.question9.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question9.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 10 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 10)}
  //           >
  //             {this.props.lang.FAQ.question10.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question10.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 11 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 11)}
  //           >
  //             {this.props.lang.FAQ.question11.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question11.answer}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 12 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 12)}
  //           >
  //             {this.props.lang.FAQ.question12.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question12.answer.map(text => (
  //               <p key={text}>{text}</p>
  //             ))}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 13 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 13)}
  //           >
  //             {this.props.lang.FAQ.question13.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question13.answer.map(text => (
  //               <p key={text}>{text}</p>
  //             ))}
  //           </div>
  //         </div>
  //         <div
  //           className={
  //             "faq__question " + (this.state.active === 14 ? "active" : "")
  //           }
  //         >
  //           <div
  //             className="faq__title"
  //             onClick={this.changeActive.bind(this, 14)}
  //           >
  //             {this.props.lang.FAQ.question14.question}
  //           </div>
  //           <div className="faq__answer">
  //             {this.props.lang.FAQ.question14.answer}
  //           </div>
  //         </div>
  //       </div>
  //       {/* <div className="faq__buttons">
  //     <div className="faq__text">Не нашли ответ на вопрос?</div>
  //     <div className="faq__button">Свяжитесь с нами</div>
  //   </div> */}
  //     </div>
  //   );
  // }
}

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict
  };
};

export default connect(
  mapStateToProps,
  null
)(Faq);
