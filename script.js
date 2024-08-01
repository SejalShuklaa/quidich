gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const textOverlay1 = document.getElementById('textOverlay1');
    const timelineBar1 = textOverlay1.querySelector('.timeline-bar');
    const textOverlay2 = document.getElementById('textOverlay2');
    const timelineBar2 = textOverlay2.querySelector('.timeline-bar');
    const fullscreenOverlay = document.querySelector('.fullscreen-overlay');

    // Initially pause the video
    video.pause();

    // Ensure video metadata is loaded
    video.addEventListener('loadedmetadata', () => {
        const videoDuration = video.duration;

        // Variables to control the timing for the first text
        const text1StartTime = 5; // Time in seconds when the text should appear
        const text1TimelineDuration = 5; // Duration for the timeline bar to fill
        const text1EndTime = text1StartTime + text1TimelineDuration; // End time for hiding elements

        // Variables to control the timing for the second text
        const text2StartTime = text1EndTime + -6; // Time in seconds when the second text should appear
        const text2TimelineDuration = 6; // Duration for the timeline bar to fill
        const text2EndTime = text2StartTime + text2TimelineDuration; // End time for hiding elements

        // Show the text overlay and timeline bar at the specified time
        video.addEventListener('timeupdate', () => {
            if (video.currentTime >= text1StartTime && video.currentTime <= text1StartTime + 0.1) {
                fullscreenOverlay.style.display = 'block'; // Show overlay
                video.pause();
                gsap.fromTo(textOverlay1, 
                    { opacity: 0, display: 'none' }, 
                    { 
                        opacity: 1, 
                        display: 'block', 
                        duration: 1, 
                        onComplete: () => {
                            gsap.to(timelineBar1, { scaleX: 1, duration: text1TimelineDuration, ease: "none" });
                            gsap.delayedCall(text1TimelineDuration, () => { 
                                gsap.to(textOverlay1, { opacity: 0, duration: 1 });
                                gsap.to(timelineBar1, { scaleX: 0, duration: 1 });
                                gsap.delayedCall(1, () => {
                                    video.play();
                                    fullscreenOverlay.style.display = 'none'; // Hide overlay
                                });
                            });
                        }
                    }
                );
            }

            if (video.currentTime >= text2StartTime && video.currentTime <= text2StartTime + 0.1) {
                fullscreenOverlay.style.display = 'block'; // Show overlay
                video.pause();
                gsap.fromTo(textOverlay2, 
                    { opacity: 0, display: 'none' }, 
                    { 
                        opacity: 1, 
                        display: 'block', 
                        duration: 1, 
                        onComplete: () => {
                            gsap.to(timelineBar2, { scaleX: 1, duration: text2TimelineDuration, ease: "none" });
                            gsap.delayedCall(text2TimelineDuration, () => { 
                                gsap.to(textOverlay2, { opacity: 0, duration: 1 });
                                gsap.to(timelineBar2, { scaleX: 0, duration: 1 });
                                gsap.delayedCall(1, () => {
                                    video.play();
                                    fullscreenOverlay.style.display = 'none'; // Hide overlay
                                });
                            });
                        }
                    }
                );
            }
        });

        // Start video playback when user scrolls
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            onEnter: () => video.play(),
            once: true  // Ensures this trigger only runs once
        });
    });
});
