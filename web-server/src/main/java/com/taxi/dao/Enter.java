package com.taxi.dao;

import lombok.Data;

@Data
public class Enter {
	private String content;
	
	public Enter(String content) {
		this.content = content;
	}
}