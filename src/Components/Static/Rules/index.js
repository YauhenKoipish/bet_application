import React from "react";

// import "./style/rules.css";

import {connect} from "react-redux"

const Rules = (props) => {
    return ( <div className="rules">
                <div className="rules__header">
                    <span>
                        {props.lang.rules.title}
                    </span>
                </div>
            
                <div className="rules__content" >
                  <div className="rules__items">
                    <div className="rules__main-item"> 
                    {props.lang.rules.block1.title}
                    </div>

                      {props.lang.rules.block1.list.map(text=><div key={text} className="rules__item">{text}</div>)}
                  </div>
              
                  <div className="rules__items">
                    <div className="rules__main-item">
                    {props.lang.rules.block2.title} 
                    </div>
                    {props.lang.rules.block2.list.map(text=><div key={text} className="rules__item">{text}</div>)}
                  </div>
              
                  <div className="rules__items">
                    <div className="rules__main-item">{props.lang.rules.block3.title}</div>
                  
                    {props.lang.rules.block3.list.map(text=><div key={text} className="rules__item">{text}</div>)}
                  </div>
              
                  <div className="rules__items">
                    <div className="rules__main-item" >{props.lang.rules.block4.title}</div>
                  </div>
              
                  <div className="rules__items">
                    <div className="rules__main-item" >{props.lang.rules.block5.title}</div>
                  </div>
                </div>
            
                <div className="rules__description">
      
                    <div className="rules__component">
                        <div className="rules__main-item" >1</div>
                
                        <div className="rules__sub-component">
                            <div className="rules__item" >{props.lang.rules.block1.discription.list1.title}</div>
                            <div className="rules__rule">
                                <div className="rules__text">
                                {props.lang.rules.block1.discription.list1.discription.map(text=><p key={text}>{text}</p>)}
                                </div>
                            </div>
                         </div>
                
                        <div className="rules__sub-component">
                             <div className="rules__item">{props.lang.rules.block1.discription.list2.title}</div>
                            <div className="rules__rule">
                                 <div className="rules__text">
                                  {props.lang.rules.block1.discription.list2.discription.map(text=><p key={text}>{text}</p>)}
                                 </div>
                            </div>
                        </div>
                
                        <div className="rules__sub-component">
                             <div className="rules__item" >{
                             props.lang.rules.block1.discription.list3.title
                            }</div>
                             <div className="rules__rule">
                                <div className="rules__text">
                                    {props.lang.rules.block1.discription.list3.discription.map(text=><p key={text}>{text}</p>)}
                                </div>
                             </div>
                        </div>
                
                        <div className="rules__sub-component">
                        <div className="rules__item" >{props.lang.rules.block1.discription.list4.title}</div>
                        <div className="rules__rule">
                            { props.lang.rules.block1.discription.list4.discription.map(text=><p key={text}>{text}</p>)}
                        </div>
                        </div>
                    
                        <div className="rules__sub-component">
                        <div className="rules__item" >{
                props.lang.rules.block1.discription.list5.title
            }</div>
                        <div className="rules__rule">
                        
                        
                            {
                            props.lang.rules.block1.discription.list5.discription.map(text=><p key={text}>{text}</p>)
                        }
                        
                        </div>
                        </div>
                    
                        <div className="rules__sub-component">
                        <div className="rules__item" >{
                props.lang.rules.block1.discription.list6.title
            }</div>
                        <div className="rules__rule">
                        
                            {
                            props.lang.rules.block1.discription.list6.discription.map(text=><p key={text}>{text}</p>)
                        }
                    
                    
                        </div>
                        </div>
                    
                        <div className="rules__sub-component">
                        <div className="rules__item" >{
                props.lang.rules.block1.discription.list7.title
            }</div>
                        <div className="rules__rule">
                            <div className="rules__text">
                            
                                {
                                props.lang.rules.block1.discription.list7.discription.map(text=><p key={text}>{text}</p>)
                            }
                            </div>
                    
                    
                        </div>
                        </div>
                    
                        <div className="rules__sub-component">
                        <div className="rules__item">{
                            props.lang.rules.block1.discription.list8.title
                        }</div>
                        <div className="rules__rule">
                            <div className="rules__text">
                            
                                {
                                props.lang.rules.block1.discription.list8.discription.map(text=><p key={text}>{text}</p>)
                            }
                            
                            </div>
                    
                    
                        </div>
                        </div>
                    
                        <div className="rules__sub-component">
                        <div className="rules__item">{
                            props.lang.rules.block1.discription.list9.title
                        }</div>
                        <div className="rules__rule">
                            <div className="rules__text">
                            
                                {
                                props.lang.rules.block1.discription.list9.discription.map(text=><p key={text}>{text}</p>)
                            }
                            </div>
                    
                    
                        </div>
                        </div>
                    
                        <div className="rules__sub-component">
                      <div className="rules__item">{
                          props.lang.rules.block1.discription.list10.title
                      }</div>
                      <div className="rules__rule">
                        <div className="rules__text">{
                            props.lang.rules.block1.discription.list10
                                .discription.map(text=><p key={text}>{text}</p>)
                        }
                        </div>
                  
                  
                      </div>
                    </div>

                  </div>
              
                    <div className="rules__component">
                         <div className="rules__main-item" >{props.lang.rules.block2.title}</div>
                         <div className="rules__sub-component">
                             <div className="rules__item">{ props.lang.rules.block2.discription.list1.title}</div>
                            <div className="rules__rule">
                                 <div className="rules__text">
                                 {props.lang.rules.block2.discription.list1.discription.map(text=><p key={text}>{text}</p>)}
                                </div>
                            </div>
                        </div>
                
                    <div className="rules__sub-component">
                            <div className="rules__item" >{
                    props.lang.rules.block2.discription.list2.title
                }</div>
                      <div className="rules__rule">{
                          props.lang.rules.block2.discription.list2.discription.map(text=><p key={text}>{text}</p>)
                      }
                  
                      </div>
                    </div>
                
                    <div className="rules__sub-component">
                      <div className="rules__item" 
                         
                      >{
            props.lang.rules.block2.discription.list3.title
        }</div>
                      <div className="rules__rule">
                      
                          {
                          props.lang.rules.block2.discription.list3.discription.map(text=><p key={text}>{text}</p>)
                      }
                  
                      </div>
                    </div>
                
                    <div className="rules__sub-component">
                      <div className="rules__item" 
                         
                     >{
            props.lang.rules.block2.discription.list4.title
        }</div>
                      <div className="rules__rule">
                      
                          {
                          props.lang.rules.block2.discription.list4.discription.map(text=><p key={text}>{text}</p>)
                      }
                      </div>
                    </div>
                
                    <div className="rules__sub-component">
                      <div className="rules__item" 
                         
                     >{
            props.lang.rules.block2.discription.list5.title
        }</div>
                      <div className="rules__rule">
                      
                          {
                          props.lang.rules.block2.discription.list5.discription.map(text=><p key={text}>{text}</p>)
                      }
                      </div>
                    </div>
                
                    <div className="rules__sub-component">
                      <div className="rules__item" 
                         
                      >{
            props.lang.rules.block2.discription.list6.title
        }</div>
                      <div className="rules__rule">
                      
                          {
                          props.lang.rules.block2.discription.list6.discription.map(text=><p key={text}>{text}</p>)
                      }
                      </div>
                    </div>
                  </div>
              {/* Сверху пашет */}
                    <div className="rules__component">
                    <div className="rules__main-item"   >{props.lang.rules.block3.title}</div>
                
                    <div className="rules__sub-component">
                                <div className="rules__item" >{
                                 props.lang.rules.block3.discription.list1.title
                                }</div>
                      <div className="rules__rule">
                        <div className="rules__text">{
                            props.lang.rules.block3.discription.list1.discription.map(text=><p key={text}>{text}</p>)} 
                        </div>
                        </div>
                      </div>
                  
                      <div className="rules__sub-component">
                        <div className="rules__item" >{
            props.lang.rules.block3.discription.list2.title
        }</div>
                        <div className="rules__rule">
                          <div className="rules__text">
                          
                              {
                              props.lang.rules.block3.discription.list2
                                  .discription.map(text=><p key={text}>{text}</p>)
                          } 
                          </div>
                          </div>
                        </div>
                    
                        <div className="rules__sub-component">
                          <div className="rules__item" >{ props.lang.rules.block3.discription.list3.title}</div>
                            <div className="rules__rule">
                                <div className="rules__text">{
                                    props.lang.rules.block3.discription.list3.discription.map(text=><p key={text}>{text}</p>)
                                }
                                </div>
                            </div>
                          </div>
                          
                      
                          <div className="rules__sub-component">
                            <div className="rules__item" 
                               
                            >{
            props.lang.rules.block3.discription.list4.title
        }</div>
                            <div className="rules__rule">
                              <div className="rules__text">
                              
                                  {
                                  props.lang.rules.block3.discription.list4
                                      .discription.map(text=><p key={text}>{text}</p>)
                              }
                              </div>
                              </div>
                            </div>
                        
                            <div className="rules__sub-component">
                              <div className="rules__item" 
                                 
                            >{
            props.lang.rules.block3.discription.list5.title
        }</div>
                              <div className="rules__rule">
                                <div className="rules__text">
                                
                                    {
                                    props.lang.rules.block3.discription.list5
                                        .discription.map(text=><p key={text}>{text}</p>)
                                }
                                </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item">{
            props.lang.rules.block3.discription.list6.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list6
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list7.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list7
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list8.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list8
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list9.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list9
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list10.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list10
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list11.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list11
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list12.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list12
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list13.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list13
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list14.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list14
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list15.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list15
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                > {
            props.lang.rules.block3.discription.list16.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list16
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >  {
            props.lang.rules.block3.discription.list17.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list17
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item"> {
            props.lang.rules.block3.discription.list18.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list18
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" > {
            props.lang.rules.block3.discription.list19.title
        }</div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list19
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" > {
            props.lang.rules.block3.discription.list20.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list20
                                          .discription
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" > {
            props.lang.rules.block3.discription.list21.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list21
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" > {
            props.lang.rules.block3.discription.list22.title
        }  </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list22
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" >  {
            props.lang.rules.block3.discription.list23.title
        }  </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list23
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" > {
            props.lang.rules.block3.discription.list24.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list24
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" > {
            props.lang.rules.block3.discription.list25.title
        }  </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list25
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                              <div className="rules__sub-component">
                                <div className="rules__item" >{
            props.lang.rules.block3.discription.list26.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list26
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                              <div className="rules__sub-component">
                                <div className="rules__item" >{
            props.lang.rules.block3.discription.list27.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list27
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >  {
            props.lang.rules.block3.discription.list28.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list28
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >   {
            props.lang.rules.block3.discription.list29.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list29
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                > {
            props.lang.rules.block3.discription.list30.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list30
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                >{
            props.lang.rules.block3.discription.list31.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list31
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" 
                                   
                                > {
            props.lang.rules.block3.discription.list32.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list32
                                          .discription.map(text=><p key={text}>{text}</p>)
                                  }
                                  </div>
                                </div>
                              </div>
                          
                              <div className="rules__sub-component">
                                <div className="rules__item" >{
            props.lang.rules.block3.discription.list33.title
        } </div>
                                <div className="rules__rule">
                              
                                  <div className="rules__text">
                                  
                                      {
                                      props.lang.rules.block3.discription.list33.discription.map(text=><p key={text}>{text}</p>)
                                      }
                                  
                                  </div>
                                </div>
                              </div>

                            </div>
                        
                    <div className="rules__component">
                                 <div className="rules__main-item" >{props.lang.rules.block4.title}</div>
                
                                <div className="rules__sub-component">              
                                     <div className="rules__rule">
                                    
                                        {props.lang.rules.block4.discription.list1.discription.map(text=><p key={text}>{text}</p>)}
                      
                                    </div>
                                </div>
                            </div>
                     
                    <div className="rules__component">
                        <div className="rules__main-item" >{props.lang.rules.block5.title} </div>
                
                         <div className="rules__sub-component">
                             <div className="rules__rule">{props.lang.rules.block5.discription.list1.discription.map(text=><p key={text}>{text}</p>)}</div>
                         </div>
              
                    </div> 
                     
                </div>
                    
         </div>
                     
            
    );
};


const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict
  };
};

export default connect(
  mapStateToProps,
  null
)(Rules);

