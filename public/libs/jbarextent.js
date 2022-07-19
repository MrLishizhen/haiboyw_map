//  *****************************************************************************
//  文 件 名：	jbarextent.js
//  作    者：  wsj
//  版    本：  1.0.0.0
//  日    期：  2014-07-15
//  文件描述：
// 		 电话条事件重载
//  说    明：
//		 电话条事件重载
//  修改说明：
// *****************************************************************************

var g_msgseq = -1;
//--------------------------------------------------------------------------------------------------
// 辅助函数
//--------------------------------------------------------------------------------------------------
window.onunload = window_onunload;
function window_onunload() {
     //applicationUnLoad();
}
//创建对象成功，绑定电话条事件
function setVccBarEvent() {
    //3
	application.oJVccBar.OnCallRing = onOnCallRing;
	application.oJVccBar.AnswerCall = onOnAnswerCall;
	application.oJVccBar.OnCallEnd = onOnCallEnd;
	//18
	application.oJVccBar.OnPrompt = onOnPrompt;
	application.oJVccBar.OnReportBtnStatus = onReportBtnStatus;
	application.oJVccBar.OnInitalSuccess = onOnInitalSuccess;
	application.oJVccBar.OnInitalFailure = onOnInitalFailure;
	application.oJVccBar.OnEventPrompt = onOnEventPrompt;
	application.oJVccBar.OnAgentWorkReport = onOnAgentWorkReport;
	application.oJVccBar.OnCallDataChanged = onOnCallDataChanged;
	application.oJVccBar.OnBarExit = onOnBarExit;
    application.oJVccBar.OnCallQueueQuery = onOnCallQueueQuery;
	application.oJVccBar.OnQueryGroupAgentStatus = onOnQueryGroupAgentStatus;
	application.oJVccBar.OnSystemMessage  = onOnSystemMessage;
	application.oJVccBar.OnRecvWeiboMsg = onOnRecvWeiboMsg;
	application.oJVccBar.OnIMMessage = onOnIMMessage
	//application.oJVccBar.OnRecvWeChatMessage = onOnRecvWeChatMessage;
	//application.oJVccBar.OnSendWeChatMsgReport = onOnSendWeChatMsgReport;
	//application.oJVccBar.OnUploadFileToMMSReport = onOnUploadFileToMMSReport;
	//application.oJVccBar.OnDownloadFileToMMSReport = onOnDownloadFileToMMSReport;
	application.oJVccBar.OnWorkStaticInfoReport = onOnWorkStaticInfoReport;
    application.oJVccBar.OnQuerySPGroupList = onOnQuerySPGroupList;
    application.oJVccBar.OnAgentBusyReason = onOnAgentBusyReason;
    application.oJVccBar.OnAgentLogUpload  = onOnAgentLogUpload;
    application.oJVccBar.OnAsrEventReport  = onOnAsrEventReport;
    application.oJVccBar.OnStopSmSuccess  = onOnStopSmSuccess;
    application.oJVccBar.OnGetVersionReport = onOnGetVersionReport;
    application.oJVccBar.OnSessionMessage = onOnSessinMessage;
    application.oJVccBar.OnUpdateMediaEvent = onOnUpdateMediaEvent;
    application.oJVccBar.OnSnapShotPngEvent = onOnSnapShotPngEvent;
    application.oJVccBar.OnStopCaptureSuccess = onOnStopCaptureSuccess;
    application.oJVccBar.OnVideoWndStatusReport = onOnVideoWndStatusReport;

	//14	
	application.oJVccBar.OnAgentReport = onOnAgentReport;
	application.oJVccBar.OnTelReport = onOnTelReport;
	application.oJVccBar.OnServiceReport = onOnServiceReport;
	application.oJVccBar.OnMMServiceReport = onOnMMServiceReport;
	application.oJVccBar.OnIvrReport = onOnIvrReport;
	application.oJVccBar.OnTaskReport = onOnTaskReport;
	application.oJVccBar.OnOutboundReport = onOnOutboundReport;
	application.oJVccBar.OnCallReportInfo = onOnCallReportInfo;
	application.oJVccBar.OnQueueReport = onOnQueueReport;
	application.oJVccBar.OnQueryMonitorSumReport = onOnQueryMonitorSumReport;
	application.oJVccBar.OnWallServiceReport = onOnWallServiceReport;
	application.oJVccBar.OnWallQueueReport = onOnWallQueueReport;
	application.oJVccBar.OnServiceStaticReport = onOnServiceStaticReport;
	application.oJVccBar.OnAgentStaticReport = onOnAgentStaticReport;
    application.oJVccBar.OnTrunkReport = onOnTrunkReport;


    application.oWechatManager.OnBeginSession = OnBeginSession;
    application.oWechatManager.OnEndSession = OnEndSession;
    application.oWechatManager.OnRecvMessage = OnRecvMessage;
    application.oWechatManager.OnSendMessageReport = OnSendMessageReport;
    application.oWechatManager.OnUploadFileStatus = OnUploadFileStatus;
    application.oWechatManager.OnDowndFileStatus = OnDowndFileStatus;

	
	application.oJVccBar.OnMethodResponseEvent = onOnMethodResponseEvent;
	application.OnDebug = onOnDebug;

    application.oJBarDisplayer = new JVccBarEasyUICtrl(10,4,1320,48);
    application.oJVccBar.SetInlineShowBar(application.oJBarDisplayer);


    if(application.oJBarDisplayer != null)
        application.oJBarDisplayer.show(1);
    displayCtrl();
    LoadDefaultParam();
	application.oJVccBar.GetVersion();
}
function onVccBarEvent(){
    application.oJVccBar.On({
        OnCallRing : onOnCallRing,
        AnswerCall : onOnAnswerCall,
        OnCallEnd : onOnCallEnd,
        //18
        OnPrompt : onOnPrompt,
        OnReportBtnStatus : onReportBtnStatus,
        OnInitalSuccess : onOnInitalSuccess,
        OnInitalFailure : onOnInitalFailure,
        OnEventPrompt : onOnEventPrompt,
        OnAgentWorkReport : onOnAgentWorkReport,
        OnCallDataChanged : onOnCallDataChanged,
        OnBarExit : onOnBarExit,
        OnCallQueueQuery : onOnCallQueueQuery,
        OnQueryGroupAgentStatus : onOnQueryGroupAgentStatus,
        OnSystemMessage  : onOnSystemMessage,
        OnRecvWeiboMsg : onOnRecvWeiboMsg,
        OnIMMessage : onOnIMMessage,
        OnWorkStaticInfoReport : onOnWorkStaticInfoReport,
        OnQuerySPGroupList : onOnQuerySPGroupList,
        OnSessionMessage : onOnSessionMessage,
        // OnMethodResponseEvent: onOnMethodResponseEvent,
        OnGetVersionReport:onOnGetVersionReport,
        OnAgentBusyReason : onOnAgentBusyReason,
        OnAgentLogUpload  : onOnAgentLogUpload,
        OnAsrEventReport  : onOnAsrEventReport,
        OnStopSmSuccess   : onOnStopSmSuccess,
        OnUpdateMediaEvent   : onOnUpdateMediaEvent,
        OnStopCaptureSuccess   : onOnStopCaptureSuccess,
        OnModifyVideoStreamReport :onOnModifyVideoStreamReport,
        OnSnapShotPngEvent : onOnSnapShotPngEvent,
        OnVideoWndStatusReport : onOnVideoWndStatusReport,
        //14
        OnAgentReport : onOnAgentReport,
        OnTelReport : onOnTelReport,
        OnServiceReport : onOnServiceReport,
        OnIvrReport : onOnIvrReport,
        OnTaskReport : onOnTaskReport,
        OnOutboundReport : onOnOutboundReport,
        OnCallReportInfo : onOnCallReportInfo,
        OnQueueReport : onOnQueueReport,
        OnQueryMonitorSumReport : onOnQueryMonitorSumReport,
        OnWallServiceReport : onOnWallServiceReport,
        OnWallQueueReport : onOnWallQueueReport,
        OnServiceStaticReport : onOnServiceStaticReport,
        OnAgentStaticReport : onOnAgentStaticReport
    });

    application.OnDebug = onOnDebug;

    application.oJBarDisplayer = new JVccBarEasyUICtrl(10,5,1360,40);
    application.oJVccBar.SetInlineShowBar(application.oJBarDisplayer);


    if(application.oVccBarAssist.oBarAgentStatus != null)
    {
        application.oVccBarAssist.oBarAgentStatus.OnAgentStatusTime = function(agentStatus,agentStatusText,timerCount){
            var oAgentTime = document.getElementById("agentTime");
            if(oAgentTime)
                oAgentTime.innerHTML  = "【"+agentStatusText+"】:【"+timerCount+"】";
        }
    }
    if(application.oJBarDisplayer != null)
        application.oJBarDisplayer.show(1);
    displayCtrl();
    LoadDefaultParam();
    application.oJVccBar.GetVersion();
}

