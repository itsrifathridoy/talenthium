package tech.talenthium.authservice.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tech.talenthium.authservice.dto.response.ErrorResponse;
import tech.talenthium.authservice.service.JwtService;

import java.io.IOException;
import java.util.Date;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal
            (HttpServletRequest request,
             HttpServletResponse response,
             FilterChain filterChain) throws ServletException, IOException {
        // Intercept the request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        try{
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                response.setHeader("Cache-Control","no-cache, no-store, must-revalidate");
//                response.setHeader("Pragma","no-cache");
//                response.setDateHeader("Expires",0);
                filterChain.doFilter(request, response);
                return;
            }

            jwt = getJwtFromRequest(request);

            // check if the token is valid
            if(!jwtService.isValidToken(jwt)) {
                filterChain.doFilter(request, response);
                return;
            }

            username = jwtService.extractUsernameFromToken(jwt);

            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if(jwtService.validateTokenForUser(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
                filterChain.doFilter(request, response);
            }
        }
        catch (Exception e){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");


            new ObjectMapper().writeValue(response.getOutputStream(),
                    ErrorResponse.builder()
                            .statusCode(HttpServletResponse.SC_UNAUTHORIZED)
                            .message(e.getMessage())
                            .timestamp(new Date())
                            .path(request.getRequestURI())
                            .build()
            );
        }



    }

    private String getJwtFromRequest(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        // Bearer <token>
        return authHeader.substring(7);
    }
}