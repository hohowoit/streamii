package com.hohowoit.streamii_backend.controller;

import com.hohowoit.streamii_backend.service.YoutubeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/youtube")
public class YoutubeController {

    private final YoutubeService youtubeService;

    public YoutubeController(YoutubeService youtubeService) {
        this.youtubeService = youtubeService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> search(@RequestParam String q) {
        // q: 검색어
        // youtubeService가 YouTube Data API를 호출한 JSON을 그대로 반환
        String resultJson = youtubeService.searchVideos(q);
        return ResponseEntity.ok(resultJson);
    }
}
