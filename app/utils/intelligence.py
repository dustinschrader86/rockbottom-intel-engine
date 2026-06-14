# app/utils/intelligence.py

import re

def analyze_screenshot(text: str) -> dict:
    """
    Main intelligence engine.
    Takes extracted OCR text and returns structured analysis.
    """

    # --- CONTRACT ADDRESS DETECTION ---
    contract_pattern = r"(0x[a-fA-F0-9]{40})"
    contracts = re.findall(contract_pattern, text)

    # --- WALLET ADDRESS DETECTION ---
    wallet_pattern = r"(0x[a-fA-F0-9]{20,64})"
    wallets = re.findall(wallet_pattern, text)

    # --- TOKEN TICKER DETECTION ---
    ticker_pattern = r"\$[A-Z]{2,10}"
    tickers = re.findall(ticker_pattern, text)

    # --- SCAM KEYWORD DETECTION ---
    scam_keywords = [
        "airdrop", "claim now", "urgent", "connect wallet",
        "verify wallet", "seed phrase", "private key",
        "double your", "reward", "bonus", "limited time"
    ]

    flags = []
    for keyword in scam_keywords:
        if keyword.lower() in text.lower():
            flags.append(f"Suspicious keyword detected: {keyword}")

    # --- RISK SCORING ---
    risk_score = 0

    if len(contracts) > 0:
        risk_score += 20

    if len(wallets) > 0:
        risk_score += 20

    if len(flags) > 0:
        risk_score += 40

    if "seed phrase" in text.lower():
        risk_score += 50

    # Cap at 100
    risk_score = min(risk_score, 100)

    # --- SUMMARY ---
    summary = "Screenshot contains crypto-related content."

    if risk_score >= 80:
        summary = "High-risk screenshot. Multiple scam indicators detected."
    elif risk_score >= 50:
        summary = "Moderate risk. Some suspicious elements found."
    elif risk_score >= 20:
        summary = "Low risk. Minor crypto elements detected."

    return {
        "contracts": contracts,
        "wallets": wallets,
        "tickers": tickers,
        "flags": flags,
        "risk_score": risk_score,
        "summary": summary
    }
