# 🦖 Dino Adventure: A Retro-Modern Side Scroller
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5dotjs&logoColor=white)](https://p5js.org/)


Welcome to **Dino Adventure**! This is a high-paced, endless runner built with the **p5.js** library. As a developer and UI designer, I focused on creating a seamless user experience through smooth sprite animations, parallax scrolling, and an adaptive visual state machine.

---

## 🎮 Interface & Gameplay Previews

I designed the UI to be clean and high-contrast, ensuring legibility across both Day and Night modes.

| ☀️ Day Mode | 🌙 Night Mode | 🏆 Achievement |
| :---: | :---: | :---: |
| ![Day](image/day.png) | ![Night](image/night.png) | ![High Score](image/day_high_score.png) |
| *Level 1: Pastel Blue Sky* | *Level 2: Deep Midnight* | *Dynamic Gold Overlay* |

### 💀 Game Over States
| Ground Collision | High Score Achievement |
| :---: | :---: |
| ![Game Over](image/game_over.png) | ![New High Score](image/high_score.png) |

---

## 🔥 Key Technical Features

* **Advanced Audio Feedback:** Implemented a reactive audio engine. Each action (Jumping, High-Score) has its own signature sound. Most importantly, I’ve added a **unique audio trigger specifically for Bird collisions**.
* **Parallax Background System:** Simulated depth by engineering a multi-layered background where hills and trees move at varying speeds relative to the player.
* **Dynamic UI Color Adaptation:** The scoreboard and interface colors dynamically flip between dark and light themes based on the environment level to maintain 100% accessibility.
* **Responsive Collision Physics:** Custom AABB (Axis-Aligned Bounding Box) collision detection ensures fair hitboxes for both static and animated entities.
* **Environmental State Machine:** The game transitions between "Day" and "Night" palettes dynamically, updating the star field, moon, and lighting based on level progression.

---

## 🕹️ Controls & Mechanics

* **Jump:** Press `Spacebar` or `Left Click` to dodge cacti.
* **High Jump:** `Double-Click` or tap twice rapidly to leap over high-flying birds.
* **Restart:** Hit the `R` key post-game over to re-initialize the game state.

---

## 🛠️ Tech Stack

![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5dotjs&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

---

## 🚀 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/anaTuli133/bingoGame.git](https://github.com/anaTuli133/bingoGame.git)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

**Developed by:** [Anamika Saha](https://github.com/anaTuli133)
