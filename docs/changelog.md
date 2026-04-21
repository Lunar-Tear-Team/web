---
id: changelog
title: Changelog
description: Development progress log for Lunar Tear.
sidebar_position: 98
---

# Changelog

## 2026-04-18

### Added

- Weapon awakening
- Consumable item selling
- `--latest-scene` CLI flag: resumes from the most recent quest scene on startup
- Docker support (Dockerfile, docker-compose, entrypoint)
- GitHub Actions CI for Docker image builds

### Fixed

- Locale fallback MD5 validation for ja/ko to en asset candidates
- UTF-8 handling for non-ASCII characters in asset path processing
- Tutorial progress no longer overwrites existing progress unless the new phase is greater
- Repeated weapon story unlock notifications (diffs now only send changed stories)
- Unique key generation for weapon grants to prevent overwrites in gacha/rewards
- Missing `IUserWeaponStory` in `startedGameStartTables`
- Max level evaluation in costume `EnhanceActiveSkill`

---

## 2026-04-11

### Added

- Memoir enhancement and deck/memoir management updates
- Companion enhancement
- Costume awakening and ascending
- Character exalt
- Costume skill level up
- Weapon ascending, evolution, and skill level up
- Quest skipping and auto sale settings
- Item shop
- Deck skins
- Gacha system (MVP)
- EX Chapter Quests (MVP)
- Subjugation Battles (MVP)

### Fixed

- Retire navigation
- Scene transitions mid new arcs

---

## 2026-04-04

### Added

- Weapon management (enhancement with material consumption, skill/ability tracking, protect/unprotect)
- Mythic slab / character board (panel releases, status effects, ability tracking)
- Explore system
- In-app purchase flow
- Friend service stub
- Master data tooling
- Costume max-level capping by rarity in quest reward flow

### Fixed

- Map freeze caused by gimmick schedule overflow (capped patched entries under the client's `MaxGimmickSequenceSchedule=1024` limit)

### Not Yet

- Retire quest/battle mechanism
- Chapter transition loop after chapter 7

---

## 2026-03-28

### Added

- Costume enhancement (gold cost, material consumption, same-weapon-type EXP bonus)
- Shop (buying items, price deduction, starter item grants on new accounts)
- Mission progress tracking
- 3D viewer
- Event quests (start/finish/restart/update lifecycle, state tracking)
- Tutorial rewards with companion choices
- Battle drop rewards on quest finish
- Snapshot system for saving/loading user state per quest scene

### Not Yet

- Retire quest/battle mechanism

---

## 2026-03-21

### Added

- Login and account creation flow (ToS, name entry, graphic settings, title completion)
- Deck configuration
- Cage ornament rewards
- Main quest progression up to the first battle-only quest obstacle

### Not Yet

- Battle-only quests
