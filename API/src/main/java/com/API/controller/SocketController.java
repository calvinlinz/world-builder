package com.API.controller;



import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.API.dto.MessageBean;

@Controller
public class SocketController {

    @MessageMapping("/send/{dynamicVar}")
    @SendTo("/session/{dynamicVar}")
    public MessageBean send(@Payload MessageBean message, @DestinationVariable String dynamicVar) {
        return message;
    }
}
