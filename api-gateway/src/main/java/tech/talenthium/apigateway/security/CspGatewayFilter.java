package tech.talenthium.apigateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class CspGatewayFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();

        // Apply CSP only for /project-service/github/install
        if ("/project-service/github/install".equals(path)) {
            exchange.getResponse().getHeaders().set(
                    "Content-Security-Policy",
                    "default-src 'self'; connect-src 'self'; script-src 'self'; style-src 'self';"
            );
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1; // run before other filters that might commit response
    }
}

