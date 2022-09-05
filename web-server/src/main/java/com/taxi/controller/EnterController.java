package com.taxi.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.taxi.dao.Chat;
import com.taxi.dao.Enter;
import com.taxi.dao.NameOfEntered;

@Controller
public class EnterController {
	@MessageMapping("entered")
	@SendTo("/topic/enter")
	public Enter enter(NameOfEntered msg) throws Exception {
		Thread.sleep(100); // delay
		return new Enter("Hello, " + HtmlUtils.htmlEscape(msg.getName()) + "!");
	}

	@MessageMapping("/chat")
	@SendTo("/topic/chat")
	public Chat chat(Chat chat) throws Exception {
		return new Chat(chat.getName(), chat.getMessage());
	}
}