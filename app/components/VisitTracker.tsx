"use client"

import { useEffect } from "react"

export default function VisitTracker() {

    useEffect(() => {
        const path = window.location.pathname;
        const key = `visited:${path}`;

        const now = Date.now();
        const expirationTime = 30 * 60 * 1000; // 30 minutos

        const stored = localStorage.getItem(key);

        if (stored) {
            const { timestamp } = JSON.parse(stored);
            if (now - timestamp < expirationTime) {
                return;
            }
        }
        fetch("api/visit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                path
            })
        })
        localStorage.setItem(
            key,
            JSON.stringify({
                timestamp: now
            }))
    }, []);
    
    return null;
}  