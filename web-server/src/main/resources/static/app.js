var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#entered").html("");
}

function connect() {
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/enter', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
        stompClient.subscribe('/topic/chat', function (chat) {
        	showChat(JSON.parse(chat.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/entered", {}, JSON.stringify({'name': $("#name").val()}));
}

function sendChat() {
	stompClient.send("/app/chat", {}, JSON.stringify({'name': $("#name").val(), 'message': $("#chatMessage").val()}));
}

function showGreeting(message) {
    $("#entered").append("<tr><td>" + message + "</td></tr>");
}
function showChat(chat) {
    $("#entered").append("<tr><td>" + chat.name + " : " + chat.message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#chatSend" ).click(function(){ sendChat(); });
});