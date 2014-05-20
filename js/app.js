var INTERVAL = 1000;
var DEFAULT_MESSAGE = "終了";
var DEFAULT_MESSAGE2 = "予鈴「チーーーン」";
var DEFAULT_MESSAGE3 = "質疑応答おわりー";

var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};


var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){

//任意に入力されたメッセージの後ろに文字を付加
				message = alarm.message + "(質疑応答を開始してください!!)";
		}
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

//予鈴用
var showBellMessage = function(){
		var message = DEFAULT_MESSAGE2;
		alarm.output2.textContent = message;
};

//質疑応答終了用
var showEndQuestionMessage = function(){
		var message = DEFAULT_MESSAGE3;
		alarm.output3.textContent = message;
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown() && isReadyToBell()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
		else if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
				showBellMessage();
		}

		else{showAlarmMessage();
			 startAlarm2();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};

//残り時間が3秒以下になった時に発動！
var isReadyToBell = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 3;
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

//終了してから5秒後に発動！
var startAlarm2 = function(){
				window.setTimeout(showEndQuestionMessage, 5000);
};


var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");
		alarm.output2 = document.querySelector("#countdown2");
		alarm.output3 = document.querySelector("#countdown3");
		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
};

initApp();
