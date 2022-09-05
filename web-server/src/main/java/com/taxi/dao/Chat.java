package com.taxi.dao;

import lombok.Data;

@Data
public class Chat {
	private String name;
	private String message;
	
	public Chat(String name, String msg) {
		this.name = name;
		this.message = msg;
	}
}