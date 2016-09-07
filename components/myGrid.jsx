import React from 'react';


//基于bootstrap的col
//header={["标题1","标题1","标题1","标题1"]} widths={[2,2,2,6]} data={[[1,2,3,4],[2,3,4,5]]}
//option:{
//    toolBar:["add","delete","clean","deleteEmpty"],
//    readOnly:false
//}

//-----------------hyz 表格
var MyGrid = React.createClass({
    getValue(){
        return(this.state.data)
    },
    setValue(data){
        this.setState({
            data:data,
            focus:{}
        })
    },
    getInitialState(){
        return({
            data:this.props.data,
            focus:{},
            //option:{
            //    toolBar:["add","delete","clean","deleteEmpty"],
            //    readOnly:false
            //}
            option:this.props.option
        })
    },
    render(){
        let toolBar;
        let readOnly;
        if(!this.state.option){
            toolBar = ["add","delete","clean","deleteEmpty"];
            readOnly= false;
        }else{
            if(this.state.option.toolBar){
                toolBar = this.state.option.toolBar;
            }else{
                toolBar = ["add","delete","clean","deleteEmpty"];
            }

            if(!this.state.option.readOnly){
                readOnly = false;
            }else{
                readOnly = true;
            }
        }

        let myOption = {};
        myOption.toolBar = toolBar;
        myOption.readOnly = readOnly;

        let allWidth = 0;
        for(let i=0;i<this.props.widths.length;i++){
            allWidth = allWidth + this.props.widths[i];
        }
        if(allWidth != 12){
            alert("总长度应该为12");
            return;
        }

        if(this.props.header.length != this.props.widths.length){
            alert("表头项数量应该和长度项数量一致");
            return;
        }

        let biaoTouAA = [];
        for(let i=0;i<this.props.header.length;i++){
            biaoTouAA.push(
                <div className={"text-center col-xs-" + this.props.widths[i]}>{this.props.header[i]}</div>
            )
        }
        let gridAA = [];
        for(let i=0;i<this.state.data.length;i++){
            gridAA.push(
                <MyGridRow option={myOption} header={this.props.header} focus={this.state.focus} order={i+1} widths={this.props.widths} data={this.state.data[i]} myCallBack={this.myFocus} />
            )
        }
        return(
            <div style={{backgroundColor:"#FFFFFF"}} className="">
                {
                    //按钮
                }

                {
                    //表头
                }
                <div className="col-xs-12 mp0 p8" style={{boxShadow:"0px 1px 1px #BBBBBB",backgroundColor:"#d5d5d5"}}>
                    <div className="pull-left" style={{width:"50px"}}>
                        <div className="row mp0">
                            <div className="mp0 text-center">序号</div>
                        </div>
                    </div>

                    <div className="" style={{marginLeft:"50px"}}>
                        <div className="col-xs-12 mp0">
                            {biaoTouAA}
                        </div>
                    </div>
                </div>
                {
                    //表格
                }
                <div className="col-xs-12 mp0 xiangdui">
                    {gridAA}
                </div>
                <div className="col-xs-12 mp0">

                    {
                        !readOnly
                            ?
                            <div>
                                {
                                    toolBar.indexOf("add") != -1
                                        ?
                                        <div className="pull-right p8" style={{paddingLeft:"0px"}}>
                                            <button onClick={this.addClick} className="icon-pencil m-r-10 btn btn-sm btn-default"><span style={{marginLeft:"3px"}}>新增</span></button>
                                        </div>
                                        :null
                                }

                                {
                                    toolBar.indexOf("clean") != -1
                                        ?
                                        <div className="pull-right p8" style={{paddingLeft:"0px"}}>
                                            <button onClick={this.qingKongClick} className="icon-tablet m-r-10 btn btn-sm btn-default"><span style={{marginLeft:"3px"}}>清空</span></button>
                                        </div>
                                        :null
                                }

                                {
                                    toolBar.indexOf("delete") != -1
                                        ?
                                        <div className="pull-right p8" style={{paddingLeft:"0px"}}>
                                            <button onClick={this.deleteClick} className="icon-trash m-r-10 btn btn-sm btn-default"><span style={{marginLeft:"3px"}}>删除</span></button>
                                        </div>
                                        :null
                                }

                                {
                                    toolBar.indexOf("deleteEmpty") != -1
                                        ?
                                        <div className="pull-right p8" style={{paddingLeft:"0px"}}>
                                            <button onClick={this.deleteEmptyClick} className="icon-external-link m-r-10 btn btn-sm btn-default"><span style={{marginLeft:"3px"}}>删除空数据</span></button>
                                        </div>
                                        :null
                                }
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        )
    },
    addClick(){
        let aa = [];
        for(let i=0;i<this.props.header.length;i++){
            aa.push("")
        }
        let data = {}
        data = this.state.data;
        data.push(aa);

        this.setState({
            data:data,
            focus:[data.length - 1,0]
        })
    },
    myFocus(data){
        let myData = this.state.data;
        let aa = null;

        if(data[2] !== aa){
            myData[data[0]][data[1]] = data[2];

            this.setState({
                data:myData
            })
        }else{
            this.setState({
                focus:[data[0],data[1]]
            })
        }
    },
    qingKongClick(){
        this.setState({
            data:[],
            focus:[null,null]
        })
    },
    deleteClick(){
        let row = this.state.focus[0];
        let data = this.state.data;
        data.splice(row,1)
        this.setState({
            data:data,
            focus:[null,null]
        })
    },
    deleteEmptyClick(){
        let data = this.state.data;

        for(let i=data.length - 1;i>=0;i--){
            let row = data[i].join("");
            if(row.trim() == ""){
                data.splice(i,1)
            }
        }
        this.setState({
            data:data,
            focus:[null,null]
        })
    }

});


var MyGridRow = React.createClass({
    render(){
        let aa = [];
        for(let i=0;i<this.props.widths.length;i++){
            let row = this.props.order - 1;
            let col = i;
            if(this.props.focus[0] == row && this.props.focus[1] == col){
                aa.push(
                    <MyGridRowEdit option={this.props.option} header={this.props.header} focus={true} row={this.props.order - 1} col={i} width={this.props.widths[i]} data={this.props.data[i]} myCallBack={this.myCallBack}/>
                )
            }else{
                aa.push(
                    <MyGridRowEdit option={this.props.option} header={this.props.header} focus={false} row={this.props.order - 1} col={i} width={this.props.widths[i]} data={this.props.data[i]} myCallBack={this.myCallBack} />
                )
            }

        }

        return(
            <div className="row mp0" style={
            this.props.focus[0] == this.props.order - 1
                  ?
          {borderBottom:"1px solid #CCCCCC",backgroundColor:"#EEE"}
                  :
          {borderBottom:"1px solid #CCCCCC"}
        }>

                <div className="pull-left" style={{width:"50px"}}>
                    <div className="col-xs-12 mp0">
                        <div className="mp0 p6 text-center">{this.props.order}</div>
                    </div>
                </div>

                <div className="col-xs-12 mp0" style={{marginLeft:"50px"}}>
                    <div className="col-xs-12 mp0">
                        {aa}
                    </div>
                </div>
            </div>
        )
    },
    myCallBack(data){

        this.props.myCallBack(data)
    }
});


var MyGridRowEdit = React.createClass({
    render(){
        return(

            <div ref="box" onClick={this.handleClick} className={"p1 text-center col-xs-" + this.props.width} >
                {
                    !this.props.focus
                        ?
                        <div ref="div" className="m-t-b-6 cursor-pointer" style={{minHeight:"20px"}}>{this.props.data}</div>
                        :
                        this.props.option.readOnly
                            ?
                            <div ref="div" className="m-t-b-6 cursor-pointer" style={{minHeight:"20px"}}>{this.props.data}</div>
                            :
                            <input onChange={this.handleChange} onKeyUp={this.onEnter} ref="input" className="text-center m-t-b-6"  defaultValue={this.props.data}
                                   style={{height:"20px",width:"100%",/*color:"#EE2221"*/}} />
                }
            </div>
        )
    },
    handleClick(){
        this.props.myCallBack([this.props.row,this.props.col,null])
    },
    handleChange(e){

        //设置值~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let data = e.target.value;
        this.props.myCallBack([this.props.row,this.props.col,data])
    },
    //componentDidMount(){
    //    if(this.props.focus){
    //        $(this.refs.input).focus();
    //
    //    }
    //},
    componentDidUpdate(){
        if(this.props.focus){
            $(this.refs.input).focus();
        }
    },
    onEnter(e){
        if(e.keyCode==9){
            e.keyCode == 13
        }
        if(e.keyCode==13){
            if(this.props.col == this.props.header.length - 1){
                //下一列
                this.props.myCallBack([this.props.row + 1,0,null])
            }else{
                this.props.myCallBack([this.props.row,this.props.col + 1,null])
            }
        }
    }
});

export default MyGrid;