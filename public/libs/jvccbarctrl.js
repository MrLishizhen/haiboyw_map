//  *****************************************************************************
//  文 件 名：	jbardisplay.js
//  作    者：  wsj
//  版    本：  1.0.0.0
//  日    期：  2014-07-15
//  文件描述：
// 		 电话条的内联界面
//  说    明：
//		 电话条的内联界面，支持easyUI和普通html两种方式
//  修改说明：
// *****************************************************************************

///////////////////////////////////////
// vccbar cmd btn
///////////////////////////////////////
var cmdSetWrapUp         = 0;
var cmdSetBusy           =  cmdSetWrapUp+1;
var cmdSetIdle           =  cmdSetWrapUp+2;
var cmdMakeCall          =  cmdSetWrapUp+3;
var cmdHold              =  cmdSetWrapUp+4;
var cmdRetrieveHold      =  cmdSetWrapUp+5;
var cmdDisconnect        =  cmdSetWrapUp+6;
var cmdTransfer          =  cmdSetWrapUp+7;
var cmdConference        =  cmdSetWrapUp+8;
var cmdAnswer            =  cmdSetWrapUp+9;
var cmdTransferOut       =  cmdSetWrapUp+10;
var cmdConsult           =  cmdSetWrapUp+11;
var cmdSendDTMF          =  cmdSetWrapUp+12;
var cmdBridge            =  cmdSetWrapUp+13;
var cmdAlternate         =  cmdSetWrapUp+14;
var cmdConfigurate       =  cmdSetWrapUp+15;
var cmdForceReset        =  cmdSetWrapUp+16;
var cmdBeginRecord       =  cmdSetWrapUp+17;
var cmdStopRecord        =  cmdSetWrapUp+18;
var cmdListen            =  cmdSetWrapUp+19;
var cmdInsert            =  cmdSetWrapUp+20;
var cmdIntercept         =  cmdSetWrapUp+21;
var cmdForeReleaseCall   =  cmdSetWrapUp+22;
var cmdBeginPlay         =  cmdSetWrapUp+23;
var cmdStopPlay          =  cmdSetWrapUp+24;
var cmdLock              =  cmdSetWrapUp+25;
var cmdUnLock            =  cmdSetWrapUp+26;
var cmdMute              =  cmdSetWrapUp+27;
var cmdCallBack          =  cmdSetWrapUp+28;
var cmdReCall            =  cmdSetWrapUp+29;
var cmdHelp              =  cmdSetWrapUp+30;


var AgentNull                  = 0;
var AgentNotReady              = 1;
var AgentReady                 = 2;
var AgentBusy                  = 3;
var AgentWorkingAfterCall      = 4;

var language_zhcn    = "zh-cn";


function GlAgentStatusTimeSum(){
    application.oJBarDisplayer.AgentStatusTimeSum();
}

var g_lastOne = null;
function JBarMenu(oContainer,id){
	this._oContainer = oContainer;
	this._id = id;
	this._classList = {
		objClass:'',
		MenuClass:'barMenu',
		MenuItemClass:'barMenuItem-enable',
		MenuItemDisClass:'barMenuItem-disable',
		MenuItemMouseOverClass:'barMenuItem-MouseOver'
	};

	this._menu = null;
	var oThis = this;

	this.AddMenuItem = function(name,id,callfun,oParent) {
		if(name == "") {
			var hr = document.createElement("hr");
			hr.size = 1;
			hr.color = "#999999";
			this._menu.appendChild(hr);

			return ;
		}
		var li = document.createElement("LI");
		var oClass = this._classList.MenuItemClass;
		li.innerHTML = name;
		this._menu.appendChild(li);
		li.className = oClass;
		li.onclick = function(){ oThis.OnClickItem(name,id,callfun,oParent);};
		li.onmouseover = function(){  oThis.ChangeLiClass(this,oThis._classList.MenuItemMouseOverClass);}
		li.onmouseout = function(){ oThis.ChangeLiClass(this,oClass)}

	}
	this.RemoveAllItem = function() {
		this._menu.innerHTML = "";
	}
	this.OnClickItem = function(name ,id,callback,oParent) {
		oThis.HiddenMenu();
		if(callback != null){
			callback(name,id,oParent);
		}
	}

	this._Init = function() {
		window.document.onclick = function(){
			if(g_lastOne !== null)
				g_lastOne.HiddenMenu();
			else
				oThis.HiddenMenu();
		};

		this._menu = document.createElement("DIV");
		this._menu.id = oThis._id;
		this._menu.oncontextmenu = function(e){ oThis.stopBubble(e)};
		this._menu.className = this._classList.MenuClass;
		this._menu.style.display = "none";
		window.document.body.appendChild(this._menu);
	}
	this.ChangeLiClass = function(obj,name){
		obj.className = name
	}
	this.ShowMenu = function(e) {
		if(g_lastOne !== null)
			g_lastOne.HiddenMenu();
		g_lastOne = this;
		var e = e || window.event;
		oThis.stopBubble(e);
		var offsetX = e.clientX;
		var offsetY = e.clientY;
		with(this._menu.style)
		{
			display = "block";
			top = offsetY + "px";
			left = offsetX + "px";
		}
	}
	this.HiddenMenu = function() {
		this._menu.style.display = "none";
	}
	this.stopBubble = function(oEvent) {
		if(oEvent.stopPropagation)
			oEvent.stopPropagation();
		else
			oEvent.cancelBubble = true;
		if(oEvent.preventDefault)
			oEvent.preventDefault();
		else
			oEvent.returnValue = false;
	}

	this._Init();
	return this;
}

