package com.API.controller;

import org.json.JSONArray;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.API.dto.MessageBean;
import com.API.model.Game;
import com.API.repository.GameRepository;

@Controller
public class SocketController {

    @MessageMapping("/send/{dynamicVar}")
    @SendTo("/session/{dynamicVar}")
    public MessageBean send(@Payload MessageBean message, @DestinationVariable String dynamicVar) {
        Game game = GameRepository.currentMap.get(dynamicVar);
        game.setCaves(message.getCaves());
        game.setRoofs(message.getRoofs());
        game.setX(message.getX());
        game.setY(message.getY());
        System.out.println(game.getX() + " " + game.getY() + " " + game.isCaves() + " " + game.isRoofs());
        GameRepository.currentMap.put(dynamicVar,game);
        return message;
    }
}
