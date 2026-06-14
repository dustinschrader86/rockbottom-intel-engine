state = Dormant

onUserAction(event):
    if state == Dormant:
        if event == longPress(3.1s): state = AnomalyDetected
        elif event == appOpen: state = Listening

    if state == Listening:
        if event == rapidTap(3): state = Observing
        elif idle(30s): state = Dormant

    if state == Observing:
        if event == sequenceStart: state = Handshake
        elif event == midnight: state = AnomalyDetected

    if state == AnomalyDetected:
        showGlitchMessage()
        state = Cooldown

    if state == Handshake:
        if event == cipherCorrect: state = Awakened
        elif timeout(10s): state = Observing

    if state == Awakened:
        if event == cipherCorrect: state = BlackNode
        else: state = Cooldown

    if state == BlackNode:
        runBlackNodeScript()
        state = Cooldown

    if state == Cooldown:
        wait(cooldownTime)
        state = Dormant

