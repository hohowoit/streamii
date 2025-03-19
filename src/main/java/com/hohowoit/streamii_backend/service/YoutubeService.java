package com.hohowoit.streamii_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;

@Service
public class YoutubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    public String searchVideos(String query) {
        try {
            String encodedQuery = java.net.URLEncoder.encode(query, "UTF-8");
            // regionCode=KR, relevanceLanguage=ko, order=relevance 등 추가 가능
            String url = "https://www.googleapis.com/youtube/v3/search"
                    + "?part=snippet&type=video"
                    + "&maxResults=5"
                    + "&q=" + encodedQuery
                    + "&key=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            // getForEntity 로 한번만 호출

            // 로그에 전체 JSON 출력
            System.out.println("유튜브 API 응답: " + response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                // 성공 시 응답 바디 그대로 반환
                return response.getBody();
            } else {
                // 오류 시 직접 JSON 메시지 생성
                return "{\"error\":\"YouTube API call failed: " + response.getStatusCode() + "\"}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Exception occurred: " + e.getMessage() + "\"}";
        }
    }
}
