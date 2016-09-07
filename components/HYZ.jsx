import React from 'react';
import ReactDOM from 'react-dom';
require('../css/hyz.css');
require("bootstrap-webpack");
require('../css/font-awesome.min.css');
import MyGrid from './myGrid.jsx';

let guDingY;
let guDingX;
class HJFP extends React.Component{
    constructor(props) {
        //直接调用父类构造器进行初始化
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.biaoQianCallBack=this.biaoQianCallBack.bind(this);
        this.state={
            biaoQian:"基本资料"
        }
    }
    render(){
        let biaoQian = ["基本资料","帮扶责任人及责任单位","帮扶对象家庭帮扶计划表","图片"];
        let aa = [];
        let bb = [];
        for(let i=0;i<biaoQian.length;i++){
            if(biaoQian[i] == this.state.biaoQian){
                aa.push(<HJFPBiaoQian name={biaoQian[i]} foucs={true} callBack={this.biaoQianCallBack} />)
            }else{
                aa.push(<HJFPBiaoQian name={biaoQian[i]} foucs={false} callBack={this.biaoQianCallBack} />)
            }
        }
        return(
            //背景
            <div onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} className="juedui" style={{backgroundColor:"rgba(0,0,0,.1)",overflow:"hidden"}}>
                {/*内框  */}
                <div ref="neiKuang" className="juedui" style={{width:"1188px",height:"520px"}}>
                    {/*内框左  */}
                    <div className="pull-left container-fluid" style={{width:"200px",height:"100%",paddingTop:"43px"}}>
                        {aa}
                    </div>
                    {/*内框右  */}
                    <div className="border1px" style={{marginLeft:"200px",height:"100%",backgroundColor:"#ffffff",boxShadow:"-5px 5px 5px #999",borderLeft:"0px"}}>
                        {/*内框右-title  */}
                        <div onMouseDown={this.handleMouseDown}  className="cursor-move" style={{height:"50px",backgroundColor:"#DDDDDD",padding:"0px 20px 0px 20px"}}>
                            <div className="pull-left" style={{lineHeight:"50px",fontSize:"18px",fontWeight:"bold"}}>新增资料</div>
                        </div>
                        <div className="" style={{height:"100%",padding:"20px",overflow:"auto"}}>
                            {
                                this.state.biaoQian == "基本资料"?
                                    <HJFPContentList1 foucs={true} />:<HJFPContentList1 foucs={false} />
                            }

                            {
                                this.state.biaoQian == "帮扶责任人及责任单位"?
                                    <HJFPContentList2 foucs={true} />:<HJFPContentList2 foucs={false} />
                            }

                            {
                                this.state.biaoQian == "帮扶对象家庭帮扶计划表"?
                                    <HJFPContentList3 foucs={true} />:<HJFPContentList2 foucs={false} />
                            }

                            {
                                this.state.biaoQian == "图片"?
                                    <HJFPContentList4 foucs={true} />:<HJFPContentList2 foucs={false} />
                            }

                        </div>
                    </div>
                </div>

                {/*影子*/}
                <div ref="yingZi" className="juedui hidden cursor-move" style={{zIndex:"9999",height:"0px",width:"0px",border:"1px dashed #333333"}}></div>
            </div>
        )
    }
    handleMouseDown(e){
        //获取左上角的位置
        console.log(e.clientY);
        let y = $(this.refs.neiKuang).offset().top;
        let x = $(this.refs.neiKuang).offset().left + 200;
        let width = $(this.refs.neiKuang).width() - 200;
        let height = $(this.refs.neiKuang).height();
        //具象化
        $(this.refs.yingZi).width(width);
        $(this.refs.yingZi).height(height);
        $(this.refs.yingZi).css({"top":y + "px","left":x+"px"});
        $(this.refs.yingZi).removeClass("hidden");

        guDingY = e.clientY - y;
        guDingX = e.clientX - x;
    }
    handleMouseUp(){
        if($(this.refs.yingZi).hasClass("hidden") == false){
            let y = $(this.refs.yingZi).offset().top;
            let x = $(this.refs.yingZi).offset().left - 200;

            $(this.refs.yingZi).addClass("hidden");
            console.log(y);
            console.log(x);
            $(this.refs.neiKuang).css({"top":y + "px","left":x + "px"});
        }
    }
    handleMouseMove(e){
        let y = e.clientY - guDingY;//$(this.refs.neiKuang).offset().top - e.clientY;
        let x = e.clientX - guDingX;//$(this.refs.yingZi).offset().left + 200 - e.clientX;
        $(this.refs.yingZi).css({"top":y + "px","left":x + "px"});
    }
    biaoQianCallBack(e){
        this.setState({
            biaoQian:e
        })
    }
}


class HJFPBiaoQian extends  React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        return(
            <div>
                {
                    this.props.foucs==false?
                        <div className="row mp0" style={{margin:"8px -15px 0px 0px"}}>
                            <button onClick={this.handleClick} className="btn btn-default btn-lg pull-right" style={{borderRadius:"0px",padding:"10px",border:"0px",outline:"none",background:"#aaa",color:"#fff"}}>
                                {this.props.name}
                            </button>
                        </div>
                        :
                        <div className="row mp0" style={{margin:"8px -15px 0px 0px"}}>
                            <button onClick={this.handleClick} className="btn btn-default btn-lg pull-right" style={{borderRadius:"0px",padding:"10px",border:"0px",outline:"none",background:"#fff",color:"#666",boxShadow:"-5px 5px 5px #999"}}>
                                {this.props.name}
                            </button>
                        </div>
                }
            </div>
        )
    }
    handleClick(){
        this.props.callBack(this.props.name);
    }
}


class HJFPContentList1 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let aa = "hidden";
        if(this.props.foucs == true){
            aa = ""
        }
        return(
            <div className={aa} >
                <MyGrid header={["标题1","标题1","标题1","标题1"]} widths={[2,2,2,6]} data={[[1,2,3,4],[2,3,4,5]]} />
            </div>
        )
    }
}

class HJFPContentList2 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let aa = "hidden";
        if(this.props.foucs == true){
            aa = ""
        }
        return(
            <div className={aa}>
                <input className="form-control"/>
            </div>
        )
    }
}

class HJFPContentList3 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let aa = "hidden";
        if(this.props.foucs == true){
            aa = ""
        }
        return(
            <div className={aa}>
                <button>321</button>
            </div>
        )
    }
}

class HJFPContentList4 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let aa = "hidden";
        if(this.props.foucs == true){
            aa = ""
        }
        return(
            <div className={aa}>
                hahah
            </div>
        )
    }
}




ReactDOM.render(
    <HJFP />,
    document.getElementById('HYZ')
);
