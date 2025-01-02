package tech.talenthium.authservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tech.talenthium.authservice.constant.KafkaConstant;
// Using shared event DTOs from common-events module


@Configuration
public class ProducerConfiguration
{
    @Bean
    public NewTopic createAccountEventTopic(){
        return new NewTopic(KafkaConstant.CREATE_ACCOUNT_EVENT,3,(short) 3);
    }
}
