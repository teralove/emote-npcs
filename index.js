// vers 1.0.0

const format = require('./format.js');

module.exports = function EmoteNpcs(dispatch) {
	
	let npcs = []; //[uint64 id]
	
    const chatHook = event => {		
		let command = format.stripTags(event.message).split(' ');
		
		if (['!emotenpcs'].includes(command[0].toLowerCase())) {
			if (command.length > 1) {
				doEmoteEveryone(command[1]);
			}	
			return false;
		}
	}
	dispatch.hook('C_CHAT', 1, chatHook)	
	dispatch.hook('C_WHISPER', 1, chatHook)
  	
	// slash support
	try {
		const Slash = require('slash')
		const slash = new Slash(dispatch)
		slash.on('emotenpcs', args => doEmoteEveryone(args[1]))
	} catch (e) {
		// do nothing because slash is optional
	}
	
	//let targetId, raceId, emoteId;
	function doEmote(target, emote) {	
		dispatch.toClient('S_SOCIAL', 1, { 
			target: target,
			animation: emote, 
		});
	}

	function doEmoteEveryone(emote) {
		for (let i in npcs) {
			doEmote(npcs[i], emote);
		}
	}
	
	dispatch.hook('S_SPAWN_NPC', 3, (event) => {
		if (!npcs.includes(event.id)) {
			npcs.push(event.id);
		}
	})
	
	dispatch.hook('S_DESPAWN_NPC', 1, (event) => {
		if (npcs.includes(event.target)) {
			let index = npcs.indexOf(event.target);
			if (index > -1) npcs.splice(index, 1);
		}
	})	
	
	dispatch.hook('S_SPAWN_ME', 1, (event) => {
		// reset
		npcs = [];
	})
		
	function systemMessage(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: ' (emote-npcs) ' + msg
		});
	}

}