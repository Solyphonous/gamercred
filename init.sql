\c gamercred

CREATE TABLE IF NOT EXISTS games (
appid INT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
    achievement_name TEXT NOT NULL,
    appid INT NOT NULL,
    display_name TEXT NOT NULL,
    icon TEXT NOT NULL,
    unlock_percentage DECIMAL(4, 1) CHECK (unlock_percentage >= 0 AND unlock_percentage <= 100),
    score INT GENERATED ALWAYS AS (ROUND(FLOOR(100 - unlock_percentage)/10)*10) STORED,
    PRIMARY KEY (achievement_name, appid),
    FOREIGN KEY (appid) REFERENCES games(appid) ON DELETE CASCADE
);
