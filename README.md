# [TF2Jump.xyz](https://tf2jump.xyz/)

> [!NOTE]
> This site is in early stage development, however it is my first priority given my free time 

The premiere website for everything rocket jump and sticky jump related.

This is a massive data driven site, utlising a complex [ELT](https://www.ibm.com/topics/elt) pipeline.
Data sources include the Tempus2.xyz API, Tempus STV demo files (.dem), Tempus Archive on YouTube and much more.

Some notable features that were not possible without TF2Jump.xyz include:

- World Record history data (only last PR is kept on the API - but is mostly available within historic STVs)
- Click a Record's 'Watch' button, and open the related Tempus Archive video on YouTube
- Mobile native push notifications + installable app (iOS/Android)
- Friend and Clan: activity/leaderboards
- In depth analytics (map playtime, WR dominance, players rank history, and much more)
- Automatically get user content (scripts/cfg/custom data)
- Companion app (suggest next map, easy TT/WR for you)

![image](https://github.com/Hona/TF2Jump.xyz/assets/10430890/3b505187-246e-4b7d-9222-30f65ff94a25)
Figure: A screenshot of the map leaderboard view for jump_apex_b1

## What is the status of development?

- To checkout the current high level roadmap, look at the [feature plan gantt chart](https://github.com/users/Hona/projects/5)
- To see what is currently being worked on, look at the [feature kanban board](https://github.com/users/Hona/projects/5/views/7)

## Architecture

To see more about how the site works under the hood, checkout the [architecture docs](/docs/architecture.md)

## Credits

- TempusHub2: I created this site to run in production many years ago, and it served hundreds of unique players hundreds of thousands of requests.
- Tempus2: Without the Tempus servers, API data, STV archiving, none of this would be possible
