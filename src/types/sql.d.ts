export var get_user: string = 'SELECT count(*) AS length FROM user WHERE id = ?'
export var set_user: string = 'INSERT INTO user (id, nickname) VALUES (?, ?)'
export var get_groups: string = 'SELECT count(*) AS length FROM groups WHERE id = ?'
export var set_groups: string = 'INSERT INTO groups (id, name) VALUES (?, ?)'
export var get_member: string = 'SELECT count(*) AS length FROM member WHERE group_id = ? AND user_id = ?'
export var set_member: string = 'INSERT INTO member (group_id, user_id, card) VALUES (?, ?, ?)'
export var get_now_battle: string = 'SELECT battle.id, battle.title, battle.syuume, battle.one, battle.two, battle.three, battle.four, battle.five, battle.crusade, count(beat.id) AS length, battle.update_time FROM battle LEFT JOIN beat ON battle.id = beat.battle_id AND beat.fight_time BETWEEN ? AND ? WHERE battle.group_id = ? AND battle.start_date BETWEEN ? AND ?'
export var set_battle: string = 'INSERT INTO battle (group_id, title, one, two, three, four, five, crusade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
export var delete_battle: string = 'DELETE FROM battle WHERE group_id = ? AND start_date BETWEEN ? AND ?'
export var get_now_beat: string = 'SELECT number, boss, damage, fight_time FROM beat WHERE group_id = ? AND user_id = ? AND fight_time BETWEEN ? AND ? ORDER BY fight_time DESC'
export var set_beat: string = 'INSERT INTO beat (battle_id, group_id, user_id, number, syuume, boss, damage, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
export var update_battle: string = 'UPDATE battle SET syuume = ?, one = ?, two = ?, three = ?, four = ?, five = ?, crusade = ?, update_time = ? WHERE group_id = ? AND start_date BETWEEN ? AND ?'
export var reservation: string = 'UPDATE battle SET crusade = ?, update_time = ? WHERE group_id = ? AND start_date BETWEEN ? AND ?'
export var update_beat: string = 'UPDATE beat SET damage = ? WHERE user_id = ? AND number = ? AND fight_time BETWEEN ? AND ?'

export var get_unit: string = 'SELECT * FROM unit_view ORDER BY random() LIMIT 1'

export var set_word: string = 'INSERT INTO word (group_id, question, answer) VALUES (?, ?, ?)'
export var get_word: string = 'SELECT * FROM word WHERE group_id = ?'