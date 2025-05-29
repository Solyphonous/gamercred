interface ownedGame {
  name: string;
  appid: number;
}

interface playerAchievement {
  apiname: string;
  appid: string;
}

interface AchievementPercentage {
  name: string;
  percent: number;
}

interface AchievementInfo {
  name: string;
  displayName: string;
  icon: string;
}

interface FullAchievement {
  name: string;
  displayName: string;
  icon: string;
  score: string;
  percent: string;
}

interface LeaderboardTableRow {
  steamid: string;
  displayname: string;
  icon: string;
  gamercred: number;
}