function JVccBarCtrl(nLeft,nTop,nWidth,nHeight,appName,oContentWindow,oWindow){
	//########################//
	//			属性		  //
	//########################//	
	//公共属性
	this.left			= nLeft;
	this.top			= nTop;
	this.width			= nWidth;
	this.height			= nHeight;
	oWindow = (typeof(oWindow) == "undefined")?null:oWindow;
	this._window = (oWindow==null)?window:oWindow;
	this._contentWindow = (oContentWindow==null)?window:oContentWindow;
	this.id = "oBar_" + Math.ceil(Math.random() * 100);
	this.name = this.id + "_Ctrl";
	this._appName = appName;
	this.language = "";
	this._oMenu = null;
	this._styleName = "";
	
    //show btns
    this._showBtns = new Array();
    this._btnIDs = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16";
	this._btnHideIDs = "12,13";
    this._btnEnableIDs = "";
    this._busySubStatus = "";
    this._busySubStatusSelectedItem = "";
    this._agentStatus = 0;//0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
	this._onRing      = 0;//0：不振铃 1:振铃

    
    this._timerCount = 0;
    this._timer = null;

	this.config ={
		btns:[
			{"id":"0","icon":"Status","name":"状态","eng_name":"status", "tip":"状态", "eng_tip":"agent status"},
			{"id":"1","icon":"SetBusy","name":"示忙","eng_name":"SetBusy", "tip":"示忙", "eng_tip":"SetBusy"},
			{"id":"2","icon":"SetIdle","name":"示闲","eng_name":"SetIdle", "tip":"示闲", "eng_tip":"SetIdle"},
			{"id":"3","icon":"Callout","name":"呼出","eng_name":"Callout", "tip":"呼出", "eng_tip":"Callout"},
			{"id":"4","icon":"Hold","name":"保持","eng_name":"Hold", "tip":"保持", "eng_tip":"Hold"},
			{"id":"5","icon":"Retrieve","name":"接回","eng_name":"Retrieve", "tip":"接回", "eng_tip":"Retrieve"},
			{"id":"6","icon":"Disconnect","name":"挂断","eng_name":"Disconnect", "tip":"挂断", "eng_tip":"Disconnect"},
			{"id":"7","icon":"Transfer","name":"转移","eng_name":"Transfer", "tip":"转移", "eng_tip":"Transfer"},
			{"id":"8","icon":"Conference","name":"会议","eng_name":"Conference", "tip":"会议", "eng_tip":"Conference"},
			{"id":"9","icon":"Answer","name":"应答","eng_name":"Answer", "tip":"应答", "eng_tip":"Answer"},
			{"id":"10","icon":"TransferOut","name":"转出","eng_name":"TransferOut", "tip":"转出", "eng_tip":"TransferOut"},
			{"id":"11","icon":"Consult","name":"咨询","eng_name":"Consult", "tip":"咨询", "eng_tip":"Consult"},
			{"id":"12","icon":"SendDtmf","name":"再拨","eng_name":"SendDtmf", "tip":"二次拨号", "eng_tip":"SendDtmf"},
			{"id":"13","icon":"Bridge","name":"桥接","eng_name":"Bridge", "tip":"桥接", "eng_tip":"Bridge"},
			{"id":"14","icon":"AlterNate","name":"切换","eng_name":"AlterNate", "tip":"切换", "eng_tip":"AlterNate"},
			{"id":"15","icon":"Setting","name":"设置","eng_name":"Setting", "tip":"设置", "eng_tip":"Setting"},
			{"id":"16","icon":"ForceReset","name":"复位","eng_name":"ForceReset", "tip":"强制复位", "eng_tip":"ForceReset"},
			{"id":"17","icon":"Record","name":"录音","eng_name":"Record", "tip":"录音", "eng_tip":"Record"},
			{"id":"18","icon":"StopRecord","name":"停录","eng_name":"StopRecord", "tip":"停录", "eng_tip":"StopRecord"},
			{"id":"19","icon":"Listen","name":"监听","eng_name":"Listen", "tip":"监听", "eng_tip":"Listen"},
			{"id":"20","icon":"Insert","name":"强插","eng_name":"Insert", "tip":"强插", "eng_tip":"Insert"},
			{"id":"21","icon":"Intercept","name":"拦截","eng_name":"Intercept", "tip":"拦截", "eng_tip":"Intercept"},
			{"id":"22","icon":"ForeReleaseCall","name":"强拆","eng_name":"ForeReleaseCall", "tip":"强拆", "eng_tip":"ForeReleaseCall"},
			{"id":"23","icon":"Play","name":"放音","eng_name":"Play", "tip":"放音", "eng_tip":"Play"},
			{"id":"24","icon":"StopPlay","name":"停放","eng_name":"StopPlay", "tip":"结束放音", "eng_tip":"StopPlay"},
			{"id":"25","icon":"Lock","name":"加锁","eng_name":"Lock", "tip":"加锁", "eng_tip":"Lock"},
			{"id":"26","icon":"unLock","name":"解锁","eng_name":"unLock", "tip":"解锁", "eng_tip":"unLock"},
			{"id":"27","icon":"Mute","name":"静音","eng_name":"Mute", "tip":"静音", "eng_tip":"Mute"},
			{"id":"28","icon":"Callback","name":"返回","eng_name":"Callback", "tip":"返回", "eng_tip":"Callback"},
			{"id":"29","icon":"Recall","name":"重拨","eng_name":"Recall", "tip":"重拨", "eng_tip":"Recall"},
			{"id":"30","icon":"Help","name":"辅助","eng_name":"Help", "tip":"辅助", "eng_tip":"Help"},
		],
		statuss:[
			{"id":"0","icon":"AgentNull","name":"未登录","eng_name":"AgentNull", "tip":"未登录", "eng_tip":"AgentNull"},
			{"id":"1","icon":"AgentNotReady","name":"忙碌","eng_name":"AgentNotReady", "tip":"忙碌", "eng_tip":"AgentNotReady"},
			{"id":"2","icon":"AgentReady","name":"空闲","eng_name":"AgentReady", "tip":"空闲", "eng_tip":"AgentReady"},
			{"id":"3","icon":"AgentBusy","name":"呼叫中","eng_name":"AgentBusy", "tip":"呼叫中", "eng_tip":"AgentBusy"},
			{"id":"4","icon":"AgentWorkingAfterCall","name":"后处理","eng_name":"AgentWorkingAfterCall", "tip":"后处理", "eng_tip":"AgentWorkingAfterCall"},
		],
	},

	// 主图相关的HTML对象
	this.oBarDisplay		= null;	
	this.oBusyMenu   		= null;	

	//########################//
	//			内部方法	　    //
	//########################//
	this.getBrowserLanguage = function(){
		var type = navigator.appName;
		var lang = "";
		if(type == "Netscape") {
			lang = navigator.language;
		}
		else{
			lang = navigator.userLanguage;
		}
		return lang.toLowerCase();
	}
	this._getCmdTextByID = function (id){
		if(this._styleName == "depBlueCirle")
			return "";
		id = parseInt(id);
		if(id<cmdSetWrapUp || id>cmdHelp)
			return "";
		return (this.language == language_zhcn)?this.config.btns[id]["name"]:this.config.btns[id]["eng_name"];
	}
	this._getCmdIconByID = function (id){
		id = parseInt(id);
		if(id<cmdSetWrapUp || id>cmdHelp)
			return "";
		return this.config.btns[id]["icon"];
	}
	this._getStatusTextByID = function (id){
		id = parseInt(id);
		if(id<AgentNull || id>AgentWorkingAfterCall)
			return "";
		return (this.language == language_zhcn)?this.config.statuss[id]["name"]:this.config.statuss[id]["eng_name"];
	}

	this._createObject = function _createObject() {
		this.language = this.getBrowserLanguage();
	    this.oBarDisplay = this._window.document.createElement("DIV");
	    this.oBarDisplay.style.cursor = "move";
	    this.oBarDisplay.style.position = "absolute";
		this.oBarDisplay.style.padding = "5px";
	    this.oBarDisplay.style.left = this.left+"px";
	    this.oBarDisplay.style.top = this.top+"px";
	    this.oBarDisplay.style.width = this.width + "px";
	    this.oBarDisplay.style.height = this.height + "px";
		this.oBarDisplay.style.background = "transparent"; //背景透明
		this.oBarDisplay.style.border = "3px";  //边框为空
	    this.oBarDisplay.className = "barFrame";
		this.oBarDisplay.id = this.name;
		if(this._contentWindow == this._window){
		    this._contentWindow.document.body.appendChild(this.oBarDisplay);
		}
		else{
		    this._contentWindow.appendChild(this.oBarDisplay);
		}
		this.oBarDisplay.innerHTML ="";
		// 创建电话条控件
		this.SerialBtn(this._btnIDs,this._btnHideIDs);
        this.showAgentStatusTimer();
	}
	this._getShowIDs = function(showIDs,hideID){
	    if(typeof(hideID) == "undefined"){
	        hideID = "";
	    }
	    if(hideID == "")
	        return showIDs;
	    var allBtns = showIDs.split(","); 	
	    var hideBtns = hideID.split(","); 
	    var arrReturn = new Array();
	    for( var i=0;i<allBtns.length;i++){
	        var bFind = false;
	        for(var j=0;j<hideBtns.length;j++){
	            if(allBtns[i] == hideBtns[j] ){
	                bFind = true;
	                break;
	            }
	        }
	        if(bFind == false)
	            arrReturn.push(allBtns[i]);
	    }
	    return arrReturn.join(",");
	}
	this._clearBtns = function(){
	    for( var i=0;i<this._showBtns.length;i++) {
           var oBtn = this._contentWindow.document.getElementById("btn_"+this._showBtns[i]);
           if(oBtn == null)
                return ;
   		    this.oBarDisplay.removeChild(oBtn);	    
	    }
	}
	this._getIdFlag = function(id){
		for( var i=0;i<this._showBtns.length;i++) {
			if(this._showBtns[i] == id)
				return true;
		}
		return false;
	}

	this._popDlg = function(key){
		var spevent = window.event || arguments.callee.caller.arguments[0];
		application.oJVccBar.PopDlg(
			key,
			parseInt(spevent.screenX),
			parseInt(spevent.screenY)
		);
	}
	this._btnClick = function (id){
		if( id == "btn_down_1"){
			if(this._oMenu != null){
				var spevent = window.event || arguments.callee.caller.arguments[0];
				this._oMenu.ShowMenu(spevent);
			}
			return;
		}

		if(!this._getIdFlag(id)) return ;
	    var param = ""; 
	    switch(parseInt(id))
	    {
	    case cmdSetBusy:
	        application.oJVccBar.SetBusy(0);
	        break;
	    case cmdSetIdle:
	        application.oJVccBar.SetIdle();
	        break;
	    case cmdMakeCall:
			this._popDlg("CallOutDlg");
			break;
	    case cmdHold:
	        application.oJVccBar.Hold();
	        break;
	    case cmdRetrieveHold:
	        application.oJVccBar.RetrieveHold();
	        break;
	    case cmdDisconnect:
	        application.oJVccBar.Disconnect();
	        break;
	    case cmdTransfer:
	        application.oJVccBar.Transfer();
	        break;
	    case cmdConference:
	        application.oJVccBar.Conference();
	        break;
	    case cmdAnswer:
	        application.oJVccBar.Answer();
	        break;
	    case cmdTransferOut:
			this._popDlg("TransferOutDlg");
			break;
	    case cmdConsult:
			this._popDlg("ConsultDlg");
			break;
	    case cmdSendDTMF:
			this._popDlg("SendDtmfDlg");
			break;
	    case cmdBridge:
	        break;
	    case cmdAlternate:
	        break;
	    case cmdConfigurate:
			this._popDlg("MainSettingDlg");
	        break;
	    case cmdForceReset:
	        application.oJVccBar.ForceReset();
	        break;
	    case cmdBeginRecord:
            application.oJVccBar.BeginRecord("","");
	        break;
	    case cmdStopRecord:
            application.oJVccBar.StopRecord("");
	        break;
	    case cmdListen:
	        break;
	    case cmdInsert:
	        break;
	    case cmdIntercept:
	        break;
	    case cmdForeReleaseCall:
	        break;
	    case cmdBeginPlay:
	        break;
	    case cmdStopPlay:
	        break;
	    case cmdLock:
	        break;
	    case cmdUnLock:
	        break;
	    case cmdMute:
	        break;
	    case cmdCallBack:
	        break;
	    case cmdReCall:
	        break;
	    case cmdHelp:
	        break;
	    }
	    
	}
	this.OnMenuClick = function(name,id,oThis) {
		application.oJVccBar.SetBusy(parseInt(id));
	}
	
	//########################//
	//外部方法
	//########################//
	//1）、初始化电话条
	this.SerialBtn = function (showIDs, hideID) {
		this._btnIDs = showIDs;
		this._btnHideIDs = hideID;
	    this._clearBtns();
	    this.oBarDisplay.innerHTML = "";
	    showIDs = this._getShowIDs(showIDs, hideID);
	    this._showBtns = showIDs.split(",");
	    for (var i = 0; i < this._showBtns.length; i++) {
			    var oBtn = this._window.document.createElement("DIV");
				oBtn.id = "btn_" + this._showBtns[i];
			    if(this._showBtns[i] == cmdSetWrapUp){
					oBtn.className = "asicon asicon-"+this.config.statuss[this._agentStatus]["icon"];
					oBtn.innerHTML = "<label class='barText'>" + this._getStatusTextByID([this._agentStatus]) + "</label>";
				}
				else{
					oBtn.className = "enicon enicon-"+this._getCmdIconByID(this._showBtns[i]);
					oBtn.innerHTML = "<label class='barText'>"+this._getCmdTextByID(this._showBtns[i])+"</label>";
				}
			    oBtn.setAttribute("onclick", this._appName+"._btnClick('" + this._showBtns[i] + "')");
	            this.oBarDisplay.appendChild(oBtn);
			    if(this._showBtns[i] == cmdSetBusy){
					var oBtnSplit = this._window.document.createElement("DIV");
					oBtnSplit.id = "btn_down_" + this._showBtns[i];
					oBtnSplit.setAttribute("onclick", this._appName+"._btnClick('" + oBtnSplit.id + "')");
					oBtnSplit.className = "agentBusy-split-no";
					this.oBarDisplay.appendChild(oBtnSplit);
		    	}

		}
	    this.SetSubBusyStatus(this._busySubStatus);
	}
	//根据电话条事件改变按钮状态
	this.ChangeBtnStatus = function(btns){
	    this._btnEnableIDs = btns;
	    for( var i=0;i<this._showBtns.length;i++) {
			var oBtn = document.getElementById("btn_"+this._showBtns[i]);
			if(oBtn == null)
				continue;
			if(this._showBtns[i] == cmdSetWrapUp) {
				oBtn.className = "asicon asicon-" + this.config.statuss[this._agentStatus]["icon"];
			}
			else{
				oBtn.className = "unicon unicon-"+this._getCmdIconByID(this._showBtns[i]);
				if(this._showBtns[i] == cmdSetBusy) {
					var oBtnSplit = document.getElementById("btn_down_"+this._showBtns[i]);
					if(oBtnSplit != null)
						oBtnSplit.className = "agentBusy-split-no";
				}
			}
	    }

	    var arrbtn = btns.split("|"); 	
	    for(var j=0;j<arrbtn.length;j++) {
	    	var id = parseInt(arrbtn[j]);
			var oBtn = document.getElementById("btn_"+arrbtn[j]);
			if(oBtn == null)
				continue;
			if(id == cmdSetWrapUp) {
				oBtn.className = "asicon asicon-" + this.config.statuss[this._agentStatus]["icon"];
			}
			else{
				oBtn.className = "enicon enicon-"+this._getCmdIconByID(id);
				if(id == cmdSetBusy) {
					var oBtnSplit = document.getElementById("btn_down_"+id);
					if(oBtnSplit != null)
						oBtnSplit.className = "agentBusy-split";
				}
			}
	    }
	}
	//设置忙碌子状态
	this.SetSubBusyStatus = function(param){
	    this._busySubStatus = param;
	    var busyID = cmdSetBusy.toString();
		if(this._busySubStatus != ""){
			if(this._oMenu == null)
				this._oMenu = new JBarMenu(this._window,"subBusyMenu");
			else
				this._oMenu.RemoveAllItem();
			var  arrMenuItem = param.split("$");
			for(var i=0;i<arrMenuItem.length;i++)
			{
				var item = arrMenuItem[i].split("|");
				this._oMenu.AddMenuItem(item[1],parseInt(item[0]),this.OnMenuClick,this);
			}
		}

        this.ChangeBtnStatus(this._btnEnableIDs);
	}
	this.SetRingFlag = function(bRing) {
		this._onRing = bRing;
	}
	this.SetSubBusySelectedItem = function(itemIndex){
		if(this._busySubStatus == "")
			return ;

		var  arrMenuItem = this._busySubStatus.split("$");
		for(var i=0;i<arrMenuItem.length;i++) {
			var item = arrMenuItem[i].split("|");
			if(parseInt(item[0]) == itemIndex){
				this._busySubStatusSelectedItem = item[1];
				this._timerCount = 0;
				break;
			}
		}
	}

	//设置座席子状态,从而实现座席
	this.BeginAgentStatusTimer = function(){
		if(this._timer == null)
			this._timer = setInterval( GlAgentStatusTimeSum ,1000);
	}
	this.StopAgentStatusTimer = function(){
		if(this._timer != null) {
			clearInterval(this._timer);
			this._timer = null;
		}
	}
	this.SetAgentStatus = function(agentStatus){
	    //通话算一个状态
	    if(this._agentStatus == agentStatus &&  this._agentStatus != 3)
	        return;
	    this._agentStatus = agentStatus;
	    this._timerCount = 0;
	    if(this._agentStatus>0) {
            this.BeginAgentStatusTimer();
	    }
	    else {
            this.StopAgentStatusTimer();
            this.showAgentStatusTimer();
	    }
	}

	//统计电话条某个状态的时间
	this.AgentStatusTimeSum = function(){
	   this._timerCount = this._timerCount+1;
	   this.showAgentStatusTimer();
    }
    this.getTimerString = function  (len){  
        if(len == 0)
            return "";        
         var  hour = parseInt(len/3600);
	     hour =(hour<10 ? "0"+hour:hour);
	     if(hour == "00")
	        hour = "";
	     else
	        hour = hour+":"
	        
	     var  minute = parseInt((len%3600)/60);
	     minute =(minute<10 ? "0"+minute:minute);
	     var  second = len%60;
	     second =(second<10 ? "0"+second:second);
    	 
	    return (hour.toString()+minute.toString()+":"+second.toString());
    }
    this.getTextByStatus = function getTextByStatus(){
		if(this._agentStatus == 1){
	        if(this._busySubStatusSelectedItem != "")
			    return this._busySubStatusSelectedItem;
		    if(this.language == language_zhcn)
		        return "忙碌";
		    else
		        return "busy";
	    }
	    else if(this._agentStatus == 2){
		    if(this.language == language_zhcn)
    			return "就绪";
		    else
		        return "idle";
	    }
	    else if(this._agentStatus == 3){
	    	if(this._onRing == 1)
			{
				if(this.language == language_zhcn)
					return "振铃";
				else
					return "alerting";
			}
			else
			{
				if(this.language == language_zhcn)
					return "通话中";
				else
					return "calling";
			}
	    }
	    else if(this._agentStatus == 4){
		    if(this.language == language_zhcn)
    			return "后续态";
		    else
		        return "wrapup";
	    }
	    else{
		    if(this.language == language_zhcn)
    			return "未登录";
		    else
		        return "null";
	    }	
    }
    this.showAgentStatusTimer = function (){
	    var busyID = cmdSetWrapUp.toString();
		var oBtn = this._window.document.getElementById("btn_"+busyID);
		if(oBtn == null)
			return ;
		if(this._timerCount == 0)
			oBtn.innerHTML = "<label class='barText'>"+this.getTextByStatus()+"</label>";
		else
			oBtn.innerHTML = "<label class='statusText'>"+this.getTextByStatus()+":"+this.getTimerString(this._timerCount)+"</label>";
    }
    this.ShowSelfPrompt = function(code,description){
    }
    this.SetUIStyle = function(styleName){
		this._styleName = styleName;
		this.oBarDisplay.innerHTML ="";
		// 创建电话条控件
		this.SerialBtn(this._btnIDs,this._btnHideIDs);
		this.showAgentStatusTimer();

	}

	//--------------------------------------------------------------------------------------------------
	// 调整显示区域的大小
	//--------------------------------------------------------------------------------------------------
	this.show = function show(border)	{
		if( this.oBarDisplay )
		{
			if(typeof(border) == "undefined" )
				border = 0;
			if(border>0)
				this.oBarDisplay.style.border =  "1px solid #008AC6";
			else
				this.oBarDisplay.style.border = "0px";
		}
		//this.resize(this.left,this.top,this.width,this.height);
	}
	this.resize=function resize(nLeft,nTop,nWidth,nHeight){
		this.left	= (typeof(nLeft)=="number")?nLeft:0;
		this.top	= (typeof(nTop)=="number")?nTop:0;
		this.width	= (nWidth>0)?nWidth:100;
		this.height	= (nHeight>0)?nHeight:100;
		with(this.oBarDisplay.style)
		{
			pixelWidth		= this.width;
			pixelHeight		= this.height;
			pixelLeft		= this.left;
			pixelTop		= this.top;
		}
	}

	this._createObject();
	
	return this;
}

