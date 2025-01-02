package tech.talenthium.authservice.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import tech.talenthium.authservice.dto.response.TokenPair;
import tech.talenthium.authservice.entity.RefreshToken;
import tech.talenthium.authservice.exception.UnauthorizeException;
import tech.talenthium.authservice.repository.RefreshTokenRepository;
import tech.talenthium.authservice.repository.UserRepository;
import tech.talenthium.authservice.service.JwtService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        TokenPair tokenPair = jwtService.generateOAuthTokenPair(oAuth2User);
        RefreshToken refreshToken = RefreshToken.builder()
                .token(tokenPair.getRefreshToken())
                .user(userRepository.findByEmail(oAuth2User.getAttribute("email"))
                        .orElseThrow(() -> new UnauthorizeException("User not found")))
                .expiresAt(jwtService.extractExpirationFromToken(tokenPair.getRefreshToken()))
                .build();
        ResponseCookie resCookie = ResponseCookie.from("refresh_token", tokenPair.getRefreshToken())
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(Math.toIntExact(9999999))
                .build();
        response.addHeader("Set-Cookie", resCookie.toString());
        response.sendRedirect("http://localhost:3000");
        refreshTokenRepository.save(refreshToken);
    }
}