function g(sname){
    return application.oJVccBar.GetAttribute(sname);
}
function setElementValue (id,sValue) {
    if(typeof(sValue) == "undefined")
        return;
    var oE = $$(id);
    if(oE)
        oE.value = sValue;
}
function SaveDefaultParam(){
    var shortAgentID = getSubString(g("AgentID"),"000010"+g("MediaFlag"),"");
    var agentParam = stringFormat("{0}|{1}|{2}|{3}|{4}|{5}",
        g("MainIP"),g("MediaFlag"),shortAgentID,g("SipServerPort"),g("SipPassWord"),g("PassWord"));
    setCookie("ctiAgentParam",agentParam,365);
}
function LoadDefaultParam(){
    var agentParam = getCookie("ctiAgentParam");
    if(agentParam == "") return;
    showLog("LoadCTICFG:"+agentParam);
    var oParam = agentParam.split("|");
    setElementValue("mainIP",oParam[0]);
    setElementValue("vccID",oParam[1]);
    setElementValue("agentID",oParam[2]);
    setElementValue("sipPort",oParam[3]);
    setElementValue("sipPassword",oParam[4]);
    setElementValue("ctiPassword",oParam[5]);
}
////////////////////////--辅助函数---////////////////////////////
function IsCheckBoxSelected(id){
    var oCheckBox = document.getElementById(id);
    if(oCheckBox){
        if(oCheckBox.checked == true){
            return true;
        }
    }
    return false;
}
function SetLogType(){
    var TempLogFlag = 0;
    if(IsCheckBoxSelected("log_1"))
        TempLogFlag = TempLogFlag|1;
    if(IsCheckBoxSelected("log_2"))
        TempLogFlag = TempLogFlag|2;
    if(IsCheckBoxSelected("log_3"))
        TempLogFlag = TempLogFlag|4;
    if(IsCheckBoxSelected("log_4"))
        TempLogFlag = TempLogFlag|8;
    if(IsCheckBoxSelected("log_5"))
        TempLogFlag = TempLogFlag|16;
    application.DislayLog(TempLogFlag);
}
function displayCtrl(){
    emptyLog();
    showLog(application.oBrowserSys.expression+"\r\n\r\n");
    if(isIE())
    {
        if( getLocalLanguage() != lg_zhcn )
            showLog("browser is IE\r\n");
        else
            showLog("IE系列浏览器\r\n");
    }
    else{
        if( getLocalLanguage() != lg_zhcn )
            showLog("browser is not IE\r\n");
        else
            showLog("非IE系列浏览器\r\n");
    }
    if(application.oJVccBar.GetJVccBarType() == vccBarTypeHTML5 )
    {
        if( getLocalLanguage() != lg_zhcn )
            showLog("the vccbar is 【javascript】 version!\r\n");
        else
            showLog("当前使用【javascript】版本电话条!\r\n");
    }
    else if(application.oJVccBar.GetJVccBarType() == vccBarTypeSILVERLIGHT )
    {
        if( getLocalLanguage() != lg_zhcn )
            showLog("the vccbar is 【silverlight】 version!\r\n");
        else
            showLog("当前使用【silverlight】版本电话条!\r\n");
    }
    else
    {
        if( getLocalLanguage() != lg_zhcn )
            showLog("the vccbar is 【ocx】 version\r\n");
        else
            showLog("当前使用【OCX】版本电话条!\r\n");
    }
}
function showLog(Text) {
    var oTextareaInfo= document.getElementById("TextareaInfo");
    if(oTextareaInfo != null)
	    oTextareaInfo.value = oTextareaInfo.value + Text;
}
function emptyLog() {
    var oTextareaInfo= document.getElementById("TextareaInfo");
    if(oTextareaInfo != null)
        oTextareaInfo.value = "";
    var oLog = document.getElementById("idLog");
    if(oLog != null)
        oLog.value="";

}
function onOnDebug(Text){
    showLog(Text+"\r\n");

}
//--------------------------------------------------------------------------------------------------
// 电话条重载事件函数
//--------------------------------------------------------------------------------------------------

