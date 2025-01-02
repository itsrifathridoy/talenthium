package tech.talenthium.authservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import tech.talenthium.authservice.entity.Role;
import tech.talenthium.authservice.entity.User;
import tech.talenthium.authservice.repository.UserRepository;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public boolean usernameExists(String username) { return userRepository.existsByUsername(username); }
    public boolean emailExists(String email) { return userRepository.existsByEmail(email); }
    public boolean phoneExists(String phone) { return userRepository.existsByPhone(phone); }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }
    public Optional<User> findByUserIDAndRole(long userID, Role role) {
        return userRepository.findByUserIDAndRole(userID, role);
    }

    public User registerOAuthUser(OAuth2User oAuth2User) {
        log.info("oauthUser: {}",oAuth2User);
        log.info("username:{}, name:{}, avatar: {}, email: {} ",oAuth2User.getName(),oAuth2User.getAttribute("name"),oAuth2User.getAttribute("picture"),oAuth2User.getAttribute("email"));
        String picture = (String) oAuth2User.getAttribute("picture");
        String avatarUrl = (picture != null && !picture.isBlank())
                ? picture
                : (String) oAuth2User.getAttribute("avatar_url");

        User user = User
                .builder()
                .username(oAuth2User.getName())
                .name(oAuth2User.getAttribute("name"))
                .avatar(avatarUrl)
                .email(oAuth2User.getAttribute("email"))
                .role(Role.ROLE_NOT_ASSIGN)
                .build();

        return userRepository.save(user);
    }
}
