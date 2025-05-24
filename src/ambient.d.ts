interface ownedGame {
  name: string;
  appid: number;
}

interface playerAchievement {
  apiname: string;
  achieved: boolean;
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
