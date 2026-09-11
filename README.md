# VoidFall

VoidFall is now maintained as a modular browser game. The current save key and save format remain compatible with the earlier single-file release.

## Project map

- `index.html` contains the accessible page and interface structure.
- `styles/` separates the foundation, HUD, overlays, menus, and campaign presentation.
- `src/core/` owns startup, shared state, input wiring, saves, audio foundations, and the final boot call.
- `src/game/` owns run flow, the campaign finale, Endless Mode, and Guardian modes.
- `src/world/` owns dungeon generation, regional hazards, Resting Flames, and special room encounters.
- `src/render/` owns sprites, environment art, the Ember, and the world interface.
- `src/chapters/`, `src/enemies/`, and `src/bosses/` contain encounter-specific behavior.
- `src/progression/` contains blessings, rarity, forms, and the permanent skill tree.
- `src/story/` contains recovered traces, remembered rooms, and all Echo tableaus.
- `src/input/`, `src/combat/`, `src/audio/`, and `src/interface/` contain focused supporting systems.

Scripts are loaded in a deliberate order at the bottom of `index.html`. This first refactor preserves the existing shared runtime so gameplay remains identical. Future changes can replace individual systems with explicit modules without another large extraction.

## Running the game

Open `index.html` in a modern browser or serve this directory with any static web server. GitHub Pages can host the directory directly.

## Release direction

Keep editable source in a private repository before commercial release. A later build step can bundle and minify these files for the public web version and package the same build as a desktop application for Steam.
