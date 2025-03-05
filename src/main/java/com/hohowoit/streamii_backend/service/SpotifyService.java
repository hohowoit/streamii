package com.hohowoit.streamii_backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;

@Service
public class SpotifyService {
    private static final Logger logger = LoggerFactory.getLogger(SpotifyService.class);

    @Value("${spotify.client.id}")  // 🔥 환경 변수 또는 application.properties에서 값 불러오기
    private String CLIENT_ID;

    @Value("${spotify.client.secret}")  // 🔥 환경 변수 또는 application.properties에서 값 불러오기
    private String CLIENT_SECRET;

    private final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private final String BROWSE_PLAYLISTS_URL = "https://api.spotify.com/v1/browse/featured-playlists";

    private String accessToken = "";
    private long tokenExpirationTime = 0;

    /**
     * ✅ Spotify Access Token 가져오기
     */
    private final WebClient webClient;

    public SpotifyService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://accounts.spotify.com/api/token")
                .defaultHeaders(headers -> headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED))
                .build();
    }

    public String getAccessToken() {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://accounts.spotify.com")
                .defaultHeaders(headers -> headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED))
                .build();

        return webClient.post()
                .uri("/api/token")
                .bodyValue("grant_type=client_credentials"
                        + "&client_id=" + CLIENT_ID
                        + "&client_secret=" + CLIENT_SECRET)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("access_token"))
                .doOnNext(token -> {
                    this.accessToken = token;
                    this.tokenExpirationTime = System.currentTimeMillis() + (3600 * 1000); // 1시간 후 만료
                })
                .block(); // 동기 실행
    }

    public String searchTracks(String query) {
        if (accessToken.isEmpty() || System.currentTimeMillis() >= tokenExpirationTime) {
            accessToken = getAccessToken();
        }

        try {
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String url = "https://api.spotify.com/v1/search?q=" + encodedQuery + "&type=track&limit=15";

            System.out.println("🔍 [searchTracks] Original query=" + query + ", encoded=" + encodedQuery);
            System.out.println("🔍 [searchTracks] Request URL: " + url);

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            System.out.println("acceessToken:" + accessToken);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    String.class
            );

            System.out.println("🔍 [searchTracks] response code=" + response.getStatusCode());
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("🔍 [searchTracks] response body length=" + response.getBody().length());
                return response.getBody();
            } else {
                System.out.println("❌ Spotify Search API 응답 실패: " + response.getStatusCode());
                System.out.println("❌ Response body: " + response.getBody());
                return "{}";
            }
        } catch (Exception e) {
            System.out.println("🚨 Spotify Search 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return "{}";
        }
    }


    /**
     * ✅ Spotify 공개 플레이리스트 가져오기
     */
    public String getPublicPlaylists() {
        if (accessToken.isEmpty() || System.currentTimeMillis() >= tokenExpirationTime) {
            logger.info("🔄 Access Token이 만료되었거나 존재하지 않습니다. 새로 발급 중...");
            accessToken = getAccessToken(); // ✅ Access Token을 갱신
        }

        logger.info("📢 사용 중인 Access Token: {}", accessToken);
        logger.info("📢 Spotify API 요청을 보냄: /v1/browse/new-releases");

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.spotify.com")
                .defaultHeaders(headers -> headers.set("Authorization", "Bearer " + accessToken))
                .defaultHeaders(headers -> headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)))
                .build();

        try {
            String response = webClient.get()
                    .uri("/v1/browse/new-releases")  // ✅ 엔드포인트 확인
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            logger.info("✅ Spotify API 응답 수신: {}", response);
            return response;
        } catch (Exception e) {
            logger.error("🚨 Spotify API 요청 실패: {}", e.getMessage(), e);
            return "{}";  // 빈 JSON 반환하여 프론트에서 오류 방지
        }
    }



}
