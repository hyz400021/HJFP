const React = require('react');
const ReactDOM = require('react-dom');

require('../css/hyz.css');
//require('../js/bootstrap_min_3.3.7.js');
require("bootstrap-webpack");

class AAA extends React.Component{
    render(){
        return(
            <div className="container">
                <div style={{padding: "3px 15px 15px 15px"}}>
                    <div ref="tittle" className="row mp0">
                        <h2 className="huanHang" style={{padding:"10px 5px",margin:"0px"}}>城乡居保待遇计算器</h2>
                    </div>
                    <div className="row mp0" style={{fontSize:"14px",paddingBottom:"10px"}}>
                        <span style={{color:"#CCCCCC"}}>2016-08-05 甜到哀伤</span> <a herf="#">安化县城乡居保</a>
                    </div>
                    <div ref="main" className="row mp0">
                        <div className="panel-group collapsed" id="accordion" role="tablist" aria-multiselectable="true" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingOne">
                                    <h4 className="panel-title">
                                        <a role="button" >
                                            点击打开计算器设置
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="panel-body" style={{margin:"0px",padding:"0px 0px 10px 0px"}}>

                                        <div className="col-xs-6" style={{margin:"0px",padding:"0px"}}>
                                            <div className="btn-group col-xs-12" role="group">
                                                <div>
                                                    <button type="button" className="dropdown-toggle navButton border1px col-xs-12" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        标准补贴
                                                        <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu navUl">
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xs-6" style={{margin:"0px",padding:"0px"}}>
                                            <div className="btn-group col-xs-12" role="group">
                                                <div>
                                                    <button type="button" className="dropdown-toggle navButton border1px col-xs-12" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        标准补贴
                                                        <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu navUl">
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xs-6" style={{margin:"0px",padding:"0px"}}>
                                            <div className="btn-group col-xs-12" role="group">
                                                <div>
                                                    <button type="button" className="dropdown-toggle navButton border1px col-xs-12" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        标准补贴
                                                        <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu navUl">
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xs-6" style={{margin:"0px",padding:"0px"}}>
                                            <div className="btn-group col-xs-12" role="group">
                                                <div>
                                                    <button type="button" className="dropdown-toggle navButton border1px col-xs-12" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        标准补贴
                                                        <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu navUl">
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                        <li><a>124</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button className="btn btn-sm btn-info">你好</button>

                    </div>

                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <AAA />,
    document.getElementById('dyjs')
);