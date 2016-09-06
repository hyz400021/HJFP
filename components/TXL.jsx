const React = require('react');
const ReactDOM = require('react-dom');
require('../css/hyz.css');
require("bootstrap-webpack");
require('../css/font-awesome.min.css');

class TXLList extends React.Component{
    constructor(props) {
        //直接调用父类构造器进行初始化
        super(props);
        //show first last data
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this)
    }
    render(){
        let danWeiName = this.props.data.name;
        let data = this.props.data.people;
        let aa = [];
        for(let i=0;i<data.length;i++){
            aa.push(
                <a href={"tel:"+data[i].tel} style={{textDecoration:"none"}}>
                    <div className="col-xs-12 p8 border1px" style={{borderTop:"1px solid rgba(0,0,0,0)"}}>
                        {data[i].name + "(" + data[i].zhiWu + ")"}
                        <span className="pull-right icon-phone-sign" style={{marginRight:"10px",lineHeight:"29px"}}></span>
                    </div>
                </a>);
        }
        return(
            <div className="">
                <div>
                    {
                        this.props.first?
                            <div>
                                <div onTouchEnd={this.handleDown}  onClick={this.handleClick} className="col-xs-12 p8 border1px" style={{backgroundColor:"#E8E8E8"}}>
                                    {danWeiName}
                                    {
                                        this.props.show == danWeiName?
                                            <span className="pull-left icon-minus-sign" style={{marginRight:"10px",lineHeight:"29px"}}></span>
                                            :
                                            <span className="pull-left icon-plus-sign" style={{marginRight:"10px",lineHeight:"29px"}}></span>
                                    }
                                </div>
                                {
                                    this.props.show == danWeiName?
                                        aa
                                        :
                                        null
                                }
                            </div>
                            :
                            <div>
                                <div onMouseDown={this.handleDown} onTouchEnd={this.handleDown} onClick={this.handleClick} className="col-xs-12 p8 border1px" style={{backgroundColor:"#E8E8E8",borderTop:"1px solid rgba(0,0,0,0)"}}>
                                    {danWeiName}

                                    {
                                        this.props.show == danWeiName?
                                            <span className="pull-left icon-minus-sign" style={{marginRight:"10px",lineHeight:"29px"}}></span>
                                            :
                                            <span className="pull-left icon-plus-sign" style={{marginRight:"10px",lineHeight:"29px"}}></span>
                                    }

                                </div>
                                {
                                    this.props.show == danWeiName?
                                        aa
                                        :
                                        null
                                }
                            </div>
                    }
                </div>

            </div>
        )
    }

    handleClick(){
        this.props.callBack(this.props.data.name);
    }

    handleDown(e){
        let btn;
        if($(e.target).hasClass("col-xs-12")){
            btn = $(e.target);
            $(e.target).css({backgroundColor:"#0099FF"})
        }else{
            btn = $(e.target).parent();
            $(e.target).parent().css({backgroundColor:"#0099FF"})
        }

        setTimeout(()=>{
            btn.css({backgroundColor:"#E8E8E8"})
        },400)

    }
}

class TXL extends React.Component{
    constructor(props) {
        //直接调用父类构造器进行初始化
        super(props);
        this.setDanWei = this.setDanWei.bind(this);
        this.state={
            showDanWei:""
        }
    }
    render(){



        // let obj = [
        //     {name:"飞山",people:[{name:"张三",tel:"123456789",zhiWu:"局长"},{name:"李四",tel:"023456789",zhiWu:"书记"}]},
        //     {name:"江东",people:[{name:"王五",tel:"123456789",zhiWu:"局长"},{name:"赵六",tel:"023456789",zhiWu:"书记"}]}
        // ];

        let obj = this.props.obj;
        let aa = [];
        for(let i=0;i<obj.length;i++){

            if(i==0){
                aa.push(<TXLList key={"TXL" + i} show={this.state.showDanWei} first={true} last={false} data={obj[i]} callBack={this.setDanWei} />);
                continue;
            }
            if(i==obj.length-1){
                aa.push(<TXLList key={"TXL" + i} show={this.state.showDanWei} first={false} last={true} data={obj[i]} callBack={this.setDanWei} />);
                continue;
            }
            aa.push(<TXLList key={"TXL" + i} show={this.state.showDanWei} first={false} last={false} data={obj[i]} callBack={this.setDanWei} />);
        }

        return(
            <div className="container p10" style={{fontSize:"19px",margin:"0px auto"}}>
                <div className="row mp0" style={{padding:"0px 10px"}}>
                    {aa}
                </div>
            </div>
        )
    }
    setDanWei(obj){
        // console.log(http.get("http://127.0.0.1:3000/api/TXL"));
        let danWei = this.state.showDanWei;
        if(danWei == obj){
            obj = "";
        }
        this.setState({
            showDanWei:obj
        })
    }
}



TXL.defaultProps = {
    obj: getV()
}


function getV(){
    let obj = [];
    $.ajax({
        type : "get",
        url : "http://120.24.7.142:3000/api/TXL",
        async : false,
        success : function(data,status){
            if(status == "success"){
                obj = data.data;
            }
            else{
                alert("读取数据错误");
                return
            }

        }
    });
    console.log("========================");
    console.log(obj);
    return  obj;
}





ReactDOM.render(
    <TXL />,
    document.getElementById('TXL')
);


