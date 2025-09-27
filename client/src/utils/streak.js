// utils/streak.js
export function getStreak() {
  const today = new Date().toISOString().slice(0,10);
  const lastDay = localStorage.getItem("lastMeditationDate");
  let streak = Number(localStorage.getItem("streak") || 0);

  if(lastDay === today) return streak;

  if(lastDay === new Date(Date.now()-86400000).toISOString().slice(0,10)) {
    streak += 1; // consecutive day
  } else {
    streak = 1; // reset streak
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastMeditationDate", today);
  return streak;
}