///////////////////////////////////////////////////
//呼叫事件
function onOnCallRing(CallingNo,CalledNo,OrgCalledNo,CallData,SerialID,ServiceDirect,CallID,UserParam,TaskID,UserDn,AgentDn,AreaCode,fileName,networkInfo,queueTime,opAgentID,ringTime,projectID,serverName,AccessCode) {
    showLog("【OnCallRing】：\r\n");
    showLog("         CallingNo：【"+CallingNo+"】\r\n");
    showLog("         CalledNo：【"+CalledNo+"】\r\n");
    showLog("         OrgCalledNo：【"+OrgCalledNo+"】\r\n");
    showLog("         CallData：【"+CallData+"】\r\n");
    showLog("         CallID ：【"+CallID+"】\r\n");
    showLog("         SerialID ：【"+SerialID+"】\r\n");
    showLog("         ServiceDirect ：【"+ServiceDirect+"】\r\n");
    showLog("         UserParam ：【"+UserParam+"】\r\n");
    showLog("         TaskID ：【"+TaskID+"】\r\n");
    showLog("         UserDn ：【"+UserDn+"】\r\n");
    showLog("         AgentDn ：【"+AgentDn+"】\r\n");
    showLog("         AreaCode ：【"+AreaCode+"】\r\n");
    showLog("         fileName ：【"+fileName+"】\r\n");
    showLog("         networkInfo：【"+networkInfo+"】\r\n");
    showLog("         queueTime ：【"+queueTime+"】\r\n");
    showLog("         opAgenID ：【"+opAgentID+"】\r\n");
    showLog("         ringTime ：【"+ringTime+"】\r\n");
    showLog("         projectID ：【"+projectID+"】\r\n");
    showLog("         serverName ：【"+serverName+"】\r\n");
    showLog("         AccessCode ：【"+AccessCode+"】\r\n");
    showLog(" *******************************55************************************\r\n");
}
function onOnAnswerCall(UserNo,AnswerTime,SerialID,ServiceDirect,CallID,UserParam,TaskID,AV,TC) {
    showLog(" 【OnAnswerCall】:\r\n");
    showLog("         AnswerTime ：【"+AnswerTime+"】\r\n");
    showLog("        UserNo ：【"+UserNo+"】\r\n");
    showLog("        CallID ：【"+CallID+"】\r\n");
    showLog("        SerialID ：【"+SerialID+"】\r\n");
    showLog("        ServiceDirect ：【"+ServiceDirect+"】\r\n");
    showLog("        UserParam ：【"+UserParam+"】\r\n");
    showLog("        TaskID ：【"+TaskID+"】\r\n");
    showLog("        AV ：【"+AV+"】\r\n");
    showLog("        TC ：【"+TC+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnCallEnd(callID,serialID,serviceDirect,userNo,bgnTime,endTime,agentAlertTime,userAlertTime,fileName,directory,disconnectType,userParam,taskID,serverName,networkInfo) {
    showLog(" 【OnCallEnd】:\r\n");
    showLog("         fileName   ：【"+fileName+"】\r\n");
    showLog("         directory：【"+directory+"】\r\n");
    showLog("         bgnTime  ：【"+bgnTime+"】\r\n");
    showLog("         endTime  ：【"+endTime+"】\r\n");
    showLog("         userNo ：【"+userNo+"】\r\n");
    showLog("         CallID   ：【"+callID+"】\r\n");
    showLog("         SerialID ：【"+serialID+"】\r\n");
    showLog("         ServiceDirect  ：【"+serviceDirect+"】\r\n");
    showLog("         userAlertTime  ：【"+userAlertTime+"】\r\n");
    showLog("         agentAlertTime ：【"+agentAlertTime+"】\r\n");
    showLog("         fileName      ：【"+fileName+"】\r\n");
    showLog("         directory      ：【"+directory+"】\r\n");
    showLog("         disconnectType      ：【"+disconnectType+"】\r\n");
    showLog("         userParam      ：【"+userParam+"】\r\n");
    showLog("         taskID         ：【"+taskID+"】\r\n");
    showLog("         serverName         ：【"+serverName+"】\r\n");
    showLog("         networkInfo         ：【"+networkInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}

//提示事件	
function onOnPrompt(code,description) {
    showLog("【OnPrompt】：\r\n");
    showLog(" code:【"+code+"】 description:【"+description+"】\r\n");
    showLog(" *******************************************************************\r\n");
    if(code == 4415){
        if(application.oJVccBar.GetAttribute("CurUseServer") == 1)
            showLog(" current server:主服务器\r\n ");
        else
            showLog(" current server:备服务器\r\n ");
    }
}
function onReportBtnStatus(btnIDS) {
    if(application.oVccBarAssist.oBarBtnControl != null)
    {
        application.oVccBarAssist.oBarBtnControl.UpdateUI(btnIDS);
    }
    if(application.oVccBarAssist.oBarAgentStatus != null)
    {
       application.oVccBarAssist.oBarAgentStatus.SetAgentStatus(application.oJVccBar.GetAgentStatus());
    }

    showLog("【ReportBtnStatus】：\r\n");
    var agentStatus = application.oJVccBar.GetAgentStatus();
    if(agentStatus == 1)
    {
        if( getLocalLanguage() != lg_zhcn )
            agentStatus = agentStatus + " agent subStatus:【"+application.oJVccBar.GetAgentSubBusyStatus()+"】";
        else
            agentStatus = agentStatus + " 子状态:【"+application.oJVccBar.GetAgentSubBusyStatus()+"】";
    }
    if( getLocalLanguage() != lg_zhcn )
        showLog("         usefull ids  ：【"+btnIDS+"】\r\n agent status：【"+agentStatus+"】\r\n");
    else
        showLog("         可现状态值   ：【"+btnIDS+"】\r\n 当前座席状态：【"+agentStatus+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnEventPrompt(code,description) {
    showLog("【OnEventPrompt】：");
    showLog(" code:【"+code+"】 description:【"+description+"】\r\n");
    showLog(" *******************************************************************\r\n");
    if(code == 55){
        if(application.oJBarDisplayer != null){
            application.oJBarDisplayer.SetRecordFileName(description);
        }
    }
}  
function onOnInitalSuccess() {
    if(application.oVccBarAssist.oBarAgentStatus != null)
    {
        application.oVccBarAssist.oBarAgentStatus.SetSubBusyStatus(application.oJVccBar.GetBusySubStatus());
    }
    showLog("【OnInitalSuccess】\r\n ");
    if( getLocalLanguage() != lg_zhcn )
        showLog("        used phoneType:【"+application.oJVccBar.GetAttribute("PhonType")+"】\r\n        其中 1：inside sipphone 2：outer device；3：remote sipphone;4：soft switch pretransfer;5：yealink phone\r\n");
    else
        showLog("        当时使用phoneType:【"+application.oJVccBar.GetAttribute("PhonType")+"】\r\n        其中 1：内置Sip电话 2：外置其他终端；3：远程sip电话;4：软交换前传号码;5：yealink话机\r\n");
    showLog(" exitCause:" + application.oJVccBar.GetExitCause() + "\r\n ");
    showLog(" *******************************************************************\r\n");
    //SaveDefaultParam();
    if(application.oJVccBar.GetAttribute("CurUseServer") == 1)
        showLog(" current server:主服务器\r\n ");
    else
        showLog(" current server:备服务器\r\n ");
    showLog(" *******************************************************************\r\n");
}
function onOnInitalFailure(code,description) {
    showLog("【OnInitalFailure】\r\n 【"+code+"】 【"+description+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnBarExit(code,description) {
    showLog("【OnBarExit】 \r\n【"+code+"】 【"+description+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnAgentWorkReport(workStatus,description) {
    if( getLocalLanguage() != lg_zhcn )
        showLog("【OnAgentWorkReport】 sceneid：【"+workStatus+"】 scene description：【"+description+"】\r\n");
    else
        showLog("【OnAgentWorkReport】 场景编号：【"+workStatus+"】 场景描述：【"+description+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnCallDataChanged(callData) {
    showLog("【OnCallDataChanged】：\r\n【"+callData+"】\r\n");
    showLog(" *******************************************************************\r\n");
}

function onOnCallQueueQuery(QueueInfo) {
    showLog("【OnCallQueueQuery】：\r\n param:【"+QueueInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}

function onOnQueryGroupAgentStatus(QueryInfo,type) {
    showLog("【OnQueryGroupAgentStatus】：\r\n param:【"+QueryInfo+"】\r\n type:【"+type+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnSystemMessage(code,description) {
    showLog("【OnSystemMessage】：\r\n");
    showLog(" code:【"+code+"】 description:【"+description+"】\r\n");
    if(code == 24){
        var arr = description.split("|");
        if(arr.length == 3){
            var url = "http://"+application.oJVccBar.GetAttribute("ftpServerIP")+":9999/media/"+arr[2];
            showLog(" url:【"+url+"】\r\n");
        }
    }
    showLog(" *******************************************************************\r\n");
}
function onOnRecvWeiboMsg(message) {
    showLog("【OnRecvWeiboMsg】 \r\n msgtype:【"+msgtype+"】 \r\n message:【"+message+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnIMMessage(msgtype,message,sender) {
    showLog("【OnIMMessage】  \r\n msgtype:【"+msgtype+"】 sender:【"+sender+"】 message:【"+message+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnRecvWeChatMessage(sessionId,msgseq,type,userId,vccPublicId,msgType,content,sessionUrl,recongnition,msgevent,eventKey,title,data,timeStamp) {
    showLog("【OnRecvWeChatMessage】：\r\n");
    showLog("         sessionId   ：【"+sessionId+"】\r\n");
    showLog("         type        ：【"+type+"】\r\n");
    showLog("         msgseq      ：【"+msgseq+"】\r\n");
    showLog("         userId      ：【"+userId+"】\r\n");
    showLog("         vccPublicId ：【"+vccPublicId+"】\r\n");
    showLog("        msgType      ：【"+msgType+"】\r\n");
    showLog("        content      ：【"+content+"】\r\n");
    showLog("        sessionUrl   ：【"+sessionUrl+"】\r\n");
    showLog("        recongnition ：【"+recongnition+"】\r\n");
    showLog("        event        ：【"+msgevent+"】\r\n");
    showLog("        eventKey     ：【"+eventKey+"】\r\n");
    showLog("        title        ：【"+title+"】\r\n");
    showLog("        data         ：【"+data+"】\r\n");
    showLog("        timeStamp    ："+timeStamp+"\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnSendWeChatMsgReport(userId, sessionId, msgseq, code, des, timeStamp) {
    showLog("【OnSendWeChatMsgReport】：\r\n");
    showLog("         userId   ：【"+userId+"】\r\n");
    showLog("         sessionId：【"+sessionId+"】\r\n");
    showLog("         msgseq   ：【"+msgseq+"】\r\n");
    showLog("         code     ：【"+code+"】\r\n");
    showLog("         des      ：【"+des+"】\r\n");
    showLog("         timeStamp：【"+timeStamp+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnUploadFileToMMSReport(strFileName,status,strUrl,strSessionId,strUserId,strVccPublicId) {
    showLog("【OnUploadFileToMMSReport】：\r\n");
    showLog("         strFileName   ：【"+strFileName+"】\r\n");
    showLog("         status        ：【"+status+"】\r\n");
    showLog("         strUrl        ：【"+strUrl+"】\r\n");
    showLog("         SessionId     ：【"+strSessionId+"】\r\n");
    showLog("         UserId        ：【"+strUserId+"】\r\n");
    showLog("         VccPublicId   ：【"+strVccPublicId+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnDownloadFileToMMSReport(strUrl,status,strFileName) {
    showLog("【OnDownloadFileToMMSReport】：\r\n");
    showLog("         strUrl        ：【"+strUrl+"】\r\n");
    showLog("         status        ：【"+status+"】\r\n");
    showLog("         strFileName   ：【"+strFileName+"】\r\n");
    showLog(" *******************************************************************\r\n");
}

//监控事件
function onOnAgentReport(AgentReportInfo) {
    showLog("【OnAgentReport】：\r\n param：【"+AgentReportInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnIvrReport(IvrReportInfo) {
    showLog("【OnIvrReport】：\r\n"+IvrReportInfo+")\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnTelReport(TelReportInfo) {
    showLog("【OnTelReport】：\r\n"+TelReportInfo+")\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnServiceReport(ServiceReportInfo) {
    showLog("【OnServiceReport】(\r\n"+ServiceReportInfo+")\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnMMServiceReport(ServiceReportInfo) {
    showLog("【OnMMServiceReport】(\r\n"+ServiceReportInfo+")\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnTaskReport(TaskReportInfo) {
    showLog("【OnTaskReport】\r\n"+TaskReportInfo+")\r\n");
    showLog(" *******************************************************************\r\n");
}

function onOnOutboundReport(TaskInfo) {
    showLog("【OnOutboundReport】\r\n param：【"+TaskInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");

}
function onOnCallReportInfo(CallInfo) {
    showLog("【OnCallReportInfo】\r\n param：【"+CallInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnQueueReport(QueueInfo) {
    showLog("【OnQueueReport】：\r\n"+QueueInfo+"\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnQueryMonitorSumReport(cmdName,reportInfo) {
    showLog("【OnQueryMonitorSumReport】\r\n name:【"+cmdName+"】\r\n reportInfo:【"+reportInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnWallServiceReport(message) {return;
    showLog("【OnWallServiceReport】\r\n  【"+message+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnWallQueueReport(message) {return;
    showLog("【OnWallQueueReport】\r\n 【"+message+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnWorkStaticInfoReport(message) {return;
    showLog("【OnWorkStaticInfoReport】 \r\n 【"+message+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnQuerySPGroupList(type,ctiInfo){
    showLog("【onOnQuerySPGroupList】 \r\n type:【"+type+"】\r\n");
    showLog(" ctiInfo:【"+ctiInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnServiceStaticReport(StaticInfo) {return;
    showLog("【OnServiceStaticReport】 \r\n 【"+StaticInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnAgentStaticReport(StaticInfo) {return;
    showLog("【OnAgentStaticReport】 \r\n 【"+StaticInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnTrunkReport(TrunkInfo) {
    showLog("【OnTrunkReport】 \r\n 【"+TrunkInfo+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnAgentBusyReason(type,des){
    showLog("【OnAgentBusyReason】 \r\n type:【"+type+"】\r\n");
    showLog(" des:【"+des+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnAgentLogUpload(destAgent,urlType,uploadServer,fileName,code,des){
    showLog("【OnAgentLogUpload】 \r\n urlType:【"+urlType+"】\r\n");
    showLog(" uploadServer:【"+uploadServer+"】\r\n");
    showLog(" fileName:【"+fileName+"】\r\n");
    showLog(" code:【"+code+"】\r\n");
    showLog(" des:【"+des+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnAsrEventReport(seq,timeStamp,lineNum,text){
    showLog("【OnAsrEventReport】 \r\n seq:【"+seq+"】 ");
    showLog(" timeStamp:【"+timeStamp+"】  ");
    showLog(" lineNum:【"+lineNum+"】  ");
    showLog(" text:【"+text+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnStopSmSuccess(detail){
    showLog("【OnStopSmSuccess】 \r\n detail:【"+detail+"】 \r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnGetVersionReport(version){
    showLog("【OnGetVersionReport】 \r\n version:【"+version+"】 \r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnSessinMessage(msg){
  showLog("【OnSessinMessage】 \r\n msg:【"+msg+"】 \r\n");
  var json = JSON.parse(msg);
  var msgType = json.msgType;
  if(msgType == "0")
  {
	  //var url = 'http://192.168.2.176:9999/media/log/'+json.msgData;
	  var url = 'https://xylink.cincc.cn/media/log/'+json.msgData;
	  showLog("【OnSessinMessage】 \r\n url:【"+url+"】 \r\n");
	  recvPic.src = url;
	  DisplayDiv("divVedioDlg",1);
  }
  else if(msgType == "1")
  {
	  showLog(" 接收到文本:["+json.msgData+"]\r\n");
  }
  showLog(" *******************************************************************\r\n");
}
function onOnUpdateMediaEvent(cause,number,av) {
    showLog("【OnUpdateMediaEvent】 \r\n cause:【"+cause+"】 ");
    showLog(" number:【"+number+"】  ");
    showLog(" av:【"+av+"】  ");
    showLog(" *******************************************************************\r\n");
}
function onOnSnapShotPngEvent(image) {
    showLog("【OnSnapShotPngEvent】 \r\n ");
    recvPic.src = image;
    DisplayDiv("divVedioDlg",1);
    showLog(" image-width:【"+recvPic.width+"】  image-height:【"+recvPic.height+"】");
    showLog(" *******************************************************************\r\n");
}
function onOnStopCaptureSuccess(serverName,fileName) {
    showLog("【onOnStopCaptureSuccess】 \r\n ");
    showLog(" serverName:【"+serverName+"】  fileName:【"+fileName+"】");
    showLog(" *******************************************************************\r\n");
}
function onOnVideoWndStatusReport(wndType,status){
    showLog("【OnVideoWndStatusReport】 \r\n ");
    showLog(" wndType:【"+wndType+"】  status:【"+status+"】");
    showLog(" *******************************************************************\r\n");

    if(wndType == "localVideoDlg"){
        var obtn= document.getElementById("btnLocalVideoWnd");
        if(obtn != null)
            obtn.value = (status=="1")?"隐藏坐席视频窗口":"显示坐席视频窗口";
    }
    if(wndType == "remoteVideoDlg"){
        var obtn= document.getElementById("btnRemoteVideoWnd");
        if(obtn != null)
            obtn.value = (status=="1")?"隐藏用户视频窗口":"显示用户视频窗口";
    }
}
function onOnModifyVideoStreamReport(cause){
    showLog("【OnModifyVideoStreamReport】 \r\n ");
    showLog(" cause:【"+cause+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function onOnSessionMessage(msg) {
    showLog("【OnSessinMessage】 \r\n msg:【"+msg+"】 \r\n");
}
//命令异步返回事件
function onOnMethodResponseEvent(cmdName,param) {
    showLog("【OnMethodResponseEvent】：\r\n");
    showLog(" cmdName:【"+cmdName+"】\r\n");
    showLog(" return param:【"+param+"】\r\n");
    showLog(" *******************************************************************\r\n");

    if (!(typeof (oMakeCallDlg) == "undefined" || oMakeCallDlg == null))
        oMakeCallDlg.Display(param);
}


function OnBeginSession(sessionId) {
    showLog("开始微信会话：【OnBeginSession】：\r\n");
    showLog(" sessionId:【"+sessionId+"】\r\n");
    showLog(" *******************************************************************\r\n");
}
function OnEndSession(sessionId) {
    showLog("结束微信会话：【OnEndSession】：\r\n");
    showLog(" *******************************************************************\r\n");
}
function OnRecvMessage(sessionId,msgseq) {
    showLog("接收对方消息：【OnRecvMessage("+sessionId+","+msgseq+")】：\r\n");
    g_msgseq = msgseq;
    var oSession = application.oWechatManager.GetSessionItem(sessionId,msgseq);
    if(oSession != null){
        var strValue = "";
        if(oSession.msgType == "text"){
            strValue = oSession.content;
        }
        else{
            strValue = oSession.sessionUrl;
        }
        showLog("接收对方内容：【"+strValue+"】\r\n");
    }
    showLog(" *******************************************************************\r\n");
}
function OnSendMessageReport(sessionId,msgseq) {
    showLog("发送消息：【OnSendMessageReport("+sessionId+","+msgseq+")】：\r\n");
    g_msgseq = msgseq;
    var oSession = application.oWechatManager.GetSessionItem(sessionId,msgseq);
    if(oSession != null){
        var strValue = "";
        if(oSession.msgType == "text"){
            strValue = oSession.content;
        }
        else{
            strValue = oSession.sessionUrl;
        }
        showLog("发送内容：【"+strValue+"】\r\n");
    }
    showLog(" *******************************************************************\r\n");
}
function OnUploadFileStatus(sessionID,status,strUrl){
    showLog("上传文件状态事件：【OnUploadFileStatus("+sessionID+","+status+","+strUrl+")】：\r\n");
    showLog(" *******************************************************************\r\n");
}

function OnDowndFileStatus(sessionID,msgseq,status,strUrl){
    showLog("下载文件状态事件：【OnDowndFileStatus("+sessionID+","+msgseq+","+status+","+strUrl+")】：\r\n");
    showLog(" *******************************************************************\r\n");

}
function DisplayDiv(id,flag){
  var oDiv = document.getElementById(id);
  if(oDiv == null)
    return;
  if(flag == 0)
    oDiv.style.display = "none";
  else
    oDiv.style.display = "block";
}
function PopDlg(key,param){
    var spevent = window.event || arguments.callee.caller.arguments[0];
    application.oJVccBar.PopDlg(
        key,
        parseInt(spevent.screenX),
        parseInt(spevent.screenY),
        param
    );
}