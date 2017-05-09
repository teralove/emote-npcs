# Emote NPCs
Make NPCs do emotes

### Chat commands:
* !EmoteNPCs [animation_id]

### Command examples:
* !emotenpcs 19   	 - Every character NPC will start dancing
* !emotenpcs 2  	 - Every character and monster NPC will idle

Argument is only the animation IDs ("19" for dance id), typing in "dance" won't do anything.

Commands are not case-sensitive. [slash](https://github.com/baldera-mods/slash) is supported but not required

### Known issues:
* Idle animations will often interrupt emotes. <strike>See the [Remove Idles](https://github.com/teralove/remove-idles) mod to fix this.</strike>

### Info:
* Client-side only, this means only you can see the emotes. You're not actually forcing others to do emotes.
* Characters and monsters have different sets of animations. ("id 1" will make monsters prepare to attack while characters will idle)
* Other animations can be played as well. See ['animation_ids.txt'](https://github.com/teralove/emote-npcs/blob/master/animation_ids.txt) for list of commands and IDs.