var NotSurrport_Jquery = 0;
var Surrport_Jquery = NotSurrport_Jquery+1;

function BeginAgentStatusTimer() {
    if(application.oJBarDisplayer._timer == null)
        application.oJBarDisplayer._timer = setInterval( GlAgentStatusTimeSum ,1000);
}
function StopAgentStatusTimer() {
    if(application.oJBarDisplayer._timer != null)
    {
        clearInterval(application.oJBarDisplayer._timer);
        application.oJBarDisplayer._timer = null;
    }
}


function JVccBarEasyUICtrl(nLeft,nTop,nWidth,nHeight,oContentWindow,oWindow) {
    //########################//
    //			属性		  //
    //########################//
    //公共属性
    this.left			= nLeft;
    this.top			= nTop;
    this.width			= nWidth;
    this.height			= nHeight;
    oWindow = (typeof(oWindow) == "undefined")?null:oWindow;
    this._window = (oWindow==null)?window:oWindow;
    this._contentWindow = (oContentWindow==null)?window:oContentWindow;
    this.id = "oBar_" + Math.ceil(Math.random() * 100);
    this.name = this.id + "_Ctrl";
    this.language = getLocalLanguage();
    this.bPopDlg = true;
    this.recordFileName = "";

    //all btns
    this._arrBtnText = new Array();
    this._arrBtnId = new Array();
    this._arrBtnIcon = new Array();

    //show btns
    this._showBtns = new Array();
    this._btnIDs = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16";
    this._btnEnableIDs = "0|15";
    this._busySubStatus = "";
    this._busySubStatusSelectedItem = -1;
    this._agentStatus = 0;//0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
    this._onRing      = 0;//0：不振铃 1:振铃

    this._timerCount = 0;
    this._timer = null;


    // 主图相关的HTML对象
    this.oBarDisplay		= null;
    this.oBusyMenu   		= null;
    //
    this.oInputDisplay		= null;

    this.errDescription = "";		// 错误提示信息

    //########################//
    //			方法	　    //
    //########################//

    //内部方法
    this._serial = function(){
        if(this._arrBtnId.length>0)
            return ;
        var allCmd = "工作状态|示忙|示闲|呼出|保持|接回|挂断|转移|会议|应答|转出|咨询|再拨|桥接|切换|设置|强复位|录音|停录|监听|强插|拦截|强拆|放音|结束|加锁|解锁|静音|回呼|重拨|辅助";
        if( getLocalLanguage() != lg_zhcn )
            allCmd = "Status|SetBusy|SetIdle|Callout|Hold|Retrieve|Disconnect|Transfer|Conference|Answer|TransferOut|Consult|SendDtmf|Bridge|AlterNate|Setting|ForceReset|Record|StopRecord|Listen|Insert|Intercept|ForeReleaseCall|Play|StopPlay|Lock|unLock|Mute|Callback|Recall|Help";
        var arrIndex = allCmd.split("|");
        var allIcon = "icon-blank|icon-add|icon-edit|icon-remove|icon-save|icon-cut|icon-ok|icon-no|icon-cancel|icon-reload|icon-search|icon-print|icon-help|icon-undo|icon-redo|icon-back|icon-sum|icon-tip|icon-tip|icon-tip|icon-filter|icon-tip|icon-filter|icon-tip|icon-filter|icon-blank|icon-blank|icon-tip|icon-tip|icon-tip|icon-tip";
        //var allIcon = "icon-Status|icon-SetBusy|icon-SetIdle|icon-Callout|icon-Hold|icon-Retrieve|icon-Disconnect|icon-Transfer|icon-Conference|icon-Answer|icon-TransferOut|icon-Consult|icon-SendDtmf|icon-Bridge|icon-AlterNate|icon-Setting|icon-ForceReset|icon-Record|icon-StopRecord|icon-Listen|icon-Insert|icon-Intercept|icon-ForeReleaseCall|icon-Play|icon-StopPlay|icon-Lock|icon-unLock|icon-Mute|icon-Callback|icon-Recall|icon-Help";
        var arrIcon = allIcon.split("|");

        for( var i=0;i<arrIndex.length;i++){
            this._arrBtnText.push(arrIndex[i]);
            this._arrBtnId.push(i);
            this._arrBtnIcon.push(arrIcon[i]);
        }
    }
    this._getCmdTextByID = function (id){
        return getRelatedStringArrayValue(this._arrBtnId,this._arrBtnText,id);
    }
    this._getCmdIconByID = function (id){
        return getRelatedStringArrayValue(this._arrBtnId,this._arrBtnIcon,id);
    }

    this._createObject = function _createObject() {
        this._serial();

        this.oBarDisplay = this._window.document.createElement("DIV");
        this.oBarDisplay.style.cursor = "move";
        this.oBarDisplay.style.position = "absolute";
        this.oBarDisplay.style.padding = "5px";
        this.oBarDisplay.style.left = this.left+"px";
        this.oBarDisplay.style.top = this.top+"px";
        this.oBarDisplay.style.width = this.width + "px";
        this.oBarDisplay.style.height = this.height + "px";
        this.oBarDisplay.style.background = "transparent"; //背景透明
        this.oBarDisplay.style.border = "0px";  //边框为空
        this.oBarDisplay.className = "easyui-panel";
        this.oBarDisplay.id = this.name;
        if(this._contentWindow == this._window){
            this._contentWindow.document.body.appendChild(this.oBarDisplay);
        }
        else{
            this._contentWindow.appendChild(this.oBarDisplay);
        }
        this.oBarDisplay.innerHTML ="";


        // 创建电话条控件
        this.SerialBtn(this._btnIDs);
        this.showAgentStatusTimer();
    }
    this._getShowIDs = function(showIDs,hideID){
        if(typeof(hideID) == "undefined")
        {
            hideID = "";
        }
        if(hideID == "")
            return showIDs;
        var allBtns = showIDs.split(",");
        var hideBtns = hideID.split(",");
        var arrReturn = new Array();
        for( var i=0;i<allBtns.length;i++){
            var bFind = false;
            for(var j=0;j<hideBtns.length;j++){
                if(allBtns[i] == hideBtns[j] ){
                    bFind = true;
                    break;
                }

            }
            if(bFind == false)
                arrReturn.push(allBtns[i]);
        }
        return arrReturn.join(",");
    }
    this._makeSubBusyMenuHtml = function(param){
        var menuHtml = "";
        if(param == "")
            return menuHtml ;
        var  arrMenuItem = param.split("$");
        for(var i=0;i<arrMenuItem.length;i++)
        {
            var item = arrMenuItem[i].split("|");
            if(item.length == 2)
            {
                if(this._busySubStatusSelectedItem == parseInt(item[0]))
                    menuHtml = menuHtml + "<div data-options=\"iconCls:'icon-ok'\" onclick=\"application.oJVccBar.SetBusy("+item[0]+");\">"+item[1]+"</div>";
                else
                    menuHtml = menuHtml + "<div onclick=\"application.oJVccBar.SetBusy("+item[0]+");\">"+item[1]+"</div>";
            }
        }
        return menuHtml;
    }
    this._clearBtns = function(){
        for( var i=0;i<this._showBtns.length;i++)
        {
            var oBtn = this._contentWindow.document.getElementById("btn_"+this._showBtns[i]);
            if(oBtn == null)
                return ;
            this.oBarDisplay.removeChild(oBtn);
        }
    }
    this._popDlg = function(key){
        if(!this.bPopDlg)
        	return ;
        var spevent = window.event || arguments.callee.caller.arguments[0];
        application.oJVccBar.PopDlg(
            key,
            parseInt(spevent.screenX),
            parseInt(spevent.screenY)
        );
    }
    this._btnClick = function (id){
        var param = "";
        switch(parseInt(id))
        {
            case cmdSetBusy:
                application.oJVccBar.SetBusy(0);
                break;
            case cmdSetIdle:
                application.oJVccBar.SetIdle();
                break;
            case cmdMakeCall:
                this._popDlg("CallOutDlg");
                break;
            case cmdHold:
                application.oJVccBar.Hold();
                break;
            case cmdRetrieveHold:
                application.oJVccBar.RetrieveHold();
                break;
            case cmdDisconnect:
                application.oJVccBar.Disconnect();
                break;
            case cmdTransfer:
                application.oJVccBar.Transfer();
                break;
            case cmdConference:
                application.oJVccBar.Conference();
                break;
            case cmdAnswer:
                application.oJVccBar.Answer();
                break;
            case cmdTransferOut:
            	this._popDlg("TransferOutDlg");
            	break;
            case cmdConsult:
                this._popDlg("ConsultDlg");
                break;
            case cmdSendDTMF:
                this._popDlg("SendDtmfDlg");
                break;
            case cmdBridge:
                break;
            case cmdAlternate:
                break;
            case cmdConfigurate:
                this._popDlg("MainSettingDlg");
                break;
            case cmdForceReset:
                application.oJVccBar.ForceReset();
                break;
            case cmdBeginRecord:
                application.oJVccBar.BeginRecord("",this.recordFileName);
                break;
            case cmdStopRecord:
                application.oJVccBar.StopRecord("");
                break;
            case cmdListen:
                break;
            case cmdInsert:
                break;
            case cmdIntercept:
                break;
            case cmdForeReleaseCall:
                break;
            case cmdBeginPlay:
                break;
            case cmdStopPlay:
                break;
            case cmdLock:
                break;
            case cmdUnLock:
                break;
            case cmdMute:
                break;
            case cmdCallBack:
                break;
            case cmdReCall:
                break;
            case cmdHelp:
                break;
        }

    }

    //########################//
    //外部方法
    //########################//
    //1）、初始化电话条
    this.SerialBtn = function (showIDs, hideID) {
        this._clearBtns();
        this.oBarDisplay.innerHTML = "";
        showIDs = this._getShowIDs(showIDs, hideID);
        this._showBtns = showIDs.split(",");
        for (var i = 0; i < this._showBtns.length; i++) {
            if (this.displayType == NotSurrport_Jquery) {
                var oBtn = this._window.document.createElement("<input type='button' value='" + this._getCmdTextByID(this._showBtns[i]) + "' id='btn_" + this._showBtns[i] + "' onclick='application.oJBarDisplayer._btnClick(" + this._showBtns[i] + ");' />");
                this.oBarDisplay.appendChild(oBtn);
            }
            else {
                var oBtn = this._window.document.createElement("a");
                oBtn.id = "btn_" + this._showBtns[i];
                oBtn.btnType = "link";
                oBtn.href = "#";
                oBtn.setAttribute("class", "easyui-linkbutton");
                oBtn.setAttribute("data-options", "plain:true,iconCls:'" + this._getCmdIconByID(this._showBtns[i]) + "'");
                oBtn.innerHTML = this._getCmdTextByID(this._showBtns[i]);
                oBtn.setAttribute("onclick", "application.oJBarDisplayer._btnClick('" + this._showBtns[i] + "')");
                this.oBarDisplay.appendChild(oBtn);
            }
        }
        if (this.displayType == Surrport_Jquery) {
            // $.parser.parse();
            $.parser.parse('#' + this.name);
        }
        this.SetSubBusyStatus(this._busySubStatus);
    }
    //根据电话条事件改变按钮状态
    this.ChangeBtnStatus = function(btns){
        this._btnEnableIDs = btns;
        for( var i=0;i<this._showBtns.length;i++)
        {
            if(this.displayType == NotSurrport_Jquery)
            {
                var oBtn = this._window.document.getElementById("btn_"+this._showBtns[i]);
                oBtn.disabled = true;
            }
            else
            {
                $("#btn_"+this._showBtns[i]).linkbutton('disable');
            }
        }
        var arrbtn = btns.split("|");
        for(var j=0;j<arrbtn.length;j++)
        {
            if(this.displayType == NotSurrport_Jquery)
            {
                var oBtn = this._window.document.getElementById("btn_"+arrbtn[j]);
                if(oBtn == null)
                    continue;
                oBtn.disabled = false;
            }
            else
            {
                $("#btn_"+arrbtn[j]).linkbutton('enable');
            }
        }
    }
    this.SetRingFlag = function(bRing) {
        this._onRing = bRing;
    }
    this.SetRecordFileName = function(strFileName){
        this.recordFileName = strFileName;
	}

    this.SetSubBusySelectedItem = function(itemIndex){
        this._busySubStatusSelectedItem = itemIndex;
        this.SetSubBusyStatus(this._busySubStatus);
    }
    //设置忙碌子状态
    this.SetSubBusyStatus = function(param){
        this._busySubStatus = param;
        var busyID = cmdSetBusy.toString();
        var oBtn = this._window.document.getElementById("btn_"+busyID);
        if(oBtn == null)
            return ;
        if(this.oBusyMenu != null) {
            if(this._contentWindow == this._window){
                this._contentWindow.document.body.removeChild(this.oBusyMenu);
            }
            else{
                this._contentWindow.removeChild(this.oBusyMenu);
            }
            this.oBusyMenu = null;
        }
        if(this.oBusyMenu == null) {
            this.oBusyMenu = this._window.document.createElement("DIV");
            this.oBusyMenu.id = "busymenu";
            this.oBusyMenu.style.width ="150px";
            if(this._contentWindow == this._window){
                this._contentWindow.document.body.appendChild(this.oBusyMenu);
            }
            else{
                this._contentWindow.appendChild(this.oBusyMenu);
            }
        }

        var  menuHtml = this._makeSubBusyMenuHtml(param);
        this.oBusyMenu.innerHTML = menuHtml;

        if(menuHtml == "") {
            if(this._contentWindow == this._window){
                this._contentWindow.document.body.removeChild(this.oBusyMenu);
            }
            else{
                this._contentWindow.removeChild(this.oBusyMenu);
            }
            this.oBusyMenu = null;
            oBtn.setAttribute("class", "easyui-linkbutton");
            oBtn.setAttribute("data-options", "plain:true,iconCls:'"+this._getCmdIconByID(busyID)+"'");
            oBtn.innerHTML = this._getCmdTextByID(busyID);
        }
        else{
            oBtn.setAttribute("class", "easyui-menubutton");
            oBtn.setAttribute("data-options", "menu:'#busymenu',iconCls:'"+this._getCmdIconByID(busyID)+"'");
            oBtn.innerHTML = this._getCmdTextByID(busyID);
        }

        $.parser.parse();
//		$.parser.parse('#'+this.name);
        this.ChangeBtnStatus(this._btnEnableIDs);
    }
    //执行变化条忙碌子状态命令
    this.SetSubBusy = function (cmdId,cmdText){
        this._busySubStatusSelectedItem = cmdText;
        application.oJVccBar.SetBusy(cmdId);
    }
    //设置座席子状态,从而实现座席
    this.SetAgentStatus = function(agentStatus){
        //通话算一个状态
        if(this._agentStatus == agentStatus &&  this._agentStatus != 3)
            return;
        this._agentStatus = agentStatus;
        this._timerCount = 0;
        if(this._agentStatus>0) {
            BeginAgentStatusTimer();
        }
        else {
            StopAgentStatusTimer();
        }
    }
    //统计电话条某个状态的时间
    this.AgentStatusTimeSum = function(){
        this._timerCount = this._timerCount+1;
        this.showAgentStatusTimer();
    }
    this.getTimerString = function  (len){
        if(len == 0)
            return "";
        var  hour = parseInt(len/3600);
        hour =(hour<10 ? "0"+hour:hour);
        if(hour == "00")
            hour = "";
        else
            hour = hour+":"

        var  minute = parseInt((len%3600)/60);
        minute =(minute<10 ? "0"+minute:minute);
        var  second = len%60;
        second =(second<10 ? "0"+second:second);

        return (hour.toString()+minute.toString()+":"+second.toString());
    }
    this.getTextByStatus = function getTextByStatus(){
        if(this._agentStatus == 1){
            //if(this._busySubStatusSelectedItem != "")
            //    return this._busySubStatusSelectedItem;
            if(this.language==lg_zhcn)
                return "忙碌";
            else
                return "busy";
        }
        else if(this._agentStatus == 2){
            if(this.language==lg_zhcn)
                return "就绪";
            else
                return "idle";
        }
        else if(this._agentStatus == 3){
            if(this._onRing == 1)
            {
                if(this.language == lg_zhcn)
                    return "振铃";
                else
                    return "alerting";
            }
            else
            {
                if(this.language == lg_zhcn)
                    return "通话中";
                else
                    return "calling";
            }
        }
        else if(this._agentStatus == 4){
            if(this.language==lg_zhcn)
                return "后续态";
            else
                return "wrapup";
        }
        else{
            if(this.language==lg_zhcn)
                return "未登录";
            else
                return "null";
        }
    }
    this.showAgentStatusTimer = function (){
        var busyID = cmdSetWrapUp.toString();
        var oBtn = this._window.document.getElementById("btn_"+busyID);
        if(oBtn == null)
            return ;
        if(this._timerCount == 0)
            oBtn.innerHTML = this.getTextByStatus();
        else
            oBtn.innerHTML = this.getTextByStatus()+"("+this.getTimerString(this._timerCount)+")";
    }
    this.ShowSelfPrompt = function(code,description){
    }

    //--------------------------------------------------------------------------------------------------
    // 调整显示区域的大小
    //--------------------------------------------------------------------------------------------------
    this.show = function show(border) {
        if( this.oBarDisplay )
        {
            if(typeof(border) == "undefined" )
                border = 0;
            if(border>0)
                this.oBarDisplay.style.border =  "1px solid #008AC6";
            else
                this.oBarDisplay.style.border = "0px";
        }
    }
    this.resize=function resize(nLeft,nTop,nWidth,nHeight) {
        this.left	= (typeof(nLeft)=="number")?nLeft:0;
        this.top	= (typeof(nTop)=="number")?nTop:0;
        this.width	= (nWidth>0)?nWidth:100;
        this.height	= (nHeight>0)?nHeight:100;
        with(this.oBarDisplay.style)
        {
            pixelWidth		= this.width;
            pixelHeight		= this.height;
            pixelLeft		= this.left;
            pixelTop		= this.top;
        }
    }

    this._createObject();

    return this;
}

