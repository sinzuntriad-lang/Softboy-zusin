"use strict";

/**
 * Messenger typing indicator.
 * startTyping() shows "typing..." and keeps refreshing it every 2.5s until
 * stopTyping() is called (or 20s safety timeout), so it stays visible
 * for the whole time the bot is "typing".
 */

const sessions = new Map(); // threadID -> { timer, stopFn, safety }
let loggedOnce = false;

function typingMethods(api) {
  return {
    sendTypingIndicator: typeof api?.sendTypingIndicator,
    sendTyping: typeof api?.sendTyping
  };
}

function sendIndicator(api, threadID, session) {
  let shown = false;
  // Use every typing method this ws3-fca version has (different versions expose different ones).
  try {
    if (typeof api.sendTypingIndicator === "function") {
      const r = api.sendTypingIndicator(String(threadID), (error) => {
        if (error) console.warn("[HUMAN-TYPING] sendTypingIndicator failed:", error?.message || error);
      });
      if (typeof r === "function") session.stopFn = r;
      shown = true;
    }
  } catch (error) {
    console.warn("[HUMAN-TYPING] sendTypingIndicator threw:", error?.message || error);
  }
  try {
    if (typeof api.sendTyping === "function") {
      api.sendTyping(String(threadID), true);
      shown = true;
    }
  } catch (error) {
    console.warn("[HUMAN-TYPING] sendTyping threw:", error?.message || error);
  }
  if (!loggedOnce) {
    loggedOnce = true;
    console.log("[HUMAN-TYPING] typing indicator " + (shown ? "sent" : "NOT available") + " " + JSON.stringify(typingMethods(api)));
  }
  return shown;
}

function startTyping(api, threadID) {
  if (!api || !threadID) return false;
  const key = String(threadID);
  stopTyping(api, key, true);

  const session = { timer: null, stopFn: null, safety: null };
  sessions.set(key, session);

  const ok = sendIndicator(api, key, session);
  session.timer = setInterval(() => sendIndicator(api, key, session), 2500);
  session.safety = setTimeout(() => stopTyping(api, key), 20000);
  session.timer.unref?.();
  session.safety.unref?.();
  return ok;
}

function stopTyping(api, threadID, silent = false) {
  if (!threadID) return false;
  const key = String(threadID);
  const session = sessions.get(key);
  if (session) {
    clearInterval(session.timer);
    clearTimeout(session.safety);
    sessions.delete(key);
    try { if (typeof session.stopFn === "function") session.stopFn(); } catch (_) {}
  }
  if (silent || !api) return true;
  try {
    if (typeof api.sendTyping === "function") api.sendTyping(key, false);
  } catch (_) {}
  return true;
}

function withTyping(api, threadID, durationMs, send) {
  const duration = Math.max(0, Number(durationMs) || 0);
  startTyping(api, threadID);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await send();
        stopTyping(api, threadID);
        resolve(result);
      } catch (error) {
        stopTyping(api, threadID);
        reject(error);
      }
    }, duration);
  });
}

module.exports = { startTyping, stopTyping, withTyping, typingMethods };
