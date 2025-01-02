package tech.talenthium.authservice.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import tech.talenthium.authservice.dto.event.UserCreatedEvent;
import tech.talenthium.authservice.dto.request.DeveloperRegisterRequest;
import tech.talenthium.authservice.dto.request.LoginRequest;
import tech.talenthium.authservice.dto.request.RecruiterRegisterRequest;
import tech.talenthium.authservice.dto.response.TokenPair;
import tech.talenthium.authservice.dto.response.UserDetailsResponse;
import tech.talenthium.authservice.entity.TempAccount;
import tech.talenthium.authservice.entity.User;
import tech.talenthium.authservice.exception.UnauthorizeException;
import tech.talenthium.authservice.kafka.publisher.UserCreatedPublisher;
import tech.talenthium.authservice.service.AuthService;
import tech.talenthium.authservice.service.TempAccountService;
import tech.talenthium.authservice.service.UserService;

import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final TempAccountService tempAccountService;
    private final UserService userService;
    private final UserCreatedPublisher userCreatedPublisher;
    @GetMapping("/oauth/success")
    public ResponseEntity<?> oauthSuccess(HttpServletRequest request) {
        String token = (String) request.getAttribute("accessToken");
        return ResponseEntity.ok("Token: " + token);
    }
    @GetMapping("/oauth2/error")
    public ResponseEntity<?> oauth2Error() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "OAuth2 login failed"));
    }


    @PostMapping("/register/recruiter")
    public ResponseEntity<?> registerRecruiter(@Valid @RequestBody RecruiterRegisterRequest request) {
        // Save the new user to the database and return success response.
        authService.registerRecruiter(request);
        return ResponseEntity.ok("User registered successfully");
    }
    @PostMapping("/register/developer")
    public ResponseEntity<?> registerDeveloper(@Valid @RequestBody DeveloperRegisterRequest request) {
        // Save the new user to the database and return success response.
        authService.registerDeveloper(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        TokenPair tokenPair = authService.login(loginRequest);
        ResponseCookie resCookie = ResponseCookie.from("refresh_token", tokenPair.getRefreshToken())
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(Math.toIntExact(9999999))
                .build();
        response.addHeader("Set-Cookie", resCookie.toString());
        return ResponseEntity.ok(tokenPair);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(Authentication authentication) {
        if (authentication == null) {
            throw new UnauthorizeException("User is not authenticated");
        }
        User user = userService.findByUsername(authentication.getName())
                .orElseThrow(() -> new UnauthorizeException("User not found"));

        return ResponseEntity.ok(
                UserDetailsResponse.builder()
                        .userID(user.getUserID())
                        .username(user.getUsername())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .role(user.getRole())
                        .dateOfBirth(user.getDateOfBirth())
                        .avatar(user.getAvatar())
                        .isActive(user.isActive())
                .build()
        );
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue("refresh_token") String refreshTokenCookie) {
        if(refreshTokenCookie == null)
            return ResponseEntity.badRequest().body("Refresh token is missing");
        log.info("Refresh token received: {}", refreshTokenCookie);

        TokenPair tokenPair = authService.refreshToken(refreshTokenCookie);
        return ResponseEntity.ok(tokenPair);
    }

    @GetMapping("/debug-roles")
    public ResponseEntity<?> debugRoles(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.ok("Not authenticated");
        }
        return ResponseEntity.ok(
                Map.of("principal", authentication.getPrincipal(),
                        "authorities", authentication.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
        );
    }

    @GetMapping("/test-redis")
    public TempAccount TestRedis() {
        TempAccount tempAccount = tempAccountService.createTempAccount(
                "john_doe", "John Doe", "john@example.com",
                "+1234567890", LocalDate.of(1990, 1, 1), "hashedPassword"
        );
        return tempAccount;
    }

    @PostMapping("/test-kafka")
    public ResponseEntity<String> testKafka(@Valid @RequestBody UserCreatedEvent event) {
//        UserCreatedEvent userCreatedEvent = new UserCreatedEvent(
//                "12345", "john_doe@gmail.com","john_doe","John Doe", Role.ROLE_DEVELOPER, LocalDate.now().atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
//        );
        userCreatedPublisher.emitEvent(event);
        return ResponseEntity.ok("Message sent to Kafka successfully");
    }
}