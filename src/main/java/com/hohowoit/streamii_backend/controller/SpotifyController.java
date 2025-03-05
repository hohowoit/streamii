package com.hohowoit.streamii_backend.controller;

import com.hohowoit.streamii_backend.service.SpotifyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {

    private final SpotifyService spotifyService;

    public SpotifyController(SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchSpotify(@RequestParam String q) {
        System.out.println("📢 클라이언트에서 /search 요청, query=" + q);
        try {
            String result = spotifyService.searchTracks(q);
            if (result == null || result.isEmpty()) {
                System.out.println("❌ Search result is empty");
                return ResponseEntity.status(204).body("No Data");
            }
            System.out.println("✅ Search result length: " + result.length());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("🚨 백엔드에서 예외 발생: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
