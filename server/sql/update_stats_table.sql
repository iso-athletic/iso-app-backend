CREATE OR REPLACE FUNCTION updateStatsTable(target_organization_id integer, target_date_scrimmage date)

RETURNS VOID
AS $$
BEGIN

INSERT INTO "Stats"

SELECT pairs.name AS "player_name",
    pairs.player_id,
    pairs.organization_id,
    -- pairs.team "org_name", 
    pairs.date_scrimmage,
    pairs.drill_id,
    -- drstats.team_id,
    drstats.fg,
    drstats.fga,
    drstats."fg%",
    drstats."2p",
    drstats."2pa",
    drstats."2p%",
    drstats."3p",
    drstats."3pa",
    drstats."3p%",
    drstats."3par",
    drstats.pts,
    drstats."ts%",
    drstats."efg%",
    drstats."ft",
    drstats."fta",
    drstats."ft%",
    drstats.ftr,
    drstats."orb" AS oreb,
    drstats.drbd AS dreb,
    drstats.trb AS reb,
    drstats.ast,
    drstats."stl",
    drstats."blk",
    drstats."tov",
    drstats."pf",
    '' AS id,
    '' AS created_at,
    '' AS updated_at
FROM
    (
	SELECT max(temp1.name) AS name, max(temp1.organization_id) AS organization_id, max(temp1.id) AS player_id, 
		   max(temp2.team) AS team, max(temp2.drill_id) AS drill_id, max(temp2.date_scrimmage) AS date_scrimmage
    FROM
        (SELECT t1.name, t1.id, t1.organization_id, t2.name AS team
        FROM "Players" t1
            INNER JOIN
            "Organizations" t2 ON
t1.organization_id = t2.id
WHERE t1.organization_id=target_organization_id
) temp1
        JOIN
        (SELECT distinct(playerteam.team), ev.drill_id, CAST (created_at AS DATE) AS date_scrimmage
        FROM "Events" ev
            JOIN
            (SELECT t1.name, t1.id, t2.name AS team
            FROM "Players" t1
                INNER JOIN
                "Organizations" t2 ON
t1.organization_id = t2.id) playerteam
            ON playerteam.id=ev.player_id) temp2
        ON temp1.team = temp2.team
		WHERE date_scrimmage=target_date_scrimmage
		GROUP BY temp1.name
)  pairs

    LEFT JOIN

    (
SELECT player_id, date_scrimmage, drill_id,-- team_id,
        fg, fga,
        CASE WHEN FGA = 0 THEN NULL ELSE cast(fg AS decimal(7,2)) /cast(fga AS decimal(7,2)) END AS "fg%",
        "2p",
        "2pa",
        CASE WHEN "2pa" = 0 THEN NULL ELSE cast("2p" AS decimal(7,2)) /cast("2pa" AS decimal(7,2)) END AS "2p%",
        "3p",
        "3pa",
        CASE WHEN "3pa" = 0 THEN NULL ELSE cast("3p" AS decimal(7,2)) /cast("3pa" AS decimal(7,2)) END AS "3p%",
        "ft", "fta",
        CASE WHEN "fta" = 0 THEN NULL ELSE cast("ft" AS decimal(7,2)) /cast("fta" AS decimal(7,2)) END AS "ft%",
        "orb", "drbd", "orb"+"drbd" AS "trb",
        "stl", "blk", "tov",
        "pf",
        "ast",
        2 * "2p" + 3 * "3p" + "ft" AS  PTS,
        CASE WHEN "fga" = 0 AND "fta" = 0 THEN NULL ELSE 
            cast(2 * "2p" + 3 * "3p" + "ft" AS decimal(7,2)) /(2*(cast("fga" AS decimal(7,2))+0.44 * cast("fta" AS decimal(7,2)))) END AS "ts%",
        CASE WHEN "fga" = 0 THEN NULL ELSE
            (cast(fg AS decimal(7,2)) + 0.5 * "3p")/cast("fga" AS decimal(7,2)) END AS "efg%",
        CASE WHEN "fga" = 0 THEN NULL ELSE cast("3pa" AS decimal(7,2)) /cast("fga" AS decimal(7,2)) END AS "3par",
        CASE WHEN "fga" = 0 THEN NULL ELSE cast("fta" AS decimal(7,2)) /cast("fga" AS decimal(7,2)) END AS "ftr"
    FROM

        (SELECT player_id, drill_id, CAST (created_at AS DATE) "date_scrimmage",-- min(team_id) AS team_id, 
            COUNT(CASE WHEN action_id LIKE 'Made Shot' THEN 1 ELSE NULL END) AS "fg",
            COUNT(CASE WHEN action_id LIKE '%Shot' THEN 1 ELSE NULL END) AS "fga",
            COUNT(CASE WHEN action_id LIKE 'Made Shot' AND location->>'shotValue' LIKE '2' THEN 1 ELSE NULL END) AS "2p",
            COUNT(CASE WHEN action_id LIKE '%Shot' AND location->>'shotWeight' LIKE '2' THEN 1 ELSE NULL END) AS "2pa",
            COUNT(CASE WHEN action_id LIKE 'Made Shot' AND location->>'shotValue' LIKE '3' THEN 1 ELSE NULL END) AS "3p",
            COUNT(CASE WHEN action_id LIKE '%Shot' AND location->>'shotWeight' LIKE '3' THEN 1 ELSE NULL END) AS "3pa",
            COUNT(CASE WHEN action_id LIKE 'Made FT' THEN 1 ELSE NULL END) AS "ft",
            COUNT(CASE WHEN action_id LIKE '%FT' THEN 1 ELSE NULL END) AS "fta",
            COUNT(CASE WHEN action_id LIKE 'O-Rebound' THEN 1 ELSE NULL END) AS "orb",
            COUNT(CASE WHEN action_id LIKE 'D-Rebound' THEN 1 ELSE NULL END) AS "drbd",
            COUNT(CASE WHEN action_id LIKE 'Assist' THEN 1 ELSE NULL END) AS "ast",
            COUNT(CASE WHEN action_id LIKE 'Steal' THEN 1 ELSE NULL END) AS "stl",
            COUNT(CASE WHEN action_id LIKE 'Block' THEN 1 ELSE NULL END) AS "blk",
            COUNT(CASE WHEN action_id LIKE 'Turnover' THEN 1 ELSE NULL END) AS "tov",
            COUNT(CASE WHEN action_id LIKE 'Foul' THEN 1 ELSE NULL END) AS "pf"
        FROM "Events"
		WHERE CAST (created_at AS DATE)=target_date_scrimmage
        GROUP BY player_id, drill_id, date_scrimmage,team_id) sub ) drstats
    ON drstats.player_id = pairs.player_id AND drstats.date_scrimmage=pairs.date_scrimmage AND drstats.drill_id=pairs.drill_id
ORDER BY date_scrimmage, drill_id;

END;

$$
LANGUAGE plpgsql;