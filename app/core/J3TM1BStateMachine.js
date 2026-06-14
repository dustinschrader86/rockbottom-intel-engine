// /app/core/J3TM1BStateMachine.js

import Messages from "../data/J3TM1BMessages";
import J3TM1BMessageOverlay from "../components/system/J3TM1BMessageOverlay";
import Navigation from "../navigation/BlackNodeRoute";

class J3TM1BStateMachine {
    constructor() {
        this.state = "Dormant";
        this.lastEvent = null;
        this.cooldownUntil = 0;
        this.sequenceProgress = 0;
    }

    handleEvent(eventType, payload = null) {
        const now = Date.now();

        // Cooldown check
        if (now < this.cooldownUntil) return;

        this.lastEvent = eventType;

        switch (this.state) {

            // -------------------------
            // DORMANT
            // -------------------------
            case "Dormant":
                if (eventType === "APP_OPEN") this.toListening();
                if (eventType === "LONG_PRESS") this.toAnomaly();
                break;

            // -------------------------
            // LISTENING
            // -------------------------
            case "Listening":
                if (eventType === "RAPID_TAP") this.toObserving();
                if (eventType === "SCAN_FAIL") this.toAnomaly();
                break;

            // -------------------------
            // OBSERVING
            // -------------------------
            case "Observing":
                if (eventType === "SWIPE_DOWN") this.toHandshake();
                if (eventType === "MIDNIGHT") this.toAnomaly();
                break;

            // -------------------------
            // ANOMALY DETECTED
            // -------------------------
            case "AnomalyDetected":
                this.showMessage(this.pick(Messages.glitch));
                this.toCooldown(3000);
                break;

            // -------------------------
            // HANDSHAKE
            // -------------------------
            case "Handshake":
                if (eventType === "CIPHER_INPUT") this.toAwakened();
                break;

            // -------------------------
            // AWAKENED
            // -------------------------
            case "Awakened":
                if (eventType === "CIPHER_INPUT") this.toBlackNode();
                else this.toCooldown(5000);
                break;

            // -------------------------
            // BLACK NODE
            // -------------------------
            case "BlackNode":
                Navigation.openBlackNode();
                this.toCooldown(60000);
                break;

            // -------------------------
            // COOLDOWN
            // -------------------------
            case "Cooldown":
                // ignore events
                break;
        }
    }

    // -------------------------
    // STATE TRANSITIONS
    // -------------------------

    toListening() {
        this.state = "Listening";
        this.showMessage(this.pick(Messages.presence));
    }

    toObserving() {
        this.state = "Observing";
        this.showMessage(this.pick(Messages.direct));
    }

    toAnomaly() {
        this.state = "AnomalyDetected";
    }

    toHandshake() {
        this.state = "Handshake";
        this.showMessage(this.pick(Messages.lore));
    }

    toAwakened() {
        this.state = "Awakened";
        this.showMessage(this.pick(Messages.blacknode));
    }

    toBlackNode() {
        this.state = "BlackNode";
    }

    toCooldown(ms) {
        this.state = "Cooldown";
        this.cooldownUntil = Date.now() + ms;
        setTimeout(() => {
            this.state = "Dormant";
        }, ms);
    }

    // -------------------------
    // UTILITIES
    // -------------------------

    pick(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    showMessage(text) {
        J3TM1BMessageOverlay.show(text);
    }
}

export default new J3TM1BStateMachine();
