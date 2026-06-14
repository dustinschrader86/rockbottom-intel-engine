// /app/services/J3TM1BEventManager.js

import J3TM1BStateMachine from "../core/J3TM1BStateMachine";

class J3TM1BEventManager {
    constructor() {
        this.lastEventTime = 0;
        this.rapidTapCount = 0;
        this.rapidTapWindow = 600; // ms
    }

    trigger(eventType, payload = null) {
        J3TM1BStateMachine.handleEvent(eventType, payload);
    }

    // Long press handler (3.1s)
    handleLongPress(duration) {
        if (duration >= 3100) {
            this.trigger("LONG_PRESS");
        }
    }

    // Triple tap detection
    handleTap() {
        const now = Date.now();

        if (now - this.lastEventTime < this.rapidTapWindow) {
            this.rapidTapCount++;
        } else {
            this.rapidTapCount = 1;
        }

        this.lastEventTime = now;

        if (this.rapidTapCount === 3) {
            this.trigger("RAPID_TAP");
            this.rapidTapCount = 0;
        }
    }

    // Swipe down gesture
    handleSwipe(direction) {
        if (direction === "down") {
            this.trigger("SWIPE_DOWN");
        }
    }

    // Failed scan event
    handleScanFailure() {
        this.trigger("SCAN_FAIL");
    }

    // Cipher input from Results screen
    handleCipherInput(input) {
        if (input === "3-1-B-7") {
            this.trigger("CIPHER_INPUT");
        }
    }

    // Midnight anomaly
    handleMidnightCheck() {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            this.trigger("MIDNIGHT");
        }
    }

    // No internet anomaly
    handleNetworkStatus(isOnline) {
        if (!isOnline) {
            this.trigger("NO_INTERNET");
        }
    }
}

export default new J3TM1BEventManager();

